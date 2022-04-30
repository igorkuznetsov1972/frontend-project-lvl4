import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from './assets/locales/index.js';

const i18n = i18next.createInstance();
i18n
  .use(initReactI18next)
  .init({
    debug: false,
    lng: 'ru-RU',
    detection: { order: ['navigator'] },
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
