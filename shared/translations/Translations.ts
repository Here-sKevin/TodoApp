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
      card_title: {
        en: 'Guide',
        pt: 'Guia'
      }
    },
    todo_screen: {
      buttonEdit: {
        en: 'Edit task',
        pt: 'Editar tarefa',
      },
      buttonDelete: {
        en: 'Delete Task',
        pt: 'Apagar tarefa',
      },
      buttonCreate: {
        en: 'Add a new Task',
        pt: 'Adicionar nova tarefa',
      },
      buttonTodos: {
        en: 'MyTodos',
        pt: 'Meus Todos',
      },
      buttonCancel: {
        en: 'Cancel',
        pt: 'Cancelar',
      },
      message_delete: {
        en:'Do you want to delete the task:',
        pt:'Quer apagar a tarefa: '
      }
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
      buttonDelete: {
        en:'Delete',
        pt:'Apagar'
      }
    }
  }, 
});

export {TranslationInstance, useTranslation};
