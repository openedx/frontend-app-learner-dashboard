import { StrictDict } from 'utils';

export const FileTypes = StrictDict({
  pdf: 'pdf',
  jpg: 'jpg',
  jpeg: 'jpeg',
  png: 'png',
  bmp: 'bmp',
  txt: 'txt',
  gif: 'gif',
  jfif: 'jfif',
  pjpeg: 'pjpeg',
  pjp: 'pjp',
  svg: 'svg',
});

export const downloadSingleLimit = 1610612736; // 1.5GB
export const downloadAllLimit = 10737418240; // 10GB

export default FileTypes;
