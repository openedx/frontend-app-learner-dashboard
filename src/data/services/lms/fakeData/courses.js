import { StrictDict } from 'utils';

export const providers = StrictDict({
  edx: { name: 'edX Course Provider' },
  mit: { name: 'MIT' },
});

export const relatedPrograms = [
  {
    provider: 'HarvardX',
    bannerImgSrc: 'https://prod-discovery.edx-cdn.org/media/course/image/327c8e4f-315a-417b-9857-046dfc90c243-677b97464958.small.jpg',
    logoImgSrc: 'https://prod-discovery.edx-cdn.org/organization/certificate_logos/44022f13-20df-4666-9111-cede3e5dc5b6-770e00385e7e.png',
    title: 'Relativity in Modern Mechanics',
    programUrl: 'www.edx/my-program',
    programType: 'MicroBachelors Program',
    numberOfCourses: 3,
  },
  {
    provider: 'University  of Maryland',
    bannerImgSrc: 'https://prod-discovery.edx-cdn.org/media/programs/banner_images/9a310b98-8f27-439e-be85-12d6460245c9-f2efca129273.small.jpg',
    logoImgSrc: 'https://prod-discovery.edx-cdn.org/organization/certificate_logos/b9dc96da-b3fc-45a6-b6b7-b8e12eb79335-ac60112330e3.png',
    title: 'Pandering for Modern Professionals',
    programUrl: 'www.edx/my-program-2',
    programType: 'MicroBachelors Program',
    programTypeUrl: 'www.edx/my-program-type',
    numberOfCourses: 3,
  },
  {
    provider: 'HarvardX',
    bannerImgSrc: 'https://prod-discovery.edx-cdn.org/media/course/image/327c8e4f-315a-417b-9857-046dfc90c243-677b97464958.small.jpg',
    logoImgSrc: 'https://prod-discovery.edx-cdn.org/organization/certificate_logos/44022f13-20df-4666-9111-cede3e5dc5b6-770e00385e7e.png',
    title: 'Relativity in Modern Mechanics',
    programUrl: 'www.edx/my-program-3',
    programType: 'MicroBachelors Program',
    numberOfCourses: 3,
  },
  {
    provider: 'University  of Maryland',
    bannerImgSrc: 'https://prod-discovery.edx-cdn.org/media/programs/banner_images/9a310b98-8f27-439e-be85-12d6460245c9-f2efca129273.small.jpg',
    logoImgSrc: 'https://prod-discovery.edx-cdn.org/organization/certificate_logos/b9dc96da-b3fc-45a6-b6b7-b8e12eb79335-ac60112330e3.png',
    title: 'Pandering for Modern Professionals',
    programUrl: 'www.edx/my-program-4',
    programType: 'MicroBachelors Program',
    programTypeUrl: 'www.edx/my-program-type',
    numberOfCourses: 3,
  },
];

export const genCardId = (index) => `card-id${index}`;
export const genCourseId = (index) => `course-number${index}-course-id${index}`;
export const genCourseNumber = (index) => `course-number${index}`;
export const genCourseTitle = (index) => `Course Name ${index}`;
export const genEntitlementUUID = (index) => `entitlement-course-uuid-${index}`;

const bannerImgSrc = '/asset-v1:edX+DemoX+Demo_Course+type@asset+block@images_course_image.jpg';

const farPastDate = '1900-11-11T00:00:00Z';
const pastDate = '2000-11-11T00:00:00Z';
const futureDate = '3030-11-11T00:00:00Z';
const farFutureDate = '4040-11-11T00:00:00Z';
const soonDate = new Date();
soonDate.setDate(soonDate.getDate() + 60);
const soonDateStr = soonDate.toDateString();

const globalData = {
  emailConfirmation: {
    isNeeded: true,
    sendEmailUrl: 'sendConfirmation@edx.org',
  },
  enterpriseDashboard: { label: 'edX, Inc.', url: '/edx-dashboard' },
  platformSettings: {
    supportEmail: 'support@example.com',
    billingEmail: 'billing@email.com',
    courseSearchUrl: 'edx.com/course-search',
  },
  suggestedCourses: [
    {
      bannerImgSrc: 'https://prod-discovery.edx-cdn.org/media/programs/banner_images/9a310b98-8f27-439e-be85-12d6460245c9-f2efca129273.small.jpg',
      courseName: 'Suggested course 1',
      courseUrl: 'www.edx/suggested-course',
    },
    {
      bannerImgSrc: 'https://prod-discovery.edx-cdn.org/media/programs/banner_images/9a310b98-8f27-439e-be85-12d6460245c9-f2efca129273.small.jpg',
      courseName: 'Suggested course 2 with a really really really long name for some reason',
      courseUrl: 'www.edx/suggested-course',
    },
    {
      bannerImgSrc: 'https://prod-discovery.edx-cdn.org/media/programs/banner_images/9a310b98-8f27-439e-be85-12d6460245c9-f2efca129273.small.jpg',
      courseName: 'Suggested course 3',
      courseUrl: 'www.edx/suggested-course',
    },
    {
      bannerImgSrc: 'https://prod-discovery.edx-cdn.org/media/programs/banner_images/9a310b98-8f27-439e-be85-12d6460245c9-f2efca129273.small.jpg',
      courseName: 'Suggested course 4',
      courseUrl: 'www.edx/suggested-course',
    },
  ],
};

export const genCourseRunData = (data = {}) => ({
  isStarted: false,
  isArchived: false,
  startDate: data.isStarted ? farPastDate : futureDate,
  endDate: farFutureDate,
  minPassingGrade: '0.70',
  homeUrl: 'edx.com/courses/my-course-url/home',
  marketingUrl: 'edx.com/courses/my-course-url/marketing',
  progressUrl: 'edx.com/courses/my-course-url/progress',
  unenrollUrl: 'edx.com/courses/my-course-url/unenroll',
  resumeUrl: 'edx.com/courses/my-course-url/resume',
  ...data,
});

export const genEnrollmentData = (data = {}) => ({
  coursewareAccess: {
    isTooEarly: false,
    hasUnmetPrerequisites: false,
    isStaff: false,
  },
  accessExpirationDate: ((data.isEnrolled === false) ? null : futureDate),
  canUpgrade: (data.isVerified ? null : true),
  hasFinished: false,
  hasStarted: false,
  isAudit: !data.isVerified && (data.isEnrolled !== false),
  isAuditAccessExpired: data.isVerified ? null : false,
  isEmailEnabled: false,
  hasOptedOutOfEmail: false,
  isEnrolled: true,
  isVerified: false,
  ...data,
});

export const genCertificateData = (data = {}) => ({
  availableDate: null,
  isRestricted: false,
  isEarned: false,
  isDownloadable: false,
  certPreviewUrl: 'edx.com/courses/my-course-url/cert-preview',
  ...data,
});

export const availableSessions = [
  {
    startDate: '2000-01-02T00:00:00Z',
    endDate: '2020-01-02T00:00:00Z',
    courseId: genCourseId(1000),
  },
  {
    startDate: '2000-02-03T00:00:00Z',
    endDate: '2020-02-03T00:00:00Z',
    courseId: genCourseId(1001),
  },
  {
    startDate: '2000-03-04T00:00:00Z',
    endDate: '2020-03-04T00:00:00Z',
    courseId: genCourseId(1002),
  },
  {
    startDate: '2000-04-05T00:00:00Z',
    endDate: '2020-04-05T00:00:00Z',
    courseId: genCourseId(1003),
  },
  {
    startDate: '2000-05-06T00:00:00Z',
    endDate: '2020-05-06T00:00:00Z',
    courseId: genCourseId(1004),
  },
];

export const courseRuns = [
  // audit, course run not started
  {},
  // audit, course run not started, too early to view
  {
    enrollment: {
      coursewareAccess: {
        isTooEarly: true,
        hasUnmetPrerequisites: false,
        isStaff: false,
      },
    },
  },
  // audit, course run not started, too early to view and unmet prereqs
  {
    enrollment: {
      coursewareAccess: {
        isTooEarly: true,
        hasUnmetPrerequisites: true,
        isStaff: false,
      },
    },
  },
  // audit, course run started
  {
    courseRun: { isStarted: true },
  },
  // audit, course run started, unmet prereqs
  {
    enrollment: {
      coursewareAccess: {
        isTooEarly: true,
        hasUnmetPrerequisites: true,
        isStaff: false,
      },
    },
    courseRun: { isStarted: true },
  },
  // audit, course run started, access expired, learner not started
  {
    courseRun: { isStarted: true },
    enrollment: {
      accessExpirationDate: pastDate,
      isAuditAccessExpired: true,
    },
  },
  // audit, course run started, access expired, cannot upgrade, learner not started
  {
    courseRun: { isStarted: true },
    enrollment: {
      accessExpirationDate: pastDate,
      canUpgrade: false,
      isAuditAccessExpired: true,
    },
  },
  // audit, course run ended, access expired, cannot upgrade, learner not started
  {
    courseRun: {
      endDate: pastDate,
      isStarted: true,
    },
    enrollment: {
      accessExpirationDate: pastDate,
      isAuditAccessExpired: true,
    },
  },
  // audit, course run archived, access expired, cannot upgrade, learner not started
  {
    courseRun: {
      endDate: pastDate,
      isArchived: true,
      isStarted: true,
    },
    enrollment: {
      accessExpirationDate: pastDate,
      isAuditAccessExpired: true,
    },
  },
  // audit, course run and learner started, passing
  {
    courseRun: { isStarted: true },
    enrollment: { hasStarted: true },
  },
  // audit, course run and learner started, access expired
  {
    courseRun: {
      courseRun: { isStarted: true },
    },
    enrollment: {
      accessExpirationDate: pastDate,
      isAuditAccessExpired: true,
      hasStarted: true,
    },
  },
  // audit, course run and learner started, access expired, cannot upgrade
  {
    courseRun: {
      courseRun: { isStarted: true },
    },
    enrollment: {
      accessExpirationDate: pastDate,
      canUpgrade: false,
      isAuditAccessExpired: true,
      hasStarted: true,
    },
  },
  // audit, course run ended, learner started, expired, cannot upgraded, not passing
  {
    courseRun: {
      courseRun: {
        isStarted: true,
        endDate: pastDate,
      },
    },
    enrollment: {
      accessExpirationDate: pastDate,
      canUpgrade: false,
      isAuditAccessExpired: true,
      hasStarted: true,
    },
    grade: { isPassing: false },
  },
  // audit, course run archived, learner started, expired, cannot upgrade, not passing
  {
    courseRun: {
      courseRun: {
        isStarted: true,
        isArchived: true,
        endDate: pastDate,
      },
    },
    enrollment: {
      accessExpirationDate: pastDate,
      canUpgrade: false,
      isAuditAccessExpired: true,
      hasStarted: true,
    },
    grade: { isPassing: false },
  },
  // verified, course not started, learner not started
  { enrollment: { isVerified: true } },
  // verified, course started, learner not started
  {
    courseRun: { isStarted: true },
    enrollment: { isVerified: true },
  },
  // verified, course started, learner started, passing
  {
    courseRun: { isStarted: true },
    enrollment: { hasStarted: true, isVerified: true },
  },
  // verified, course started, learner started, not passing
  {
    courseRun: { isStarted: true },
    gradeData: { isPassing: false },
    enrollment: { hasStarted: true, isVerified: true },
  },
  // verified, learner finished, not passing, cert not earned
  {
    enrollment: {
      hasFinished: true,
      hasStarted: true,
      isVerified: true,
    },
    courseRun: { isStarted: true },
    gradeData: { isPassing: false },
    certificate: {
      isEarned: false,
    },
  },
  // verified, learner finished, passing, cert earned but not available
  {
    enrollment: {
      hasFinished: true,
      hasStarted: true,
      isVerified: true,
    },
    courseRun: { isStarted: true },
    certificate: {
      isEarned: true,
      availableDate: futureDate,
    },
  },
  // verified, learner finished, passing, restricted
  {
    enrollment: {
      hasFinished: true,
      hasStarted: true,
      isVerified: true,
    },
    courseRun: { isStarted: true },
    certificate: { isRestricted: true },
  },
  // verified, learner finished, cert earned, downloadable (web + link)
  {
    enrollment: {
      hasFinished: true,
      hasStarted: true,
      isVerified: true,
    },
    courseRun: { isStarted: true },
    certificate: {
      isEarned: true,
      isDownloadable: true,
      availableDate: pastDate,
      certPreviewUrl: bannerImgSrc,
    },
  },
  // verified, course ended, learner finished, cert earned, downloadable (link only),
  {
    enrollment: {
      hasFinished: true,
      hasStarted: true,
      isVerified: true,
    },
    courseRun: {
      isStarted: true,
      endDate: pastDate,
    },
    certificate: {
      isEarned: true,
      isDownloadable: true,
      availableDate: pastDate,
    },
  },
  // verified, course archived, learner finished, cert earned, downloadable (web + link)
  {
    enrollment: {
      hasFinished: true,
      hasStarted: true,
      isVerified: true,
    },
    courseRun: {
      isStarted: true,
      isArchived: true,
      endDate: pastDate,
    },
    certificate: {
      isEarned: true,
      isDownloadable: true,
      availableDate: pastDate,
      certPreviewUrl: bannerImgSrc,
    },
  },
  // Entitlement - not started
  {
    enrollment: {
      isVerified: true,
      coursewareAccess: {
        isTooEarly: true,
        hasUnmetPrerequisites: false,
        isStaff: false,
      },
    },
    courseRun: { isStarted: false },
    entitlement: {
      uuid: genEntitlementUUID(0),
      availableSessions,
      changeDeadline: futureDate,
      enrollmentUrl: '/entitlement-enrollment',
      isExpired: false,
      isFulfilled: true,
      isRefundable: true,
    },
  },
  // Entitlement - Course run started, learner not started, unmet prereqs
  {
    enrollment: {
      isVerified: true,
      coursewareAccess: {
      },
    },
    courseRun: { isStarted: true },
    entitlement: {
      uuid: genEntitlementUUID(1),
      availableSessions,
      changeDeadline: futureDate,
      enrollmentUrl: '/entitlement-enrollment',
      isExpired: false,
      isFulfilled: true,
      isRefundable: true,
    },
  },
  // Entitlement - Course run started, learner started, not passing
  {
    enrollment: {
      isVerified: true,
      hasStarted: true,
    },
    courseRun: { isStarted: true },
    entitlement: {
      uuid: genEntitlementUUID(2),
      availableSessions,
      changeDeadline: futureDate,
      enrollmentUrl: '/entitlement-enrollment',
      isExpired: false,
      isFulfilled: true,
      isRefundable: true,
    },
    gradeData: { isPassing: false },
  },
  // Entitlement - Course run started, learner started, passing, cannot change
  {
    enrollment: {
      isVerified: true,
      hasStarted: true,
    },
    courseRun: { isStarted: true },
    entitlement: {
      uuid: genEntitlementUUID(3),
      availableSessions,
      changeDeadline: pastDate,
      enrollmentUrl: '/entitlement-enrollment',
      isExpired: false,
      isFulfilled: true,
      isRefundable: true,
    },
  },
  // Entitlement - Learner finished, but did not pass
  {
    enrollment: {
      isVerified: true,
      hasFinished: false,
    },
    courseRun: { isStarted: true },
    entitlement: {
      uuid: genEntitlementUUID(4),
      availableSessions: null,
      changeDeadline: pastDate,
      enrollmentUrl: '/entitlement-enrollment',
      isExpired: false,
      isFulfilled: true,
      isRefundable: false,
    },
    gradeData: { isPassing: false },
  },
  // Entitlement - Learner finished, and passed.  cannot refund.  previewable cert.
  {
    enrollment: {
      isVerified: true,
      hasFinished: false,
    },
    courseRun: { isStarted: true },
    entitlement: {
      uuid: genEntitlementUUID(5),
      availableSessions: null,
      changeDeadline: pastDate,
      enrollmentUrl: '/entitlement-enrollment',
      isExpired: false,
      isFulfilled: true,
      isRefundable: false,
    },
    certificate: {
      isEarned: true,
      isDownloadable: true,
      availableDate: pastDate,
      certPreviewUrl: bannerImgSrc,
    },
  },
  // Entitlement - Learner finished and failed.  cannot refund.  course ended.
  {
    enrollment: {
      isVerified: true,
      hasFinished: false,
    },
    courseRun: {
      isStarted: true,
      endDate: pastDate,
    },
    entitlement: {
      uuid: genEntitlementUUID(6),
      availableSessions: null,
      enrollmentUrl: '/entitlement-enrollment',
      isFulfilled: true,
      isRefundable: false,
      changeDeadline: pastDate,
      isExpired: false,
    },
    gradeData: { isPassing: false },
  },
  // Entitlement - Learner finished and passed.  cannot refund.  course archived.   cert downloadable
  {
    enrollment: {
      isVerified: true,
      hasFinished: false,
    },
    courseRun: {
      isArchived: true,
      isStarted: true,
      endDate: pastDate,
    },
    entitlement: {
      uuid: genEntitlementUUID(7),
      availableSessions: null,
      changeDeadline: pastDate,
      enrollmentUrl: '/entitlement-enrollment',
      isExpired: false,
      isRefundable: false,
      isFulfilled: true,
    },
    certificate: {
      isEarned: true,
      isDownloadable: true,
      availableDate: pastDate,
      certPreviewUrl: bannerImgSrc,
    },
  },
];

// unfulfilled entitlement select session
// unfulfilled entitlement select session with deadline
// unfulfilled entitlement select session pass deadline with available session {banner different from 4th}
// unfulfilled entitlement select session pass deadline without available session
export const entitlementCourses = [
  {
    entitlement: {
      uuid: genEntitlementUUID(10),
      availableSessions,
      changeDeadline: futureDate,
      enrollmentUrl: '/entitlement-enrollment',
      isExpired: false,
      isFulfilled: false,
      isRefundable: true,
    },
  }, {
    entitlement: {
      uuid: genEntitlementUUID(11),
      availableSessions,
      changeDeadline: soonDateStr,
      enrollmentUrl: '/entitlement-enrollment',
      isExpired: false,
      isFulfilled: false,
      isRefundable: true,
    },
  }, {
    entitlement: {
      uuid: genEntitlementUUID(12),
      availableSessions,
      changeDeadline: pastDate,
      enrollmentUrl: '/entitlement-enrollment',
      isExpired: false,
      isFulfilled: false,
      isRefundable: true,
    },
  }, {
    entitlement: {
      uuid: genEntitlementUUID(13),
      availableSessions: [],
      changeDeadline: pastDate,
      enrollmentUrl: '/entitlement-enrollment',
      isExpired: true,
      isFulfilled: false,
      isRefundable: true,
    },
  },
];

// Entitlement Course - refundable
// Entitlement Course - cannot view yet
// Entitlement Course - can view and change
// Entitlement Course - expired
export const courseRunData = courseRuns.map(
  (data, index) => {
    const courseName = genCourseTitle(index);
    const courseId = genCourseId(index);
    const courseNumber = genCourseNumber(index);
    const providerIndex = index % 3;
    const lastEnrolledDate = new Date();
    lastEnrolledDate.setDate(lastEnrolledDate.getDate() - index);
    const lastEnrolled = lastEnrolledDate.toISOString();
    const iteratedData = [
      {
        course: { courseName, bannerImgSrc, courseNumber },
        emailSettings: { isEmailEnabled: false, hasOptedOutOfEmail: false },
        programs: { relatedPrograms },
        courseProvider: providers.edx,
      },
      {
        course: { courseName, bannerImgSrc, courseNumber },
        emailSettings: { isEmailEnabled: true, hasOptedOutOfEmail: false },
        courseProvider: providers.mit,
        programs: { relatedPrograms: [relatedPrograms[0]] },
      },
      {
        course: { courseName, bannerImgSrc, courseNumber },
        emailSettings: { isEmailEnabled: true, hasOptedOutOfEmail: true },
        courseProvider: null,
        programs: { relatedPrograms: [] },
      },
    ];
    return {
      gradeData: { isPassing: true },
      entitlement: null,
      ...data,
      certificate: genCertificateData(data.certificate),
      enrollment: genEnrollmentData({ lastEnrolled, ...data.enrollment }),
      courseRun: genCourseRunData({
        ...data.courseRun,
        ...iteratedData.emailSettings,
        courseId,
      }),
      courseProvider: iteratedData[providerIndex].courseProvider,
      course: iteratedData[providerIndex].course,
      programs: iteratedData[providerIndex].programs,
    };
  },
);

export const entitlementData = entitlementCourses.map(
  (data, index) => {
    const courseName = genCourseTitle(100 + index);
    const courseNumber = genCourseNumber(100 + index);
    const providerIndex = index % 3;
    const iteratedData = [
      {
        courseProvider: providers.edx,
        course: { courseNumber, courseName, bannerImgSrc },
        programs: { relatedPrograms },
      },
      {
        courseProvider: providers.mit,
        course: { courseNumber, courseName, bannerImgSrc },
        programs: { relatedPrograms: [relatedPrograms[0]] },
      },
      {
        courseProvider: null,
        course: { courseNumber, courseName, bannerImgSrc },
        programs: { relatedPrograms: [] },
      },
    ];
    return {
      enrollment: genEnrollmentData({
        isEnrolled: false,
        lastEnrolled: null,
        accessExpirationDate: null,
        canUpgrade: false,
        hasFinished: false,
        hasStarted: false,
        isAudit: false,
        isAuditAccessExpired: false,
        isEmailEnabled: false,
        isVerified: false,
      }),
      gradeData: null,
      certificate: null,
      courseRun: null,
      ...data,
      ...iteratedData[providerIndex],
    };
  },
);

export default {
  courseRunData,
  entitlementData,
  globalData,
};
