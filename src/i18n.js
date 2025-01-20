import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translation resources
const resources = {
  en: {
    translation: {
      hero: {
        title: "Find Your with Ease!",
        mainTitleWord:'Dream Property',
        subtitle: "Let our Real Estate AI Assistant guide you to your perfect space.",
        dreamProperty: "Dream Property",
        idealHome: "Ideal Home",
        perfectInvestment: "Perfect Investment",
        luxuryLiving: "Luxury Living",
      },
    },
  },
  ar: {
    translation: {
      hero: {
        title: "اعثر على {{property}} بسهولة!",
        subtitle: "دع مساعد الذكاء الاصطناعي العقاري يوجهك إلى مساحتك المثالية.",
        dreamProperty: "عقار الأحلام",
        idealHome: "المنزل المثالي",
        perfectInvestment: "الاستثمار الأمثل",
        luxuryLiving: "العيش الفاخر",
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // Default language
  fallbackLng: "en", // Fallback language
  interpolation: {
    escapeValue: false, // React already escapes values to prevent XSS
  },
});

export default i18n;
