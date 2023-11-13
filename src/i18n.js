import i18n from 'i18next';
// import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import translateEN from './english.json';
import translateDE from './germen.json';

// Translations
const resources = {
  en: {
    translation: translateEN,
  },
  de: {
    translation: translateDE,
  },
};

i18n
  // load translation using http -> see /public/locales
  // learn more: https://github.com/i18next/i18next-http-backend
 // .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: 'en',
    debug: true,
    resources,
    detection: {
      order: ["localStorage", "sessionStorage", "navigator"],
      lookupLocalStorage: "i18nextLng",
      lookupSessionStorage: "i18nextLng",
    },
    keySeparator: ".", // we do not use keys in form messages.welcome
    returnObjects: false,
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;