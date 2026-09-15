export const APP_NAME = { ar: 'عالم الأطفال', en: 'Children' }

export const MASCOTS = [
  { id: 'falcon', emoji: '🦅', name: { ar: 'صقر', en: 'Falcon' }, accent: '#0fada0' },
  { id: 'camel', emoji: '🐪', name: { ar: 'مرحوم', en: 'Marhoom' }, accent: '#f5a30f' },
  { id: 'cat', emoji: '🐱', name: { ar: 'قطقوط', en: 'Qutqut' }, accent: '#8a5cf6' },
  { id: 'lion', emoji: '🦁', name: { ar: 'أسيّد', en: 'Osayed' }, accent: '#ef5f4c' },
  { id: 'bunny', emoji: '🐰', name: { ar: 'أرنوب', en: 'Arnoub' }, accent: '#52b955' },
  { id: 'owl', emoji: '🦉', name: { ar: 'بوبو', en: 'Bobo' }, accent: '#ff8a6b' },
]

// Lesson categories: each has its own vocabulary set + accent color.
const CATEGORY_META = [
  { id: 'family', emoji: '👨‍👩‍👧', accent: '#f5a30f' },
  { id: 'animals', emoji: '🐾', accent: '#0fada0' },
  { id: 'colors', emoji: '🎨', accent: '#8a5cf6' },
  { id: 'numbers', emoji: '🔢', accent: '#ef5f4c' },
]

const CATEGORY_WORDS = {
  family: {
    ar: [
      { emoji: '👨', ar: 'أب', en: 'Father', caption: 'هذه إشارة "أب" — راقبني وكرّرها معي!' },
      { emoji: '👩', ar: 'أم', en: 'Mother', caption: 'هذه إشارة "أم" — أحسنت المتابعة!' },
      { emoji: '🧑‍🦱', ar: 'أخ', en: 'Brother', caption: 'والآن إشارة "أخ" — جرّب أنت أيضًا.' },
      { emoji: '👧', ar: 'أخت', en: 'Sister', caption: 'إشارة "أخت" — ممتاز، أنت تتعلم بسرعة!' },
      { emoji: '👴', ar: 'جد', en: 'Grandfather', caption: 'إشارة "جد" — واو، أنت نجم!' },
    ],
    en: [
      { emoji: '👨', ar: 'أب', en: 'Father', caption: 'This is the sign for "Father" — watch and copy me!' },
      { emoji: '👩', ar: 'أم', en: 'Mother', caption: 'This is the sign for "Mother" — great job following along!' },
      { emoji: '🧑‍🦱', ar: 'أخ', en: 'Brother', caption: 'Now the sign for "Brother" — you try it too.' },
      { emoji: '👧', ar: 'أخت', en: 'Sister', caption: 'The sign for "Sister" — excellent, you’re a fast learner!' },
      { emoji: '👴', ar: 'جد', en: 'Grandfather', caption: 'The sign for "Grandfather" — wow, you’re a star!' },
    ],
  },
  animals: {
    ar: [
      { emoji: '🐱', ar: 'قطة', en: 'Cat', caption: 'إشارة "قطة" — راقبني جيدًا!' },
      { emoji: '🐪', ar: 'جمل', en: 'Camel', caption: 'إشارة "جمل" — رمز جميل من صحرائنا!' },
      { emoji: '🐶', ar: 'كلب', en: 'Dog', caption: 'إشارة "كلب" — أحسنت!' },
      { emoji: '🦅', ar: 'صقر', en: 'Falcon', caption: 'إشارة "صقر" — طائرنا الوطني!' },
      { emoji: '🐰', ar: 'أرنب', en: 'Rabbit', caption: 'إشارة "أرنب" — ممتاز يا بطل!' },
    ],
    en: [
      { emoji: '🐱', ar: 'قطة', en: 'Cat', caption: 'The sign for "Cat" — watch closely!' },
      { emoji: '🐪', ar: 'جمل', en: 'Camel', caption: 'The sign for "Camel" — a lovely desert symbol!' },
      { emoji: '🐶', ar: 'كلب', en: 'Dog', caption: 'The sign for "Dog" — well done!' },
      { emoji: '🦅', ar: 'صقر', en: 'Falcon', caption: 'The sign for "Falcon" — our national bird!' },
      { emoji: '🐰', ar: 'أرنب', en: 'Rabbit', caption: 'The sign for "Rabbit" — excellent, champ!' },
    ],
  },
  colors: {
    ar: [
      { emoji: '🟩', ar: 'أخضر', en: 'Green', caption: 'إشارة "أخضر" — لون علمنا!' },
      { emoji: '🟦', ar: 'أزرق', en: 'Blue', caption: 'إشارة "أزرق" — رائع!' },
      { emoji: '🟥', ar: 'أحمر', en: 'Red', caption: 'إشارة "أحمر" — أحسنت!' },
      { emoji: '🟨', ar: 'أصفر', en: 'Yellow', caption: 'إشارة "أصفر" — ممتاز يا بطل!' },
    ],
    en: [
      { emoji: '🟩', ar: 'أخضر', en: 'Green', caption: 'The sign for "Green" — the color of our flag!' },
      { emoji: '🟦', ar: 'أزرق', en: 'Blue', caption: 'The sign for "Blue" — awesome!' },
      { emoji: '🟥', ar: 'أحمر', en: 'Red', caption: 'The sign for "Red" — well done!' },
      { emoji: '🟨', ar: 'أصفر', en: 'Yellow', caption: 'The sign for "Yellow" — great job, champ!' },
    ],
  },
  numbers: {
    ar: [
      { emoji: '1️⃣', ar: 'واحد', en: 'One', caption: 'إشارة "واحد" — هيا نبدأ العد!' },
      { emoji: '2️⃣', ar: 'اثنان', en: 'Two', caption: 'إشارة "اثنان" — أحسنت!' },
      { emoji: '3️⃣', ar: 'ثلاثة', en: 'Three', caption: 'إشارة "ثلاثة" — رائع جدًا!' },
      { emoji: '4️⃣', ar: 'أربعة', en: 'Four', caption: 'إشارة "أربعة" — ممتاز يا بطل!' },
      { emoji: '5️⃣', ar: 'خمسة', en: 'Five', caption: 'إشارة "خمسة" — أنت نجم العد!' },
    ],
    en: [
      { emoji: '1️⃣', ar: 'واحد', en: 'One', caption: 'The sign for "One" — let’s start counting!' },
      { emoji: '2️⃣', ar: 'اثنان', en: 'Two', caption: 'The sign for "Two" — well done!' },
      { emoji: '3️⃣', ar: 'ثلاثة', en: 'Three', caption: 'The sign for "Three" — awesome!' },
      { emoji: '4️⃣', ar: 'أربعة', en: 'Four', caption: 'The sign for "Four" — great job, champ!' },
      { emoji: '5️⃣', ar: 'خمسة', en: 'Five', caption: 'The sign for "Five" — you’re a counting star!' },
    ],
  },
}

const CATEGORY_TITLES = {
  ar: { family: 'العائلة', animals: 'الحيوانات', colors: 'الألوان', numbers: 'الأرقام' },
  en: { family: 'Family', animals: 'Animals', colors: 'Colors', numbers: 'Numbers' },
}

export function getCategories(lang) {
  return CATEGORY_META.map((c) => ({
    ...c,
    title: CATEGORY_TITLES[lang][c.id],
    count: CATEGORY_WORDS[c.id][lang].length,
  }))
}

export function getLessonWords(categoryId, lang) {
  return CATEGORY_WORDS[categoryId]?.[lang] ?? CATEGORY_WORDS.family[lang]
}

// Mini-game: "which sign means X?" quiz pairs (emoji target + 3 choices).
const QUIZ_ITEMS = {
  ar: [
    {
      prompt: 'أي إشارة تعني "شمس"؟', emoji: '☀️', answer: 'شمس',
      choices: [{ label: 'شمس', emoji: '☀️' }, { label: 'قمر', emoji: '🌙' }, { label: 'نجمة', emoji: '⭐' }],
    },
    {
      prompt: 'أي إشارة تعني "كلب"؟', emoji: '🐶', answer: 'كلب',
      choices: [{ label: 'أرنب', emoji: '🐰' }, { label: 'كلب', emoji: '🐶' }, { label: 'طائر', emoji: '🐦' }],
    },
    {
      prompt: 'أي إشارة تعني "تفاحة"؟', emoji: '🍎', answer: 'تفاحة',
      choices: [{ label: 'موزة', emoji: '🍌' }, { label: 'عنب', emoji: '🍇' }, { label: 'تفاحة', emoji: '🍎' }],
    },
    {
      prompt: 'أي إشارة تعني "أزرق"؟', emoji: '🟦', answer: 'أزرق',
      choices: [{ label: 'أزرق', emoji: '🟦' }, { label: 'أحمر', emoji: '🟥' }, { label: 'أصفر', emoji: '🟨' }],
    },
    {
      prompt: 'أي إشارة تعني "جمل"؟', emoji: '🐪', answer: 'جمل',
      choices: [{ label: 'حصان', emoji: '🐴' }, { label: 'جمل', emoji: '🐪' }, { label: 'فيل', emoji: '🐘' }],
    },
    {
      prompt: 'أي إشارة تعني "ثلاثة"؟', emoji: '3️⃣', answer: 'ثلاثة',
      choices: [{ label: 'واحد', emoji: '1️⃣' }, { label: 'خمسة', emoji: '5️⃣' }, { label: 'ثلاثة', emoji: '3️⃣' }],
    },
    {
      prompt: 'أي إشارة تعني "أم"؟', emoji: '👩', answer: 'أم',
      choices: [{ label: 'أم', emoji: '👩' }, { label: 'أخت', emoji: '👧' }, { label: 'جدة', emoji: '👵' }],
    },
    {
      prompt: 'أي إشارة تعني "أخضر"؟', emoji: '🟩', answer: 'أخضر',
      choices: [{ label: 'بنفسجي', emoji: '🟪' }, { label: 'أخضر', emoji: '🟩' }, { label: 'برتقالي', emoji: '🟧' }],
    },
  ],
  en: [
    {
      prompt: 'Which sign means "Sun"?', emoji: '☀️', answer: 'Sun',
      choices: [{ label: 'Sun', emoji: '☀️' }, { label: 'Moon', emoji: '🌙' }, { label: 'Star', emoji: '⭐' }],
    },
    {
      prompt: 'Which sign means "Dog"?', emoji: '🐶', answer: 'Dog',
      choices: [{ label: 'Rabbit', emoji: '🐰' }, { label: 'Dog', emoji: '🐶' }, { label: 'Bird', emoji: '🐦' }],
    },
    {
      prompt: 'Which sign means "Apple"?', emoji: '🍎', answer: 'Apple',
      choices: [{ label: 'Banana', emoji: '🍌' }, { label: 'Grapes', emoji: '🍇' }, { label: 'Apple', emoji: '🍎' }],
    },
    {
      prompt: 'Which sign means "Blue"?', emoji: '🟦', answer: 'Blue',
      choices: [{ label: 'Blue', emoji: '🟦' }, { label: 'Red', emoji: '🟥' }, { label: 'Yellow', emoji: '🟨' }],
    },
    {
      prompt: 'Which sign means "Camel"?', emoji: '🐪', answer: 'Camel',
      choices: [{ label: 'Horse', emoji: '🐴' }, { label: 'Camel', emoji: '🐪' }, { label: 'Elephant', emoji: '🐘' }],
    },
    {
      prompt: 'Which sign means "Three"?', emoji: '3️⃣', answer: 'Three',
      choices: [{ label: 'One', emoji: '1️⃣' }, { label: 'Five', emoji: '5️⃣' }, { label: 'Three', emoji: '3️⃣' }],
    },
    {
      prompt: 'Which sign means "Mother"?', emoji: '👩', answer: 'Mother',
      choices: [{ label: 'Mother', emoji: '👩' }, { label: 'Sister', emoji: '👧' }, { label: 'Grandmother', emoji: '👵' }],
    },
    {
      prompt: 'Which sign means "Green"?', emoji: '🟩', answer: 'Green',
      choices: [{ label: 'Purple', emoji: '🟪' }, { label: 'Green', emoji: '🟩' }, { label: 'Orange', emoji: '🟧' }],
    },
  ],
}

const BADGES = {
  ar: [
    { icon: 'star', title: 'أول إشارة', earned: true },
    { icon: 'flame', title: '٧ أيام متتالية', earned: true },
    { icon: 'trophy', title: 'بطل الكلمات', earned: true },
    { icon: 'paw', title: 'صديق الحيوانات', earned: true },
    { icon: 'heart', title: 'صديق العائلة', earned: false },
    { icon: 'gift', title: '٥٠ إشارة', earned: false },
    { icon: 'palette', title: 'خبير الألوان', earned: false },
    { icon: 'sparkle', title: 'نجم الأسبوع', earned: false },
  ],
  en: [
    { icon: 'star', title: 'First Sign', earned: true },
    { icon: 'flame', title: '7-Day Streak', earned: true },
    { icon: 'trophy', title: 'Word Champion', earned: true },
    { icon: 'paw', title: 'Animal Friend', earned: true },
    { icon: 'heart', title: 'Family Friend', earned: false },
    { icon: 'gift', title: '50 Signs', earned: false },
    { icon: 'palette', title: 'Color Expert', earned: false },
    { icon: 'sparkle', title: 'Star of the Week', earned: false },
  ],
}

export const CONTENT = {
  ar: {
    onboard: {
      title: 'من أنت يا بطل؟ 🌟',
      sub: 'اختر رفيقك واكتب اسمك لنبدأ المغامرة!',
      namePlaceholder: 'اكتب اسمك هنا...',
      startBtn: 'هيا نبدأ! 🚀',
    },
    home: {
      eyebrow: 'عالم الإشارة · SignWorld',
      title: 'أهلاً يا {name}! 🌟',
      titleFallback: 'تعلّم لغة الإشارة يا بطل! 🌟',
      subtitle: 'قصص وألعاب ممتعة تساعدك أنت وعائلتك على التحدث بلغة الإشارة السعودية معًا.',
      parent: { title: 'دخول الوالدين', sub: 'تابع تقدّم طفلك' },
      child: { title: 'دخول الطفل', sub: 'العب وتعلّم إشارات جديدة' },
      stat: 'أكثر من 4,000 طفل يتعلمون مع مرحوم كل يوم',
      mascotIdle: 'جاهز للعب · Idle',
      changeMascot: 'تغيير الرفيق',
    },
    categories: {
      back: 'رجوع',
      title: 'اختر قصتك',
      subject: 'كل فئة فيها كلمات جديدة',
      wordsCount: 'كلمات',
    },
    lesson: {
      back: 'رجوع',
      title: 'قصة اليوم',
      wordLabel: 'كلمة اليوم',
      of: 'من',
      replay: 'أعد الإشارة',
      playing: 'يشير الآن…',
      prevBtn: 'السابق',
      nextBtn: 'التالي',
      finishBtn: 'أنهيت! اذهب للعب 🎮',
    },
    game: {
      back: 'رجوع',
      title: 'لعبة خمّن الإشارة',
      subject: 'اختر الإشارة الصحيحة',
      scoreLabel: 'النقاط',
      streakLabel: 'متتالية',
      promptLabel: 'أي إشارة تعني هذه؟',
      correctFeedback: ['أحسنت! 🎉', 'رائع جدًا! ⭐', 'ممتاز يا بطل! 🏆', 'إجابة صحيحة! 🥳'],
      wrongFeedback: 'قريب جدًا! حاول مرة أخرى 💪',
      nextBtn: 'السؤال التالي',
      doneTitle: 'أنهيت كل الأسئلة! 🎊',
      doneBody: 'أداء رائع! عد إلى الرئيسية أو أعد اللعب مرة أخرى.',
      restartBtn: 'العب مرة أخرى',
      items: QUIZ_ITEMS.ar,
    },
    progress: {
      back: 'رجوع',
      title: 'إنجازاتي',
      subject: 'الأوسمة والتقدّم',
      streakNum: '٧',
      streakLabel: 'أيام متتالية 🔥',
      badgesLabel: 'أوسمتي',
      parentTitle: 'ملخص للوالدين',
      parentBody: 'تدرّب طفلك على لغة الإشارة لمدة 38 دقيقة هذا الأسبوع عبر 5 جلسات — تقدّم رائع!',
      badges: BADGES.ar,
    },
    nav: { lesson: 'القصة', game: 'اللعبة', progress: 'إنجازاتي' },
  },
  en: {
    onboard: {
      title: 'Who are you, champ? 🌟',
      sub: 'Pick your buddy and tell us your name to start the adventure!',
      namePlaceholder: 'Type your name...',
      startBtn: 'Let’s go! 🚀',
    },
    home: {
      eyebrow: 'SignWorld · Children',
      title: 'Hi {name}! 🌟',
      titleFallback: 'Learn Sign Language, Champ! 🌟',
      subtitle: 'Fun stories and games that help you and your family speak Saudi Sign Language together.',
      parent: { title: 'Parent sign-in', sub: 'Track your child’s progress' },
      child: { title: 'Child sign-in', sub: 'Play and learn new signs' },
      stat: 'Over 4,000 children learning with Marhoom every day',
      mascotIdle: 'Ready to play · Idle',
      changeMascot: 'Change buddy',
    },
    categories: {
      back: 'Back',
      title: 'Choose your story',
      subject: 'Every category has new words',
      wordsCount: 'words',
    },
    lesson: {
      back: 'Back',
      title: 'Today’s Story',
      wordLabel: 'Word of the day',
      of: 'of',
      replay: 'Replay sign',
      playing: 'Signing now…',
      prevBtn: 'Previous',
      nextBtn: 'Next',
      finishBtn: 'All done! Go play 🎮',
    },
    game: {
      back: 'Back',
      title: 'Guess the Sign',
      subject: 'Pick the matching sign',
      scoreLabel: 'Score',
      streakLabel: 'Streak',
      promptLabel: 'Which sign means this?',
      correctFeedback: ['Well done! 🎉', 'Awesome! ⭐', 'Great job, champ! 🏆', 'That’s right! 🥳'],
      wrongFeedback: 'So close! Try again 💪',
      nextBtn: 'Next question',
      doneTitle: 'You finished every question! 🎊',
      doneBody: 'Amazing work! Head home or play again.',
      restartBtn: 'Play again',
      items: QUIZ_ITEMS.en,
    },
    progress: {
      back: 'Back',
      title: 'My Achievements',
      subject: 'Badges & progress',
      streakNum: '7',
      streakLabel: 'day streak 🔥',
      badgesLabel: 'My badges',
      parentTitle: 'Parent summary',
      parentBody: 'Your child practiced sign language for 38 minutes this week across 5 sessions — great progress!',
      badges: BADGES.en,
    },
    nav: { lesson: 'Story', game: 'Game', progress: 'Progress' },
  },
}
