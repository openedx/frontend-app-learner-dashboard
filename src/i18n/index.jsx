import arMessages from './messages/ar.json';
// no need to import en messages-- they are in the defaultMessage field
import es419Messages from './messages/es_419.json';
import frMessages from './messages/fr.json';
import frcaMessages from './messages/fr_ca.json';
import ptbrMessages from './messages/pt_BR.json';
import zhcnMessages from './messages/zh_CN.json';

const messages = {
  ar: arMessages,
  'es-419': es419Messages,
  fr: frMessages,
  'fr-ca': frcaMessages,
  'pt-br': ptbrMessages,
  'zh-cn': zhcnMessages,
};

export default messages;
