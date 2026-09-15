export const APP_NAME = { ar: 'السلامة العامة', en: 'Public Safety' }

const INCIDENT_TYPES = {
  ar: [
    { id: 'fire', icon: 'flame', title: 'حريق', sub: 'دفاع مدني', color: '#e13b34' },
    { id: 'medical', icon: 'cross', title: 'طبي', sub: 'إسعاف', color: '#3fb8d9' },
    { id: 'crime', icon: 'alertOctagon', title: 'أمني', sub: 'شرطة', color: '#8a6fd6' },
    { id: 'traffic', icon: 'car', title: 'مروري', sub: 'حادث طريق', color: '#e3a83b' },
  ],
  en: [
    { id: 'fire', icon: 'flame', title: 'Fire', sub: 'Civil defense', color: '#e13b34' },
    { id: 'medical', icon: 'cross', title: 'Medical', sub: 'Ambulance', color: '#3fb8d9' },
    { id: 'crime', icon: 'alertOctagon', title: 'Security', sub: 'Police', color: '#8a6fd6' },
    { id: 'traffic', icon: 'car', title: 'Traffic', sub: 'Road incident', color: '#e3a83b' },
  ],
}

const MAP_UNITS = {
  ar: [
    { id: 'u1', icon: 'ambulance', color: '#3fb8d9', x: 28, y: 32 },
    { id: 'u2', icon: 'car', color: '#e3a83b', x: 72, y: 40 },
    { id: 'u3', icon: 'flame', color: '#e13b34', x: 60, y: 75 },
  ],
  en: [
    { id: 'u1', icon: 'ambulance', color: '#3fb8d9', x: 28, y: 32 },
    { id: 'u2', icon: 'car', color: '#e3a83b', x: 72, y: 40 },
    { id: 'u3', icon: 'flame', color: '#e13b34', x: 60, y: 75 },
  ],
}

const DISPATCH_UNITS = {
  ar: [
    { id: 'AMB-12', name: 'إسعاف ١٢', icon: 'ambulance', color: '#3fb8d9', status: 'enroute', meta: 'يصل خلال 4 د' },
    { id: 'PTR-07', name: 'دورية ٠٧', icon: 'car', color: '#e3a83b', status: 'onscene', meta: 'في الموقع منذ 2 د' },
    { id: 'FIR-03', name: 'إطفاء ٠٣', icon: 'flame', color: '#e13b34', status: 'available', meta: 'جاهزة للانتشار' },
    { id: 'AMB-05', name: 'إسعاف ٠٥', icon: 'ambulance', color: '#3fb8d9', status: 'available', meta: 'جاهزة للانتشار' },
    { id: 'PTR-11', name: 'دورية ١١', icon: 'car', color: '#e3a83b', status: 'enroute', meta: 'يصل خلال 7 د' },
  ],
  en: [
    { id: 'AMB-12', name: 'Ambulance 12', icon: 'ambulance', color: '#3fb8d9', status: 'enroute', meta: 'ETA 4 min' },
    { id: 'PTR-07', name: 'Patrol 07', icon: 'car', color: '#e3a83b', status: 'onscene', meta: 'On scene 2 min' },
    { id: 'FIR-03', name: 'Fire Unit 03', icon: 'flame', color: '#e13b34', status: 'available', meta: 'Ready to dispatch' },
    { id: 'AMB-05', name: 'Ambulance 05', icon: 'ambulance', color: '#3fb8d9', status: 'available', meta: 'Ready to dispatch' },
    { id: 'PTR-11', name: 'Patrol 11', icon: 'car', color: '#e3a83b', status: 'enroute', meta: 'ETA 7 min' },
  ],
}

const INCIDENT_LOG = {
  ar: [
    {
      id: '24417', kind: 'بلاغ حريق', loc: 'حي النرجس · الرياض', time: 'اليوم · 09:12 ص', status: 'resolved',
      transcript: 'يوجد دخان كثيف من الطابق الثالث في المبنى، الرجاء الإسراع.',
      unit: 'إطفاء ٠٣', timeline: [
        { time: '09:12', text: 'تم استلام البلاغ عبر الرمز الرقمي' },
        { time: '09:14', text: 'تم توجيه فريق الإطفاء ٠٣' },
        { time: '09:21', text: 'وصل الفريق إلى الموقع' },
        { time: '09:48', text: 'تم احتواء الحريق — البلاغ مغلق' },
      ],
    },
    {
      id: '24418', kind: 'حادث مروري', loc: 'طريق الملك عبدالله · جدة', time: 'اليوم · 08:40 ص', status: 'inprogress',
      transcript: 'اصطدام بين مركبتين، يوجد شخص عالق داخل السيارة.',
      unit: 'دورية ١١', timeline: [
        { time: '08:40', text: 'تم استلام البلاغ عبر الرمز الرقمي' },
        { time: '08:42', text: 'تم توجيه الدورية ١١ وإسعاف ١٢' },
        { time: '08:49', text: 'الوحدات في الطريق إلى الموقع' },
      ],
    },
    {
      id: '24419', kind: 'بلاغ طبي', loc: 'حي العليا · الرياض', time: 'أمس · 06:55 م', status: 'resolved',
      transcript: 'كبير السن يعاني من صعوبة في التنفس.',
      unit: 'إسعاف ٠٥', timeline: [
        { time: '18:55', text: 'تم استلام البلاغ عبر الرمز الرقمي' },
        { time: '18:57', text: 'تم توجيه إسعاف ٠٥' },
        { time: '19:03', text: 'تم نقل المريض إلى المستشفى — البلاغ مغلق' },
      ],
    },
    {
      id: '24420', kind: 'استفسار عام', loc: 'حي الشفا · مكة المكرمة', time: 'أمس · 02:20 م', status: 'resolved',
      transcript: 'استفسار حول إجراءات الإخلاء في حالات الطوارئ.',
      unit: '—', timeline: [
        { time: '14:20', text: 'تم استلام البلاغ عبر الرمز الرقمي' },
        { time: '14:23', text: 'تم الرد على الاستفسار — البلاغ مغلق' },
      ],
    },
    {
      id: '24421', kind: 'بلاغ سلامة', loc: 'الكورنيش · الدمام', time: 'الإثنين · 11:05 ص', status: 'inprogress',
      transcript: 'سلوك مشبوه بالقرب من موقف السيارات الرئيسي.',
      unit: 'دورية ٠٧', timeline: [
        { time: '11:05', text: 'تم استلام البلاغ عبر الرمز الرقمي' },
        { time: '11:07', text: 'تم توجيه الدورية ٠٧' },
        { time: '11:12', text: 'الدورية في الموقع، جارٍ التحقق' },
      ],
    },
  ],
  en: [
    {
      id: '24417', kind: 'Fire report', loc: 'Al Narjis · Riyadh', time: 'Today · 09:12 AM', status: 'resolved',
      transcript: 'Heavy smoke coming from the third floor of the building, please hurry.',
      unit: 'Fire Unit 03', timeline: [
        { time: '09:12', text: 'Report received via the Brain' },
        { time: '09:14', text: 'Fire Unit 03 dispatched' },
        { time: '09:21', text: 'Unit arrived on scene' },
        { time: '09:48', text: 'Fire contained — report closed' },
      ],
    },
    {
      id: '24418', kind: 'Traffic incident', loc: 'King Abdullah Rd · Jeddah', time: 'Today · 08:40 AM', status: 'inprogress',
      transcript: 'Two-vehicle collision, one person trapped inside the car.',
      unit: 'Patrol 11', timeline: [
        { time: '08:40', text: 'Report received via the Brain' },
        { time: '08:42', text: 'Patrol 11 and Ambulance 12 dispatched' },
        { time: '08:49', text: 'Units en route to scene' },
      ],
    },
    {
      id: '24419', kind: 'Medical report', loc: 'Al Olaya · Riyadh', time: 'Yesterday · 06:55 PM', status: 'resolved',
      transcript: 'Elderly patient experiencing difficulty breathing.',
      unit: 'Ambulance 05', timeline: [
        { time: '18:55', text: 'Report received via the Brain' },
        { time: '18:57', text: 'Ambulance 05 dispatched' },
        { time: '19:03', text: 'Patient transported to hospital — report closed' },
      ],
    },
    {
      id: '24420', kind: 'General inquiry', loc: 'Al Shifa · Makkah', time: 'Yesterday · 02:20 PM', status: 'resolved',
      transcript: 'Inquiry about emergency evacuation procedures.',
      unit: '—', timeline: [
        { time: '14:20', text: 'Report received via the Brain' },
        { time: '14:23', text: 'Inquiry answered — report closed' },
      ],
    },
    {
      id: '24421', kind: 'Safety report', loc: 'Corniche · Dammam', time: 'Monday · 11:05 AM', status: 'inprogress',
      transcript: 'Suspicious activity near the main parking area.',
      unit: 'Patrol 07', timeline: [
        { time: '11:05', text: 'Report received via the Brain' },
        { time: '11:07', text: 'Patrol 07 dispatched' },
        { time: '11:12', text: 'Patrol on scene, verifying' },
      ],
    },
  ],
}

export const CONTENT = {
  ar: {
    home: {
      eyebrow: 'الخدمات الطارئة · SignWorld',
      title: 'بلاغك يُترجم فورًا بلغة الإشارة',
      subtitle: 'يربطك الرمز الرقمي بمركز البلاغات مباشرة، ويحوّل إشارتك إلى نص وصوت للمستجيب خلال ثوانٍ.',
      startTitle: 'بلاغ طارئ',
      startSub: 'اتصال فوري بمركز البلاغات',
      startBtn: 'ابدأ البلاغ',
      stat: 'متاح على مدار الساعة · تغطية جميع مناطق المملكة',
      trust: 'مرتبط رسميًا بمنصات الخدمات الطارئة الوطنية',
      status: { label: 'النظام متصل', node: 'مركز البلاغات · الرياض' },
    },
    incidentPicker: {
      back: 'رجوع',
      title: 'نوع البلاغ',
      subject: 'اختر التصنيف الأنسب',
      types: INCIDENT_TYPES.ar,
      nextBtn: 'متابعة إلى المكالمة',
    },
    live: {
      back: 'رجوع',
      badge: 'مكالمة نشطة',
      title: 'مكالمة طارئة',
      subject: 'بلاغ رقم ٢٤٤١٧',
      callerLabel: 'المتصل يشير',
      dispatchLabel: 'رد المستجيب',
      askBtn: 'فتح كاميرا المتصل',
      callerResult: 'يوجد إصابة طفيفة، والموقع في شارع الملك فهد بالقرب من الإشارة الثالثة.',
      captions: [
        'تم استلام بلاغك، فريق الإسعاف في الطريق إليك الآن.',
        'حافظ على هدوئك وابقَ في مكانك إن أمكن.',
        'هل يوجد أي إصابات أخرى بجانبك؟',
        'الفريق سيصل خلال خمس دقائق تقريبًا.',
      ],
      quickReplies: ['الفريق في الطريق إليك', 'ابقَ على الخط من فضلك', 'هل الموقع آمن الآن؟', 'تم تحديد موقعك بنجاح'],
      inputPlaceholder: 'اكتب ردًا للمتصل…',
      sendBtn: 'إرسال',
      endBtn: 'عرض الموقع على الخريطة',
    },
    map: {
      back: 'رجوع',
      title: 'موقع البلاغ',
      subject: 'بلاغ رقم ٢٤٤١٧',
      label: 'شارع الملك فهد',
      eta: '4 د',
      unitsLabel: 'الوحدات القريبة',
      nextBtn: 'إرسال إلى لوحة الانتشار',
      units: MAP_UNITS.ar,
    },
    dispatch: {
      back: 'رجوع',
      title: 'لوحة الانتشار',
      sub: 'حالة الوحدات المتاحة الآن',
      statusLabel: { available: 'متاحة', enroute: 'في الطريق', onscene: 'في الموقع' },
      units: DISPATCH_UNITS.ar,
    },
    broadcast: {
      back: 'رجوع',
      liveBadge: 'البث المباشر',
      title: 'بث وطني',
      subject: 'تنبيه الطقس · الأمانة العامة',
      captionLabel: 'المذيع الرقمي يوقّع',
      captions: [
        'تنبيه من المركز الوطني للأرصاد: أجواء شديدة الحرارة اليوم في المنطقة الوسطى.',
        'يُنصح بتجنّب التعرض المباشر للشمس بين الساعة الحادية عشرة صباحًا والرابعة عصرًا.',
        'يرجى شرب كميات كافية من الماء وتجنّب المجهود البدني في الخارج.',
        'للاستفسار أو الإبلاغ عن حالات الإجهاد الحراري، تواصل مع الرقم الموحّد للخدمات الطارئة.',
      ],
      pauseBtn: 'إيقاف مؤقت',
      resumeBtn: 'استئناف',
    },
    status: {
      back: 'رجوع',
      title: 'سجل البلاغات',
      sub: 'حالة البلاغات الأخيرة في مركزك',
      statusLabel: { resolved: 'تم الحل', inprogress: 'قيد المعالجة' },
      items: INCIDENT_LOG.ar,
    },
    incidentDetail: {
      statusLabel: { resolved: 'تم الحل', inprogress: 'قيد المعالجة' },
      transcriptLabel: 'نص الإشارة',
      unitLabel: 'الوحدة المسؤولة',
      timelineLabel: 'الجدول الزمني',
      closeBtn: 'إغلاق',
    },
    nav: { live: 'مكالمة', broadcast: 'البث', dispatch: 'الانتشار', status: 'السجل' },
  },
  en: {
    home: {
      eyebrow: 'Emergency Services · SignWorld',
      title: 'Your report, signed instantly',
      subtitle: 'The Brain connects you directly to the dispatch center, turning your signing into text and speech for the responder in seconds.',
      startTitle: 'Emergency report',
      startSub: 'Immediate connection to dispatch',
      startBtn: 'Start report',
      stat: 'Available around the clock · coverage across the Kingdom',
      trust: 'Officially linked to national emergency service platforms',
      status: { label: 'System online', node: 'Dispatch Center · Riyadh' },
    },
    incidentPicker: {
      back: 'Back',
      title: 'Incident Type',
      subject: 'Select the closest match',
      types: INCIDENT_TYPES.en,
      nextBtn: 'Continue to call',
    },
    live: {
      back: 'Back',
      badge: 'Active call',
      title: 'Emergency call',
      subject: 'Report #24417',
      callerLabel: 'Caller signing',
      dispatchLabel: 'Dispatch reply',
      askBtn: 'Open caller camera',
      callerResult: 'There is a minor injury, location is King Fahd Street near the third signal.',
      captions: [
        'Your report has been received, an ambulance team is on the way to you now.',
        'Stay calm and remain where you are if possible.',
        'Are there any other injuries near you?',
        'The team will arrive in about five minutes.',
      ],
      quickReplies: ['Help is on the way', 'Please stay on the line', 'Is the location safe now?', 'Your location has been confirmed'],
      inputPlaceholder: 'Type a reply to the caller…',
      sendBtn: 'Send',
      endBtn: 'View location on map',
    },
    map: {
      back: 'Back',
      title: 'Incident Location',
      subject: 'Report #24417',
      label: 'King Fahd Street',
      eta: '4 min',
      unitsLabel: 'Nearby units',
      nextBtn: 'Send to dispatch board',
      units: MAP_UNITS.en,
    },
    dispatch: {
      back: 'Back',
      title: 'Dispatch Board',
      sub: 'Status of currently available units',
      statusLabel: { available: 'Available', enroute: 'En route', onscene: 'On scene' },
      units: DISPATCH_UNITS.en,
    },
    broadcast: {
      back: 'Back',
      liveBadge: 'Live broadcast',
      title: 'National broadcast',
      subject: 'Weather advisory · General Authority',
      captionLabel: 'Digital anchor signing',
      captions: [
        'Advisory from the National Center for Meteorology: extreme heat expected today across the central region.',
        'Avoid direct sun exposure between 11:00 AM and 4:00 PM.',
        'Drink water regularly and avoid strenuous outdoor activity.',
        'For inquiries or to report heat-related incidents, contact the unified emergency number.',
      ],
      pauseBtn: 'Pause',
      resumeBtn: 'Resume',
    },
    status: {
      back: 'Back',
      title: 'Incident log',
      sub: 'Status of recent reports in your center',
      statusLabel: { resolved: 'Resolved', inprogress: 'In progress' },
      items: INCIDENT_LOG.en,
    },
    incidentDetail: {
      statusLabel: { resolved: 'Resolved', inprogress: 'In progress' },
      transcriptLabel: 'Signed transcript',
      unitLabel: 'Responding unit',
      timelineLabel: 'Timeline',
      closeBtn: 'Close',
    },
    nav: { live: 'Call', broadcast: 'Broadcast', dispatch: 'Units', status: 'Log' },
  },
}
