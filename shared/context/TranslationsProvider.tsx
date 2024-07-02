/* eslint-disable prettier/prettier */
import React, {type ReactNode} from 'react';

import {TranslationProvider} from '@resourge/react-translations';

import {TranslationInstance} from '../translations/Translations';

type Props = {
  children?: ReactNode;
};

const Translations: React.FC<Props> = ({children}) => {
  return (
    <TranslationProvider TranslationInstance={TranslationInstance}>
      {children}
    </TranslationProvider>
  );
};

export default Translations;
