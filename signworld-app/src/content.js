/* ============================================================================
   SignWorld — all hardcoded, bilingual ({ ar, en }) app data.
   Nothing here talks to a backend. Gov/partner services are framed as
   conceptual integrations, same posture as the old SignWorld hub.
   ========================================================================== */

/* ------------------------------- services registry ------------------------------- */
// kind: 'app'  = an in-app SignWorld tool (opens a screen)
//       'gov'   = a national/government service (opens a ServiceDetail explainer)
//       'resource' = a community/support resource

export const SERVICES = {
  sign2text: {
    id: 'sign2text', kind: 'app', icon: 'camera', accent: '#b9852a', category: 'translate',
    situations: ['everyday', 'hospital', 'emergency'],
    name: { ar: 'إشارة إلى نص', en: 'Sign to Text' },
    tagline: { ar: 'وجّه الكاميرا، واقرأ الترجمة فورًا', en: 'Point the camera, read the translation live' },
    body: {
      ar: 'يحوّل الرمز الرقمي إشارتك إلى نص عربي وصوت في الوقت الحقيقي — عند أي كاونتر أو مكتب خدمة.',
      en: 'The Brain turns your signing into Arabic text and speech in real time — at any counter or service desk.',
    },
    cta: { ar: 'افتح المترجم', en: 'Open translator' },
    target: { tab: 'translate', mode: 'sign2text' },
  },
  text2sign: {
    id: 'text2sign', kind: 'app', icon: 'avatar', accent: '#2f7d95', category: 'translate',
    situations: ['everyday', 'school'],
    name: { ar: 'نص إلى إشارة', en: 'Text to Sign' },
    tagline: { ar: 'اكتب أو تحدّث، ويوقّعها الرمز الرقمي', en: 'Type or speak, the avatar signs it back' },
    body: {
      ar: 'اكتب أو الصق أو تحدّث أي شيء فيوقّعه رمز رقمي بلغة الإشارة السعودية، مع تحكّم في السرعة والرسمية وقراءة صوتية.',
      en: 'Type, paste, or speak anything and an avatar signs it in Saudi Sign Language — with speed, formality, and read-aloud controls.',
    },
    cta: { ar: 'افتح الرمز الرقمي', en: 'Open avatar' },
    target: { tab: 'translate', mode: 'text2sign' },
  },
  sos: {
    id: 'sos', kind: 'app', icon: 'sos', accent: '#c74a30', category: 'safety',
    situations: ['emergency'],
    name: { ar: 'استغاثة طوارئ', en: 'Emergency SOS' },
    tagline: { ar: 'اتصال بلمسة واحدة بـ 911 / 937', en: 'One-tap connection to 911 / 937' },
    body: {
      ar: 'يربطك فورًا بمركز البلاغات مع موقعك وملفك الطبي وطريقة تواصلك المفضّلة مُرفقة مسبقًا، فيعرف المستجيب كيف يتحدث معك.',
      en: 'Connects you instantly to dispatch with your location, medical profile, and preferred communication mode pre-attached, so the responder already knows how to talk to you.',
    },
    cta: { ar: 'فتح الاستغاثة', en: 'Open SOS' },
    target: { sos: true },
  },
  bookInterpreter: {
    id: 'bookInterpreter', kind: 'app', icon: 'users', accent: '#5b4ba8', category: 'interpreting',
    situations: ['school', 'hospital', 'employment', 'everyday'],
    name: { ar: 'حجز مترجم معتمد', en: 'Book a Certified Interpreter' },
    tagline: { ar: 'للمواقف التي تحتاج حضورًا بشريًا', en: 'For situations that need a human' },
    body: {
      ar: 'اطلب مترجم لغة إشارة معتمدًا للمحكمة أو إجراء طبي أو مقابلة عمل — حضوريًا أو عبر الاتصال المرئي.',
      en: 'Request a certified sign-language interpreter for court, a hospital procedure, or a job interview — on-site or by video relay.',
    },
    cta: { ar: 'احجز الآن', en: 'Book now' },
    target: { tab: 'bookings', screen: 'new' },
  },
  docAssistant: {
    id: 'docAssistant', kind: 'app', icon: 'doc', accent: '#2f7d95', category: 'gov',
    situations: ['everyday', 'employment'],
    name: { ar: 'مساعد النماذج والمستندات', en: 'Document & Form Assistant' },
    tagline: { ar: 'امسح نموذجًا واحصل على شرح بالإشارة', en: 'Scan a form, get it explained in sign' },
    body: {
      ar: 'صوّر نموذجًا حكوميًا أو خطابًا رسميًا فتحصل على شرح بفيديو موقّع، ومساعدة موجّهة لتعبئته حقلًا بحقل.',
      en: 'Scan a government form or official letter and get it explained in signed video, plus guided help filling it out field by field.',
    },
    cta: { ar: 'افتح المساعد', en: 'Open assistant' },
    target: { tab: 'me', screen: 'docAssistant' },
  },

  // ---- national / government services (conceptual integration) ----
  absher: {
    id: 'absher', kind: 'gov', icon: 'shield', accent: '#0b7a4b', category: 'gov',
    situations: ['everyday', 'employment'],
    name: { ar: 'أبشر', en: 'Absher' },
    tagline: { ar: 'الخدمات الحكومية الرقمية', en: 'Digital government services' },
    body: {
      ar: 'بوابة الخدمات الحكومية الموحّدة. مع سِن وورلد، كل خطوة في أبشر تُشرح بلغة الإشارة قبل أن تبدأ.',
      en: "The unified government services portal. With SignWorld, every Absher step is explained in sign language before you begin.",
    },
    cta: { ar: 'كيف يساعد سِن وورلد هنا', en: 'How SignWorld helps here' },
    openLabel: { ar: 'فتح في أبشر', en: 'Open in Absher' },
    steps: {
      ar: [
        'اختر الخدمة التي تريدها في أبشر.',
        'شغّل «اشرح بالإشارة» فيوقّع الرمز الرقمي كل حقل ومتطلّب.',
        'عبّئ البيانات بمساعدة موجّهة خطوة بخطوة.',
        'راجع الطلب الموقّع ثم أرسله.',
      ],
      en: [
        'Pick the service you need in Absher.',
        'Turn on “Explain in sign” — the avatar signs every field and requirement.',
        'Fill in your details with guided, step-by-step help.',
        'Review the signed summary, then submit.',
      ],
    },
    related: ['docAssistant', 'bookInterpreter'],
  },
  seha: {
    id: 'seha', kind: 'gov', icon: 'cross', accent: '#0b7a4b', category: 'health',
    situations: ['hospital', 'emergency'],
    name: { ar: 'صحة', en: 'Seha' },
    tagline: { ar: 'الاستشارات الطبية عن بُعد', en: 'Remote medical consultations' },
    body: {
      ar: 'استشارات طبية مرئية. مع سِن وورلد يترجم الرمز الرقمي بينك وبين الطبيب مباشرة داخل المكالمة.',
      en: 'Video medical consultations. With SignWorld, the avatar interprets between you and the doctor inside the call.',
    },
    cta: { ar: 'كيف يساعد سِن وورلد هنا', en: 'How SignWorld helps here' },
    openLabel: { ar: 'فتح في صحة', en: 'Open in Seha' },
    steps: {
      ar: [
        'احجز موعدًا مرئيًا في تطبيق صحة.',
        'اختر «مريض يستخدم لغة الإشارة» في تفضيلات التواصل.',
        'أثناء المكالمة: إشارتك تتحوّل إلى نص للطبيب، وكلامه يُوقَّع لك.',
        'يصلك ملخّص موقّع بالوصفة والتعليمات.',
      ],
      en: [
        'Book a video appointment in the Seha app.',
        'Choose “patient uses sign language” in communication preferences.',
        'During the call: your signing becomes text for the doctor, and their speech is signed for you.',
        'You receive a signed summary of the prescription and instructions.',
      ],
    },
    related: ['sign2text', 'sos', 'bookInterpreter'],
  },
  najiz: {
    id: 'najiz', kind: 'gov', icon: 'building', accent: '#5b4ba8', category: 'gov',
    situations: ['employment', 'everyday'],
    name: { ar: 'ناجز', en: 'Najiz' },
    tagline: { ar: 'الخدمات العدلية والمحاكم', en: 'Justice and court services' },
    body: {
      ar: 'خدمات وزارة العدل. مع سِن وورلد تُحجز جلسات المحكمة بمترجم معتمد تلقائيًا وتُشرح الإجراءات بالإشارة.',
      en: 'Ministry of Justice services. With SignWorld, court sessions are auto-booked with a certified interpreter and procedures are explained in sign.',
    },
    cta: { ar: 'كيف يساعد سِن وورلد هنا', en: 'How SignWorld helps here' },
    openLabel: { ar: 'فتح في ناجز', en: 'Open in Najiz' },
    steps: {
      ar: [
        'افتح قضيتك أو موعدك في ناجز.',
        'فعّل «أحتاج مترجم لغة إشارة» فيُحجز مترجم معتمد للجلسة.',
        'راجع خطوات الجلسة مشروحة بفيديو موقّع.',
        'يحضر المترجم حضوريًا أو عبر الاتصال المرئي في الموعد.',
      ],
      en: [
        'Open your case or appointment in Najiz.',
        'Enable “I need a sign-language interpreter” — a certified interpreter is booked for the session.',
        'Review the session steps explained in signed video.',
        'The interpreter attends on-site or by video relay at the appointment.',
      ],
    },
    related: ['bookInterpreter', 'docAssistant'],
  },
  tawakkalna: {
    id: 'tawakkalna', kind: 'gov', icon: 'shield', accent: '#0b7a4b', category: 'gov',
    situations: ['everyday'],
    name: { ar: 'توكلنا خدمات', en: 'Tawakkalna Services' },
    tagline: { ar: 'الهوية الرقمية والخدمات اليومية', en: 'Digital ID and daily services' },
    body: {
      ar: 'هويتك الرقمية وخدماتك اليومية. مع سِن وورلد تُعرض تنبيهات توكلنا مترجمةً بالإشارة تلقائيًا.',
      en: 'Your digital ID and everyday services. With SignWorld, Tawakkalna alerts are automatically shown interpreted in sign.',
    },
    cta: { ar: 'كيف يساعد سِن وورلد هنا', en: 'How SignWorld helps here' },
    openLabel: { ar: 'فتح في توكلنا', en: 'Open in Tawakkalna' },
    steps: {
      ar: [
        'افتح توكلنا خدمات وسجّل الدخول بالنفاذ الوطني.',
        'فعّل «إشعارات موقّعة» في الإعدادات.',
        'أي تنبيه رسمي يصلك مصحوبًا بفيديو موقّع.',
        'الهوية الرقمية تعرض «يستخدم لغة الإشارة» للجهات الرسمية.',
      ],
      en: [
        'Open Tawakkalna Services and sign in with National Single Sign-On.',
        'Enable “signed notifications” in settings.',
        'Every official alert arrives with a signed video.',
        'Your digital ID shows “uses sign language” to officials.',
      ],
    },
    related: ['docAssistant', 'sign2text'],
  },

  // ---- community resources ----
  deafAssociation: {
    id: 'deafAssociation', kind: 'resource', icon: 'building', accent: '#5b4ba8', category: 'community',
    situations: ['family', 'everyday', 'employment'],
    name: { ar: 'الجمعية السعودية للصم', en: 'Saudi Deaf Association' },
    tagline: { ar: 'مجتمع ودعم ومناصرة', en: 'Community, support, advocacy' },
    body: {
      ar: 'منظمة أهلية تقدّم برامج مجتمعية ودعمًا قانونيًا وتوعويًا لأفراد المجتمع الأصم وأسرهم.',
      en: 'A civil-society organization offering community programs, legal support, and advocacy for Deaf individuals and families.',
    },
    cta: { ar: 'اعرف المزيد', en: 'Learn more' },
    target: { tab: 'me', screen: 'community' },
  },
  vrs: {
    id: 'vrs', kind: 'resource', icon: 'phone', accent: '#c74a30', category: 'community',
    situations: ['everyday', 'hospital', 'emergency'],
    name: { ar: 'خدمة الاتصال المرئي (VRS)', en: 'Video Relay Service' },
    tagline: { ar: 'اتصل بأي جهة عبر مترجم فيديو', en: 'Call anyone through a video interpreter' },
    body: {
      ar: 'تتيح إجراء مكالمات هاتفية عادية عبر مترجم إشارة مرئي مباشر — للتواصل مع أي جهة لا تملك أداة إشارة.',
      en: 'Place a normal phone call through a live video sign interpreter — for reaching anyone without a signing tool.',
    },
    cta: { ar: 'اعرف المزيد', en: 'Learn more' },
    target: { tab: 'me', screen: 'community' },
  },
  hajjFacilitator: {
    id: 'hajjFacilitator', kind: 'app', icon: 'kaaba', accent: '#b9852a', category: 'translate',
    situations: ['hajj'],
    name: { ar: 'ميسّر الحج والعمرة', en: 'Hajj & Umrah Facilitator' },
    tagline: { ar: 'ترجمة بين لغات الإشارة المختلفة', en: 'Translate between different sign languages' },
    body: {
      ar: 'يترجم بين لغة الإشارة السعودية ولغات الإشارة الدولية (الأمريكية، الدولية) للحجّاج والمعتمرين الصمّ من كل العالم.',
      en: 'Translates between Saudi Sign Language and international sign languages (ASL, International Sign) for Deaf pilgrims from around the world.',
    },
    cta: { ar: 'افتح الميسّر', en: 'Open facilitator' },
    target: { tab: 'translate', mode: 'sign2text' },
  },
}

/* ------------------------------- life-moment groupings ------------------------------- */

export const SITUATIONS = [
  {
    id: 'everyday', icon: 'users',
    title: { ar: 'الحياة اليومية', en: 'Everyday life' },
    body: {
      ar: 'مكالمة، موعد، أو محادثة عابرة — أدوات للتواصل خارج المواقف الحرجة.',
      en: 'A phone call, an appointment, a passing conversation — tools for outside critical moments.',
    },
    tools: ['sign2text', 'text2sign', 'vrs'],
  },
  {
    id: 'hospital', icon: 'cross',
    title: { ar: 'في المستشفى', en: 'At the hospital' },
    body: {
      ar: 'لحظات لا تحتمل سوء الفهم — لوصف الأعراض والتواصل مع الطاقم الطبي فورًا.',
      en: "Moments that can't afford misunderstanding — describe symptoms and reach clinical staff instantly.",
    },
    tools: ['sign2text', 'seha', 'bookInterpreter', 'vrs'],
  },
  {
    id: 'emergency', icon: 'siren',
    title: { ar: 'في حالة طارئة', en: 'In an emergency' },
    body: {
      ar: 'عندما تُحسب الثواني — تواصل مباشر وموقّع مع خدمات الطوارئ الوطنية.',
      en: 'When seconds count — direct, signed communication with national emergency services.',
    },
    tools: ['sos', 'vrs', 'sign2text'],
  },
  {
    id: 'school', icon: 'school',
    title: { ar: 'في المدرسة', en: 'At school' },
    body: {
      ar: 'من الحصة الدراسية إلى سؤال سريع لمعلّم — أدوات تجعل الفصل مفهومًا للجميع.',
      en: 'From the lesson to a quick question for a teacher — tools that make the classroom legible to everyone.',
    },
    tools: ['text2sign', 'bookInterpreter', 'sign2text'],
  },
  {
    id: 'family', icon: 'heart',
    title: { ar: 'تربية طفل أصم', en: 'Raising a Deaf child' },
    body: {
      ar: 'أكثر من 90% من الأطفال الصم يولدون لأسر سامعة — أدوات ومجتمع لتعلّم لغة الإشارة معًا.',
      en: 'Over 90% of Deaf children are born to hearing families — tools and community to learn sign language together.',
    },
    tools: ['text2sign', 'deafAssociation'],
  },
  {
    id: 'employment', icon: 'briefcase',
    title: { ar: 'العمل والتوظيف', en: 'Work & employment' },
    body: {
      ar: 'مقابلة عمل، اجتماع، أو إجراء رسمي — دعم لتواصل متكافئ في مكان العمل.',
      en: 'A job interview, a meeting, an official procedure — support for equal communication at work.',
    },
    tools: ['bookInterpreter', 'najiz', 'absher', 'docAssistant'],
  },
  {
    id: 'hajj', icon: 'kaaba',
    title: { ar: 'الحج والعمرة', en: 'Hajj & Umrah' },
    body: {
      ar: 'حاجّ أصمّ من خارج المملكة — ترجمة فورية بين لغات الإشارة المختلفة.',
      en: 'A Deaf pilgrim from outside the Kingdom — real-time translation between different sign languages.',
    },
    tools: ['hajjFacilitator', 'sign2text', 'vrs'],
  },
]

export const CATEGORIES = [
  { id: 'translate', name: { ar: 'الترجمة', en: 'Translation' } },
  { id: 'safety', name: { ar: 'السلامة', en: 'Safety' } },
  { id: 'interpreting', name: { ar: 'المترجمون', en: 'Interpreters' } },
  { id: 'gov', name: { ar: 'خدمات حكومية', en: 'Government' } },
  { id: 'health', name: { ar: 'الصحة', en: 'Health' } },
  { id: 'community', name: { ar: 'المجتمع', en: 'Community' } },
]

/* ------------------------------- interpreter directory ------------------------------- */

export const INTERPRETERS = [
  {
    id: 'itp-1', initial: 'ن', name: { ar: 'نورة القحطاني', en: 'Noura Al-Qahtani' }, rating: 4.9,
    specialties: { ar: ['طبي', 'طوارئ'], en: ['Medical', 'Emergency'] },
    languages: ['SSL', 'Arabic'],
  },
  {
    id: 'itp-2', initial: 'ف', name: { ar: 'فهد العتيبي', en: 'Fahad Al-Otaibi' }, rating: 4.8,
    specialties: { ar: ['قضائي', 'رسمي'], en: ['Legal', 'Official'] },
    languages: ['SSL', 'Arabic'],
  },
  {
    id: 'itp-3', initial: 'ر', name: { ar: 'ريم الشهري', en: 'Reem Al-Shehri' }, rating: 5.0,
    specialties: { ar: ['تعليمي', 'مقابلات عمل'], en: ['Education', 'Job interviews'] },
    languages: ['SSL', 'Arabic', 'English'],
  },
  {
    id: 'itp-4', initial: 'م', name: { ar: 'محمد الغامدي', en: 'Mohammed Al-Ghamdi' }, rating: 4.7,
    specialties: { ar: ['حج وعمرة', 'دولي'], en: ['Hajj & Umrah', 'International'] },
    languages: ['SSL', 'ASL', 'International Sign'],
  },
]

/* ------------------------------- booking seeds ------------------------------- */

export const BOOKING_TYPES = [
  { id: 'court', icon: 'building', name: { ar: 'جلسة محكمة', en: 'Court session' } },
  { id: 'hospital', icon: 'cross', name: { ar: 'إجراء طبي', en: 'Hospital procedure' } },
  { id: 'interview', icon: 'briefcase', name: { ar: 'مقابلة عمل', en: 'Job interview' } },
  { id: 'govOffice', icon: 'shield', name: { ar: 'مكتب حكومي', en: 'Government office' } },
  { id: 'other', icon: 'chat', name: { ar: 'أخرى', en: 'Other' } },
]

export const BOOKINGS_SEED = [
  {
    id: 'bk-seed-1', typeId: 'hospital', interpreterId: 'itp-1', mode: 'onsite',
    dt: '2026-09-11T09:30:00', status: 'confirmed',
    location: { ar: 'مستشفى الملك فهد — الرياض', en: 'King Fahd Hospital — Riyadh' },
    langPair: 'SSL ↔ Arabic',
    notes: { ar: 'موعد أشعة، أحتاج شرح الإجراء قبله.', en: 'Imaging appointment, need the procedure explained first.' },
  },
  {
    id: 'bk-seed-2', typeId: 'interview', interpreterId: 'itp-3', mode: 'video',
    dt: '2026-09-15T13:00:00', status: 'pending',
    location: { ar: 'اتصال مرئي', en: 'Video call' },
    langPair: 'SSL ↔ Arabic',
    notes: { ar: 'مقابلة توظيف عن بُعد.', en: 'Remote hiring interview.' },
  },
  {
    id: 'bk-seed-3', typeId: 'court', interpreterId: 'itp-2', mode: 'onsite',
    dt: '2026-08-20T10:00:00', status: 'completed',
    location: { ar: 'المحكمة العامة — جدة', en: 'General Court — Jeddah' },
    langPair: 'SSL ↔ Arabic',
    notes: { ar: '', en: '' },
  },
  {
    id: 'bk-seed-4', typeId: 'govOffice', interpreterId: 'itp-1', mode: 'onsite',
    dt: '2026-07-30T11:15:00', status: 'completed',
    location: { ar: 'الأحوال المدنية — الدمام', en: 'Civil Affairs — Dammam' },
    langPair: 'SSL ↔ Arabic',
    notes: { ar: '', en: '' },
  },
]

/* ------------------------------- translation scripts ------------------------------- */

export const TRANSLATION_SCRIPTS = {
  // Sign -> Text: hardcoded transcript lines, revealed one at a time after a
  // short "processing" delay. Grouped per app section so each context shows
  // sentences relevant to it, instead of one generic script everywhere.
  sign2text: {
    // Default / general-purpose (Translate tab).
    general: {
      ar: [
        'السلام عليكم.',
        'أحتاج مساعدة في تجديد الهوية الوطنية.',
        'هذه بطاقتي القديمة، انتهت الشهر الماضي.',
        'هل أستطيع دفع الرسوم هنا؟',
      ],
      en: [
        'Hello.',
        'I need help renewing my national ID.',
        'This is my old card — it expired last month.',
        'Can I pay the fee here?',
      ],
    },
    // Medical context (SOS flow, Seha-related screens).
    medical: {
      ar: [
        'أشعر بألم في صدري منذ ساعة.',
        'لدي حساسية من البنسلين.',
        'أنا مصاب بربو خفيف وأحتاج البخّاخ.',
        'هل يمكن استدعاء طبيب مختص؟',
      ],
      en: [
        "I've had chest pain for the past hour.",
        'I have a penicillin allergy.',
        'I have mild asthma and need my inhaler.',
        'Can a specialist be called in?',
      ],
    },
    // Learning / forms context (Document Assistant, school situations).
    learning: {
      ar: [
        'لم أفهم هذا الحقل في النموذج.',
        'هل يمكن إعادة شرح الخطوة الثانية؟',
        'أين أكتب رقم الهوية بالضبط؟',
        'شكرًا، فهمت الآن.',
      ],
      en: [
        "I didn't understand this field in the form.",
        'Can you explain step two again?',
        'Where exactly do I write the ID number?',
        'Thanks, I understand now.',
      ],
    },
  },
  // Text -> Sign phrasebook: real Arabic sentences from Isharah dataset (exact strings
  // the backend can look up). `en` is a display-only gloss, never sent to the lookup —
  // the lookup is Arabic-exact, so chips always search by `ar` regardless of UI language.
  phrasebook: [
    { ar: 'سوال هو', en: 'Question' },
    { ar: 'هو معلم لغه اشاره', en: 'He is a sign language teacher' },
    { ar: 'استفهام هو معلم هو', en: 'Question, is he a teacher?' },
    { ar: 'معرفه هو لغه اشاره', en: 'He knows sign language' },
    { ar: 'لا معرفه لغه اشاره', en: 'He does not know sign language' },
    { ar: 'ممكن هو قدره كتابه اسم هو', en: 'Can he write his name?' },
  ],
  // Emergency dispatcher script.
  dispatcher: {
    ar: [
      'مركز الطوارئ 937، تم استلام بلاغك.',
      'نرى موقعك: حي النخيل، الرياض.',
      'ملفك الطبي وصلنا — لديك حساسية من البنسلين.',
      'سيارة الإسعاف في الطريق، الوصول خلال 6 دقائق.',
      'ابقَ في مكانك، سنبقى معك حتى وصول الفريق.',
    ],
    en: [
      'Emergency center 937, your report is received.',
      'We see your location: Al Nakheel district, Riyadh.',
      'Your medical profile is in — you have a penicillin allergy.',
      'An ambulance is on the way, ETA 6 minutes.',
      'Stay where you are, we will remain with you until the team arrives.',
    ],
  },
}

/* ------------------------------- announcements (signed broadcasts) ------------------------------- */

export const ANNOUNCEMENTS = [
  {
    id: 'ann-1', icon: 'cross',
    source: { ar: 'وزارة الصحة', en: 'Ministry of Health' },
    title: { ar: 'حملة التطعيم الموسمي', en: 'Seasonal vaccination campaign' },
    body: {
      ar: 'التطعيم الموسمي متاح الآن مجانًا في جميع المراكز الصحية. هذا الإعلان متاح بلغة الإشارة.',
      en: 'The seasonal vaccine is now available free at all health centers. This announcement is available in sign language.',
    },
  },
  {
    id: 'ann-2', icon: 'siren',
    source: { ar: 'الدفاع المدني', en: 'Civil Defense' },
    title: { ar: 'تنبيه حالة الطقس', en: 'Weather advisory' },
    body: {
      ar: 'أمطار رعدية متوقعة على منطقة الرياض مساء اليوم. يرجى الحذر وتجنّب أماكن تجمّع السيول.',
      en: 'Thunderstorms expected over the Riyadh region this evening. Take care and avoid flood-prone areas.',
    },
  },
  {
    id: 'ann-3', icon: 'shield',
    source: { ar: 'خطاب وطني', en: 'National address' },
    title: { ar: 'كلمة اليوم الوطني', en: 'National Day address' },
    body: {
      ar: 'بثّ الكلمة الوطنية مساء غد الساعة 8 م، مصحوبة بترجمة فورية إلى لغة الإشارة السعودية.',
      en: 'The national address airs tomorrow at 8 PM, with live Saudi Sign Language interpretation.',
    },
  },
]

/* ------------------------------- profile defaults ------------------------------- */

export const PROFILE_DEFAULT = {
  name: { ar: 'أحمد العمري', en: 'Ahmed Al-Omari' },
  idMasked: '1•••••4823',
  commMode: 'ssl', // 'ssl' | 'text' | 'voiceOff'
  medical: {
    bloodType: 'O+',
    conditions: { ar: 'ربو خفيف', en: 'Mild asthma' },
    medications: { ar: 'بخّاخ سالبوتامول عند اللزوم', en: 'Salbutamol inhaler as needed' },
    allergies: { ar: 'البنسلين', en: 'Penicillin' },
    preferredHospital: { ar: 'مستشفى الملك فهد — الرياض', en: 'King Fahd Hospital — Riyadh' },
    emergencyContact: { ar: 'سارة العمري · أخت · 05• ••• •• 12', en: 'Sara Al-Omari · sister · 05• ••• •• 12' },
  },
  sos: {
    number: '937',
    shareLocation: true,
    attachMedical: true,
    notifyContacts: true,
  },
}

/* ------------------------------- deaf chat (Pass 2) ------------------------------- */
// kind: 'text' | 'video' (a signed video message — plays a canned AvatarStage clip)

export const CHAT_SEED = [
  {
    id: 'th-1', initial: 'ن', group: false,
    name: { ar: 'نورة القحطاني · مترجمة', en: 'Noura Al-Qahtani · interpreter' },
    messages: [
      { from: 'them', kind: 'text', text: { ar: 'أهلًا أحمد، جاهزة لموعد الأشعة يوم الجمعة.', en: 'Hi Ahmed, I’m set for the imaging appointment on Friday.' } },
      { from: 'me', kind: 'text', text: { ar: 'ممتاز. هل نلتقي عند الاستقبال؟', en: 'Great. Shall we meet at reception?' } },
      { from: 'them', kind: 'video', text: { ar: 'رسالة موقّعة: نعم، سأكون هناك 9:15 ص.', en: 'Signed message: yes, I’ll be there at 9:15 AM.' } },
      { from: 'me', kind: 'text', text: { ar: 'شكرًا جزيلًا 🙏', en: 'Thank you so much 🙏' } },
    ],
    replies: {
      ar: ['تمام، إلى اللقاء يوم الجمعة.', 'لو تأخرت أرسل لي رسالة.', 'أحضر معك الهوية والتحويلة.'],
      en: ['Perfect, see you Friday.', 'If you’re running late, message me.', 'Bring your ID and the referral.'],
    },
  },
  {
    id: 'th-2', initial: 'م', group: true,
    name: { ar: 'مجتمع الصم · الرياض', en: 'Deaf community · Riyadh' },
    messages: [
      { from: 'them', kind: 'text', text: { ar: 'سارة: لقاء المجموعة السبت في نادي الحي، 5 م.', en: 'Sara: group meetup Saturday at the community club, 5 PM.' } },
      { from: 'them', kind: 'video', text: { ar: 'خالد (رسالة موقّعة): سأحضر ومعي عرض عن الدورة الجديدة.', en: 'Khalid (signed): I’ll come and bring a demo of the new course.' } },
      { from: 'me', kind: 'text', text: { ar: 'سأحاول الحضور 👍', en: 'I’ll try to make it 👍' } },
    ],
    replies: {
      ar: ['رائع، بانتظارك!', 'أرسلنا الموقع على الخريطة.', 'من يحتاج مواصلات يخبرنا.'],
      en: ['Great, see you there!', 'We shared the location on the map.', 'Anyone needing a ride, let us know.'],
    },
  },
  {
    id: 'th-3', initial: 'ر', group: false,
    name: { ar: 'ريم الشهري · مترجمة', en: 'Reem Al-Shehri · interpreter' },
    messages: [
      { from: 'them', kind: 'text', text: { ar: 'بخصوص مقابلة العمل يوم الثلاثاء — أرسل لي اسم الشركة.', en: 'About the job interview Tuesday — send me the company name.' } },
    ],
    replies: {
      ar: ['وصلني، شكرًا.', 'سأراجع المتطلبات قبل الموعد.', 'نلتقي على الاتصال المرئي الساعة 12:45 م.'],
      en: ['Got it, thanks.', 'I’ll review the requirements beforehand.', 'Let’s connect on video at 12:45 PM.'],
    },
  },
]

/* ------------------------------- community (Pass 2) ------------------------------- */

export const COMMUNITY_LINKS = [
  {
    id: 'cl-1', icon: 'building',
    name: { ar: 'الجمعية السعودية للصم', en: 'Saudi Deaf Association' },
    blurb: { ar: 'برامج مجتمعية ودعم قانوني وتوعوي لأفراد المجتمع الأصم وأسرهم.', en: 'Community programs, legal and awareness support for Deaf individuals and families.' },
  },
  {
    id: 'cl-2', icon: 'phone',
    name: { ar: 'خدمة الاتصال المرئي (VRS)', en: 'Video Relay Service (VRS)' },
    blurb: { ar: 'أجرِ مكالمة هاتفية عادية عبر مترجم إشارة مرئي مباشر.', en: 'Place a normal phone call through a live video sign interpreter.' },
  },
  {
    id: 'cl-3', icon: 'users',
    name: { ar: 'مجتمع لغة الإشارة السعودية', en: 'Saudi Sign Language Community' },
    blurb: { ar: 'مجموعات محلية، فعاليات، وورش تعلّم لغة الإشارة في مدنك.', en: 'Local groups, events, and SSL learning workshops across the Kingdom.' },
  },
  {
    id: 'cl-4', icon: 'school',
    name: { ar: 'مصادر تعلّم لغة الإشارة', en: 'SSL learning resources' },
    blurb: { ar: 'قواميس إشارة، دروس مصوّرة، ومناهج للأسر السامعة.', en: 'Sign dictionaries, video lessons, and curricula for hearing families.' },
  },
]

export const FORUM_SEED = [
  {
    id: 'fp-1',
    title: { ar: 'تجربتي مع حجز مترجم للمحكمة', en: 'My experience booking a court interpreter' },
    author: { ar: 'أبو محمد', en: 'Abu Mohammed' },
    replies: 12,
    posts: [
      { author: { ar: 'أبو محمد', en: 'Abu Mohammed' }, text: { ar: 'حجزت مترجمًا عبر التطبيق قبل الجلسة بأسبوع ووصل التأكيد خلال يومين. كل شيء كان واضحًا.', en: 'I booked an interpreter a week before the session and confirmation came within two days. Everything was clear.' } },
      { author: { ar: 'نورة', en: 'Noura' }, text: { ar: 'نصيحة: اكتب تفاصيل القضية في الملاحظات ليستعد المترجم.', en: 'Tip: put the case details in the notes so the interpreter can prepare.' } },
      { author: { ar: 'سالم', en: 'Salem' }, text: { ar: 'هل كان المترجم حضوريًا أم عبر الفيديو؟', en: 'Was the interpreter on-site or via video?' } },
    ],
  },
  {
    id: 'fp-2',
    title: { ar: 'أفضل طريقة لشرح الأعراض للطبيب', en: 'Best way to explain symptoms to a doctor' },
    author: { ar: 'هند', en: 'Hind' },
    replies: 8,
    posts: [
      { author: { ar: 'هند', en: 'Hind' }, text: { ar: 'أستخدم وضع «إشارة إلى نص» وأريه الطبيب الشاشة مباشرة. يوفّر وقتًا كثيرًا.', en: 'I use Sign-to-Text and show the doctor the screen directly. It saves a lot of time.' } },
      { author: { ar: 'فيصل', en: 'Faisal' }, text: { ar: 'وأنا أجهّز قائمة بالأعراض في تطبيق الملاحظات قبل الموعد.', en: 'I also prepare a symptom list in Notes before the appointment.' } },
    ],
  },
  {
    id: 'fp-3',
    title: { ar: 'تعلّم الإشارة مع طفلي — من أين أبدأ؟', en: 'Learning sign with my child — where to start?' },
    author: { ar: 'أم يزيد', en: 'Umm Yazid' },
    replies: 21,
    posts: [
      { author: { ar: 'أم يزيد', en: 'Umm Yazid' }, text: { ar: 'ابنتي عمرها 3 سنوات وأريد أن نتعلم معًا. أي نصائح؟', en: 'My daughter is 3 and I want us to learn together. Any advice?' } },
      { author: { ar: 'مشرف المجتمع', en: 'Community mod' }, text: { ar: 'ابدأوا بالكلمات اليومية: أكل، ماء، أحبك. وكرّروها في المواقف الحقيقية.', en: 'Start with everyday words: eat, water, I love you. Repeat them in real situations.' } },
    ],
  },
]

/* ------------------------------- document assistant (Pass 2) ------------------------------- */

export const DOC_FORMS = [
  {
    id: 'df-1',
    title: { ar: 'طلب تجديد الهوية الوطنية', en: 'National ID renewal request' },
    source: { ar: 'الأحوال المدنية', en: 'Civil Affairs' },
    explainer: {
      ar: [
        'هذا النموذج لتجديد بطاقة الهوية الوطنية المنتهية أو التي قاربت على الانتهاء.',
        'ستحتاج رقم الهوية، صورة شخصية حديثة، وعنوانك الوطني.',
        'الرسوم تُدفع إلكترونيًا بعد قبول الطلب.',
        'مدة الإصدار عادة من 3 إلى 5 أيام عمل.',
      ],
      en: [
        'This form renews an expired or soon-to-expire national ID card.',
        'You’ll need your ID number, a recent photo, and your national address.',
        'The fee is paid online after the request is accepted.',
        'Issuance usually takes 3–5 working days.',
      ],
    },
    fields: [
      { id: 'idnum', label: { ar: 'رقم الهوية', en: 'ID number' }, type: 'text',
        prompt: { ar: 'اكتب رقم هويتك المكوّن من 10 أرقام كما يظهر على البطاقة القديمة.', en: 'Enter your 10-digit ID number exactly as on the old card.' } },
      { id: 'expiry', label: { ar: 'تاريخ انتهاء البطاقة الحالية', en: 'Current card expiry date' }, type: 'text',
        prompt: { ar: 'اكتب تاريخ الانتهاء المطبوع على البطاقة.', en: 'Enter the expiry date printed on the card.' } },
      { id: 'address', label: { ar: 'العنوان الوطني', en: 'National address' }, type: 'text',
        prompt: { ar: 'اكتب عنوانك الوطني المسجّل في البريد السعودي.', en: 'Enter your national address as registered with Saudi Post.' } },
      { id: 'phone', label: { ar: 'رقم الجوال', en: 'Mobile number' }, type: 'text',
        prompt: { ar: 'اكتب رقم جوالك لاستلام رمز التحقق.', en: 'Enter your mobile number to receive a verification code.' } },
    ],
  },
  {
    id: 'df-2',
    title: { ar: 'طلب خدمة مترجم في جهة حكومية', en: 'Government-office interpreter request' },
    source: { ar: 'خدمة عامة', en: 'Public service' },
    explainer: {
      ar: [
        'يُستخدم هذا الطلب لترتيب حضور مترجم لغة إشارة في موعدك بجهة حكومية.',
        'حدّد الجهة، نوع المعاملة، والتاريخ المفضّل.',
        'يصلك تأكيد بالمترجم المخصّص قبل الموعد بيومين على الأقل.',
      ],
      en: [
        'This request arranges a sign-language interpreter for your appointment at a government office.',
        'Specify the office, the transaction type, and your preferred date.',
        'You’ll get confirmation of the assigned interpreter at least two days before.',
      ],
    },
    fields: [
      { id: 'office', label: { ar: 'الجهة الحكومية', en: 'Government office' }, type: 'text',
        prompt: { ar: 'اكتب اسم الجهة التي لديك بها موعد.', en: 'Enter the office where you have an appointment.' } },
      { id: 'purpose', label: { ar: 'نوع المعاملة', en: 'Transaction type' }, type: 'text',
        prompt: { ar: 'صف باختصار سبب زيارتك.', en: 'Briefly describe the reason for your visit.' } },
      { id: 'date', label: { ar: 'التاريخ المفضّل', en: 'Preferred date' }, type: 'text',
        prompt: { ar: 'اكتب التاريخ الذي يناسبك للموعد.', en: 'Enter the date that works for your appointment.' } },
    ],
  },
]

/* ============================================================================
   UI COPY
   ========================================================================== */

export const CONTENT = {
  ar: {
    tabs: { home: 'الرئيسية', services: 'الخدمات', translate: 'ترجم', bookings: 'المواعيد', me: 'حسابي' },
    common: {
      back: 'رجوع', save: 'حفظ', cancel: 'إلغاء', confirm: 'تأكيد', next: 'التالي', done: 'تم',
      open: 'فتح', learnMore: 'اعرف المزيد', close: 'إغلاق', soon: 'قريبًا',
      appBadge: 'أداة سِن وورلد', govBadge: 'خدمة حكومية', resourceBadge: 'مصدر مجتمعي',
      watchSigned: 'شاهدها بالإشارة', copied: 'تم النسخ', comingSoon: 'هذه الميزة تصل في التحديث القادم.',
    },
    sos: {
      pill: 'استغاثة',
      countdownTitle: 'جارٍ الاتصال بالطوارئ',
      countdownHint: 'اضغط للإلغاء',
      cancel: 'إلغاء الاستغاثة',
      connecting: 'جارٍ الاتصال بـ 937…',
      connected: 'متصل بـ 937',
      sharedTitle: 'مُرفق تلقائيًا',
      sharedLocation: 'موقعك الحالي',
      sharedMedical: 'ملفك الطبي',
      sharedMode: 'لغة الإشارة السعودية',
      youLabel: 'إشارتك → نص للمستجيب',
      dispatcherLabel: 'المستجيب',
      end: 'إنهاء الاتصال',
      summaryTitle: 'انتهى الاتصال',
      summaryBody: 'تم إبلاغ الطوارئ بموقعك وحالتك. حُفظ ملخّص في السجل.',
      smsSent: 'أُرسلت رسالة نصية إلى جهتَي اتصال للطوارئ.',
      waitTitle: 'ماذا تفعل حتى وصول الفريق',
      waitGuidance: 'ابقَ في مكان آمن وواضح. لا تتحرك إن كنت مصابًا. أبقِ الجهاز معك وموجّهًا نحوك. الفريق في الطريق.',
    },
    home: {
      greeting: 'مساءَ الخير',
      subtitle: 'كل أدوات لغة الإشارة السعودية، في مكان واحد.',
      translateNow: 'ترجم الآن',
      translateNowSub: 'إشارة ← نص وصوت',
      text2sign: 'نص إلى إشارة',
      text2signSub: 'يوقّعها الرمز الرقمي',
      quickActions: 'إجراءات سريعة',
      yourDay: 'يومك',
      lastSession: 'آخر ترجمة',
      lastSessionEmpty: 'لم تبدأ أي ترجمة بعد',
      nextAppt: 'الموعد القادم',
      nextApptEmpty: 'لا مواعيد قادمة',
      situationsTitle: 'تصفّح حسب موقفك',
      announcementsTitle: 'إعلانات موقّعة',
      statRibbon: ['+1,200 فصل متصل', '+40 كشك طوارئ', 'تغطية 24/7'],
    },
    services: {
      title: 'الخدمات',
      byMoment: 'حسب الموقف',
      allServices: 'كل الخدمات',
      searchPlaceholder: 'ابحث عن خدمة…',
      savedFilter: 'المحفوظة',
      allFilter: 'الكل',
      noResults: 'لا نتائج مطابقة',
      howHelps: 'كيف يساعد سِن وورلد هنا',
      relatedTools: 'أدوات ذات صلة',
      bookForThis: 'احجز مترجمًا لهذا',
      steps: 'الخطوات',
    },
    translate: {
      title: 'الترجمة',
      modeSign2Text: 'إشارة ← نص',
      modeText2Sign: 'نص ← إشارة',
      // sign2text
      record: 'ابدأ التسجيل',
      stop: 'إيقاف',
      reading: 'يقرأ الإشارة…',
      transcript: 'النص',
      transcriptEmpty: 'اضغط «ابدأ التسجيل» ووجّه الكاميرا نحو الشخص المُوقِّع.',
      speak: 'استماع',
      copy: 'نسخ',
      cameraDenied: 'تعذّر الوصول للكاميرا — سيُعرض عارض تجريبي.',
      switchCam: 'تبديل الكاميرا',
      // text2sign
      textPlaceholder: 'اكتب أو الصق نصًا ليوقّعه الرمز الرقمي…',
      sign: 'وقّع النص',
      phrasebook: 'عبارات شائعة',
      speed: 'السرعة',
      formality: 'الأسلوب',
      formal: 'رسمي',
      casual: 'ودّي',
      readAloud: 'اقرأ صوتيًا أثناء التوقيع',
      avatarStyle: 'مظهر الرمز الرقمي',
      avatarStyles: ['كلاسيكي', 'ودود', 'رسمي'],
    },
    bookings: {
      title: 'المواعيد',
      upcoming: 'قادمة',
      past: 'سابقة',
      newBooking: 'حجز جديد',
      directory: 'دليل المترجمين',
      empty: 'لا مواعيد هنا',
      addToCalendar: 'أضف إلى التقويم',
      messageInterpreter: 'راسل المترجم',
      cancelBooking: 'إلغاء الموعد',
      bookAgain: 'احجز مرة أخرى',
      status: { confirmed: 'مؤكد', pending: 'قيد المراجعة', completed: 'مكتمل', cancelled: 'ملغى' },
      mode: { onsite: 'حضوري', video: 'اتصال مرئي' },
      wizard: {
        step1: 'نوع الموقف',
        step2: 'طريقة الحضور',
        step3: 'التاريخ والوقت',
        step4: 'زوج اللغة',
        step5: 'ملاحظات وتأكيد',
        onsite: 'مترجم حضوري',
        onsiteSub: 'يحضر المترجم في الموقع',
        video: 'اتصال مرئي (VRS)',
        videoSub: 'مترجم عبر مكالمة فيديو',
        notesPlaceholder: 'أي تفاصيل تساعد المترجم على الاستعداد…',
        pickInterpreter: 'اختر مترجمًا (اختياري)',
        anyInterpreter: 'أي مترجم متاح',
        confirmTitle: 'تأكيد الحجز',
        successTitle: 'تم إرسال الطلب',
        successBody: 'سيصلك تأكيد المترجم قريبًا. الموعد ظاهر الآن في «قادمة».',
      },
      requestThis: 'اطلب هذا المترجم',
      rating: 'التقييم',
    },
    me: {
      title: 'حسابي',
      identityTitle: 'الهوية',
      responderNote: 'هذا ما يراه المستجيب الأول.',
      commMode: 'طريقة التواصل المفضّلة',
      commModes: { ssl: 'لغة الإشارة السعودية', text: 'نص مكتوب', voiceOff: 'بدون صوت' },
      medicalTitle: 'الملف الطبي والطوارئ',
      bloodType: 'فصيلة الدم',
      conditions: 'حالات مزمنة',
      medications: 'أدوية',
      allergies: 'حساسية',
      preferredHospital: 'المستشفى المفضّل',
      emergencyContact: 'جهة اتصال للطوارئ',
      editMedical: 'تعديل الملف الطبي',
      sosSettingsTitle: 'إعدادات الاستغاثة',
      sosNumber: 'رقم الطوارئ',
      shareLocation: 'مشاركة الموقع تلقائيًا',
      attachMedical: 'إرفاق الملف الطبي',
      notifyContacts: 'تنبيه جهات الاتصال',
      menu: {
        history: 'السجل',
        community: 'المجتمع',
        deafChat: 'محادثة الصم',
        docAssistant: 'مساعد النماذج',
        settings: 'الإعدادات',
      },
      settingsTitle: 'الإعدادات',
      language: 'اللغة',
      textSize: 'حجم النص',
      textSizes: { sm: 'صغير', md: 'متوسط', lg: 'كبير' },
      highContrast: 'تباين عالٍ',
      captionsDefault: 'التسميات مفعّلة افتراضيًا',
      reduceMotion: 'تقليل الحركة',
      notifications: 'الإشعارات',
      installTitle: 'أضِف إلى الشاشة الرئيسية',
      installBody: 'ثبّت سِن وورلد كتطبيق يعمل دون اتصال.',
      installBtn: 'تثبيت التطبيق',
      installed: 'التطبيق مثبّت بالفعل',
      about: 'عن التطبيق',
      aboutBody: 'سِن وورلد — بنية وطنية موحّدة للغة الإشارة السعودية، متوافقة مفاهيميًا مع رؤية 2030 وبرنامج جودة الحياة، ومع سدايا كجهة راعية مفاهيمية.',
    },
    docAssistant: {
      title: 'مساعد النماذج والمستندات',
      intro: 'صوّر نموذجًا حكوميًا أو خطابًا رسميًا، واحصل على شرح بلغة الإشارة ومساعدة موجّهة لتعبئته.',
      pickForm: 'اختر نموذجًا لتجربته',
      scan: 'مسح النموذج',
      scanning: 'يقرأ النموذج…',
      scanned: 'تم التعرّف على النموذج',
      explainTitle: 'شرح النموذج بالإشارة',
      explainNext: 'ابدأ التعبئة الموجّهة',
      fillTitle: 'تعبئة موجّهة',
      fieldOf: 'حقل {n} من {total}',
      fieldPlaceholder: 'اكتب إجابتك هنا…',
      review: 'مراجعة وإرسال',
      reviewTitle: 'مراجعة البيانات',
      submit: 'إرسال النموذج',
      saveCopy: 'حفظ نسخة',
      successTitle: 'تم إرسال النموذج',
      successBody: 'حُفظت نسخة في السجل. يمكنك تنزيلها كملف نصي.',
    },
    community: {
      title: 'المجتمع',
      linksTitle: 'روابط ومصادر',
      explainInSign: 'اشرح بالإشارة',
      openExternal: 'فتح الموقع',
      forumTitle: 'المنتدى',
      forumReplies: 'رد',
      threadTitle: 'النقاش',
      replyPlaceholder: 'اكتب ردًا…',
      postReply: 'إرسال',
    },
    deafChat: {
      title: 'محادثة الصم',
      groupTag: 'مجموعة',
      typing: 'يكتب…',
      inputPlaceholder: 'اكتب رسالة…',
      send: 'إرسال',
      videoMessage: 'رسالة موقّعة',
      playSigned: 'تشغيل',
      sendSigned: 'رسالة موقّعة',
    },
    history: {
      title: 'السجل',
      empty: 'لا يوجد نشاط بعد',
      filters: { all: 'الكل', sign2text: 'إشارة ← نص', text2sign: 'نص ← إشارة', sos: 'استغاثة', doc: 'مستندات' },
      replay: 'إعادة التشغيل بالإشارة',
      clear: 'مسح السجل',
      kinds: { sign2text: 'إشارة إلى نص', text2sign: 'نص إلى إشارة', sos: 'استغاثة طوارئ', doc: 'نموذج' },
    },
    onboarding: {
      skip: 'تخطٍّ',
      next: 'التالي',
      start: 'ابدأ',
      slides: [
        { title: 'مرحبًا بك في سِن وورلد', body: 'كل أدوات لغة الإشارة السعودية في تطبيق واحد — ترجمة، مواعيد، وطوارئ.' },
        { title: 'ترجم في أي لحظة', body: 'وجّه الكاميرا لتحويل الإشارة إلى نص، أو اكتب ليوقّعه الرمز الرقمي.' },
        { title: 'جاهز عند الحاجة', body: 'زر الاستغاثة يصلك بالطوارئ مع موقعك وملفك الطبي وطريقة تواصلك.' },
      ],
      nameLabel: 'الاسم',
      namePlaceholder: 'اكتب اسمك',
      commLabel: 'طريقة التواصل المفضّلة',
    },
  },

  en: {
    tabs: { home: 'Home', services: 'Services', translate: 'Translate', bookings: 'Bookings', me: 'Me' },
    common: {
      back: 'Back', save: 'Save', cancel: 'Cancel', confirm: 'Confirm', next: 'Next', done: 'Done',
      open: 'Open', learnMore: 'Learn more', close: 'Close', soon: 'Soon',
      appBadge: 'SignWorld tool', govBadge: 'Government service', resourceBadge: 'Community resource',
      watchSigned: 'Watch in sign', copied: 'Copied', comingSoon: 'This feature arrives in the next update.',
    },
    sos: {
      pill: 'SOS',
      countdownTitle: 'Connecting to emergency services',
      countdownHint: 'Tap to cancel',
      cancel: 'Cancel SOS',
      connecting: 'Connecting to 937…',
      connected: 'Connected to 937',
      sharedTitle: 'Attached automatically',
      sharedLocation: 'Your current location',
      sharedMedical: 'Your medical profile',
      sharedMode: 'Saudi Sign Language',
      youLabel: 'Your signing → text for the responder',
      dispatcherLabel: 'Responder',
      end: 'End call',
      summaryTitle: 'Call ended',
      summaryBody: 'Emergency services were given your location and status. A summary was saved to History.',
      smsSent: 'A text message was sent to 2 emergency contacts.',
      waitTitle: 'What to do until the team arrives',
      waitGuidance: 'Stay somewhere safe and visible. Don’t move if you’re injured. Keep the device with you, facing you. Help is on the way.',
    },
    home: {
      greeting: 'Good evening',
      subtitle: 'Every Saudi Sign Language tool, in one place.',
      translateNow: 'Translate now',
      translateNowSub: 'Sign → text & speech',
      text2sign: 'Text to Sign',
      text2signSub: 'The avatar signs it',
      quickActions: 'Quick actions',
      yourDay: 'Your day',
      lastSession: 'Last translation',
      lastSessionEmpty: 'No translation started yet',
      nextAppt: 'Next appointment',
      nextApptEmpty: 'No upcoming appointments',
      situationsTitle: 'Browse by your situation',
      announcementsTitle: 'Signed announcements',
      statRibbon: ['1,200+ classrooms connected', '40+ ER kiosks', '24/7 coverage'],
    },
    services: {
      title: 'Services',
      byMoment: 'By moment',
      allServices: 'All services',
      searchPlaceholder: 'Search for a service…',
      savedFilter: 'Saved',
      allFilter: 'All',
      noResults: 'No matching results',
      howHelps: 'How SignWorld helps here',
      relatedTools: 'Related tools',
      bookForThis: 'Book an interpreter for this',
      steps: 'Steps',
    },
    translate: {
      title: 'Translate',
      modeSign2Text: 'Sign → Text',
      modeText2Sign: 'Text → Sign',
      record: 'Start recording',
      stop: 'Stop',
      reading: 'Reading sign…',
      transcript: 'Transcript',
      transcriptEmpty: 'Tap “Start recording” and point the camera at the person signing.',
      speak: 'Listen',
      copy: 'Copy',
      cameraDenied: 'Camera unavailable — showing a demo viewfinder.',
      switchCam: 'Switch camera',
      textPlaceholder: 'Type or paste text for the avatar to sign…',
      sign: 'Sign it',
      phrasebook: 'Common phrases',
      speed: 'Speed',
      formality: 'Style',
      formal: 'Formal',
      casual: 'Casual',
      readAloud: 'Read aloud while signing',
      avatarStyle: 'Avatar style',
      avatarStyles: ['Classic', 'Friendly', 'Formal'],
    },
    bookings: {
      title: 'Bookings',
      upcoming: 'Upcoming',
      past: 'Past',
      newBooking: 'New booking',
      directory: 'Interpreter directory',
      empty: 'No bookings here',
      addToCalendar: 'Add to calendar',
      messageInterpreter: 'Message interpreter',
      cancelBooking: 'Cancel booking',
      bookAgain: 'Book again',
      status: { confirmed: 'Confirmed', pending: 'Under review', completed: 'Completed', cancelled: 'Cancelled' },
      mode: { onsite: 'On-site', video: 'Video relay' },
      wizard: {
        step1: 'Situation type',
        step2: 'How they attend',
        step3: 'Date & time',
        step4: 'Language pair',
        step5: 'Notes & confirm',
        onsite: 'On-site interpreter',
        onsiteSub: 'The interpreter attends in person',
        video: 'Video relay (VRS)',
        videoSub: 'Interpreter over a video call',
        notesPlaceholder: 'Any details that help the interpreter prepare…',
        pickInterpreter: 'Pick an interpreter (optional)',
        anyInterpreter: 'Any available interpreter',
        confirmTitle: 'Confirm booking',
        successTitle: 'Request sent',
        successBody: "The interpreter's confirmation will arrive soon. The booking now shows under “Upcoming”.",
      },
      requestThis: 'Request this interpreter',
      rating: 'Rating',
    },
    me: {
      title: 'Me',
      identityTitle: 'Identity',
      responderNote: 'This is what a first responder sees.',
      commMode: 'Preferred communication mode',
      commModes: { ssl: 'Saudi Sign Language', text: 'Written text', voiceOff: 'Voice off' },
      medicalTitle: 'Medical & emergency profile',
      bloodType: 'Blood type',
      conditions: 'Chronic conditions',
      medications: 'Medications',
      allergies: 'Allergies',
      preferredHospital: 'Preferred hospital',
      emergencyContact: 'Emergency contact',
      editMedical: 'Edit medical profile',
      sosSettingsTitle: 'SOS settings',
      sosNumber: 'Emergency number',
      shareLocation: 'Auto-share location',
      attachMedical: 'Attach medical profile',
      notifyContacts: 'Notify contacts',
      menu: {
        history: 'History',
        community: 'Community',
        deafChat: 'Deaf Chat',
        docAssistant: 'Form Assistant',
        settings: 'Settings',
      },
      settingsTitle: 'Settings',
      language: 'Language',
      textSize: 'Text size',
      textSizes: { sm: 'Small', md: 'Medium', lg: 'Large' },
      highContrast: 'High contrast',
      captionsDefault: 'Captions on by default',
      reduceMotion: 'Reduce motion',
      notifications: 'Notifications',
      installTitle: 'Add to Home Screen',
      installBody: 'Install SignWorld as an offline-capable app.',
      installBtn: 'Install app',
      installed: 'App already installed',
      about: 'About',
      aboutBody: 'SignWorld — a unified national foundation for Saudi Sign Language, conceptually aligned with Vision 2030 and the Quality of Life Program, with SDAIA as conceptual steward.',
    },
    docAssistant: {
      title: 'Document & Form Assistant',
      intro: 'Scan a government form or official letter and get it explained in sign, with guided help filling it out.',
      pickForm: 'Pick a form to try',
      scan: 'Scan the form',
      scanning: 'Reading the form…',
      scanned: 'Form recognized',
      explainTitle: 'The form, explained in sign',
      explainNext: 'Start guided fill',
      fillTitle: 'Guided fill',
      fieldOf: 'Field {n} of {total}',
      fieldPlaceholder: 'Type your answer here…',
      review: 'Review & submit',
      reviewTitle: 'Review your details',
      submit: 'Submit form',
      saveCopy: 'Save a copy',
      successTitle: 'Form submitted',
      successBody: 'A copy was saved to History. You can download it as a text file.',
    },
    community: {
      title: 'Community',
      linksTitle: 'Links & resources',
      explainInSign: 'Explain in sign',
      openExternal: 'Open site',
      forumTitle: 'Forum',
      forumReplies: 'replies',
      threadTitle: 'Thread',
      replyPlaceholder: 'Write a reply…',
      postReply: 'Post',
    },
    deafChat: {
      title: 'Deaf Chat',
      groupTag: 'Group',
      typing: 'typing…',
      inputPlaceholder: 'Type a message…',
      send: 'Send',
      videoMessage: 'Signed message',
      playSigned: 'Play',
      sendSigned: 'Signed message',
    },
    history: {
      title: 'History',
      empty: 'No activity yet',
      filters: { all: 'All', sign2text: 'Sign → Text', text2sign: 'Text → Sign', sos: 'SOS', doc: 'Documents' },
      replay: 'Replay in sign',
      clear: 'Clear history',
      kinds: { sign2text: 'Sign to Text', text2sign: 'Text to Sign', sos: 'Emergency SOS', doc: 'Form' },
    },
    onboarding: {
      skip: 'Skip',
      next: 'Next',
      start: 'Get started',
      slides: [
        { title: 'Welcome to SignWorld', body: 'Every Saudi Sign Language tool in one app — translation, bookings, and emergencies.' },
        { title: 'Translate in the moment', body: 'Point the camera to turn signing into text, or type for the avatar to sign.' },
        { title: 'Ready when you need it', body: 'The SOS button connects you to emergency services with your location, medical profile, and comm mode.' },
      ],
      nameLabel: 'Name',
      namePlaceholder: 'Enter your name',
      commLabel: 'Preferred communication mode',
    },
  },
}
