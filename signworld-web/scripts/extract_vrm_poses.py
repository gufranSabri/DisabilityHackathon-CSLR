#!/usr/bin/env python3
"""
Extract avatar-ready sign motion from the Isharah-Selfi videos.

Output: public/poses/{signId}.json  (format version 2) and src/lib/signLibrary.js

  {
    "v": 2, "fps": 29.97,
    "frames": [
      { "R": { "w": [x,y,z], "p": [63 floats], "a": presence },   # or null
        "L": { ... } | null }
    ]
  }

  R / L  = the avatar's right / left arm, i.e. the hand that appears on the
           LEFT / RIGHT side of the video (the avatar faces the viewer, so the
           avatar mirrors the video exactly as it is seen on screen).
  w      = wrist position relative to the signer's eyes (face surface), in
           metres: x/y are the on-screen offset in face units, z is depth.
  p      = 21 hand landmarks (MediaPipe Hands order) in metres, relative to
           the wrist.
  a      = presence weight 0..1 (fades the arm to rest when the hand leaves
           the frame, e.g. the phone-holding hand).

  All vectors are in AVATAR space:  +X = viewer's right, +Y = up,
  +Z = toward the camera.  MediaPipe gives x right, y DOWN, z AWAY from the
  camera, so the conversion is (x, -y, -z)  — a proper rotation, which keeps
  hand chirality intact.

Why not the body (BlazePose) model?  In these selfie clips the elbows are almost always
outside the frame and BlazePose regularly swaps the shoulders, so arm angles
taken from it are garbage.  The hand landmarker is very stable, so we take
the wrist position + full hand shape from it and let the avatar solve the arm
with IK (see src/lib/signRetarget.js).

Hand shape is lifted from the 2D image landmarks with MediaPipe's bone
lengths (see lift_hand).  Wrist depth follows the hand's apparent scale
relative to its median over the clip.

  h      = head rotation quaternion [x,y,z,w] (avatar space) relative to the
           signer's average head pose, from FaceLandmarker.
"""

import json
import math
import os
import warnings

import cv2
import mediapipe as mp
import numpy as np
from mediapipe.tasks import python as mp_python
from mediapipe.tasks.python import vision as mp_vision

warnings.filterwarnings('ignore')

# ---------------------------------------------------------------------------
# Config
# ---------------------------------------------------------------------------
VIDEO_BASE = '/Users/gufran/Developer/data/sign/Isharah-Selfi/preprocessed_videos_resized'
FACE_MODEL = '/tmp/face_landmarker.task'
HAND_MODEL = '/tmp/hand_landmarker.task'
MODEL_URLS = {
    FACE_MODEL: 'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/latest/face_landmarker.task',
    HAND_MODEL: 'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/latest/hand_landmarker.task',
}

INFO_CSV = '/Users/gufran/Developer/data/sign/Isharah-Selfi/info/SI_v2.csv'
LIBRARY_JSON = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'sign_library.json')

_SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
_WEB_DIR = os.path.dirname(_SCRIPT_DIR)
_PROJ_DIR = os.path.dirname(_WEB_DIR)
OUTPUT_DIRS = [
    os.path.join(_WEB_DIR, 'public', 'poses'),
    os.path.join(_PROJ_DIR, 'signworld-app', 'public', 'poses'),
]
LIB_JS = os.path.join(_WEB_DIR, 'src', 'lib', 'signLibrary.js')
MAX_SECONDS = 8.0       # longer clips are skipped
MIN_HAND_FRAC = 0.45    # a clip needs a tracked hand in at least this share of frames

VFOV_DEG = 63.0         # MediaPipe face-geometry camera (keeps us consistent)
EYE_DIST_M = 0.063      # adult inter-pupillary distance
HAND_AHEAD_M = 0.12     # typical wrist distance in front of the eyes
MAX_GAP = 8             # frames of missing hand that get interpolated
FADE_SIGMA = 2.5        # presence fade smoothing (frames)
HEAD_GAIN = 0.8         # head rotation is replayed slightly damped

L_IRIS, R_IRIS, CHIN = 468, 473, 152   # FaceLandmarker indices
EYE_TO_CHIN_M = 0.115   # adult eye-line to chin; the on-screen unit for hand offsets

# ---------------------------------------------------------------------------
# Signal helpers
# ---------------------------------------------------------------------------

def gaussian_smooth(x: np.ndarray, sigma: float) -> np.ndarray:
    """Smooth along axis 0 (time) with edge padding. x has no NaNs."""
    if sigma <= 0 or len(x) < 3:
        return x
    r = int(math.ceil(sigma * 3))
    k = np.exp(-0.5 * (np.arange(-r, r + 1) / sigma) ** 2)
    k /= k.sum()
    pad = np.concatenate([np.repeat(x[:1], r, 0), x, np.repeat(x[-1:], r, 0)])
    out = np.empty_like(x)
    for i in range(len(x)):
        out[i] = np.tensordot(k, pad[i:i + 2 * r + 1], axes=(0, 0))
    return out


def fill_track(vals: list):
    """vals: list of np.ndarray | None.  Interpolates gaps <= MAX_GAP, holds
    the nearest value elsewhere.  Returns (array, valid_mask)."""
    n = len(vals)
    idx = [i for i, v in enumerate(vals) if v is not None]
    if not idx:
        return None, np.zeros(n, bool)
    shape = vals[idx[0]].shape
    out = np.zeros((n,) + shape)
    valid = np.zeros(n, bool)
    for i in idx:
        out[i] = vals[i]
        valid[i] = True
    for a, b in zip(idx, idx[1:]):
        if 1 < b - a <= MAX_GAP + 1:
            for i in range(a + 1, b):
                t = (i - a) / (b - a)
                out[i] = vals[a] * (1 - t) + vals[b] * t
                valid[i] = True
    last = None
    for i in range(n):
        if valid[i]:
            last = out[i]
        elif last is not None:
            out[i] = last
    for i in range(idx[0]):
        out[i] = out[idx[0]]
    return out, valid


def orthonormalize(m: np.ndarray) -> np.ndarray:
    u, _, vt = np.linalg.svd(m)
    r = u @ vt
    if np.linalg.det(r) < 0:
        u[:, -1] *= -1
        r = u @ vt
    return r


def mat_to_quat(m: np.ndarray) -> list:
    """3x3 rotation → [x, y, z, w]."""
    t = np.trace(m)
    if t > 0:
        s = math.sqrt(t + 1.0) * 2
        q = [(m[2, 1] - m[1, 2]) / s, (m[0, 2] - m[2, 0]) / s, (m[1, 0] - m[0, 1]) / s, 0.25 * s]
    else:
        i = int(np.argmax(np.diag(m)))
        j, k = (i + 1) % 3, (i + 2) % 3
        s = math.sqrt(1.0 + m[i, i] - m[j, j] - m[k, k]) * 2
        q = [0.0, 0.0, 0.0, (m[k, j] - m[j, k]) / s]
        q[i] = 0.25 * s
        q[j] = (m[j, i] + m[i, j]) / s
        q[k] = (m[k, i] + m[i, k]) / s
    return [round(float(c), 4) for c in q]


def scaled_rotation(m: np.ndarray, gain: float) -> np.ndarray:
    """Scale a rotation's angle (axis-angle) by `gain`."""
    ang = math.acos(max(-1.0, min(1.0, (np.trace(m) - 1) / 2)))
    if ang < 1e-6:
        return np.eye(3)
    axis = np.array([m[2, 1] - m[1, 2], m[0, 2] - m[2, 0], m[1, 0] - m[0, 1]]) / (2 * math.sin(ang))
    a = ang * gain
    K = np.array([[0, -axis[2], axis[1]], [axis[2], 0, -axis[0]], [-axis[1], axis[0], 0]])
    return np.eye(3) + math.sin(a) * K + (1 - math.cos(a)) * K @ K

# ---------------------------------------------------------------------------
# Per-frame measurement
# ---------------------------------------------------------------------------

def to_avatar(v: np.ndarray) -> np.ndarray:
    """MediaPipe (x right, y down, z away) → avatar (x right, y up, z toward)."""
    return v * np.array([1.0, -1.0, -1.0])


HAND_PARENT = [-1, 0, 1, 2, 3, 0, 5, 6, 7, 0, 9, 10, 11, 0, 13, 14, 15, 0, 17, 18, 19]
PALM_SEGMENTS = [(0, 5), (0, 9), (0, 13), (0, 17), (5, 17), (5, 13), (9, 17), (1, 5)]


def lift_hand(img_px: np.ndarray, world: np.ndarray):
    """Rebuild the hand in 3D from the (accurate) 2D image landmarks.

    MediaPipe's hand-world z is badly exaggerated for hands pointing roughly
    at the camera, which made fingers that are clearly in the image plane
    point straight at the viewer.  Instead keep the world model's bone
    LENGTHS, take x/y from the image, and solve each bone's depth from
        |dz| = sqrt(L² - (l_px / s)²)
    using the world model only for the sign of dz.  `s` is pixels per metre
    at the hand.

    Returns (points relative to the wrist in MediaPipe axes, s)."""
    kids = range(1, 21)
    L = np.array([np.linalg.norm(world[i] - world[HAND_PARENT[i]]) for i in kids])
    # Scale from the rigid, planar palm: some direction in the palm plane is
    # always parallel to the image plane, so the least-foreshortened palm
    # segment gives pixels-per-metre.  (Short finger bones are too noisy.)
    ratios = [np.linalg.norm(img_px[a] - img_px[b]) / np.linalg.norm(world[a] - world[b])
              for a, b in PALM_SEGMENTS if np.linalg.norm(world[a] - world[b]) > 1e-4]
    if len(ratios) < 3:
        return None, float('nan')
    s = float(max(ratios))
    pts = np.zeros((21, 3))
    for k, i in enumerate(kids):
        par = HAND_PARENT[i]
        dxy = (img_px[i] - img_px[par]) / s
        dz2 = L[k] ** 2 - float(dxy @ dxy)
        dz = math.copysign(math.sqrt(max(dz2, 0.0)), world[i, 2] - world[par, 2])
        pts[i] = pts[par] + np.array([dxy[0], dxy[1], dz])
    return pts, s


def run_models(video_path: str):
    face_opts = mp_vision.FaceLandmarkerOptions(
        base_options=mp_python.BaseOptions(model_asset_path=FACE_MODEL),
        running_mode=mp_vision.RunningMode.VIDEO, num_faces=1,
        output_facial_transformation_matrixes=True)
    hand_opts = mp_vision.HandLandmarkerOptions(
        base_options=mp_python.BaseOptions(model_asset_path=HAND_MODEL),
        running_mode=mp_vision.RunningMode.VIDEO, num_hands=2,
        min_hand_detection_confidence=0.4, min_hand_presence_confidence=0.4,
        min_tracking_confidence=0.4)

    cap = cv2.VideoCapture(video_path)
    fps = cap.get(cv2.CAP_PROP_FPS) or 30.0
    W = cap.get(cv2.CAP_PROP_FRAME_WIDTH)
    H = cap.get(cv2.CAP_PROP_FRAME_HEIGHT)
    faces, hands = [], []
    i = 0
    with mp_vision.FaceLandmarker.create_from_options(face_opts) as fl, \
         mp_vision.HandLandmarker.create_from_options(hand_opts) as hl:
        while True:
            ok, frame = cap.read()
            if not ok:
                break
            img = mp.Image(image_format=mp.ImageFormat.SRGB,
                           data=cv2.cvtColor(frame, cv2.COLOR_BGR2RGB))
            ts = int(i * 1000 / fps)
            fr = fl.detect_for_video(img, ts)
            hr = hl.detect_for_video(img, ts)

            face = None
            if fr.face_landmarks:
                lm = fr.face_landmarks[0]
                le = np.array([lm[L_IRIS].x * W, lm[L_IRIS].y * H])
                re = np.array([lm[R_IRIS].x * W, lm[R_IRIS].y * H])
                # Face-geometry frame: x right, y up, z toward the camera —
                # the same axes as avatar space.
                rot = orthonormalize(np.array(fr.facial_transformation_matrixes[0])[:3, :3])
                mid = (le + re) / 2
                # eye-to-chin measured in 3D (FaceMesh z is in x-pixel units)
                # so a bowed / raised head doesn't shrink the face unit
                p3 = lambda k: np.array([lm[k].x * W, lm[k].y * H, lm[k].z * W])
                chin_3d = float(np.linalg.norm(p3(CHIN) - (p3(L_IRIS) + p3(R_IRIS)) / 2))
                face = {'eyes': mid, 'eye_px': float(np.linalg.norm(le - re)),
                        'chin_px': chin_3d, 'rot': rot}
            faces.append(face)

            fh = []
            for img_lm, w_lm in zip(hr.hand_landmarks, hr.hand_world_landmarks):
                px = np.array([[p.x * W, p.y * H] for p in img_lm])
                wd = np.array([[p.x, p.y, p.z] for p in w_lm])
                fh.append({'px': px, 'world': wd})
            hands.append(fh)
            i += 1
    cap.release()
    return fps, W, H, faces, hands


def assign_hands(hands, faces, W):
    """Split detections into two tracks by screen side, with continuity.
    Track 'R' = hand on the viewer's left (avatar's right arm)."""
    tracks = {'R': [], 'L': []}
    prev = {'R': None, 'L': None}
    face_x = np.median([f['eyes'][0] for f in faces if f]) if any(faces) else W / 2
    for fh in hands:
        cur = {'R': None, 'L': None}
        if len(fh) >= 2:
            a, b = sorted(fh[:2], key=lambda h: h['px'][0, 0])
            cur['R'], cur['L'] = a, b
        elif len(fh) == 1:
            h = fh[0]
            x = h['px'][0]
            dists = {k: np.linalg.norm(x - prev[k]) for k in prev if prev[k] is not None}
            if dists and min(dists.values()) < W * 0.25:
                side = min(dists, key=dists.get)
            else:
                side = 'R' if x[0] < face_x else 'L'
            cur[side] = h
        for k in ('R', 'L'):
            tracks[k].append(cur[k])
            if cur[k] is not None:
                prev[k] = cur[k]['px'][0]
    return tracks


def palm_px(h) -> float:
    return float(np.linalg.norm(h['px'][9] - h['px'][0]))


def dedupe_hands(hands, W):
    """Drop a second detection that sits on top of another (duplicate) and
    detections far smaller than the clip's typical hand."""
    sizes = [palm_px(h) for fh in hands for h in fh]
    typical = float(np.median(sizes)) if sizes else 0.0
    out = []
    for fh in hands:
        keep = [h for h in fh if palm_px(h) > 0.45 * typical]
        keep.sort(key=palm_px, reverse=True)
        uniq = []
        for h in keep:
            if all(np.linalg.norm(h['px'][0] - u['px'][0]) > 0.12 * W for u in uniq):
                uniq.append(h)
        out.append(uniq)
    return out


def drop_phantom_segments(tracks, faces, W):
    """The hand model sometimes locks onto a static pattern next to the face
    (e.g. keffiyeh folds).  Such a 'hand' moves rigidly with the head, so a
    track segment that stays fixed relative to the eyes and is smaller than
    the clip's real hands is removed."""
    sizes = [palm_px(h) for tr in tracks.values() for h in tr if h is not None]
    if not sizes:
        return tracks
    big = float(np.percentile(sizes, 75))
    for k, tr in tracks.items():
        n = len(tr)
        i = 0
        while i < n:
            if tr[i] is None:
                i += 1
                continue
            j, last = i, i
            while j < n and (tr[j] is not None or j - last <= MAX_GAP):
                if tr[j] is not None:
                    last = j
                j += 1
            seg = [t for t in range(i, last + 1) if tr[t] is not None]
            rel = np.array([tr[t]['px'][0] - (faces[t]['eyes'] if faces[t] else 0) for t in seg])
            size = np.median([palm_px(tr[t]) for t in seg])
            if len(seg) >= 1 and rel.std(0).max() < 0.03 * W and size < 0.8 * big:
                print(f'       dropping phantom hand {k} frames {seg[0]}-{seg[-1]} '
                      f'(face-relative spread {rel.std(0).max():.1f}px, size {size:.0f}px vs {big:.0f}px)')
                for t in seg:
                    tr[t] = None
            i = last + 1
    return tracks


def process_video(video_path: str) -> dict:
    fps, W, H, faces, hands = run_models(video_path)
    n = len(faces)
    f_px = (H / 2) / math.tan(math.radians(VFOV_DEG / 2))
    cx, cy = W / 2, H / 2

    # Head rotation is replayed relative to the signer's average head pose
    # (in a selfie the phone is held below the face, so the raw face pose is
    # tilted).  Hands stay in camera axes so the avatar, seen from the front,
    # matches the video as the viewer sees it.
    rots = [f['rot'] for f in faces if f]
    R0 = orthonormalize(np.mean(rots, 0)) if rots else np.eye(3)
    body = R0.T

    # Face reference: per-frame eye midpoint (the camera shakes), constant
    # depth from the median iris distance (the head barely moves in depth).
    eye_px = np.median([f['eye_px'] for f in faces if f]) if rots else W * 0.15
    face_depth = f_px * EYE_DIST_M / eye_px
    eyes, _ = fill_track([f['eyes'] if f else None for f in faces])
    if eyes is None:
        eyes = np.tile([cx, cy * 0.8], (n, 1))
    eyes = gaussian_smooth(eyes, 1.5)

    # Head rotation relative to the neutral (median) pose, in body axes
    head_vals = [body @ f['rot'] if f else None for f in faces]
    head, _ = fill_track(head_vals)
    head_q = []
    if head is not None:
        head = gaussian_smooth(head.reshape(n, 9), 1.5).reshape(n, 3, 3)
        head_q = [mat_to_quat(scaled_rotation(orthonormalize(h), HEAD_GAIN)) for h in head]

    tracks = drop_phantom_segments(assign_hands(dedupe_hands(hands, W), faces, W), faces, W)
    out = {'R': [None] * n, 'L': [None] * n}
    # metres per pixel at the face, from eye-to-chin (the avatar side uses the
    # same measure, so a hand at the chin lands on the avatar's chin)
    m_per_px = EYE_TO_CHIN_M / np.median([f['chin_px'] for f in faces if f])
    for side, tr in tracks.items():
        lifted = [lift_hand(h['px'], h['world']) if h is not None else (None, 0.0) for h in tr]
        scales = [sc for pts, sc in lifted if pts is not None and sc > 1e-3]
        if not scales:
            continue
        # Absolute metric scale of MediaPipe hand-world output is unreliable,
        # so only the RELATIVE size change drives depth around a typical
        # "hand slightly in front of the face" distance.
        s_ref = float(np.median(scales))
        d_ref = max(face_depth - HAND_AHEAD_M, 0.1)

        wrist_vals, shape_vals = [], []
        for i, h in enumerate(tr):
            pts, s = lifted[i]
            if pts is None or not (s > 1e-3):
                wrist_vals.append(None)
                shape_vals.append(None)
                continue
            depth = d_ref * s_ref / s
            # x/y: screen-space offset from the eyes, in face units.  The
            # selfie lens is wide and close, so true metric x/y would put the
            # hand in a visibly different spot relative to the face than the
            # viewer sees; matching the screen layout is what looks identical.
            u, v = h['px'][0]
            off = np.array([(u - eyes[i, 0]) * m_per_px,
                            (v - eyes[i, 1]) * m_per_px,
                            depth - face_depth])
            wrist_vals.append(to_avatar(off))
            shape_vals.append(to_avatar(pts))

        wrist, valid = fill_track(wrist_vals)
        shape, _ = fill_track(shape_vals)
        # Depth from apparent hand size is the noisiest channel — smooth harder
        wrist = gaussian_smooth(wrist, 1.2)
        wrist[:, 2] = gaussian_smooth(wrist[:, 2:], 2.5)[:, 0]
        shape = gaussian_smooth(shape, 1.0)
        presence = gaussian_smooth(valid.astype(float)[:, None], FADE_SIGMA)[:, 0]
        for i in range(n):
            if presence[i] < 0.02:
                continue
            out[side][i] = {
                'w': [round(float(c), 3) for c in wrist[i]],
                'p': [round(float(c), 3) for c in shape[i].reshape(-1)],
                'a': round(float(min(1.0, presence[i] * 1.15)), 2),
            }

    frames = []
    for i in range(n):
        fr = {'R': out['R'][i], 'L': out['L'][i]}
        if head_q:
            fr['h'] = head_q[i]
        frames.append(fr)
    return {'v': 2, 'fps': round(fps, 3), 'frames': frames}

# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def load_arabic():
    import csv
    ar = {}
    with open(INFO_CSV, encoding='utf-8') as fh:
        for row in csv.DictReader(fh):
            m = row['video_pth'].split('/')[-1].replace('.mp4', '')
            ar[m] = row['sentence'].strip()
    return ar


def main():
    import sys
    for path, url in MODEL_URLS.items():
        if not os.path.exists(path):
            print(f'Model not found: {path}\n  curl -L -o {path} {url}')
            return
    for d in OUTPUT_DIRS:
        os.makedirs(d, exist_ok=True)

    only = None
    for a in sys.argv[1:]:
        if a.startswith('--only='):
            only = set(a.split('=', 1)[1].split(','))
    skip_existing = '--skip-existing' in sys.argv

    lib = json.load(open(LIBRARY_JSON, encoding='utf-8'))
    arabic = load_arabic()
    meta = {}          # id -> dict, in library order
    for topic, items in lib.items():
        if topic.startswith('_'):
            continue
        for sid, info in items.items():
            meta[sid] = {'topic': topic, 'en': info['en'], 'kw': info.get('kw', ''),
                         'ar': arabic.get(sid, '')}

    kept, rejected = {}, {}
    for sid, info in meta.items():
        if only and sid not in only:
            existing = os.path.join(OUTPUT_DIRS[0], f'{sid}.json')
            if os.path.exists(existing):
                d = json.load(open(existing))
                kept[sid] = {**info, 'frames': len(d['frames']), 'fps': d['fps']}
            continue
        out0 = os.path.join(OUTPUT_DIRS[0], f'{sid}.json')
        if skip_existing and os.path.exists(out0):
            d = json.load(open(out0))
            kept[sid] = {**info, 'frames': len(d['frames']), 'fps': d['fps']}
            continue
        vp = os.path.join(VIDEO_BASE, 'Group1', sid.split('_')[0], sid.split('_')[1] + '.mp4')
        if not os.path.exists(vp):
            rejected[sid] = 'video not found'
            print(f'[SKIP] {sid}: not found')
            continue
        data = process_video(vp)
        n, fps = len(data['frames']), data['fps']
        hands = sum(1 for f in data['frames'] if any(f[k] and f[k]['a'] > 0.5 for k in ('R', 'L')))
        frac = hands / max(n, 1)
        if n / fps > MAX_SECONDS:
            rejected[sid] = f'too long ({n / fps:.1f}s)'
        elif frac < MIN_HAND_FRAC:
            rejected[sid] = f'hand tracked in only {frac:.0%} of frames'
        if sid in rejected:
            print(f'[DROP] {sid} {info["en"]!r}: {rejected[sid]}')
            continue
        print(f'[OK] {sid} {info["en"]!r}: {n} frames, hands {frac:.0%}')
        payload = json.dumps(data, separators=(',', ':'))
        for d in OUTPUT_DIRS:
            with open(os.path.join(d, f'{sid}.json'), 'w') as fh:
                fh.write(payload)
        kept[sid] = {**info, 'frames': n, 'fps': fps}

    # library module consumed by the UI (captions + text->sign matching)
    os.makedirs(os.path.dirname(LIB_JS), exist_ok=True)
    entries = []
    for sid, info in kept.items():
        entries.append(f"  {json.dumps(sid)}: {json.dumps({'topic': info['topic'], 'ar': info['ar'], 'en': info['en'], 'kw': info['kw'], 'dur': round(info['frames'] / info['fps'], 2)}, ensure_ascii=False)},")
    with open(LIB_JS, 'w', encoding='utf-8') as fh:
        fh.write('// GENERATED by scripts/extract_vrm_poses.py — do not edit by hand.\n')
        fh.write('// id -> { topic, ar (dataset sentence), en (translation), kw (match keywords), dur (seconds) }\n')
        fh.write('export const SIGN_LIBRARY = {\n' + '\n'.join(entries) + '\n}\n')
    print(f'Library: {len(kept)} signs kept, {len(rejected)} dropped')
    for k, v in rejected.items():
        print(f'   dropped {k}: {v}')
    print('Done.')


if __name__ == '__main__':
    main()
