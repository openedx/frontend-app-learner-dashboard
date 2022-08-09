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
    estimatedNumberOfWeeks: 4,
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
    estimatedNumberOfWeeks: 4,
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

const pastDate = '11/11/2000';
const futureDate = '11/11/3030';
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
  endDate: futureDate,
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
  isAudit: !data.isVerified || data.isEnrolled,
  isAuditAccessExpired: data.isVerified ? null : false,
  isEmailEnabled: false,
  isEnrolled: true,
  isVerified: false,
  ...data,
});

export const genCertificateData = (data = {}) => ({
  availableDate: null,
  isRestricted: false,
  isAvailable: false,
  isEarned: false,
  isDownloadable: false,
  certPreviewUrl: 'edx.com/courses/my-course-url/cert-preview',
  certDownloadUrl: 'edx.com/courses/my-course-url/cert-download',
  honorCertDownloadUrl: 'edx.com/courses/my-course-url/honor-cert-download',
  ...data,
});

export const availableSessions = [
  { startDate: '1/2/2000', endDate: '1/2/2020', courseId: genCourseId(1000) },
  { startDate: '2/3/2000', endDate: '2/3/2020', courseId: genCourseId(1001) },
  { startDate: '3/4/2000', endDate: '3/4/2020', courseId: genCourseId(1002) },
  { startDate: '1/2/2000', endDate: '1/2/2020', courseId: genCourseId(1000) },
  { startDate: '2/3/2000', endDate: '2/3/2020', courseId: genCourseId(1001) },
  { startDate: '3/4/2000', endDate: '3/4/2020', courseId: genCourseId(1002) },
  { startDate: '1/2/2000', endDate: '1/2/2020', courseId: genCourseId(1000) },
  { startDate: '2/3/2000', endDate: '2/3/2020', courseId: genCourseId(1001) },
  { startDate: '3/4/2000', endDate: '3/4/2020', courseId: genCourseId(1002) },
  { startDate: '1/2/2000', endDate: '1/2/2020', courseId: genCourseId(1000) },
  { startDate: '2/3/2000', endDate: '2/3/2020', courseId: genCourseId(1001) },
  { startDate: '3/4/2000', endDate: '3/4/2020', courseId: genCourseId(1002) },
];

export const courseRuns = [
  // audit, can upgrade, course not started,
  {},
  // audit, can upgrade, course started
  {
    courseRun: { isStarted: true },
  },
  // audit, can upgrade, course started, learner started
  {
    courseRun: { isStarted: true },
    enrollment: { hasStarted: true },
  },
  // audit, can upgrade, course started, learner started, not passing
  {
    courseRun: { isStarted: true },
    enrollment: { hasStarted: true },
    grades: { isPassing: false },
  },
  // audit, access expired, can upgrade, course started, learner started
  {
    courseRun: { isStarted: true },
    enrollment: {
      hasStarted: true,
      isAuditAccessExpired: true,
      accessExpirationDate: pastDate,
    },
  },
  // audit, access expired, cannot upgrade, course started, learner started
  {
    courseRun: { isStarted: true },
    enrollment: {
      accessExpirationDate: pastDate,
      isAuditAccessExpired: true,
      hasStarted: true,
      canUpgrade: false,
    },
  },

  // verified, course not started
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
  // verified, learner started, not finished, not passing
  {
    enrollment: { hasStarted: true, isVerified: true },
    grades: { isPassing: false },
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
      certDownloadUrl: logos.social,
      certPreviewUrl: logos.edx,
    },
  },
  // verified, learner finished, cert earned, downloadable (link only)
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
      certDownloadUrl: logos.social,
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
      certDownloadUrl: logos.social,
      certPreviewUrl: logos.edx,
    },
  },
  // verified, course archived, learner started, not finished, not passing
  {
    enrollment: { hasStarted: true, isVerified: true },
    grades: { isPassing: false },
    courseRun: { isArchived: true, endDate: pastDate },
  },
  // Entitlement Course Run - Cannot view yet
  {
    enrollment: { isVerified: true },
    courseRun: { isStarted: false },
    entitlements: {
      isEntitlement: true,
      isFulfilled: true,
      isRefundable: true,
      canViewCourse: false,
      canChange: true,
      changeDeadline: futureDate,
      isExpired: false,
      availableSessions,
    },
  },
  // Entitlement Course Run - Can View and Change
  {
    enrollment: { isVerified: true },
    courseRun: { isStarted: true },
    entitlements: {
      isEntitlement: true,
      isFulfilled: true,
      isRefundable: true,
      canViewCourse: true,
      canChange: true,
      changeDeadline: futureDate,
      isExpired: false,
      availableSessions,
    },
  },
  // Entitlement Course Run - Can View but not Change
  {
    enrollment: { isVerified: true },
    courseRun: { isStarted: true },
    entitlements: {
      isEntitlement: true,
      isFulfilled: true,
      isRefundable: true,
      canViewCourse: true,
      canChange: false,
      changeDeadline: pastDate,
      isExpired: false,
    },
  },
  // Entitlement Course Run - Expired
  {
    enrollment: { isVerified: true },
    courseRun: { isStarted: true, isArchived: true, endDate: pastDate },
    entitlements: {
      isEntitlement: true,
      isFulfilled: true,
      isRefundable: false,
      canViewCourse: true,
      canChange: false,
      changeDeadline: pastDate,
      isExpired: true,
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
      isEntitlement: true,
      availableSessions,
      isRefundable: true,
      isFulfilled: false,
      canViewCourse: false,
      changeDeadline: futureDate,
      canChange: true,
      isExpired: false,
    },
  }, {
    entitlements: {
      isEntitlement: true,
      availableSessions,
      isRefundable: true,
      isFulfilled: false,
      canViewCourse: false,
      changeDeadline: soonDateStr,
      canChange: true,
      isExpired: false,
    },
  }, {
    entitlements: {
      isEntitlement: true,
      availableSessions,
      isRefundable: true,
      isFulfilled: false,
      canViewCourse: false,
      changeDeadline: pastDate,
      canChange: false,
      isExpired: false,
    },
  }, {
    entitlements: {
      isEntitlement: true,
      availableSessions: [],
      isRefundable: true,
      isFulfilled: false,
      canViewCourse: false,
      changeDeadline: pastDate,
      canChange: false,
      isExpired: true,
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
        provider: providers.edx,
        course: { title, bannerUrl: logos.edx, courseNumber },
        relatedPrograms,
      },
      {
        provider: providers.mit,
        course: { title, bannerUrl: logos.science, courseNumber },
        relatedPrograms: [relatedPrograms[0]],
      },
      {
        provider: null,
        course: { title, bannerUrl: logos.social, courseNumber },
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
        courseId,
        lastEnrolled,
      }),
      ...iteratedData[providerIndex],
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
