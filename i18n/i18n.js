import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import az from './locales/az.json';
import ru from './locales/ru.json';

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: 'az', // default dil
  fallbackLng: 'az',
  resources: {
    en: { translation: en },
    az: { translation: az },
    ru: { translation: ru },
  },
  interpolation: {
    escapeValue: false, // React üçün lazım deyil
  },
});

export default i18n;
