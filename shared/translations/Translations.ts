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
        pt: 'Bem-vindo',
      }, 
      buttonTodo: {
        en: 'Go to Todo',
        pt: 'Ir para Todo',
      },
      buttonPhoto: {
        en: 'Go to Photo',
        pt: 'Ir para Fotos',
      },
      buttonList: {
        en: 'User List',
        pt: 'Lista de utilizadores',
      },
      buttonnotification: {
        en: 'Lauch notification',
        pt: 'Lançar notificação',
      },
    },
    todo_screen: {
      buttonEdit: {
        en: 'Edit',
        pt: 'Editar',
      },
      buttonDelete: {
        en: 'Delete',
        pt: 'Apagar',
      },
      buttonCreate: {
        en: 'Create Todo',
        pt: 'Criar Todo',
      },
      buttonTodos: {
        en: 'MyTodos',
        pt: 'Meus Todos',
      },
      buttonCancel: {
        en: 'Cancel',
        pt: 'Cancelar',
      },
    },
    photo_screen: {
      buttonOpen: {
        en: 'Open Camera',
        pt: 'Abrir Camera'
      },
      buttonClose: {
        en: 'Close Camera',
        pt: 'Fechar Camera'
      },
    }
  }, 
});

export {TranslationInstance, useTranslation};
