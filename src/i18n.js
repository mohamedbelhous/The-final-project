import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      nav: {
        home: "Home",
        destinations: "Destinations",
        activities: "Activities",
        travelGuide: "Travel Guide",
        deals: "Deals",
        about: "About Us",
        signIn: "Sign In",
        profile: "Profile",
        logout: "Logout",
        favorites: "Favorites"
      },
      logoutModal: {
        title: "Logout Confirmation",
        message: "Are you sure you want to log out?",
        cancel: "Cancel",
        confirm: "Yes, Logout"
      },
      hero: {
        titlePart1: "Discover Algeria,",
        titlePart2: "Your Way.",
        descPart1: "Personalized recommendations,",
        descPart2: "unforgettable experiences.",
        descPart3: "Your journey starts here.",
        cta: "Start Your Journey",
        searchCardTitle: "Where are you going?",
        destinationLabel: "Destination",
        destinationValue: "Any destination",
        datesLabel: "Dates",
        datesValue: "Select dates",
        travelersLabel: "Travelers",
        travelersValue: "2 travelers",
        budgetLabel: "Budget",
        budgetValue: "Any budget",
        searchBtn: "Search"
      },
      intro: {
        badge: "EXPLORE ALGERIA DIFFERENTLY",
        titlePart1: "Your journey.",
        titlePart2: "Your way.",
        description: "Rahla helps you discover places, experiences and adventures that match the way you actually want to travel.",
        button: "Discover your journey",
        feature1Title: "Discover",
        feature1Desc: "Find places worth exploring.",
        feature2Title: "Personalize",
        feature2Desc: "Recommendations made for you.",
        feature3Title: "Experience",
        feature3Desc: "Travel beyond the usual."
      },
      exploreInterests: {
        title: "Explore by Interests",
        viewAll: "View all"
      },
      recommended: {
        title: "Recommended for you",
        viewAll: "View all",
        from: "From",
        perPerson: "/ person"
      },
      specialDeals: {
        title: "Special Offers",
        subtitle: "Exclusive experiences at better prices.",
        viewAll: "Explore all offers",
        from: "From",
        perPerson: "/ person",
        exploreBtn: "Explore deal"
      },
      whyRahla: {
        badge: "WHY RAHLA",
        titlePart1: "Travel less like a tourist,",
        titlePart2: "experience more like a local.",
        description: "Rahla makes discovering Algeria simpler, more personal, and more memorable — from the first idea to the final journey.",
        button: "Discover Rahla"
      },
      footer: {
        newsletterTitle: "Get travel inspiration & exclusive offers",
        newsletterSubtitle: "Subscribe to our newsletter and never miss an update.",
        emailPlaceholder: "Enter your email",
        subscribeBtn: "Subscribe",
        brandDescPart1: "Your smart travel companion",
        brandDescPart2: "in Algeria and beyond.",
        colCompany: "Company",
        colSupport: "Support",
        colResources: "Resources",
        aboutUs: "About Us",
        careers: "Careers",
        press: "Press",
        contactUs: "Contact Us",
        helpCenter: "Help Center",
        faqs: "FAQs",
        terms: "Terms & Conditions",
        privacy: "Privacy Policy",
        travelGuide: "Travel Guide",
        blog: "Blog",
        destinations: "Destinations",
        activities: "Activities",
        copyright: "© 2026 Rahla. All rights reserved."
      },
      destinationsPage: {
        eyebrow: "Explore Algeria",
        titlePart1: "Find your next",
        titlePart2: "place to discover.",
        subtitle: "From Mediterranean beaches to ancient cities and Sahara landscapes, discover the places that make Algeria unforgettable.",
        searchPlaceholder: "Search a destination...",
        searchBtn: "Search",
        label: "DISCOVER MORE",
        heading: "Explore destinations",
        subheading: "Find a place that matches the way you want to travel.",
        filtersBtn: "Filters",
        categoryTitle: "Category",
        regionLabel: "Region / Location",
        allRegions: "All Regions",
        maxBudget: "Max Budget ($)",
        resetFilters: "Reset Filters",
        foundSingle: "destination found",
        foundPlural: "destinations found",
        clearAllFilters: "Clear all filters",
        exploreDestination: "Explore destination",
        noDestinationsTitle: "No destinations found",
        noDestinationsDesc: "Try adjusting your budget, region, or search criteria."
      },
      aboutPage: {
        eyebrow: "Our Story",
        heroTitle: "Unveiling the Hidden Wonders of Algeria",
        heroSubtitle: "We are dedicated to building the ultimate travel platform for discovering Algeria's landscapes—from the Mediterranean coast to the Sahara desert.",
        stat1Label: "Destinations Covered",
        stat2Label: "Happy Travelers",
        stat3Label: "Wilayas to Explore",
        stat4Label: "Authentic Experience",
        missionTitle: "Our Mission",
        missionDesc: "To make travel planning across Algeria seamless and accessible to everyone. We empower adventurers with real insights, curated destinations, and flexible filtering options.",
        visionTitle: "Our Vision",
        visionDesc: "To become the leading digital hub for Algerian tourism, bridging culture, technology, and authentic local experiences for both local and international travelers.",
        whyTitle: "Why Travel With Us?",
        val1Title: "Promoting Local Tourism",
        val1Desc: "Highlighting the hidden gems across all 58 wilayas of Algeria.",
        val2Title: "Verified Information",
        val2Desc: "Providing reliable details, price ranges, and travel recommendations.",
        val3Title: "Cultural Heritage",
        val3Desc: "Respecting and celebrating Algeria's rich traditions and nature.",
        val4Title: "Community Driven",
        val4Desc: "Built for travelers, adventurers, and locals sharing their passion.",
        ctaTitle: "Ready to Start Your Journey?",
        ctaSubtitle: "Explore top-rated destinations, budget trips, and desert tours today.",
        ctaBtn: "Explore Destinations"
      },
      profilePage: {
        loading: "Loading profile...",
        title: "Personal Information",
        fullName: "Full Name",
        email: "Email Address",
        role: "Account Role",
        country: "Country",
        defaultRole: "Traveler",
        defaultUserRole: "User",
        countryValue: "Algeria"
      },
      loginPage: {
        title: "Welcome Back",
        subtitle: "Login to manage your saved destinations",
        emailLabel: "Email Address",
        emailPlaceholder: "name@example.com",
        passwordLabel: "Password",
        submitBtn: "Login",
        submittingBtn: "Logging in...",
        footerText: "Don't have an account?",
        footerLink: "Sign up"
      },
      registerPage: {
        title: "Create Account",
        subtitle: "Join us to explore the best of Algeria",
        nameLabel: "Full Name",
        namePlaceholder: "John Doe",
        emailLabel: "Email Address",
        emailPlaceholder: "name@example.com",
        passwordLabel: "Password",
        passwordPlaceholder: "Minimum 6 characters",
        submitBtn: "Register",
        submittingBtn: "Creating Account...",
        footerText: "Already have an account?",
        footerLink: "Sign in"
      }
    }
  },
  ar: {
    translation: {
      nav: {
        home: "الرئيسية",
        destinations: "الوجهات",
        activities: "الأنشطة",
        travelGuide: "دليل السفر",
        deals: "العروض",
        about: "من نحن",
        signIn: "تسجيل الدخول",
        profile: "الملف الشخصي",
        logout: "تسجيل الخروج",
        favorites: "المفضلة"
      },
      logoutModal: {
        title: "تأكيد تسجيل الخروج",
        message: "هل أنت تأكد من أنك تريد تسجيل الخروج؟",
        cancel: "إلغاء",
        confirm: "نعم، خروج"
      },
      hero: {
        titlePart1: "اكتشف الجزائر،",
        titlePart2: "على طريقتك.",
        descPart1: "توصيات مخصصة لك،",
        descPart2: "وتجارب لا تُنسى.",
        descPart3: "رحلتك تبدأ من هنا.",
        cta: "ابدأ رحلتك",
        searchCardTitle: "إلى أين تريد الذهاب؟",
        destinationLabel: "الوجهة",
        destinationValue: "أي وجهة",
        datesLabel: "التواريخ",
        datesValue: "حدد التواريخ",
        travelersLabel: "المسافرون",
        travelersValue: "2 مسافرين",
        budgetLabel: "الميزانية",
        budgetValue: "أي ميزانية",
        searchBtn: "بحث"
      },
      intro: {
        badge: "استكشف الجزائر بأسلوب مختلف",
        titlePart1: "رحلتك.",
        titlePart2: "على طريقتك.",
        description: "تساعدك رحلة على اكتشاف الأماكن والتجارب والمغامرات التي تتناسب تماماً مع أسلوب سفرك المفضل.",
        button: "اكتشف رحلتك",
        feature1Title: "استكشف",
        feature1Desc: "اعثر على أماكن تستحق الاكتشاف.",
        feature2Title: "خصص",
        feature2Desc: "توصيات مصممة خصيصاً لك.",
        feature3Title: "عِش التجربة",
        feature3Desc: "سافر أبعد من المألوف."
      },
      exploreInterests: {
        title: "استكشف حسب الاهتمامات",
        viewAll: "عرض الكل"
      },
      recommended: {
        title: "موصى به لك",
        viewAll: "عرض الكل",
        from: "من",
        perPerson: "/ للشخص"
      },
      specialDeals: {
        title: "عروض خاصة",
        subtitle: "تجارب حصرية بأسعار أفضل.",
        viewAll: "استكشف كل العروض",
        from: "من",
        perPerson: "/ للشخص",
        exploreBtn: "استكشف العرض"
      },
      whyRahla: {
        badge: "لماذا رحلة",
        titlePart1: "سافر بأقل نمط للسائح،",
        titlePart2: "وعِش التجربة كابن البلد.",
        description: "تجعل رحلة اكتشاف الجزائر أسهل، وأكثر شخصية، وأكثر خلوداً في الذاكرة — من الفكرة الأولى وحتى نهاية الرحلة.",
        button: "اكتشف رحلة"
      },
      footer: {
        newsletterTitle: "احصل على الهام السفر والعروض الحصرية",
        newsletterSubtitle: "اشترك في نشرتنا الإخبارية ولا تفوت أي تحديث.",
        emailPlaceholder: "أدخل بريدك الإلكتروني",
        subscribeBtn: "اشتراك",
        brandDescPart1: "رفيقك الذكي للسفر",
        brandDescPart2: "في الجزائر وما بعدها.",
        colCompany: "الشركة",
        colSupport: "الدعم",
        colResources: "الموارد",
        aboutUs: "من نحن",
        careers: "الوظائف",
        press: "الصحافة",
        contactUs: "اتصل بنا",
        helpCenter: "مركز المساعدة",
        faqs: "الأسئلة الشائعة",
        terms: "الشروط والأحكام",
        privacy: "سياسة الخصوصية",
        travelGuide: "دليل السفر",
        blog: "المدونة",
        destinations: "الوجهات",
        activities: "الأنشطة",
        copyright: "© 2026 رحلة. جميع الحقوق محفوظة."
      },
      destinationsPage: {
        eyebrow: "استكشف الجزائر",
        titlePart1: "اعثر على وجهتك",
        titlePart2: "القادمة للاكتشاف.",
        subtitle: "من شواطئ البحر الأبيض المتوسط إلى المدن التاريخية والمناظر الطبيعية الصحراوية، اكتشف الأماكن التي تجعل الجزائر لا تُنسى.",
        searchPlaceholder: "ابحث عن وجهة...",
        searchBtn: "بحث",
        label: "اكتشف المزيد",
        heading: "استكشف الوجهات",
        subheading: "اعثر على مكان يتماشى مع أسلوب السفر الذي تحبه.",
        filtersBtn: "التصفيات",
        categoryTitle: "الفئة",
        regionLabel: "المنطقة / الموقع",
        allRegions: "كل المناطق",
        maxBudget: "أقصى ميزانية ($)",
        resetFilters: "إعادة ضبط التصفيات",
        foundSingle: "وجهة تم العثور عليها",
        foundPlural: "وجهات تم العثور عليها",
        clearAllFilters: "مسح كل التصفيات",
        exploreDestination: "استكشف الوجهة",
        noDestinationsTitle: "لم يتم العثور على وجهات",
        noDestinationsDesc: "جرب تعديل الميزانية، المنطقة، أو معايير البحث."
      },
      aboutPage: {
        eyebrow: "قصتنا",
        heroTitle: "كشف النقاب عن عجائب الجزائر الخفية",
        heroSubtitle: "نحن مكرسون لبناء المنصة السياحية الأفضل لاكتشاف مناظر الجزائر—من ساحل البحر المتوسط إلى صحراء الجزائر.",
        stat1Label: "وجهة مشمولة",
        stat2Label: "مسافر سعيد",
        stat3Label: "ولاية للاكتشاف",
        stat4Label: "تجربة أصيلة",
        missionTitle: "مهمتنا",
        missionDesc: "جعل التخطيط للسفر عبر الجزائر سهلاً ومتاحاً للجميع. نمكن المغامرين برؤى حقيقية، وجهات مختارة، وخيارات تصفية مرنة.",
        visionTitle: "رؤيتنا",
        visionDesc: "أن نصبح المركز الرقمي الرائد للسياحة الجزائرية، عبر الربط بين الثقافة، التكنولوجيا، والتجارب المحلية الأصيلة.",
        whyTitle: "لماذا تسافر معنا؟",
        val1Title: "ترويج السياحة المحلية",
        val1Desc: "إبراز الجواهر الخفية عبر جميع ولايات الجزائر الـ 58.",
        val2Title: "معلومات موثوقة",
        val2Desc: "تقديم تفاصيل موثوقة، فئات الأسعار، وتوصيات السفر.",
        val3Title: "التراث الثقافي",
        val3Desc: "احترام واحتواء تقاليد الجزائر الغنية وطبيعتها الخلابة.",
        val4Title: "مدعوم من المجتمع",
        val4Desc: "مصمم للمسافرين، المغامرين، والسكان المحليين الذين يشاركون شغفهم.",
        ctaTitle: "هل أنت جاهز لبدء رحلتك؟",
        ctaSubtitle: "استكشف أعلى الوجهات تقييماً، الرحلات الاقتصادية، وجولات الصحراء اليوم.",
        ctaBtn: "استكشف الوجهات"
      },
      profilePage: {
        loading: "جاري تحميل الملف الشخصي...",
        title: "المعلومات الشخصية",
        fullName: "الاسم الكامل",
        email: "البريد الإلكتروني",
        role: "نوع الحساب",
        country: "البلد",
        defaultRole: "مسافر",
        defaultUserRole: "مستخدم",
        countryValue: "الجزائر"
      },
      loginPage: {
        title: "مرحباً بعودتك",
        subtitle: "سجل الدخول لإدارة وجهاتك المحفوظة",
        emailLabel: "البريد الإلكتروني",
        emailPlaceholder: "name@example.com",
        passwordLabel: "كلمة المرور",
        submitBtn: "تسجيل الدخول",
        submittingBtn: "جاري الدخول...",
        footerText: "ليس لديك حساب؟",
        footerLink: "إنشاء حساب"
      },
      registerPage: {
        title: "إنشاء حساب",
        subtitle: "انضم إلينا لاكتشاف أفضل ما في الجزائر",
        nameLabel: "الاسم الكامل",
        namePlaceholder: "محمد أحمد",
        emailLabel: "البريد الإلكتروني",
        emailPlaceholder: "name@example.com",
        passwordLabel: "كلمة المرور",
        passwordPlaceholder: "6 أحرف على الأقل",
        submitBtn: "إنشاء حساب",
        submittingBtn: "جاري إنشاء الحساب...",
        footerText: "لديك حساب بالفعل؟",
        footerLink: "تسجيل الدخول"
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: { escapeValue: false }
  });

i18n.on('languageChanged', (lng) => {
  document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.lang = lng;
});

export default i18n;