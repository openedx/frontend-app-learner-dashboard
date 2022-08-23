import { StrictDict } from 'utils';

export const providers = StrictDict({
  edx: {
    name: 'edX Course Provider',
    website: 'www.edx.com',
    email: 'support@edx.com',
  },
  mit: {
    name: 'MIT',
    website: 'www.mit.edu',
    email: 'support@mit.edu',
  },
});

export const relatedPrograms = [
  {
    provider: 'HarvardX',
    bannerUrl: 'https://prod-discovery.edx-cdn.org/media/course/image/327c8e4f-315a-417b-9857-046dfc90c243-677b97464958.small.jpg',
    logoUrl: 'https://prod-discovery.edx-cdn.org/organization/certificate_logos/44022f13-20df-4666-9111-cede3e5dc5b6-770e00385e7e.png',
    title: 'Relativity in Modern Mechanics',
    programUrl: 'www.edx/my-program',
    programType: 'MicroBachelors Program',
    numberOfCourses: 3,
  },
  {
    provider: 'University  of Maryland',
    bannerUrl: 'https://prod-discovery.edx-cdn.org/media/programs/banner_images/9a310b98-8f27-439e-be85-12d6460245c9-f2efca129273.small.jpg',
    logoUrl: 'https://prod-discovery.edx-cdn.org/organization/certificate_logos/b9dc96da-b3fc-45a6-b6b7-b8e12eb79335-ac60112330e3.png',
    title: 'Pandering for Modern Professionals',
    programUrl: 'www.edx/my-program-2',
    programType: 'MicroBachelors Program',
    programTypeUrl: 'www.edx/my-program-type',
    numberOfCourses: 3,
  },
];

export const genCardId = (index) => `card-id${index}`;
export const genCourseId = (index) => `course-number${index}-course-id${index}`;
export const genCourseNumber = (index) => `course-number${index}`;
export const genCourseTitle = (index) => `Course Name ${index}`;

const logos = {
  edx: 'https://edx-cdn.org/v3/prod/logo.svg',
  social: 'https://courses.edx.org/asset-v1:USMx+LDT200x+2T2021+type@thumbnail+block@course_image-375x200.jpg',
  science: 'https://courses.edx.org/asset-v1:HarvardX+PH525.5x+3T2020+type@thumbnail+block@course_image-375x200.jpg',
};

const farPastDate = '11/11/1900';
const pastDate = '11/11/2000';
const futureDate = '11/11/3030';
const farFutureDate = '11/11/4040';
const soonDate = new Date();
soonDate.setDate(soonDate.getDate() + 60);
const soonDateStr = soonDate.toDateString();

const globalData = {
  emailConfirmation: {
    isNeeded: true,
    sendEmailUrl: 'sendConfirmation@edx.org',
  },
  enterpriseDashboards: {
    availableDashboards: [
      { label: 'edX, Inc.', url: '/edx-dashboard' },
      { label: 'Harvard', url: '/harvard-dashboard' },
    ],
    mostRecentDashboard: { label: 'edX, Inc.', url: '/edx-dashboard' },
  },
  platformSettings: {
    supportEmail: 'support@example.com',
    billingEmail: 'billing@email.com',
    courseSearchUrl: 'edx.com/course-search',
  },
  suggestedCourses: [
    {
      bannerUrl: 'https://prod-discovery.edx-cdn.org/media/programs/banner_images/9a310b98-8f27-439e-be85-12d6460245c9-f2efca129273.small.jpg',
      logoUrl: 'https://prod-discovery.edx-cdn.org/organization/certificate_logos/b9dc96da-b3fc-45a6-b6b7-b8e12eb79335-ac60112330e3.png',
      title: 'Suggested course 1',
      courseUrl: 'www.edx/suggested-course',
    },
    {
      bannerUrl: 'https://prod-discovery.edx-cdn.org/media/programs/banner_images/9a310b98-8f27-439e-be85-12d6460245c9-f2efca129273.small.jpg',
      logoUrl: 'https://prod-discovery.edx-cdn.org/organization/certificate_logos/b9dc96da-b3fc-45a6-b6b7-b8e12eb79335-ac60112330e3.png',
      title: 'Suggested course 2',
      courseUrl: 'www.edx/suggested-course',
    },
    {
      bannerUrl: 'https://prod-discovery.edx-cdn.org/media/programs/banner_images/9a310b98-8f27-439e-be85-12d6460245c9-f2efca129273.small.jpg',
      logoUrl: 'https://prod-discovery.edx-cdn.org/organization/certificate_logos/b9dc96da-b3fc-45a6-b6b7-b8e12eb79335-ac60112330e3.png',
      title: 'Suggested course 3',
      courseUrl: 'www.edx/suggested-course',
    },
    {
      bannerUrl: 'https://prod-discovery.edx-cdn.org/media/programs/banner_images/9a310b98-8f27-439e-be85-12d6460245c9-f2efca129273.small.jpg',
      logoUrl: 'https://prod-discovery.edx-cdn.org/organization/certificate_logos/b9dc96da-b3fc-45a6-b6b7-b8e12eb79335-ac60112330e3.png',
      title: 'Suggested course 4',
      courseUrl: 'www.edx/suggested-course',
    },
  ],
};

export const genCourseRunData = (data = {}) => ({
  isStarted: false,
  isArchived: false,
  startDate: data.isStarted ? farPastDate : futureDate,
  endDate: farFutureDate,
  minPassingGrade: 70,
  homeUrl: 'edx.com/courses/my-course-url/home',
  marketingUrl: 'edx.com/courses/my-course-url/marketing',
  progressUrl: 'edx.com/courses/my-course-url/progress',
  unenrollUrl: 'edx.com/courses/my-course-url/unenroll',
  resumeUrl: 'edx.com/courses/my-course-url/resume',
  ...data,
});

export const genEnrollmentData = (data = {}) => ({
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
  { startDate: '1/2/2000', endDate: '1/2/2020', courseId: genCourseId(1000) },
  { startDate: '2/3/2000', endDate: '2/3/2020', courseId: genCourseId(1001) },
  { startDate: '3/4/2000', endDate: '3/4/2020', courseId: genCourseId(1002) },
  { startDate: '4/5/2000', endDate: '4/6/2020', courseId: genCourseId(1003) },
  { startDate: '5/6/2000', endDate: '5/7/2020', courseId: genCourseId(1004) },
];

export const courseRuns = [
  // audit, course run not started
  {},
  // audit, course run started
  {
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
    enrollment: { isStarted: true },
  },
  // audit, course run and learner started, access expired
  {
    courseRun: {
      courseRun: { isStarted: true },
    },
    enrollment: {
      accessExpirationDate: pastDate,
      isAuditAccessExpired: true,
      isStarted: true,
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
      isStarted: true,
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
      isStarted: true,
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
      isStarted: true,
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
    grades: { isPassing: false },
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
    grades: { isPassing: false },
    certificates: {
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
    certificates: {
      isEarned: true,
      availableDate: futureDate,
      isAvailable: false,
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
    certificates: { isRestricted: true },
  },
  // verified, learner finished, cert earned, downloadable (web + link)
  {
    enrollment: {
      hasFinished: true,
      hasStarted: true,
      isVerified: true,
    },
    courseRun: { isStarted: true },
    certificates: {
      isEarned: true,
      isAvailable: true,
      isDownloadable: true,
      availableDate: pastDate,
      certPreviewUrl: logos.edx,
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
    certificates: {
      isEarned: true,
      isAvailable: true,
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
    certificates: {
      isEarned: true,
      isAvailable: true,
      isDownloadable: true,
      availableDate: pastDate,
      certPreviewUrl: logos.edx,
    },
  },
  // Entitlement - not started
  {
    enrollment: { isVerified: true },
    courseRun: { isStarted: false },
    entitlements: {
      availableSessions,
      canViewCourse: false,
      changeDeadline: futureDate,
      enrollmentUrl: '/entitlement-enrollment',
      isEntitlement: true,
      isExpired: false,
      isFulfilled: true,
      isRefundable: true,
    },
  },
  // Entitlement - Course run started, learner not started
  {
    enrollment: { isVerified: true },
    courseRun: { isStarted: true },
    entitlements: {
      availableSessions,
      canViewCourse: true,
      changeDeadline: futureDate,
      enrollmentUrl: '/entitlement-enrollment',
      isEntitlement: true,
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
    entitlements: {
      availableSessions,
      canViewCourse: true,
      changeDeadline: futureDate,
      enrollmentUrl: '/entitlement-enrollment',
      isEntitlement: true,
      isExpired: false,
      isFulfilled: true,
      isRefundable: true,
    },
    grades: { isPassing: false },
  },
  // Entitlement - Course run started, learner started, passing, cannot change
  {
    enrollment: {
      isVerified: true,
      hasStarted: true,
    },
    courseRun: { isStarted: true },
    entitlements: {
      availableSessions,
      canViewCourse: true,
      changeDeadline: pastDate,
      enrollmentUrl: '/entitlement-enrollment',
      isEntitlement: true,
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
    entitlements: {
      availableSessions: null,
      canViewCourse: true,
      changeDeadline: pastDate,
      enrollmentUrl: '/entitlement-enrollment',
      isEntitlement: true,
      isExpired: false,
      isFulfilled: true,
      isRefundable: false,
    },
    grades: { isPassing: false },
  },
  // Entitlement - Learner finished, and passed.  cannot refund.  previewable cert.
  {
    enrollment: {
      isVerified: true,
      hasFinished: false,
    },
    courseRun: { isStarted: true },
    entitlements: {
      availableSessions: null,
      canViewCourse: true,
      changeDeadline: pastDate,
      enrollmentUrl: '/entitlement-enrollment',
      isEntitlement: true,
      isExpired: false,
      isFulfilled: true,
      isRefundable: false,
    },
    certificates: {
      isEarned: true,
      isAvailable: true,
      isDownloadable: true,
      availableDate: pastDate,
      certPreviewUrl: logos.edx,
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
    entitlements: {
      availableSessions: null,
      enrollmentUrl: '/entitlement-enrollment',
      isEntitlement: true,
      isFulfilled: true,
      isRefundable: false,
      canViewCourse: true,
      changeDeadline: pastDate,
      isExpired: false,
    },
    grades: { isPassing: false },
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
    entitlements: {
      availableSessions: null,
      canViewCourse: false,
      changeDeadline: pastDate,
      enrollmentUrl: '/entitlement-enrollment',
      isEntitlement: true,
      isExpired: false,
      isRefundable: false,
      isFulfilled: true,
    },
    certificates: {
      isEarned: true,
      isAvailable: true,
      isDownloadable: true,
      availableDate: pastDate,
      certPreviewUrl: logos.edx,
    },
  },
];

// unfulfilled entitlement select session
// unfulfilled entitlement select session with deadline
// unfulfilled entitlement select session pass deadline with available session {banner different from 4th}
// unfulfilled entitlement select session pass deadline without available session
export const entitlementCourses = [
  {
    entitlements: {
      availableSessions,
      canViewCourse: false,
      changeDeadline: futureDate,
      enrollmentUrl: '/entitlement-enrollment',
      isEntitlement: true,
      isExpired: false,
      isFulfilled: false,
      isRefundable: true,
    },
  }, {
    entitlements: {
      availableSessions,
      canViewCourse: false,
      changeDeadline: soonDateStr,
      enrollmentUrl: '/entitlement-enrollment',
      isEntitlement: true,
      isExpired: false,
      isFulfilled: false,
      isRefundable: true,
    },
  }, {
    entitlements: {
      availableSessions,
      canViewCourse: false,
      changeDeadline: pastDate,
      enrollmentUrl: '/entitlement-enrollment',
      isEntitlement: true,
      isExpired: false,
      isFulfilled: false,
      isRefundable: true,
    },
  }, {
    entitlements: {
      availableSessions: [],
      canViewCourse: false,
      changeDeadline: pastDate,
      enrollmentUrl: '/entitlement-enrollment',
      isEntitlement: true,
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
    const title = genCourseTitle(index);
    const cardId = genCardId(index);
    const courseId = genCourseId(index);
    const courseNumber = genCourseNumber(index);
    const providerIndex = index % 3;
    const lastEnrolled = new Date();
    lastEnrolled.setDate(lastEnrolled.getDate() - index);
    const iteratedData = [
      {
        course: { title, bannerUrl: logos.edx, courseNumber },
        emailSettings: { isEmailEnabled: false, hasOptedOutOfEmail: false },
        relatedPrograms,
        provider: providers.edx,
      },
      {
        course: { title, bannerUrl: logos.science, courseNumber },
        emailSettings: { isEmailEnabled: true, hasOptedOutOfEmail: false },
        provider: providers.mit,
        relatedPrograms: [relatedPrograms[0]],
      },
      {
        course: { title, bannerUrl: logos.social, courseNumber },
        emailSettings: { isEmailEnabled: true, hasOptedOutOfEmail: true },
        provider: null,
        relatedPrograms: [],
      },
    ];
    return {
      cardId,
      grades: { isPassing: true },
      entitlements: null,
      ...data,
      certificates: genCertificateData(data.certificates),
      enrollment: genEnrollmentData(data.enrollment),
      courseRun: genCourseRunData({
        ...data.courseRun,
        ...iteratedData.emailSettings,
        courseId,
        lastEnrolled,
      }),
      provider: iteratedData[providerIndex].provider,
      course: iteratedData[providerIndex].course,
      relatedPrograms: iteratedData[providerIndex].relatedPrograms,
    };
  },
);

export const entitlementData = entitlementCourses.map(
  (data, index) => {
    const title = genCourseTitle(100 + index);
    const cardId = genCardId(100 + index);
    const courseNumber = genCourseNumber(100 + index);
    const providerIndex = index % 3;
    const iteratedData = [
      {
        provider: providers.edx,
        course: { courseNumber, title, bannerUrl: logos.edx },
        relatedPrograms,
      },
      {
        provider: providers.mit,
        course: { courseNumber, title, bannerUrl: logos.science },
        relatedPrograms: [relatedPrograms[0]],
      },
      {
        provider: null,
        course: { courseNumber, title, bannerUrl: logos.social },
        relatedPrograms: [],
      },
    ];
    return {
      cardId,
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
      grades: null,
      certificates: null,
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
