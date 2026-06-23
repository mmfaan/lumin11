/**
 * js/i18n.js
 * Bilingual support: Arabic (RTL) ↔ English (LTR).
 * Usage: import { applyLang, t } from './i18n.js';
 */

export let LANG = 'ar';

const TRANSLATIONS = {
  ar: {
    'brand.sub': 'مجموعة لومين انفينيتي',
    'nav.home': 'الرئيسية', 'nav.about': 'من نحن', 'nav.sectors': 'القطاعات',
    'nav.live': 'المرصد الحي', 'nav.lab': 'المختبر', 'nav.president': 'الرئيس', 'nav.contact': 'تواصل',
    'cmdk.trigger': 'بحث سريع', 'cmdk.placeholder': 'ابحث أو انتقل إلى قسم...',
    'hero.kicker': 'مجموعة عراقية متخصصة في التقنيات الحساسة',
    'hero.h1a': 'نضيء الحدود', 'hero.h1b': 'الرقمية اللانهائية',
    'hero.btn1': 'استكشف القطاعات', 'hero.btn2': 'تعرّف على الرئيس',
    'hero.meta1': 'قطاعات تخصصية', 'hero.meta2': 'سنة الانطلاق',
    'hero.meta3val': 'العراق', 'hero.meta3': 'قاعدة التأسيس', 'hero.meta4': 'سقف الطموح',
    'mq.1': 'الأمن السيبراني', 'mq.2': 'الذكاء الاصطناعي', 'mq.3': 'الدراسات والأبحاث',
    'mq.4': 'الحلول التقنية', 'mq.5': 'استجابة الحوادث', 'mq.6': 'تحليل التهديدات',
    'mq.7': 'معالجة اللغة العربية', 'mq.8': 'البنية التحتية السحابية',
    'about.eyebrow': 'من نحن',
    'about.h2': 'رؤية واحدة، <em>أقسام لا نهائية</em> من الإمكانات',
    'about.p1': '"لومين" تعني الضوء، و"انفينيتي" تعني اللانهاية — وهذا بالضبط ما نسعى إليه.',
    'about.p2': 'تأسست المجموعة من قلب البصرة بقناعة أن المعرفة التقنية الحقيقية لا تنتظر الإذن لتبدأ.',
    'radar.eyebrow': 'خريطة التركيز', 'radar.h3': 'توزيع تركيز المجموعة عبر محاورها الخمسة',
    'radar.p': 'رسم بياني توضيحي تقريبي لمحاور اهتمام المجموعة الحالية.',
    'sectors.eyebrow': 'القطاعات الأربعة',
    'sectors.h2': 'كل تحدٍّ تقني، <em>له قسم مخصص</em>',
    'sectors.lede': 'أربعة أقسام تعمل بتناغم تحت مظلة لومين انفينيتي.',
    'sec.c1.h': 'لومين سايبر', 'sec.c1.p': 'حماية البنى الرقمية واختبار الاختراق ومراقبة التهديدات.',
    'sec.c2.h': 'لومين للذكاء الاصطناعي', 'sec.c2.p': 'نماذج تعلّم آلي ومعالجة لغة طبيعية عربية.',
    'sec.c3.h': 'لومين ريسيرش', 'sec.c3.p': 'دراسات وأوراق بحثية في التقنية والأمن الرقمي.',
    'sec.c4.h': 'لومين سيستمز', 'sec.c4.p': 'حلول برمجية وبنية تحتية سحابية متينة.',
    'live.banner': 'متصل الآن بالشبكة العالمية', 'live.eyebrow': 'المرصد الحي',
    'live.h2': 'بيانات <em>حقيقية</em>، لحظة بلحظة',
    'live.ipTitle': 'بصمتك الرقمية الآن', 'live.ip': 'عنوان IP', 'live.country': 'الدولة',
    'live.city': 'المدينة', 'live.isp': 'مزوّد الخدمة', 'live.browser': 'المتصفح', 'live.os': 'نظام التشغيل',
    'live.ipNote': 'بيانات تقريبية تُجلب لحظياً عبر خادم الموقع.',
    'live.cryptoTitle': 'نبض الأسواق التقنية', 'live.cryptoNote': 'مصدر مفتوح، يُحدَّث عند تحميل الصفحة.',
    'live.mapCaption': 'تصوّر مفاهيمي تزييني لنشاط الشبكة',
    'lab.eyebrow': 'المختبر التفاعلي',
    'lab.h2': 'جرّب <em>أدواتنا</em> مباشرة من المتصفح',
    'lab.lede': 'ثلاث أدوات تعليمية صغيرة تعمل بالكامل محلياً داخل متصفحك.',
    'lab.cipher.title': 'مختبر التشفير الكلاسيكي', 'lab.cipher.encode': 'تشفير', 'lab.cipher.decode': 'فك تشفير',
    'lab.cipher.shift': 'الإزاحة', 'lab.cipher.tip': 'شيفرة قيصر — تعمل على الأحرف اللاتينية فقط.',
    'lab.pw.title': 'محلّل قوة كلمة المرور', 'lab.pw.empty': 'بانتظار الإدخال...',
    'lab.pw.note': 'لا تُخزَّن أو تُرسَل كلمة المرور — التحليل محلي بالكامل.',
    'lab.pw.tipDefault': 'جرّب مزج الأحرف الكبيرة والصغيرة والأرقام والرموز.',
    'lab.morse.title': 'مترجم الشيفرة المورس', 'lab.morse.tip': 'تحويل لحظي للحروف والأرقام اللاتينية.',
    'num.1': 'سنة انطلاق الرؤية', 'num.2': 'قطاعات تخصصية', 'num.3': 'أدوات في المختبر',
    'num.4': 'تركيز على الجودة', 'num.5': 'سقف الطموح',
    'research.eyebrow': 'الدراسات والأبحاث', 'research.h2': 'أفكار قيد <em>التحويل إلى معرفة</em>',
    'research.status': 'قيد الإعداد',
    'research.p1.h': 'مستقبل الأمن السيبراني في العراق والمنطقة حتى 2030',
    'research.p2.h': 'الذكاء الاصطناعي التوليدي وأثره على المحتوى العربي',
    'research.p3.h': 'نحو بنية تحتية سيبرانية عراقية أكثر استقلالية',
    'research.p4.h': 'قراءة في أنماط التهديدات المستمرة المتقدمة إقليمياً',
    'research.p5.h': 'أخلاقيات استخدام البيانات في أنظمة الذكاء الاصطناعي العربية',
    'research.p6.h': 'سد فجوة المهارات السيبرانية لدى الجيل الشاب في العراق',
    'quote.1.p': '"المعرفة التقنية الحقيقية لا تنتظر إذناً لتبدأ — هي تُبنى يداً بيد، خطوة بخطوة."',
    'quote.1.s': '— فلسفة لومين انفينيتي',
    'quote.2.p': '"الأمن الحقيقي ليس غياب الهجوم، بل الجاهزية الدائمة لمواجهته."',
    'quote.2.s': '— قسم لومين سايبر',
    'quote.3.p': '"الذكاء الاصطناعي أداة تُضخّم القرار البشري، لا تُلغيه."',
    'quote.3.s': '— قسم لومين للذكاء الاصطناعي',
    'quote.4.p': '"البحث الجاد اليوم هو القرار الصائب غداً."',
    'quote.4.s': '— قسم لومين ريسيرش',
    'journey.eyebrow': 'المسيرة', 'journey.h2': 'من فكرة في <em>البصرة</em>، إلى رؤية بلا حدود',
    'pres.eyebrow': 'الرئيس', 'pres.role': 'رئيس مجلس إدارة مجموعة لومين انفينيتي',
    'pres.title': 'رئيس مجلس إدارة مجموعة شركات لومين انفينيتي',
    'pres.quote': '"لا تنتظر أن يمنحوك الفرصة — ابنِها بنفسك، وابدأ من حيث أنت الآن."',
    'pres.f1': 'معدل الإعفاء العام', 'pres.f2': 'كتاباً مقروءاً', 'pres.f3': 'نصاً ومقالاً',
    'pres.btn1': 'زيارة الموقع الشخصي', 'pres.btn2': 'تواصل مع المجموعة',
    'careers.eyebrow': 'انضم إلينا', 'careers.h2': 'نبحث عن عقول <em>لا تنتظر الإذن</em> لتبدأ',
    'careers.btn': 'راسلنا الآن',
    'faq.eyebrow': 'أسئلة شائعة', 'faq.h2': 'أسئلة قد <em>تدور في ذهنك</em>',
    'faq.q1': 'ما الذي يميز لومين انفينيتي عن غيرها؟',
    'faq.a1': 'الجمع بين الأمن السيبراني، الذكاء الاصطناعي، والبحث العلمي — بهوية عراقية خالصة.',
    'faq.q2': 'هل المختبر التفاعلي آمن للاستخدام؟',
    'faq.a2': 'نعم تماماً — جميع الأدوات تعمل محلياً داخل متصفحك فقط.',
    'faq.q3': 'كيف يمكنني الانضمام إلى الفريق؟',
    'faq.a3': 'عبر قسم "انضم إلينا" أو بمراسلتنا مباشرة على البريد الإلكتروني الرسمي.',
    'faq.q4': 'أين يقع المقر الرئيسي؟',
    'faq.a4': 'تنطلق المجموعة من مدينة البصرة في جنوب العراق.',
    'faq.q5': 'هل تقدّمون خدمات للأفراد أم للشركات فقط؟',
    'faq.a5': 'التركيز الحالي على بناء المعرفة والأدوات، مع تطلّع لخدمات استشارية مستقبلاً.',
    'contact.eyebrow': 'تواصل معنا', 'contact.h2': 'لنبنِ شيئاً <em>لانهائياً</em> معاً',
    'contact.emailLabel': 'البريد الإلكتروني', 'contact.hqLabel': 'المقر', 'contact.hqVal': 'البصرة، جمهورية العراق',
    'contact.siteLabel': 'الموقع الشخصي للرئيس',
    'contact.f.submit': 'إرسال الرسالة', 'contact.f.toast': 'تم استلام رسالتك — سنتواصل معك قريباً.',
    'news.h': 'ابقَ على اطّلاع', 'news.btn': 'اشتراك',
    'footer.copy': '© 2026 Lumin Infinity Group — جميع الحقوق محفوظة',
    'footer.made': 'صُمم وطُوّر بـ <span class="heart">♥</span> من البصرة إلى العالم',
  },
  en: {
    'brand.sub': 'Lumin Infinity Group',
    'nav.home': 'Home', 'nav.about': 'About', 'nav.sectors': 'Sectors',
    'nav.live': 'Live Obs.', 'nav.lab': 'Lab', 'nav.president': 'President', 'nav.contact': 'Contact',
    'cmdk.trigger': 'Quick search', 'cmdk.placeholder': 'Search or jump to section...',
    'hero.kicker': 'An Iraqi group specialised in critical technologies',
    'hero.h1a': 'Illuminating the', 'hero.h1b': 'Infinite Digital Frontier',
    'hero.btn1': 'Explore Sectors', 'hero.btn2': 'Meet the President',
    'hero.meta1': 'Specialised divisions', 'hero.meta2': 'Launch year',
    'hero.meta3val': 'Iraq', 'hero.meta3': 'Founding base', 'hero.meta4': 'Ambition limit',
    'mq.1': 'Cybersecurity', 'mq.2': 'Artificial Intelligence', 'mq.3': 'Research & Studies',
    'mq.4': 'Tech Solutions', 'mq.5': 'Incident Response', 'mq.6': 'Threat Analysis',
    'mq.7': 'Arabic NLP', 'mq.8': 'Cloud Infrastructure',
    'about.eyebrow': 'Who We Are',
    'about.h2': 'One Vision, <em>Infinite Divisions</em> of Potential',
    'about.p1': '"Lumin" means light, "Infinity" means no limits — exactly what we seek.',
    'about.p2': 'Founded in the heart of Basra with the conviction that real technical knowledge needs no permission.',
    'radar.eyebrow': 'Focus Map', 'radar.h3': 'Group Focus Distribution Across Five Axes',
    'radar.p': 'An approximate illustrative chart of current focus areas.',
    'sectors.eyebrow': 'The Four Divisions',
    'sectors.h2': 'Every Technical Challenge, <em>Has Its Division</em>',
    'sectors.lede': 'Four divisions working in harmony under Lumin Infinity.',
    'sec.c1.h': 'Lumin Cyber', 'sec.c1.p': 'Digital infrastructure protection and threat monitoring.',
    'sec.c2.h': 'Lumin AI', 'sec.c2.p': 'ML models and Arabic natural language processing.',
    'sec.c3.h': 'Lumin Research', 'sec.c3.p': 'Technical and cybersecurity research papers.',
    'sec.c4.h': 'Lumin Systems', 'sec.c4.p': 'Secure software and cloud infrastructure solutions.',
    'live.banner': 'Connected to the global network', 'live.eyebrow': 'Live Observatory',
    'live.h2': '<em>Real</em> Data, Moment by Moment',
    'live.ipTitle': 'Your Digital Fingerprint', 'live.ip': 'IP Address', 'live.country': 'Country',
    'live.city': 'Approx. City', 'live.isp': 'ISP', 'live.browser': 'Browser', 'live.os': 'OS',
    'live.ipNote': 'Approximate data fetched live via the site server proxy.',
    'live.cryptoTitle': 'Tech Market Pulse', 'live.cryptoNote': 'Open-source, updated on page load.',
    'live.mapCaption': 'Conceptual decorative visualisation of network activity',
    'lab.eyebrow': 'Interactive Lab',
    'lab.h2': 'Try Our <em>Tools</em> Directly in the Browser',
    'lab.lede': 'Three small educational tools running fully locally.',
    'lab.cipher.title': 'Classic Cipher Lab', 'lab.cipher.encode': 'Encode', 'lab.cipher.decode': 'Decode',
    'lab.cipher.shift': 'Shift', 'lab.cipher.tip': 'Caesar Cipher — Latin characters only.',
    'lab.pw.title': 'Password Strength Analyser', 'lab.pw.empty': 'Waiting for input...',
    'lab.pw.note': 'Password is never stored or sent — analysis is fully local.',
    'lab.pw.tipDefault': 'Try mixing uppercase, lowercase, numbers and symbols.',
    'lab.morse.title': 'Morse Code Translator', 'lab.morse.tip': 'Instant Latin letter/digit to Morse conversion.',
    'num.1': 'Vision launch year', 'num.2': 'Specialised divisions', 'num.3': 'Lab tools',
    'num.4': 'Focus on quality', 'num.5': 'Ambition limit',
    'research.eyebrow': 'Research & Papers', 'research.h2': 'Ideas Being <em>Converted into Knowledge</em>',
    'research.status': 'In Progress',
    'research.p1.h': 'The Future of Cybersecurity in Iraq and the Region to 2030',
    'research.p2.h': 'Generative AI and Its Impact on Arabic Content',
    'research.p3.h': 'Toward a More Independent Iraqi Cyber Infrastructure',
    'research.p4.h': 'Regional Advanced Persistent Threat Patterns',
    'research.p5.h': 'Data Ethics in Arab AI Systems',
    'research.p6.h': 'Bridging the Cyber Skills Gap Among Iraqi Youth',
    'quote.1.p': '"Real technical knowledge needs no permission — it is built hand by hand, step by step."',
    'quote.1.s': '— Lumin Infinity Philosophy',
    'quote.2.p': '"True security is not the absence of attack, but permanent readiness to face it."',
    'quote.2.s': '— Lumin Cyber Division',
    'quote.3.p': '"AI is a tool that amplifies human decisions, not replaces them."',
    'quote.3.s': '— Lumin AI Division',
    'quote.4.p': '"Serious research today is the right decision tomorrow."',
    'quote.4.s': '— Lumin Research Division',
    'journey.eyebrow': 'Our Journey', 'journey.h2': 'From an Idea in <em>Basra</em>, to a Borderless Vision',
    'pres.eyebrow': 'President', 'pres.role': 'Chairman of Lumin Infinity Group',
    'pres.title': 'Chairman of Lumin Infinity Group of Companies',
    'pres.quote': '"Don\'t wait for someone to give you the opportunity — build it yourself, and start from where you are now."',
    'pres.f1': 'Overall GPA', 'pres.f2': 'Books read', 'pres.f3': 'Articles written',
    'pres.btn1': 'Visit Personal Website', 'pres.btn2': 'Contact the Group',
    'careers.eyebrow': 'Join Us', 'careers.h2': 'Looking for Minds That <em>Don\'t Wait for Permission</em>',
    'careers.btn': 'Message Us Now',
    'faq.eyebrow': 'FAQ', 'faq.h2': 'Questions That May Be <em>On Your Mind</em>',
    'faq.q1': 'What sets Lumin Infinity apart?',
    'faq.a1': 'Combining cybersecurity, AI, and serious research — with a genuine Iraqi identity.',
    'faq.q2': 'Is the interactive lab safe to use?',
    'faq.a2': 'Absolutely — all tools run locally inside your browser only.',
    'faq.q3': 'How can I join the team?',
    'faq.a3': 'Via the "Join Us" section or by emailing us with a brief intro.',
    'faq.q4': 'Where is the group\'s headquarters?',
    'faq.a4': 'The group launches from Basra in southern Iraq.',
    'faq.q5': 'Do you serve individuals or businesses only?',
    'faq.a5': 'Current focus is on knowledge and tools, with future consulting plans.',
    'contact.eyebrow': 'Get in Touch', 'contact.h2': 'Let\'s Build Something <em>Infinite</em> Together',
    'contact.emailLabel': 'Email', 'contact.hqLabel': 'HQ', 'contact.hqVal': 'Basra, Republic of Iraq',
    'contact.siteLabel': "President's Website",
    'contact.f.submit': 'Send Message', 'contact.f.toast': 'Message received — we\'ll be in touch soon.',
    'news.h': 'Stay Updated', 'news.btn': 'Subscribe',
    'footer.copy': '© 2026 Lumin Infinity Group — All Rights Reserved',
    'footer.made': 'Designed & Built with <span class="heart">♥</span> from Basra to the World',
  },
};

/** Get a translated string */
export function t(key) {
  return TRANSLATIONS[LANG]?.[key] ?? TRANSLATIONS['ar'][key] ?? key;
}

/** Apply a language to the whole document */
export function applyLang(lang) {
  LANG = lang;
  const isEn = lang === 'en';
  document.documentElement.lang = isEn ? 'en' : 'ar';
  document.documentElement.dir  = isEn ? 'ltr' : 'rtl';

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const val = t(el.getAttribute('data-i18n'));
    if (val !== undefined) el.innerHTML = val;
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const val = t(el.getAttribute('data-i18n-placeholder'));
    if (val !== undefined) el.placeholder = val;
  });

  const btn = document.getElementById('langToggle');
  if (btn) btn.textContent = isEn ? 'AR' : 'EN';
}

/** Init language toggle button */
export function initI18n() {
  const btn = document.getElementById('langToggle');
  if (!btn) return;
  btn.addEventListener('click', () => applyLang(LANG === 'ar' ? 'en' : 'ar'));
}
