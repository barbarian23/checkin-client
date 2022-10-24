import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

import resources from '../assets/strings';

// initialize i18next with catalog and language to use
i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources,
  lng: 'vi',
});

export default i18n;
