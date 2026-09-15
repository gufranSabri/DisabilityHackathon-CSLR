import csv
from pathlib import Path
from app.config import ISHARAH_SI_TRAIN, ISHARAH_SI_DEV, ISHARAH_SI_TEST, ISHARAH_US_TRAIN, ISHARAH_US_DEV, ISHARAH_US_TEST


class TextToSignLookup:
    """Load Isharah CSV annotations and provide exact-match lookup."""

    def __init__(self):
        self.lookup = {}  # { normalized_sentence -> (id, gloss_list) }
        self._load_csvs()

    def _load_csvs(self):
        """Load all SI and US CSV files into in-memory lookup dict."""
        csv_paths = [
            ISHARAH_SI_TRAIN,
            ISHARAH_SI_DEV,
            ISHARAH_SI_TEST,
            ISHARAH_US_TRAIN,
            ISHARAH_US_DEV,
            ISHARAH_US_TEST,
        ]

        for csv_path in csv_paths:
            if not csv_path.exists():
                print(f"Warning: {csv_path} not found, skipping")
                continue

            with open(csv_path, "r", encoding="utf-8") as f:
                reader = csv.DictReader(f, delimiter="|")
                for row in reader:
                    if not row:
                        continue
                    vid_id = row.get("id", "").strip()
                    gloss_str = row.get("gloss", "").strip()

                    if not gloss_str:
                        continue

                    # Split gloss string into individual gloss tokens
                    gloss_tokens = [g.strip() for g in gloss_str.split() if g.strip()]

                    # Store with normalized key (exact text match)
                    self.lookup[gloss_str] = (vid_id, gloss_tokens)

        print(f"Loaded {len(self.lookup)} gloss sentences from Isharah CSV")

    def lookup_text(self, text: str) -> tuple[bool, str | None, list[str]]:
        """
        Exact-match lookup for Arabic text.
        Returns (matched, id, gloss_tokens)
        """
        text = text.strip()
        if text in self.lookup:
            vid_id, gloss_tokens = self.lookup[text]
            return (True, vid_id, gloss_tokens)
        else:
            return (False, None, [])
