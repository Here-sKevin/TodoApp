/* eslint-disable prettier/prettier */
import {
  SetupReactTranslations,
} from '@resourge/react-translations';

export const LOCALE_DEFAULT = 'en';

const {TranslationInstance, useTranslation} = SetupReactTranslations({
  langs: ['pt', 'en'],
  defaultLanguage: 'en',
  translations: {
    home_screen: {
      welcome: {
        en: 'Welcome',
        'pt': 'Bem-vindo',
      }, 
    },
  }, 
});

export {TranslationInstance, useTranslation};
