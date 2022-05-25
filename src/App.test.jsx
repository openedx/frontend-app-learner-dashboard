// import React from 'react';
// import { shallow } from 'enzyme';

// import Footer from '@edx/frontend-component-footer';
// import { LearningHeader as Header } from '@edx/frontend-component-header';

// import ListView from 'containers/ListView';

// import { App } from './App';

// jest.mock('data/redux', () => ({
//   app: {
//     selectors: {
//       courseMetadata: (state) => ({ courseMetadata: state }),
//       isEnabled: (state) => ({ isEnabled: state }),
//     },
//   },
// }));

// jest.mock('@edx/frontend-component-header', () => ({
//   LearningHeader: 'Header',
// }));
// jest.mock('@edx/frontend-component-footer', () => 'Footer');

// jest.mock('containers/DemoWarning', () => 'DemoWarning');
// jest.mock('containers/ListView', () => 'ListView');

// const logo = 'fakeLogo.png';
// let el;
// let router;

// describe('App router component', () => {
//   const props = {
//     courseMetadata: {
//       org: 'course-org',
//       number: 'course-number',
//       title: 'course-title',
//     },
//     isEnabled: true,
//   };
//   test('snapshot: enabled', () => {
//     expect(shallow(<App {...props} />)).toMatchSnapshot();
//   });
//   test('snapshot: disabled (show demo warning)', () => {
//     expect(shallow(<App {...props} isEnabled={false} />)).toMatchSnapshot();
//   });
//   describe('component', () => {
//     beforeEach(() => {
//       process.env.LOGO_POWERED_BY_OPEN_EDX_URL_SVG = logo;
//       el = shallow(<App {...props} />);
//       router = el.childAt(0);
//     });
//     describe('Router', () => {
//       test('Routing - ListView is only route', () => {
//         expect(router.find('main')).toEqual(shallow(
//           <main><ListView /></main>,
//         ));
//       });
//     });
//     test('Footer logo drawn from env variable', () => {
//       expect(router.find(Footer).props().logo).toEqual(logo);
//     });

//     test('Header to use courseMetadata props', () => {
//       const {
//         courseTitle,
//         courseNumber,
//         courseOrg,
//       } = router.find(Header).props();
//       expect(courseTitle).toEqual(props.courseMetadata.title);
//       expect(courseNumber).toEqual(props.courseMetadata.number);
//       expect(courseOrg).toEqual(props.courseMetadata.org);
//     });
//   });
// });
