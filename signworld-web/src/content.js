/* ============================================================================
   SignWorld Web — all hardcoded, bilingual ({ ar, en }) content.
   No backend. Everything conceptual/illustrative. Same posture as the app
   and old/signworld-hub: nothing claims a real partnership.
   ========================================================================== */

// The four flagship apps are embedded directly in this site (built from
// legacy/<dir> into public/legacy/<id>/, see scripts/build-legacy.mjs) and
// rendered full-screen at /apps/:id/open via an <iframe> — no external dev
// server needed. These are same-origin static paths, not other hosts.
//
// Note: the explicit `index.html` filename is required, not just the
// trailing-slash directory path — Vite's dev-server HTML middleware
// intercepts directory-style requests and serves the *site's own*
// dev entry (with the site's favicon/main.jsx) instead of the static file
// sitting in public/. Requesting the file by name bypasses that and works
// identically in dev and in a production build.
export const APP_URLS = {
  education: '/legacy/education/index.html',
  medical: '/legacy/medical/index.html',
  children: '/legacy/children/index.html',
  publicSafety: '/legacy/publicSafety/index.html',
}

// The mobile PWA — a separate app (signworld-app/), published on its own.
export const APP_PWA_URL = 'https://gleaming-steeple-36s9.here.now/'

/* ------------------------------- the four flagship apps ------------------------------- */

export const APPS = [
  {
    id: 'education', icon: 'school', accent: '#b9852a', moment: 'school',
    url: APP_URLS.education,
    name: { ar: 'التعليم — مدرستي', en: 'Education — Madrasati' },
    tagline: {
      ar: 'مترجم لغة إشارة فوري لكل فصل في المملكة',
      en: 'A real-time sign-language interpreter for every classroom',
    },
    impactLine: {
      ar: '«كل فصل في السعودية متاح فورًا؛ لا نقص مترجمين يقف بين طفل أصمّ وتعليمه.»',
      en: '"Every classroom in Saudi Arabia, instantly accessible; no interpreter shortage can ever again stand between a Deaf child and their education."',
    },
    audience: {
      ar: ['معلمون', 'طلاب صمّ', 'مدارس عامة', 'منصة مدرستي'],
      en: ['Teachers', 'Deaf students', 'Public schools', 'Madrasati platform'],
    },
    steps: {
      ar: [
        { icon: 'mic', t: 'المعلّم يتحدّث، ورمز رقمي يوقّع كلامه مباشرة أمام الطلاب الصمّ.' },
        { icon: 'hand', t: 'الطالب يوقّع سؤاله، فيتحوّل فورًا إلى نص وصوت للمعلّم.' },
        { icon: 'layers', t: 'يعمل في أي فصل، بدون حاجة إلى مترجم بشري حاضر.' },
        { icon: 'school', t: 'يتكامل مفاهيميًا مع منصة مدرستي ليصل كل مدرسة حكومية.' },
      ],
      en: [
        { icon: 'mic', t: 'The teacher speaks; an avatar signs it live for Deaf students.' },
        { icon: 'hand', t: 'A student signs a question — instantly converted to text and speech for the teacher.' },
        { icon: 'layers', t: 'Works in any classroom, no human interpreter needed on site.' },
        { icon: 'school', t: 'Conceptually integrates with the Madrasati platform to reach every public school.' },
      ],
    },
    integration: {
      ar: 'يتكامل مفاهيميًا مع منصة مدرستي (نظام التعليم الإلكتروني الوطني).',
      en: 'Conceptually integrates with Madrasati, the national e-learning system.',
    },
  },
  {
    id: 'medical', icon: 'cross', accent: '#0b7a4b', moment: 'hospital',
    url: APP_URLS.medical,
    name: { ar: 'الطبي — كشك الطوارئ', en: 'Medical — ER Kiosk' },
    tagline: {
      ar: 'كسر حاجز الصمت في غرفة الطوارئ',
      en: 'Breaking the silence in the emergency room',
    },
    impactLine: {
      ar: '«في الطوارئ، الثواني تنقذ الأرواح. سِن وورلد يضمن ألا ينتظر مريض أصمّ أحدًا ليفهمه.»',
      en: '"In an emergency, seconds save lives. SignWorld makes sure no Deaf patient ever has to wait for someone to understand them."',
    },
    audience: {
      ar: ['أقسام الطوارئ', 'العيادات', 'الطاقم الطبي', 'تطبيق صحة'],
      en: ['Emergency departments', 'Clinics', 'Clinical staff', 'Seha app'],
    },
    steps: {
      ar: [
        { icon: 'hand', t: 'المريض يوقّع أعراضه أمام الكشك.' },
        { icon: 'doc', t: 'الطبيب يستلم ترجمة عربية فورية للأعراض.' },
        { icon: 'avatar', t: 'ردّ الطبيب يُوقَّع للمريض مباشرة برمز رقمي.' },
        { icon: 'cross', t: 'مصمّم لفرز الطوارئ، حيث انتظار مترجم بشري قد يكلّف حياة.' },
      ],
      en: [
        { icon: 'hand', t: 'The patient signs their symptoms at the kiosk.' },
        { icon: 'doc', t: 'The clinician receives an instant Arabic translation.' },
        { icon: 'avatar', t: "The doctor's reply is signed back to the patient live." },
        { icon: 'cross', t: 'Built for emergency triage, where waiting on a human interpreter can cost lives.' },
      ],
    },
    integration: {
      ar: 'قابل للنشر عبر تطبيق صحة وتكامل وزارة الصحة كرؤية بعيدة المدى.',
      en: 'Deployable via the Seha app / MOH integration as a long-term vision.',
    },
  },
  {
    id: 'children', icon: 'heart', accent: '#5b4ba8', moment: 'family',
    url: APP_URLS.children,
    name: { ar: 'عالم الأطفال', en: 'SignWorld Kids' },
    tagline: {
      ar: 'لغة الإشارة لغةً أولى ممتعة، لا حاجزًا',
      en: 'Sign language as a joyful first language, not a barrier',
    },
    impactLine: {
      ar: '«السنوات الأولى تشكّل كل شيء. سِن وورلد يضمن ألا يعجز والد سامع وطفله الأصمّ عن قول "أحبك".»',
      en: '"The first years of a child\'s life shape everything. SignWorld makes sure a hearing parent and their Deaf child never have to struggle to say \'I love you\' to each other."',
    },
    audience: {
      ar: ['أطفال صمّ', 'آباء سامعون', 'الأسر', 'رياض الأطفال'],
      en: ['Deaf children', 'Hearing parents', 'Families', 'Kindergartens'],
    },
    steps: {
      ar: [
        { icon: 'avatar', t: 'رفيق رمزي متحرّك يعلّم لغة الإشارة السعودية باللعب.' },
        { icon: 'sparkle', t: 'ألعاب قصيرة وقصص موقّعة تُولّد عند الطلب من محرّك التوليد.' },
        { icon: 'users', t: 'يتعلّم الطفل الأصمّ وأسرته السامعة معًا.' },
        { icon: 'heart', t: 'يعالج مشكلة حقيقية: أكثر من 90% من الأطفال الصمّ يولدون لأسر سامعة.' },
      ],
      en: [
        { icon: 'avatar', t: 'An animated companion teaches Saudi Sign Language through play.' },
        { icon: 'sparkle', t: 'Mini-games and signed stories generated on demand by the generation engine.' },
        { icon: 'users', t: 'A Deaf child and their hearing family learn together.' },
        { icon: 'heart', t: 'Tackles a real problem: over 90% of Deaf children are born to hearing families.' },
      ],
    },
    integration: {
      ar: 'يستخدم الجانب التوليدي من العقل لإنتاج قصص ومحتوى موقّع بلا نهاية.',
      en: 'Uses the generation side of the Brain to produce endless new signed stories and content.',
    },
  },
  {
    id: 'publicSafety', icon: 'siren', accent: '#c74a30', moment: 'emergency',
    url: APP_URLS.publicSafety,
    name: { ar: 'السلامة العامة', en: 'Public Safety' },
    tagline: {
      ar: 'لغة الإشارة في خدمات الطوارئ والخدمات الوطنية',
      en: 'Sign language for national emergency and government services',
    },
    impactLine: {
      ar: '«بلاغ الأصمّ يُفهَم في اللحظة نفسها — لا وسيط، لا تأخير.»',
      en: '"A Deaf caller understood the instant they report — no relay, no delay."',
    },
    audience: {
      ar: ['مراكز البلاغات 911 / 937', 'الدفاع المدني', 'البثّ الحكومي', 'حجّاج صمّ'],
      en: ['911 / 937 dispatch', 'Civil Defense', 'Government broadcasts', 'Deaf pilgrims'],
    },
    steps: {
      ar: [
        { icon: 'phone', t: 'المتصل الأصمّ يوقّع عبر كاميرا الهاتف أو يكتب، فيفهمه المستجيب فورًا.' },
        { icon: 'flag', t: 'يمتدّ إلى البثّ الحكومي: إعلانات الصحة والطقس تُوقَّع آليًا مباشرة.' },
        { icon: 'kaaba', t: 'يمتدّ إلى الحج والعمرة: ترجمة فورية بين لغات الإشارة للحجّاج الصمّ.' },
        { icon: 'shield', t: 'موقعك وملفك الطبي وطريقة تواصلك مُرفقة مسبقًا للمستجيب.' },
      ],
      en: [
        { icon: 'phone', t: 'A Deaf caller signs via phone camera or text-chats; dispatch understands instantly.' },
        { icon: 'flag', t: 'Extends to government broadcasts: MOH and weather alerts auto-signed live.' },
        { icon: 'kaaba', t: 'Extends to Hajj & Umrah: real-time translation between sign languages for Deaf pilgrims.' },
        { icon: 'shield', t: 'Your location, medical profile, and comm mode pre-attached for the responder.' },
      ],
    },
    integration: {
      ar: 'ترجمة إشارة مباشرة مدمجة في مكالمات 911 / 937، وتمتدّ إلى البثّ الوطني.',
      en: 'Live sign interpretation integrated into 911 / 937 calls, extending to national broadcasts.',
    },
  },
]

/* ------------------------------- the Brain ------------------------------- */

export const BRAIN = {
  capabilities: [
    {
      id: 'recognition', icon: 'camera',
      dir: { ar: 'إشارة ← نص / صوت', en: 'Sign → Text / Speech' },
      name: { ar: 'التعرّف', en: 'Recognition' },
      desc: {
        ar: 'فيديو مباشر للمُوقِّع يُترجَم إلى نص عربي أو كلام مُركَّب في الوقت الحقيقي.',
        en: 'Real-time video of a signer is translated into Arabic text or synthesized speech.',
      },
    },
    {
      id: 'generation', icon: 'avatar',
      dir: { ar: 'نص / صوت ← إشارة', en: 'Text / Speech → Sign' },
      name: { ar: 'التوليد', en: 'Generation' },
      desc: {
        ar: 'نص أو كلام عربي يُحوَّل إلى تسلسل توقيع برمز رقمي واقعي.',
        en: 'Arabic text or speech is converted into a photorealistic/avatar-based signing sequence.',
      },
    },
    {
      id: 'translation', icon: 'kaaba',
      dir: { ar: 'إشارة ← إشارة', en: 'Sign → Sign' },
      name: { ar: 'الترجمة', en: 'Translation' },
      desc: {
        ar: 'ترجمة لغة الإشارة السعودية من وإلى لغات الإشارة الأخرى — لإتاحة الحج والعمرة لملايين الحجّاج الصمّ.',
        en: 'SSL translated to/from other sign languages — enabling Hajj/Umrah accessibility for millions of Deaf pilgrims.',
      },
    },
    {
      id: 'standardization', icon: 'layers',
      dir: { ar: 'إشارة ← إشارة (توحيد اللهجات)', en: 'Sign → Sign (dialect normalization)' },
      name: { ar: 'التوحيد', en: 'Standardization' },
      desc: {
        ar: 'توحيد الفروق الإقليمية والدولية في التوقيع إلى لغة إشارة سعودية قياسية.',
        en: 'Regional and international signing variants normalized into standard SSL.',
      },
    },
  ],
  architecture: [
    { id: 'pose', icon: 'hand', name: { ar: 'تقدير الوضعية واليدين', en: 'Pose / hand estimation' } },
    { id: 'seq', icon: 'layers', name: { ar: 'محوّل التسلسل (إشارة ↔ نص)', en: 'Sequence transformer (sign ↔ text)' } },
    { id: 'render', icon: 'avatar', name: { ar: 'مُصيّر الحركة والرمز الرقمي', en: '3D avatar / motion renderer' } },
    { id: 'nlu', icon: 'mic', name: { ar: 'طبقة الفهم والتحويل الصوتي العربي', en: 'Arabic NLU / TTS-STT layer' } },
  ],
}

/* ------------------------------- tools registry ------------------------------- */
// kind: 'app' -> a SignWorld flagship app
//       'gov' -> a national service (inline explainer, no route)
//       'resource' -> a community resource
// `route`: an internal path (embedded, same-origin) rendered via <Link>.
// `href`: an external URL (a different app/host) rendered via <a target="_blank">.

export const TOOLS = {
  education: {
    id: 'education', kind: 'app', icon: 'school', accent: '#b9852a', route: '/apps/education/open',
    name: { ar: 'التطبيق التعليمي', en: 'Education app' },
    tagline: { ar: 'مترجم إشارة لكل فصل', en: 'A sign interpreter for every classroom' },
    body: {
      ar: 'يوقّع كلام المعلّم فورًا ويحوّل إشارة الطالب إلى نص وصوت — بدون انتظار مترجم بشري.',
      en: "Signs the teacher's voice live and turns a student's signing into text and speech — no waiting on a human interpreter.",
    },
  },
  medical: {
    id: 'medical', kind: 'app', icon: 'cross', accent: '#0b7a4b', route: '/apps/medical/open',
    name: { ar: 'كشك الطوارئ', en: 'ER Kiosk' },
    tagline: { ar: 'لا صمت في الطوارئ', en: 'No silence in the ER' },
    body: {
      ar: 'كشك مستشفى يترجم إشارة المريض إلى نص فوري للطاقم، ويوقّع رد الطبيب مباشرة.',
      en: "A hospital kiosk that turns a patient's signing into an instant transcript, and signs the clinician's reply back live.",
    },
  },
  children: {
    id: 'children', kind: 'app', icon: 'heart', accent: '#5b4ba8', route: '/apps/children/open',
    name: { ar: 'عالم الأطفال', en: 'SignWorld Kids' },
    tagline: { ar: 'تعلّموا لغة الإشارة معًا', en: 'Learn sign language together' },
    body: {
      ar: 'قصص وألعاب تساعد الطفل الأصمّ وأسرته السامعة على تعلّم لغة الإشارة السعودية بمرح.',
      en: 'Stories and games that help a Deaf child and their hearing family learn Saudi Sign Language, playfully.',
    },
  },
  publicSafety: {
    id: 'publicSafety', kind: 'app', icon: 'siren', accent: '#c74a30', route: '/apps/publicSafety/open',
    name: { ar: 'السلامة العامة', en: 'Public Safety' },
    tagline: { ar: 'بلاغك يُترجم فورًا', en: 'Your report, signed instantly' },
    body: {
      ar: 'يربطك مباشرة بمركز البلاغات ويحوّل إشارتك إلى نص وصوت للمستجيب خلال ثوانٍ.',
      en: 'Connects you directly to dispatch, turning your signing into text and speech for the responder in seconds.',
    },
  },
  hajj: {
    id: 'hajj', kind: 'app', icon: 'kaaba', accent: '#b9852a', href: APP_PWA_URL,
    name: { ar: 'ميسّر الحج والعمرة', en: 'Hajj & Umrah Facilitator' },
    tagline: { ar: 'ترجمة بين لغات الإشارة', en: 'Translate between sign languages' },
    body: {
      ar: 'يترجم بين لغة الإشارة السعودية ولغات الإشارة الدولية للحجّاج والمعتمرين الصمّ.',
      en: 'Translates between Saudi Sign Language and international sign languages for Deaf pilgrims.',
    },
  },

  absher: {
    id: 'absher', kind: 'gov', icon: 'shield', accent: '#0b7a4b',
    name: { ar: 'أبشر', en: 'Absher' },
    tagline: { ar: 'الخدمات الحكومية الرقمية', en: 'Digital government services' },
    body: {
      ar: 'بوابة الخدمات الحكومية الموحّدة.',
      en: 'The unified government services portal.',
    },
    explainer: {
      ar: 'مع سِن وورلد، كل خطوة في أبشر تُشرح بلغة الإشارة قبل أن تبدأ، ويوقّع الرمز الرقمي كل حقل ومتطلّب.',
      en: 'With SignWorld, every Absher step is explained in sign before you begin, and the avatar signs each field and requirement.',
    },
  },
  seha: {
    id: 'seha', kind: 'gov', icon: 'cross', accent: '#0b7a4b',
    name: { ar: 'صحة', en: 'Seha' },
    tagline: { ar: 'الاستشارات الطبية عن بُعد', en: 'Remote medical consultations' },
    body: {
      ar: 'استشارات طبية مرئية.',
      en: 'Video medical consultations.',
    },
    explainer: {
      ar: 'مع سِن وورلد يترجم الرمز الرقمي بينك وبين الطبيب داخل المكالمة، ويصلك ملخّص موقّع بالوصفة.',
      en: 'With SignWorld, the avatar interprets between you and the doctor inside the call, and you receive a signed summary.',
    },
  },
  najiz: {
    id: 'najiz', kind: 'gov', icon: 'building', accent: '#5b4ba8',
    name: { ar: 'ناجز', en: 'Najiz' },
    tagline: { ar: 'الخدمات العدلية والمحاكم', en: 'Justice and court services' },
    body: {
      ar: 'خدمات وزارة العدل.',
      en: 'Ministry of Justice services.',
    },
    explainer: {
      ar: 'مع سِن وورلد تُحجز جلسات المحكمة بمترجم معتمد تلقائيًا، وتُشرح الإجراءات بفيديو موقّع.',
      en: 'With SignWorld, court sessions are auto-booked with a certified interpreter, and procedures are explained in signed video.',
    },
  },

  interpreters: {
    id: 'interpreters', kind: 'resource', icon: 'users', accent: '#5b4ba8',
    name: { ar: 'دليل المترجمين المعتمدين', en: 'Certified Interpreter Directory' },
    tagline: { ar: 'احجز مترجمًا بشريًا للمواقف الحرجة', en: 'Book a human interpreter for critical moments' },
    body: {
      ar: 'دليل وطني لمترجمي لغة الإشارة السعودية المعتمدين — للمحكمة، والإجراءات الطبية، ومقابلات العمل.',
      en: 'A national directory of certified Saudi Sign Language interpreters — for court, medical procedures, and job interviews.',
    },
  },
  deafAssociation: {
    id: 'deafAssociation', kind: 'resource', icon: 'building', accent: '#5b4ba8',
    name: { ar: 'الجمعية السعودية للصم', en: 'Saudi Deaf Association' },
    tagline: { ar: 'مجتمع ودعم ومناصرة', en: 'Community, support, and advocacy' },
    body: {
      ar: 'منظمة أهلية تقدّم برامج مجتمعية ودعمًا قانونيًا وتوعويًا لأفراد المجتمع الأصمّ وأسرهم.',
      en: 'A civil-society organization offering community programs, legal support, and advocacy for Deaf individuals and families.',
    },
  },
  vrs: {
    id: 'vrs', kind: 'resource', icon: 'phone', accent: '#c74a30',
    name: { ar: 'خدمة الاتصال المرئي (VRS)', en: 'Video Relay Service (VRS)' },
    tagline: { ar: 'اتصل بأي جهة عبر مترجم فيديو', en: 'Call anyone through a video interpreter' },
    body: {
      ar: 'تتيح إجراء مكالمة هاتفية عادية عبر مترجم إشارة مرئي مباشر.',
      en: 'Lets you place a normal phone call through a live video sign interpreter.',
    },
  },
}

/* ------------------------------- life-moment groupings ------------------------------- */

export const MOMENTS = [
  {
    id: 'school', icon: 'school',
    title: { ar: 'في المدرسة', en: 'At school' },
    body: {
      ar: 'من الحصة الدراسية إلى سؤال سريع لمعلّم — أدوات تجعل الفصل مفهومًا للجميع.',
      en: 'From the lesson itself to a quick question for a teacher — tools that make the classroom legible to everyone.',
    },
    tools: ['education', 'interpreters'],
  },
  {
    id: 'hospital', icon: 'cross',
    title: { ar: 'في المستشفى', en: 'At the hospital' },
    body: {
      ar: 'لحظات لا تحتمل سوء الفهم — لوصف الأعراض والتواصل مع الطاقم الطبي فورًا.',
      en: "Moments that can't afford misunderstanding — for describing symptoms and reaching clinical staff instantly.",
    },
    tools: ['medical', 'seha', 'interpreters', 'vrs'],
  },
  {
    id: 'emergency', icon: 'siren',
    title: { ar: 'في حالة طارئة', en: 'In an emergency' },
    body: {
      ar: 'عندما تُحسب الثواني — تواصل مباشر وموقّع مع خدمات الطوارئ الوطنية.',
      en: 'When seconds count — direct, signed communication with national emergency services.',
    },
    tools: ['publicSafety', 'vrs'],
  },
  {
    id: 'family', icon: 'heart',
    title: { ar: 'تربية طفل أصمّ', en: 'Raising a Deaf child' },
    body: {
      ar: 'أكثر من 90% من الأطفال الصمّ يولدون لأسر سامعة — أدوات ومجتمع لتعلّم لغة الإشارة معًا.',
      en: 'Over 90% of Deaf children are born to hearing families — tools and community to learn sign language together.',
    },
    tools: ['children', 'deafAssociation'],
  },
  {
    id: 'employment', icon: 'briefcase',
    title: { ar: 'العمل والتوظيف', en: 'Work & employment' },
    body: {
      ar: 'مقابلة عمل، اجتماع، أو إجراء رسمي — دعم لتواصل متكافئ في مكان العمل.',
      en: 'A job interview, a meeting, an official procedure — support for equal communication at work.',
    },
    tools: ['interpreters', 'najiz', 'absher'],
  },
  {
    id: 'everyday', icon: 'users',
    title: { ar: 'الحياة اليومية', en: 'Everyday life' },
    body: {
      ar: 'مكالمة، موعد، أو محادثة عابرة — أدوات للتواصل خارج المواقف الحرجة.',
      en: 'A phone call, an appointment, a passing conversation — tools for outside critical moments.',
    },
    tools: ['vrs', 'absher', 'deafAssociation'],
  },
  {
    id: 'hajj', icon: 'kaaba',
    title: { ar: 'الحج والعمرة', en: 'Hajj & Umrah' },
    body: {
      ar: 'حاجّ أصمّ من خارج المملكة — ترجمة فورية بين لغات الإشارة المختلفة.',
      en: 'A Deaf pilgrim from outside the Kingdom — real-time translation between different sign languages.',
    },
    tools: ['hajj', 'publicSafety', 'vrs'],
  },
]

/* ------------------------------- employer & school toolkit ------------------------------- */

export const TOOLKIT = {
  sectors: [
    { id: 'school', ar: 'مدرسة / جامعة', en: 'School / university' },
    { id: 'hospital', ar: 'مستشفى / جهة صحية', en: 'Hospital / health provider' },
    { id: 'ministry', ar: 'جهة حكومية', en: 'Government body' },
    { id: 'private', ar: 'قطاع خاص', en: 'Private sector' },
    { id: 'ngo', ar: 'جمعية / منظمة أهلية', en: 'NGO / non-profit' },
  ],
  needs: {
    ar: [
      { id: 'support', label: 'دعم إتاحة عام واستشارة' },
      { id: 'interpreters', label: 'طلب مترجمين بالجملة' },
      { id: 'widget', label: 'تضمين أداة سِن وورلد في خدمتنا' },
      { id: 'training', label: 'تدريب فريق العمل' },
      { id: 'kiosk', label: 'نشر كشك / جهاز لوحي' },
    ],
    en: [
      { id: 'support', label: 'General accessibility support & consultation' },
      { id: 'interpreters', label: 'Bulk interpreter requests' },
      { id: 'widget', label: 'Embed the SignWorld widget in our service' },
      { id: 'training', label: 'Staff training' },
      { id: 'kiosk', label: 'Deploy a kiosk / tablet' },
    ],
  },
  widgetSnippet: `<script src="https://cdn.signworld.sa/widget.js" defer></script>
<div data-signworld-widget data-mode="sign2text" data-lang="ar"></div>`,
  integrationCode: `import { SignWorld } from '@signworld/sdk'

const brain = new SignWorld({ apiKey: 'sk_live_…' })
await brain.sign2text(videoStream)   // -> Arabic transcript`,
}

/* ------------------------------- widget demo ------------------------------- */

export const WIDGET = {
  demoScript: {
    ar: [
      'السلام عليكم.',
      'أحتاج مساعدة في هذه المعاملة.',
      'هل يمكنكم شرح الخطوات؟',
      'شكرًا جزيلًا.',
    ],
    en: [
      'Hello.',
      'I need help with this transaction.',
      'Could you explain the steps?',
      'Thank you very much.',
    ],
  },
  phrases: {
    ar: ['كيف أكمل الطلب؟', 'أين المستندات المطلوبة؟', 'أنا أصمّ، أتواصل بالإشارة', 'متى يكون الردّ؟'],
    en: ['How do I complete the request?', 'Where are the required documents?', 'I am Deaf, I sign', 'When will I get a reply?'],
  },
  configs: [
    { id: 'theme', ar: 'السمة', en: 'Theme', options: [{ id: 'light', ar: 'فاتحة', en: 'Light' }, { id: 'dark', ar: 'داكنة', en: 'Dark' }] },
    { id: 'lang', ar: 'اللغة', en: 'Language', options: [{ id: 'ar', ar: 'العربية', en: 'Arabic' }, { id: 'en', ar: 'الإنجليزية', en: 'English' }] },
    { id: 'size', ar: 'الحجم', en: 'Size', options: [{ id: 'compact', ar: 'مدمج', en: 'Compact' }, { id: 'full', ar: 'كامل', en: 'Full' }] },
  ],
}

/* ------------------------------- impact / news / faq ------------------------------- */

export const IMPACT = [
  { value: '1,200+', label: { ar: 'فصل دراسي متصل', en: 'classrooms connected' } },
  { value: '40+', label: { ar: 'كشك طوارئ', en: 'ER kiosks' } },
  { value: '24/7', label: { ar: 'تغطية الطوارئ', en: 'emergency coverage' } },
  { value: '4', label: { ar: 'تطبيقات على محرّك واحد', en: 'apps on one engine' } },
  { value: '480K+', label: { ar: 'مستفيد محتمل من المجتمع الأصمّ', en: 'potential Deaf beneficiaries' } },
]

export const NEWS = [
  {
    date: { ar: 'سبتمبر 2026', en: 'September 2026' },
    tag: { ar: 'إطلاق', en: 'Launch' },
    title: { ar: 'الكشف عن منصة سِن وورلد كنموذج مفاهيمي وطني', en: 'SignWorld unveiled as a national concept platform' },
    body: {
      ar: 'عرض أوّل لمحرّك موحّد للغة الإشارة السعودية مع أربعة تطبيقات رائدة، ضمن هاكاثون الإعاقة.',
      en: 'First showing of a unified Saudi Sign Language engine with four flagship apps, at the disability hackathon.',
    },
  },
  {
    date: { ar: 'سبتمبر 2026', en: 'September 2026' },
    tag: { ar: 'صحة', en: 'Health' },
    title: { ar: 'تصوّر لنشر كشك الطوارئ في أقسام مختارة', en: 'ER Kiosk envisioned for selected departments' },
    body: {
      ar: 'سيناريو تكامل مع تطبيق صحة لتوفير ترجمة فورية لمرضى الصمّ في الفرز.',
      en: 'An integration scenario with the Seha app to give Deaf patients instant interpretation at triage.',
    },
  },
  {
    date: { ar: 'سبتمبر 2026', en: 'September 2026' },
    tag: { ar: 'الحج', en: 'Hajj' },
    title: { ar: 'ميسّر الحج: ترجمة بين لغات الإشارة للحجّاج الصمّ', en: 'Hajj Facilitator: sign-to-sign translation for Deaf pilgrims' },
    body: {
      ar: 'تصوّر لخدمة تترجم بين لغة الإشارة السعودية والدولية أثناء المشاعر.',
      en: 'A concept service translating between Saudi and international sign languages across the holy sites.',
    },
  },
]

export const FAQ = [
  {
    q: { ar: 'هل هذا منتج حكومي رسمي؟', en: 'Is this an official government product?' },
    a: {
      ar: 'لا. سِن وورلد نموذج مفاهيمي بُني ضمن هاكاثون. أي إشارة إلى رؤية 2030 أو برنامج جودة الحياة أو سدايا هي توضيحية لبيان الفكرة، لا شراكة قائمة.',
      en: 'No. SignWorld is a concept prototype built for a hackathon. Any reference to Vision 2030, the Quality of Life Program, or SDAIA is illustrative of the idea, not an existing partnership.',
    },
  },
  {
    q: { ar: 'أي لغة إشارة يدعمها؟', en: 'Which sign language does it support?' },
    a: {
      ar: 'لغة الإشارة السعودية (SSL) أساسًا، مع ترجمة تصوّرية من وإلى لغات الإشارة الدولية للحج والعمرة.',
      en: 'Saudi Sign Language (SSL) primarily, with conceptual translation to and from international sign languages for Hajj and Umrah.',
    },
  },
  {
    q: { ar: 'هل يُخزَّن الفيديو الخاص بي؟', en: 'Is my video stored?' },
    a: {
      ar: 'في هذا النموذج لا تُرسَل أي بيانات إلى خادم؛ كل شيء يعمل محليًا في المتصفح والعرض محاكاة.',
      en: 'In this prototype nothing is sent to a server; everything runs locally in the browser and the demo is simulated.',
    },
  },
  {
    q: { ar: 'كيف أدمج الأداة في خدمتي؟', en: 'How do I integrate the widget?' },
    a: {
      ar: 'عبر بوابة المؤسسات: سطر واحد لتضمين الأداة، أو حزمة SDK للمطوّرين. راجع صفحة الأداة والبوابة.',
      en: 'Through the institutions portal: a one-line embed, or an SDK for developers. See the Widget and Toolkit pages.',
    },
  },
  {
    q: { ar: 'هل هو مجاني؟', en: 'Is it free?' },
    a: {
      ar: 'التصوّر أن يكون العقل بنية وطنية مُتاحة كخدمة عامة، مع طبقات استخدام للمؤسسات.',
      en: 'The vision is for the Brain to be national infrastructure offered as a public service, with usage tiers for institutions.',
    },
  },
]

/* ============================================================================
   UI COPY
   ========================================================================== */

export const CONTENT = {
  ar: {
    nav: {
      brain: 'العقل', apps: 'التطبيقات', directory: 'الدليل', toolkit: 'للمؤسسات', widget: 'الأداة',
      emergency: 'في حالة طارئة', getApp: 'حمّل التطبيق',
    },
    footer: {
      tagline: 'بنية وطنية موحّدة للغة الإشارة السعودية.',
      colPlatform: 'المنصة', colApps: 'التطبيقات', colInstitutions: 'المؤسسات', colAbout: 'عن',
      brain: 'العقل', directory: 'الدليل الموقفي', widget: 'الأداة القابلة للتضمين',
      education: 'التعليم', medical: 'الطبي', children: 'الأطفال', publicSafety: 'السلامة العامة',
      toolkit: 'بوابة المؤسسات', interpreters: 'طلب مترجمين', integrate: 'التكامل والـ SDK',
      about: 'عن المنصة', impact: 'الأثر', news: 'الأخبار', faq: 'أسئلة شائعة', getApp: 'حمّل التطبيق',
      disclaimer: 'سِن وورلد نموذج مفاهيمي لهاكاثون. ليس منتجًا حكوميًا رسميًا. التوافق مع رؤية 2030 وبرنامج جودة الحياة وسدايا توضيحي.',
      rights: 'جميع المحتويات توضيحية.',
    },
    landing: {
      heroEyebrow: 'مبادرة وطنية · مدعومة مفاهيميًا من سدايا',
      heroTitle: 'عقل وطني واحد للغة الإشارة السعودية',
      heroSub: 'لا نبني تطبيقًا، بل بنية تحتية: نظامًا عصبيًا رقميًا للغة الإشارة، يُبنى عليه كل تطبيق ومستشفى ومدرسة ووزارة ومطوّر في المملكة.',
      ctaApps: 'استكشف التطبيقات',
      ctaGetApp: 'حمّل تطبيق الجوّال',
      brainTitle: 'العقل: لغة الإشارة كخدمة',
      brainSub: 'نموذج أساس متعدّد الوسائط، يُقدَّم كطبقة واجهات وطنية. أربع قدرات جوهرية تشغّل كل شيء.',
      brainMore: 'اقرأ عن العقل بالتفصيل',
      appsTitle: 'أربعة تطبيقات رائدة — بمحرّك واحد',
      appsSub: 'محرّك واحد، أربعة وجوه. كل تطبيق واجهة رفيعة تستدعي نفس الواجهة البرمجية.',
      openApp: 'افتح التطبيق',
      learnMore: 'اعرف المزيد',
      directoryTitle: 'تصفّح حسب موقفك',
      directorySub: 'لا حسب الجهة، بل حسب اللحظة: المدرسة، المستشفى، الطوارئ، تربية طفل أصمّ، العمل، الحياة اليومية، الحج.',
      directoryCta: 'افتح الدليل الكامل',
      widgetTitle: 'ضمّن سِن وورلد في خدمتك',
      widgetSub: 'نفس المحرّك، كأداة قابلة للتضمين بسطر واحد — لأي بوابة أو خدمة حكومية أو خاصة.',
      widgetCta: 'جرّب الأداة',
      instTitle: 'للمؤسسات',
      instSub: 'بوابة للمدارس والمستشفيات والوزارات: اطلب دعم إتاحة، أو مترجمين بالجملة، أو ضمّن الأداة.',
      instCta: 'افتح بوابة المؤسسات',
      impactTitle: 'الأثر المتصوَّر',
    },
    brain: {
      title: 'العقل: نموذج أساس وطني للغة الإشارة السعودية',
      visionTitle: 'الرؤية',
      vision: 'المملكة موطن لمئات الآلاف من الصمّ وضعاف السمع، ومع ذلك تظلّ لغة الإشارة السعودية من أقلّ اللغات موارد في التحوّل الرقمي. لا يوجد نظام ذكاء اصطناعي وطني موحّد يفهمها أو يتحدّث بها أو يجسّرها إلى العالم السامع. سِن وورلد يقترح المعاملة نفسها التي حظيت بها اللغة العربية: نموذج أساس واحد — «العقل» — يُبنى عليه الجميع بدل إعادة اختراع أدوات مجزّأة منخفضة الجودة.',
      slaas: 'لغة الإشارة كخدمة (SLaaS)',
      slaasBody: 'العقل مُتاح كطبقة واجهات برمجية وطنية، تُبنى عليها كل التطبيقات والمؤسسات.',
      capabilitiesTitle: 'القدرات الأربع الجوهرية',
      archTitle: 'البنية المفاهيمية',
      archSub: 'العقل يجلس فوق مجموعة نماذج متخصّصة، مدرّبة على مدوّنة وطنية للغة الإشارة السعودية (مصادر جماعية + شراكات مؤسسية).',
      archBrain: 'عقل سِن وورلد',
      archCorpus: 'المدوّنة والبيانات الوطنية للغة الإشارة السعودية',
      oneEngineTitle: 'محرّك واحد، كل هذه الأدوات',
      oneEngineBody: 'كل تطبيق في المنصة مبني على نفس الأساس المعرفي، بجودة وثبات متسقين.',
    },
    apps: {
      title: 'التطبيقات الرائدة',
      sub: 'محرّك واحد، أربعة وجوه. كل تطبيق واجهة رفيعة مبنية لغرض محدّد، تستدعي نفس واجهة سِن وورلد البرمجية.',
      openApp: 'افتح التطبيق',
      details: 'التفاصيل',
    },
    appDetail: {
      openApp: 'افتح التطبيق',
      opensNew: 'يفتح في تبويب جديد',
      howTitle: 'كيف يعمل',
      whoTitle: 'لمن هذا التطبيق',
      integrationTitle: 'التكامل المفاهيمي',
      relatedMoment: 'اطّلع على هذا الموقف في الدليل',
      backToApps: 'كل التطبيقات',
      brainNote: 'مبني على عقل سِن وورلد',
    },
    directory: {
      title: 'الدليل الموقفي',
      sub: 'تصفّح أدوات لغة الإشارة السعودية حسب لحظة حياتك، لا حسب اسم الجهة.',
      toolsCount: 'أداة',
      railTitle: 'لست متأكدًا من أين تبدأ؟',
      railBody: 'حمّل تطبيق الجوّال ليقودك، أو تواصل معنا لمؤسستك.',
      railApp: 'حمّل التطبيق',
      railContact: 'تواصل معنا',
      momentBack: 'كل المواقف',
      emergencyCallout: 'حالة طارئة الآن؟ افتح صفحة الطوارئ',
      appBadge: 'تطبيق سِن وورلد',
      govBadge: 'خدمة حكومية',
      resourceBadge: 'مصدر مجتمعي',
      openApp: 'افتح التطبيق',
      howHelps: 'كيف يساعد سِن وورلد هنا',
    },
    toolkit: {
      title: 'بوابة الإتاحة للمؤسسات',
      sub: 'للمدارس والجامعات والمستشفيات والوزارات والقطاع الخاص: اطلب دعم إتاحة لغة الإشارة، أو مترجمين بالجملة، أو ضمّن محرّك سِن وورلد في خدمتك.',
      formTitle: 'اطلب دعمًا',
      orgLabel: 'اسم الجهة',
      sectorLabel: 'القطاع',
      needsLabel: 'ما الذي تحتاجه؟',
      contactLabel: 'بريد التواصل',
      notesLabel: 'ملاحظات (اختياري)',
      submit: 'إرسال الطلب',
      successTitle: 'استلمنا طلبك',
      successBody: 'هذا نموذج تجريبي — لم يُرسَل شيء إلى خادم. يمكنك تنزيل نسخة من الطلب.',
      downloadJson: 'تنزيل الطلب (JSON)',
      reset: 'طلب آخر',
      widgetTitle: 'ضمّن الأداة بسطر واحد',
      widgetBody: 'انسخ المقتطف وضعه في صفحة خدمتك. للمطوّرين: حزمة SDK كاملة.',
      copy: 'نسخ',
      copied: 'تم النسخ',
      tryWidget: 'جرّب الأداة الحيّة',
      bulkTitle: 'طلب مترجمين بالجملة',
      bulkCount: 'عدد المترجمين',
      bulkLangs: 'أزواج اللغة',
      bulkDates: 'الفترة الزمنية',
      bulkSubmit: 'أرسل الطلب',
    },
    widget: {
      title: 'أداة سِن وورلد القابلة للتضمين',
      sub: 'نفس محرّك العقل، في إطار قابل للتضمين بسطر واحد. أي جهة تستطيع إضافة ترجمة لغة الإشارة إلى خدمتها.',
      demoTitle: 'عرض حيّ',
      demoNote: 'هذا الإطار هو ما تضمّنه المؤسسة. التعرّف هنا محاكاة تجريبية.',
      modeSign: 'إشارة ← نص',
      modeText: 'نص ← إشارة',
      record: 'ابدأ',
      stop: 'إيقاف',
      transcript: 'النص',
      textPlaceholder: 'اكتب نصًا ليوقّعه الرمز الرقمي…',
      sign: 'وقّع',
      configTitle: 'خيارات التضمين',
      embedTitle: 'مقتطف التضمين',
      integrateTitle: 'التكامل في ثلاثة أسطر',
      copy: 'نسخ',
      copied: 'تم النسخ',
    },
    emergency: {
      eyebrow: 'في حالة طارئة',
      title: 'إذا كنت أصمّ وتحتاج مساعدة طارئة في المملكة',
      body: 'سِن وورلد يربطك مباشرة بمركز البلاغات (911 / 937) عبر كاميرا الهاتف أو المحادثة النصية، ويُرفق موقعك وملفك الطبي وطريقة تواصلك المفضّلة مسبقًا — فيعرف المستجيب كيف يتحدّث معك قبل أن يبدأ.',
      openSos: 'افتح استغاثة سِن وورلد',
      openSosNote: 'يفتح تطبيق الجوّال',
      attachedTitle: 'ما يُرفق تلقائيًا',
      attached: ['موقعك الحالي', 'ملفك الطبي (الحساسية، الأدوية، فصيلة الدم)', 'طريقة تواصلك: لغة الإشارة السعودية', 'رسالة نصية إلى جهات اتصال الطوارئ'],
      waitTitle: 'ماذا تفعل حتى وصول الفريق',
      wait: 'ابقَ في مكان آمن وواضح. لا تتحرّك إن كنت مصابًا. أبقِ الجهاز معك وموجّهًا نحوك. الفريق في الطريق.',
      noPhoneTitle: 'لا تملك هاتفًا ذكيًا؟',
      noPhoneBody: 'استخدم خدمة الاتصال المرئي (VRS) أو خدمة الترحيل النصي للتواصل مع الطوارئ عبر مترجم.',
    },
    about: {
      title: 'عن سِن وورلد',
      visionTitle: 'الرؤية',
      vision: 'سِن وورلد نموذج مفاهيمي لبنية تحتية وطنية للغة الإشارة السعودية، تجعل المملكة أوّل دولة في العالم بمنصّة ذكاء اصطناعي للغة الإشارة بمستوى نموذج أساس تستضيفها الدولة.',
      alignTitle: 'التوافق',
      align: 'يتوافق مفاهيميًا مع رؤية 2030 وبرنامج جودة الحياة وتفويضات دمج ذوي الإعاقة، ومع سدايا كجهة راعية مفاهيمية لبنية الذكاء الاصطناعي.',
      impactTitle: 'الأثر المتصوَّر',
      newsTitle: 'أخبار',
      faqTitle: 'أسئلة شائعة',
      creditsTitle: 'شكر',
      credits: 'بُني ضمن هاكاثون لإتاحة لغة الإشارة. كل البيانات والأرقام توضيحية.',
    },
    getApp: {
      eyebrow: 'تطبيق الجوّال',
      title: 'سِن وورلد في جيبك',
      sub: 'ترجمة فورية، حجز مترجمين، استغاثة طوارئ، ومساعد نماذج — كلها في تطبيق واحد يعمل دون اتصال.',
      features: [
        { icon: 'camera', t: 'إشارة إلى نص وصوت فورًا بالكاميرا' },
        { icon: 'avatar', t: 'نص إلى إشارة برمز رقمي، بسرعة وأسلوب قابلين للضبط' },
        { icon: 'sos', t: 'استغاثة طوارئ بلمسة، مع موقعك وملفك الطبي' },
        { icon: 'calendar', t: 'حجز مترجم معتمد للمحكمة أو المستشفى أو المقابلة' },
        { icon: 'doc', t: 'مساعد نماذج: امسح نموذجًا واحصل على شرح موقّع' },
        { icon: 'chat', t: 'محادثة الصم ومجتمع لغة الإشارة السعودية' },
      ],
      openWeb: 'افتح تطبيق الويب',
      storeNote: 'روابط المتاجر توضيحية في هذا النموذج',
      qrNote: 'امسح للفتح على الجوّال',
    },
    notFound: {
      title: 'الصفحة غير موجودة',
      body: 'الرابط الذي طلبته غير متاح.',
      home: 'العودة للرئيسية',
    },
    widgetDemo: {
      idle: 'جاهز', signing: 'يُترجم', reading: 'يقرأ الإشارة…',
      cameraDenied: 'تعذّر الوصول إلى الكاميرا — يحتاج المتصفح إذنًا للوصول إليها.',
      retryCamera: 'إعادة محاولة فتح الكاميرا',
      notFound: 'لم يتم العثور على الجملة — جرّب إحدى العبارات أدناه.',
    },
  },

  en: {
    nav: {
      brain: 'The Brain', apps: 'Apps', directory: 'Directory', toolkit: 'For Institutions', widget: 'Widget',
      emergency: 'In an emergency', getApp: 'Get the app',
    },
    footer: {
      tagline: 'A unified national foundation for Saudi Sign Language.',
      colPlatform: 'Platform', colApps: 'Apps', colInstitutions: 'Institutions', colAbout: 'About',
      brain: 'The Brain', directory: 'Situational directory', widget: 'Embeddable widget',
      education: 'Education', medical: 'Medical', children: 'Children', publicSafety: 'Public Safety',
      toolkit: 'Institutions portal', interpreters: 'Request interpreters', integrate: 'Integration & SDK',
      about: 'About the platform', impact: 'Impact', news: 'News', faq: 'FAQ', getApp: 'Get the app',
      disclaimer: 'SignWorld is a concept prototype for a hackathon. Not an official government product. Alignment with Vision 2030, the Quality of Life Program, and SDAIA is illustrative.',
      rights: 'All content is illustrative.',
    },
    landing: {
      heroEyebrow: 'A national initiative · conceptually powered by SDAIA',
      heroTitle: 'One national brain for Saudi Sign Language',
      heroSub: 'We are not building an app. We are building infrastructure: a digital nervous system for sign language that every app, hospital, school, ministry, and developer in the Kingdom can build on.',
      ctaApps: 'Explore the apps',
      ctaGetApp: 'Get the mobile app',
      brainTitle: 'The Brain: Sign Language as a Service',
      brainSub: 'A multimodal foundation model, offered as a national API layer. Four core capabilities power everything.',
      brainMore: 'Read about the Brain in full',
      appsTitle: 'Four flagship apps — one engine',
      appsSub: 'One engine, four faces. Each app is a thin UI calling the same API.',
      openApp: 'Open app',
      learnMore: 'Learn more',
      directoryTitle: 'Browse by your situation',
      directorySub: 'Not by org chart, but by moment: school, hospital, emergency, raising a Deaf child, work, everyday life, Hajj.',
      directoryCta: 'Open the full directory',
      widgetTitle: 'Embed SignWorld in your service',
      widgetSub: 'The same engine, as a one-line embeddable widget — for any portal or government or private service.',
      widgetCta: 'Try the widget',
      instTitle: 'For institutions',
      instSub: 'A portal for schools, hospitals, and ministries: request accessibility support, bulk interpreters, or embed the widget.',
      instCta: 'Open the institutions portal',
      impactTitle: 'Envisioned impact',
    },
    brain: {
      title: 'The Brain: a national foundation model for Saudi Sign Language',
      visionTitle: 'The vision',
      vision: 'Saudi Arabia is home to hundreds of thousands of Deaf and hard-of-hearing citizens, yet SSL remains one of the most under-resourced languages in the Kingdom\'s digital transformation. There is no unified national AI system that understands it, speaks it, or bridges it to the hearing world. SignWorld proposes the same treatment given to Arabic: a single foundation model — "the Brain" — that everyone builds on, instead of reinventing fragmented, low-quality tools.',
      slaas: 'Sign Language as a Service (SLaaS)',
      slaasBody: 'The Brain is offered as a national API layer that every application and institution builds on top of.',
      capabilitiesTitle: 'Four core capabilities',
      archTitle: 'Conceptual architecture',
      archSub: 'The Brain sits over a set of specialized models, trained on a national SSL corpus (crowdsourced + institutional partnerships).',
      archBrain: 'SignWorld Brain',
      archCorpus: 'National SSL dataset & corpus',
      oneEngineTitle: 'One engine, all these tools',
      oneEngineBody: 'Every app on the platform is built on the same underlying capability, with consistent quality and reliability.',
    },
    apps: {
      title: 'The flagship apps',
      sub: 'One engine, four faces. Each app is a thin, purpose-built UI calling the same SignWorld API.',
      openApp: 'Open app',
      details: 'Details',
    },
    appDetail: {
      openApp: 'Open the app',
      opensNew: 'opens in a new tab',
      howTitle: 'How it works',
      whoTitle: "Who it's for",
      integrationTitle: 'Conceptual integration',
      relatedMoment: 'See this moment in the directory',
      backToApps: 'All apps',
      brainNote: 'Built on the SignWorld Brain',
    },
    directory: {
      title: 'Situational directory',
      sub: 'Browse Saudi Sign Language tools by your life moment, not by org name.',
      toolsCount: 'tools',
      railTitle: 'Not sure where to start?',
      railBody: 'Get the mobile app to guide you, or contact us for your institution.',
      railApp: 'Get the app',
      railContact: 'Contact us',
      momentBack: 'All moments',
      emergencyCallout: 'An emergency right now? Open the emergency page',
      appBadge: 'SignWorld app',
      govBadge: 'Government service',
      resourceBadge: 'Community resource',
      openApp: 'Open app',
      howHelps: 'How SignWorld helps here',
    },
    toolkit: {
      title: 'Institutions accessibility portal',
      sub: 'For schools, universities, hospitals, ministries, and the private sector: request sign-language accessibility support, bulk interpreters, or embed the SignWorld engine in your service.',
      formTitle: 'Request support',
      orgLabel: 'Organization name',
      sectorLabel: 'Sector',
      needsLabel: 'What do you need?',
      contactLabel: 'Contact email',
      notesLabel: 'Notes (optional)',
      submit: 'Send request',
      successTitle: 'Request received',
      successBody: 'This is a demo form — nothing was sent to a server. You can download a copy of the request.',
      downloadJson: 'Download request (JSON)',
      reset: 'Another request',
      widgetTitle: 'Embed the widget in one line',
      widgetBody: 'Copy the snippet into your service page. For developers: a full SDK.',
      copy: 'Copy',
      copied: 'Copied',
      tryWidget: 'Try the live widget',
      bulkTitle: 'Bulk interpreter request',
      bulkCount: 'Number of interpreters',
      bulkLangs: 'Language pairs',
      bulkDates: 'Date range',
      bulkSubmit: 'Send request',
    },
    widget: {
      title: 'The embeddable SignWorld widget',
      sub: 'The same Brain engine, in a frame you embed with one line. Any service can add sign-language interpretation.',
      demoTitle: 'Live demo',
      demoNote: 'This frame is what an institution embeds. Recognition here is simulated.',
      modeSign: 'Sign → Text',
      modeText: 'Text → Sign',
      record: 'Start',
      stop: 'Stop',
      transcript: 'Transcript',
      textPlaceholder: 'Type text for the avatar to sign…',
      sign: 'Sign it',
      configTitle: 'Embed options',
      embedTitle: 'Embed snippet',
      integrateTitle: 'Integrate in three lines',
      copy: 'Copy',
      copied: 'Copied',
    },
    emergency: {
      eyebrow: 'In an emergency',
      title: 'If you are Deaf and need emergency help in Saudi Arabia',
      body: 'SignWorld connects you directly to dispatch (911 / 937) via phone camera or text chat, and pre-attaches your location, medical profile, and preferred communication mode — so the responder knows how to talk to you before they start.',
      openSos: 'Open SignWorld SOS',
      openSosNote: 'opens the mobile app',
      attachedTitle: 'What is attached automatically',
      attached: ['Your current location', 'Your medical profile (allergies, medications, blood type)', 'Your comm mode: Saudi Sign Language', 'A text message to your emergency contacts'],
      waitTitle: 'What to do until the team arrives',
      wait: 'Stay somewhere safe and visible. Don\'t move if you\'re injured. Keep the device with you, facing you. Help is on the way.',
      noPhoneTitle: 'No smartphone?',
      noPhoneBody: 'Use the Video Relay Service (VRS) or text relay to reach emergency services through an interpreter.',
    },
    about: {
      title: 'About SignWorld',
      visionTitle: 'The vision',
      vision: 'SignWorld is a concept prototype for national infrastructure for Saudi Sign Language, positioning the Kingdom as the first nation in the world with a state-hosted, foundation-model-grade sign language AI platform.',
      alignTitle: 'Alignment',
      align: 'Conceptually aligned with Vision 2030, the Quality of Life Program, and disability inclusion mandates, with SDAIA as conceptual steward of the AI infrastructure.',
      impactTitle: 'Envisioned impact',
      newsTitle: 'News',
      faqTitle: 'FAQ',
      creditsTitle: 'Credits',
      credits: 'Built for a sign-language accessibility hackathon. All data and figures are illustrative.',
    },
    getApp: {
      eyebrow: 'The mobile app',
      title: 'SignWorld in your pocket',
      sub: 'Instant translation, interpreter booking, emergency SOS, and a form assistant — all in one offline-capable app.',
      features: [
        { icon: 'camera', t: 'Sign to text and speech, instantly, with the camera' },
        { icon: 'avatar', t: 'Text to sign with an avatar — adjustable speed and style' },
        { icon: 'sos', t: 'One-tap emergency SOS with your location and medical profile' },
        { icon: 'calendar', t: 'Book a certified interpreter for court, hospital, or interviews' },
        { icon: 'doc', t: 'Form assistant: scan a form, get it explained in sign' },
        { icon: 'chat', t: 'Deaf Chat and the Saudi Sign Language community' },
      ],
      openWeb: 'Open the web app',
      storeNote: 'Store links are illustrative in this prototype',
      qrNote: 'Scan to open on mobile',
    },
    notFound: {
      title: 'Page not found',
      body: 'The link you requested is not available.',
      home: 'Back to home',
    },
    widgetDemo: {
      idle: 'Idle', signing: 'Signing', reading: 'Reading sign…',
      cameraDenied: 'Camera unavailable — the browser needs permission to access it.',
      retryCamera: 'Retry camera access',
      notFound: 'Sentence not found — try one of the phrases below.',
    },
  },
}
