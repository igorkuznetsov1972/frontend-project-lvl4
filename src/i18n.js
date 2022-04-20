import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from './assets/locales/index.js';

i18n
  .use(initReactI18next)
  .init({
    debug: true,
    lng: 'ru-RU',
    detection: { order: ['navigator'] },
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });
