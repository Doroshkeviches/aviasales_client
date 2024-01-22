import i18n from 'i18next';
import en from './locales/en/en.json';
import ru from './locales/ru/ru.json';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: en,
  },
  ru: {
    translation: ru,
  },
};

export function getCurrentLanguage(): string {
  return localStorage.getItem('language') || i18n.language || 'en';
}

export function changeLanguage(language: string): void {
  i18n.changeLanguage(language);
  localStorage.setItem('language', language);
}

i18n
  .use(initReactI18next) 
  .init({
    resources,
    lng: getCurrentLanguage(), 
    fallbackLng: 'en',
    keySeparator: '.',
    // interpolation: {
    //   escapeValue: false, // Отключает экранирование React-компонентов
    // },
    // react: {
    //   useSuspense: false, // Не использовать Suspense в React
    // },
  });

export default i18n;

