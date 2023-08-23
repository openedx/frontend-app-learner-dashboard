import { messages as footerMessages } from '@edx/frontend-component-footer';
import { messages as paragonMessages } from '@edx/paragon';

import arMessages from './messages/ar.json';
// no need to import en messages-- they are in the defaultMessage field
import es419Messages from './messages/es_419.json';
import frMessages from './messages/fr.json';
import frcaMessages from './messages/fr_CA.json';
import ptbrMessages from './messages/pt_BR.json';
import zhcnMessages from './messages/zh_CN.json';

const appMessages = {
  ar: arMessages,
  'es-419': es419Messages,
  fr: frMessages,
  'fr-ca': frcaMessages,
  'pt-br': ptbrMessages,
  'zh-cn': zhcnMessages,
};

export default [
  footerMessages,
  appMessages,
  paragonMessages,
];
