export const APP_NAME = { ar: 'التعليم', en: 'Education' }

const CLASSES = {
  ar: [
    { id: 'math5', title: 'الرياضيات · الصف الخامس', time: 'اليوم · 10:15 ص', students: 24, color: '#e8b23f', roster: ['س', 'ن', 'ع', 'م'] },
    { id: 'sci5', title: 'العلوم · الصف الخامس', time: 'غدًا · 11:00 ص', students: 22, color: '#6fb3c9', roster: ['ل', 'ي', 'ح'] },
    { id: 'ar4', title: 'اللغة العربية · الصف الرابع', time: 'الإثنين · 9:30 ص', students: 26, color: '#e0755a', roster: ['ف', 'ز', 'ط', 'ك'] },
    { id: 'art4', title: 'التربية الفنية · الصف الرابع', time: 'الأحد · 1:00 م', students: 26, color: '#8a6fd6', roster: ['ب', 'ت'] },
  ],
  en: [
    { id: 'math5', title: 'Mathematics · Grade 5', time: 'Today · 10:15 AM', students: 24, color: '#e8b23f', roster: ['S', 'N', 'A', 'M'] },
    { id: 'sci5', title: 'Science · Grade 5', time: 'Tomorrow · 11:00 AM', students: 22, color: '#6fb3c9', roster: ['L', 'Y', 'H'] },
    { id: 'ar4', title: 'Arabic · Grade 4', time: 'Monday · 9:30 AM', students: 26, color: '#e0755a', roster: ['F', 'Z', 'T', 'K'] },
    { id: 'art4', title: 'Art · Grade 4', time: 'Sunday · 1:00 PM', students: 26, color: '#8a6fd6', roster: ['B', 'R'] },
  ],
}

const AGENDA = {
  ar: [
    { label: 'مراجعة الواجب المنزلي' },
    { label: 'شرح الكسور العشرية' },
    { label: 'أمثلة تطبيقية' },
    { label: 'أسئلة الطلاب' },
    { label: 'ملخص الحصة' },
  ],
  en: [
    { label: 'Review homework' },
    { label: 'Explain decimal fractions' },
    { label: 'Worked examples' },
    { label: 'Student questions' },
    { label: 'Session summary' },
  ],
}

const QUESTION_QUEUE = {
  ar: [
    { name: 'سارة', initial: 'س', color: '#e8b23f', text: 'هل يمكن توضيح السؤال الثالث مرة أخرى؟' },
    { name: 'عمر', initial: 'ع', color: '#6fb3c9', text: 'لماذا نضرب في عشرة هنا؟' },
  ],
  en: [
    { name: 'Sarah', initial: 'S', color: '#e8b23f', text: 'Could you explain question three again?' },
    { name: 'Omar', initial: 'O', color: '#6fb3c9', text: 'Why do we multiply by ten here?' },
  ],
}

const LIBRARY = {
  ar: [
    { subject: 'الرياضيات · الصف الخامس', time: 'اليوم · 10:15 ص', mins: '42 دقيقة', qs: 3, fav: true },
    { subject: 'العلوم · الصف الخامس', time: 'أمس · 11:00 ص', mins: '38 دقيقة', qs: 5, fav: false },
    { subject: 'اللغة العربية · الصف الرابع', time: 'الإثنين · 9:30 ص', mins: '45 دقيقة', qs: 2, fav: true },
    { subject: 'التربية الفنية · الصف الرابع', time: 'الأحد · 1:00 م', mins: '30 دقيقة', qs: 1, fav: false },
    { subject: 'الرياضيات · الصف الخامس', time: 'الأسبوع الماضي', mins: '40 دقيقة', qs: 4, fav: false },
  ],
  en: [
    { subject: 'Mathematics · Grade 5', time: 'Today · 10:15 AM', mins: '42 min', qs: 3, fav: true },
    { subject: 'Science · Grade 5', time: 'Yesterday · 11:00 AM', mins: '38 min', qs: 5, fav: false },
    { subject: 'Arabic · Grade 4', time: 'Monday · 9:30 AM', mins: '45 min', qs: 2, fav: true },
    { subject: 'Art · Grade 4', time: 'Sunday · 1:00 PM', mins: '30 min', qs: 1, fav: false },
    { subject: 'Mathematics · Grade 5', time: 'Last week', mins: '40 min', qs: 4, fav: false },
  ],
}

export const CONTENT = {
  ar: {
    role: {
      eyebrow: 'مدرستي · SignWorld',
      title: 'مترجم لغة الإشارة لكل فصل',
      subtitle: 'يوقّع الرمز الرقمي كلام المعلّم فورًا، ويحوّل إشارة الطالب إلى نص وصوت.',
      teacher: { title: 'دخول المعلّم', sub: 'إدارة الفصول والحصص' },
      student: { title: 'دخول الطالب', sub: 'تصفّح الدروس واسأل بالإشارة' },
      stat: 'أكثر من 1,200 فصل متصل هذا الفصل الدراسي',
      switchRole: 'تبديل الدور',
    },
    dashboard: {
      hello: 'مرحبًا، أ. ليلى 👋',
      sub: 'لديك 4 فصول هذا الأسبوع',
      stats: [
        { value: '98', label: 'طالب' },
        { value: '12', label: 'حصة هذا الأسبوع' },
        { value: '4.8', label: 'تقييم التفاعل' },
      ],
      classesLabel: 'فصولي',
      seeAll: 'عرض الكل',
      startBtn: 'ابدأ الحصة',
      classes: CLASSES.ar,
    },
    session: {
      back: 'رجوع',
      title: 'حصة مباشرة',
      subject: 'الرياضيات · الصف الخامس',
      agendaLabel: 'خطة الحصة',
      agenda: AGENDA.ar,
      teacherLabel: 'المعلّم يتحدث',
      studentLabel: 'سؤال الطالب',
      askBtn: 'اطرح سؤالًا بالإشارة',
      hideBtn: 'إخفاء الكاميرا',
      queueLabel: 'أسئلة الطلاب المرفوعة',
      queue: QUESTION_QUEUE.ar,
      answerBtn: 'رد',
      captions: [
        'اليوم سنتعلم الكسور العشرية.',
        'لاحظوا كيف يتحول الكسر إلى عدد عشري.',
        'من يستطيع إعطائي مثالًا آخر؟',
        'أحسنت! هذه إجابة صحيحة تمامًا.',
      ],
      studentResult: 'هل يمكن توضيح السؤال الثالث مرة أخرى؟',
      endBtn: 'إنهاء الحصة',
    },
    library: {
      back: 'رجوع',
      title: 'مكتبة الدروس',
      sub: 'حصص موقّعة سابقًا وقادمة',
      tabAll: 'الكل',
      tabFav: 'المفضلة',
      items: LIBRARY.ar,
    },
    analytics: {
      back: 'رجوع',
      title: 'التحليلات',
      sub: 'التفاعل والمشاركة',
      weeklyLabel: 'دقائق الترجمة أسبوعيًا',
      weekDays: ['س', 'ح', 'ن', 'ث', 'ر', 'خ', 'ج'],
      weekValues: [22, 38, 30, 45, 40, 12, 8],
      topLabel: 'الأكثر تفاعلاً',
      leaderboard: [
        { name: 'سارة أحمد', value: '18 سؤال' },
        { name: 'عمر خالد', value: '14 سؤال' },
        { name: 'نورة سالم', value: '11 سؤال' },
      ],
      replayLabel: 'الإشارات الأكثر إعادة تشغيل',
      replaySigns: [
        { word: 'كسر', count: 42 },
        { word: 'معادلة', count: 35 },
        { word: 'مقياس', count: 28 },
      ],
    },
    settings: {
      back: 'رجوع',
      title: 'الإعدادات',
      schoolLabel: 'المدرسة',
      school: 'مدرسة الرواد الابتدائية — الرياض',
      avatarLabel: 'مظهر المترجم الرقمي',
      avatars: ['كلاسيكي', 'ودود', 'رسمي'],
      langLabel: 'اللغة',
      integration: 'متصل بمنصة مدرستي',
    },
    nav: {
      teacher: { dashboard: 'فصولي', session: 'مباشر', analytics: 'التحليلات', settings: 'الإعدادات' },
      student: { library: 'دروسي', session: 'مباشر', settings: 'الإعدادات' },
    },
  },
  en: {
    role: {
      eyebrow: 'Madrasati · SignWorld',
      title: 'A sign-language interpreter for every classroom',
      subtitle: 'The Brain signs the teacher’s voice live, and turns a student’s signing into text and speech.',
      teacher: { title: 'Teacher sign-in', sub: 'Manage classes and sessions' },
      student: { title: 'Student sign-in', sub: 'Browse lessons, ask in sign' },
      stat: 'Over 1,200 classrooms connected this term',
      switchRole: 'Switch role',
    },
    dashboard: {
      hello: 'Hi, Ms. Layla 👋',
      sub: 'You have 4 classes this week',
      stats: [
        { value: '98', label: 'Students' },
        { value: '12', label: 'Sessions this week' },
        { value: '4.8', label: 'Engagement score' },
      ],
      classesLabel: 'My classes',
      seeAll: 'See all',
      startBtn: 'Start session',
      classes: CLASSES.en,
    },
    session: {
      back: 'Back',
      title: 'Live session',
      subject: 'Mathematics · Grade 5',
      agendaLabel: 'Lesson plan',
      agenda: AGENDA.en,
      teacherLabel: 'Teacher speaking',
      studentLabel: 'Student question',
      askBtn: 'Ask a question in sign',
      hideBtn: 'Hide camera',
      queueLabel: 'Raised student questions',
      queue: QUESTION_QUEUE.en,
      answerBtn: 'Reply',
      captions: [
        'Today we’ll learn about decimal fractions.',
        'Notice how the fraction becomes a decimal.',
        'Can anyone give me another example?',
        'Well done! That’s exactly right.',
      ],
      studentResult: 'Could you explain question three again?',
      endBtn: 'End session',
    },
    library: {
      back: 'Back',
      title: 'Lesson library',
      sub: 'Past and upcoming sessions',
      tabAll: 'All',
      tabFav: 'Favorites',
      items: LIBRARY.en,
    },
    analytics: {
      back: 'Back',
      title: 'Analytics',
      sub: 'Engagement and participation',
      weeklyLabel: 'Weekly interpreting minutes',
      weekDays: ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      weekValues: [22, 38, 30, 45, 40, 12, 8],
      topLabel: 'Most engaged',
      leaderboard: [
        { name: 'Sarah Ahmed', value: '18 questions' },
        { name: 'Omar Khalid', value: '14 questions' },
        { name: 'Noura Salem', value: '11 questions' },
      ],
      replayLabel: 'Most replayed signs',
      replaySigns: [
        { word: 'Fraction', count: 42 },
        { word: 'Equation', count: 35 },
        { word: 'Scale', count: 28 },
      ],
    },
    settings: {
      back: 'Back',
      title: 'Settings',
      schoolLabel: 'School',
      school: 'Al Rowad Primary School — Riyadh',
      avatarLabel: 'Avatar style',
      avatars: ['Classic', 'Friendly', 'Formal'],
      langLabel: 'Language',
      integration: 'Connected to Madrasati platform',
    },
    nav: {
      teacher: { dashboard: 'Classes', session: 'Live', analytics: 'Analytics', settings: 'Settings' },
      student: { library: 'Lessons', session: 'Live', settings: 'Settings' },
    },
  },
}
