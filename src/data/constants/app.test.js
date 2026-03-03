import * as platform from '@edx/frontend-platform';
import * as constants from './app';
import { requestStatuses } from './credit';
import fileConstants, { FileTypes, downloadSingleLimit, downloadAllLimit } from './files';
import htmlKeysConstants, { buttonStates, htmlProps } from './htmlKeys';

jest.unmock('./app');

jest.mock('@edx/frontend-platform', () => {
  const PUBLIC_PATH = 'test-public-path';
  return {
    getConfig: () => ({ PUBLIC_PATH }),
    PUBLIC_PATH,
  };
});

describe('app constants', () => {
  test('route path draws from public path and adds courseId', () => {
    expect(constants.routePath).toEqual(`${platform.PUBLIC_PATH}:courseId`);
  });
  test('locationId returns trimmed pathname', () => {
    const old = window.location;
    window.location = { pathName: '/somePath.jpg' };
    expect(constants.locationId).toEqual(window.location.pathname.slice(1));
    window.location = old;
  });

  describe('credit constants', () => {
    describe('requestStatuses', () => {
      it('should have correct pending status', () => {
        expect(requestStatuses.pending).toBe('pending');
      });

      it('should have correct approved status', () => {
        expect(requestStatuses.approved).toBe('approved');
      });

      it('should have correct rejected status', () => {
        expect(requestStatuses.rejected).toBe('rejected');
      });

      it('should have all expected status properties', () => {
        const expectedStatuses = ['pending', 'approved', 'rejected'];
        const actualStatuses = Object.keys(requestStatuses);

        expect(actualStatuses).toEqual(expect.arrayContaining(expectedStatuses));
        expect(actualStatuses).toHaveLength(expectedStatuses.length);
      });

      it('should have string values for all statuses', () => {
        Object.values(requestStatuses).forEach(status => {
          expect(typeof status).toBe('string');
        });
      });
    });
  });

  describe('files constants', () => {
    describe('FileTypes', () => {
      it('should have correct file type values', () => {
        expect(FileTypes.pdf).toBe('pdf');
        expect(FileTypes.jpg).toBe('jpg');
        expect(FileTypes.jpeg).toBe('jpeg');
        expect(FileTypes.png).toBe('png');
        expect(FileTypes.bmp).toBe('bmp');
        expect(FileTypes.txt).toBe('txt');
        expect(FileTypes.gif).toBe('gif');
        expect(FileTypes.jfif).toBe('jfif');
        expect(FileTypes.pjpeg).toBe('pjpeg');
        expect(FileTypes.pjp).toBe('pjp');
        expect(FileTypes.svg).toBe('svg');
      });

      it('should have all expected file types', () => {
        const expectedTypes = ['pdf', 'jpg', 'jpeg', 'png', 'bmp', 'txt', 'gif', 'jfif', 'pjpeg', 'pjp', 'svg'];
        const actualTypes = Object.keys(FileTypes);

        expect(actualTypes).toEqual(expect.arrayContaining(expectedTypes));
        expect(actualTypes).toHaveLength(expectedTypes.length);
      });

      it('should have string values for all file types', () => {
        Object.values(FileTypes).forEach(fileType => {
          expect(typeof fileType).toBe('string');
        });
      });
    });

    describe('download limits', () => {
      it('should have correct downloadSingleLimit value', () => {
        expect(downloadSingleLimit).toBe(1610612736);
      });

      it('should have correct downloadAllLimit value', () => {
        expect(downloadAllLimit).toBe(10737418240);
      });

      it('should have downloadAllLimit greater than downloadSingleLimit', () => {
        expect(downloadAllLimit).toBeGreaterThan(downloadSingleLimit);
      });

      it('should have numeric values for download limits', () => {
        expect(typeof downloadSingleLimit).toBe('number');
        expect(typeof downloadAllLimit).toBe('number');
      });
    });

    describe('default export', () => {
      it('should export FileTypes as default', () => {
        expect(fileConstants).toBe(FileTypes);
      });

      it('should be the same as named export', () => {
        expect(fileConstants).toEqual(FileTypes);
      });
    });
  });

  describe('htmlKeys constants', () => {
    describe('buttonStates', () => {
      it('should have correct button state values', () => {
        expect(buttonStates.default).toBe('default');
        expect(buttonStates.pending).toBe('pending');
        expect(buttonStates.error).toBe('error');
      });

      it('should have all expected button states', () => {
        const expectedStates = ['default', 'pending', 'error'];
        const actualStates = Object.keys(buttonStates);

        expect(actualStates).toEqual(expect.arrayContaining(expectedStates));
        expect(actualStates).toHaveLength(expectedStates.length);
      });

      it('should have string values for all button states', () => {
        Object.values(buttonStates).forEach(state => {
          expect(typeof state).toBe('string');
        });
      });
    });

    describe('htmlProps', () => {
      it('should have correct html property values', () => {
        expect(htmlProps.disabled).toBe('disabled');
        expect(htmlProps.href).toBe('href');
        expect(htmlProps.onClick).toBe('onClick');
        expect(htmlProps.onChange).toBe('onChange');
        expect(htmlProps.onBlur).toBe('onBlur');
        expect(htmlProps.size).toBe('size');
      });

      it('should have all expected html properties', () => {
        const expectedProps = ['disabled', 'href', 'onClick', 'onChange', 'onBlur', 'size'];
        const actualProps = Object.keys(htmlProps);

        expect(actualProps).toEqual(expect.arrayContaining(expectedProps));
        expect(actualProps).toHaveLength(expectedProps.length);
      });

      it('should have string values for all html properties', () => {
        Object.values(htmlProps).forEach(prop => {
          expect(typeof prop).toBe('string');
        });
      });
    });

    describe('default export', () => {
      it('should export buttonStates and htmlProps in default object', () => {
        expect(htmlKeysConstants.buttonStates).toBe(buttonStates);
        expect(htmlKeysConstants.htmlProps).toBe(htmlProps);
      });

      it('should have both properties', () => {
        expect(htmlKeysConstants).toHaveProperty('buttonStates');
        expect(htmlKeysConstants).toHaveProperty('htmlProps');
      });

      it('should only have expected properties', () => {
        const expectedKeys = ['buttonStates', 'htmlProps'];
        const actualKeys = Object.keys(htmlKeysConstants);

        expect(actualKeys).toEqual(expect.arrayContaining(expectedKeys));
        expect(actualKeys).toHaveLength(expectedKeys.length);
      });
    });
  });
});
