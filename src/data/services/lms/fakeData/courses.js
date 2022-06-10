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
    programTypeUrl: 'www.edx/my-program-type',
    numberOfCourses: 3,
    estimatedDuration: '4 weeks',
  },
  {
    provider: 'University  of Maryland',
    bannerUrl: 'https://prod-discovery.edx-cdn.org/media/programs/banner_images/9a310b98-8f27-439e-be85-12d6460245c9-f2efca129273.small.jpg',
    logoUrl: 'https://prod-discovery.edx-cdn.org/organization/certificate_logos/b9dc96da-b3fc-45a6-b6b7-b8e12eb79335-ac60112330e3.png',
    title: 'Pandering for Modern Professionals',
    programUrl: 'www.edx/my-program',
    programType: 'MicroBachelors Program',
    programTypeUrl: 'www.edx/my-program-type',
    numberOfCourses: 3,
    estimatedDuration: '4 weeks',
  },
];

export const genCourseID = (index) => `course-id${index}`;
export const genCourseTitle = (index) => `Course Name ${index}`;

const logos = {
  edx: 'https://edx-cdn.org/v3/prod/logo.svg',
  social: 'https://courses.edx.org/asset-v1:USMx+LDT200x+2T2021+type@thumbnail+block@course_image-375x200.jpg',
  science: 'https://courses.edx.org/asset-v1:HarvardX+PH525.5x+3T2020+type@thumbnail+block@course_image-375x200.jpg',
};

const pastDate = '11/11/2000';
const futureDate = '11/11/3030';

export const genCourseRunData = (data = {}) => ({
  isPending: false,
  isStarted: false,
  isFinished: false,
  isArchived: false,
  accessExpirationDate: futureDate,
  endDate: futureDate,
  minPassingGrade: 70,
  ...data,
});

export const genEnrollmentData = (data = {}) => ({
  isAudit: true,
  isVerified: false,
  canUpgrade: data.verified ? null : true,
  isAuditAccessExpired: data.verified ? null : false,
  isEmailEnabled: false,
  ...data,
});

export const genCertificateData = (data = {}) => ({
  availableDate: null,
  isRestricted: false,
  isAvailable: false,
  isEarned: false,
  isDownloadable: false,
  downloadUrls: null, // { preview, download }
  ...data,
});

export const availableSessions = [
  { startDate: '1/2/2000', endDate: '1/2/2020', courseNumber: genCourseID(100) },
  { startDate: '2/3/2000', endDate: '2/3/2020', courseNumber: genCourseID(101) },
  { startDate: '3/4/2000', endDate: '3/4/2020', courseNumber: genCourseID(102) },
];

export const courseRuns = [
  // audit, pending, cannot upgrade
  {
    enrollment: genEnrollmentData({ isAudit: true }),
    grades: { isPassing: true },
    courseRun: { isPending: true },
    certificates: genCertificateData(),
    entitlements: { isEntitlement: false },
  },
  // audit, started, cannot upgrade, restricted
  {
    enrollment: genEnrollmentData({ isAudit: true, canUpgrade: false }),
    grades: { isPassing: true },
    courseRun: { isStarted: true },
    certificates: genCertificateData({ isRestricted: true }),
    entitlements: { isEntitlement: false },
  },
  // audit, started, can upgrade
  {
    enrollment: genEnrollmentData({ isAudit: true, canUpgrade: true }),
    grades: { isPassing: true },
    courseRun: { isStarted: true },
    certificates: genCertificateData(),
    entitlements: { isEntitlement: false },
  },
  // audit, started, not passing
  {
    enrollment: genEnrollmentData({ isAudit: true, canUpgrade: true }),
    grades: { isPassing: false },
    courseRun: { isStarted: true },
    certificates: genCertificateData(),
    entitlements: { isEntitlement: false },
  },
  // audit, started, audit access expired, can upgrade
  {
    enrollment: genEnrollmentData({ isAudit: true, isAuditAccessExpired: true }),
    grades: { isPassing: true },
    courseRun: { isStarted: true, accessExpirationDate: pastDate },
    certificates: genCertificateData(),
    entitlements: { isEntitlement: false },
  },
  // audit, started, audit access expired, cannot upgrade
  {
    enrollment: genEnrollmentData({
      isAudit: true,
      isAuditAccessExpired: true,
      canUpgrade: false,
    }),
    grades: { isPassing: true },
    courseRun: { isStarted: true, accessExpirationDate: pastDate },
    certificates: genCertificateData(),
    entitlements: { isEntitlement: false },
  },
  // verified, pending, restricted
  {
    enrollment: genEnrollmentData({ isAudit: false, isVerified: true }),
    grades: { isPassing: true },
    courseRun: { isPending: true },
    certificates: genCertificateData({ isRestricted: true }),
    entitlements: { isEntitlement: false },
  },
  // verified, started
  {
    enrollment: genEnrollmentData({ isAudit: false, isVerified: true }),
    grades: { isPassing: true },
    courseRun: { isStarted: true },
    certificates: genCertificateData(),
    entitlements: { isEntitlement: false },
  },
  // verified, not passing
  {
    enrollment: genEnrollmentData({ isAudit: false, isVerified: true }),
    grades: { isPassing: false },
    courseRun: { isStarted: true },
    certificates: genCertificateData(),
    entitlements: { isEntitlement: false },
  },
  // verified, finished, not passing
  {
    enrollment: genEnrollmentData({ isAudit: false, isVerified: true }),
    grades: { isPassing: false },
    courseRun: { isFinished: true, endDate: pastDate },
    certificates: genCertificateData(),
    entitlements: { isEntitlement: false },
  },
  // verified, restricted
  {
    enrollment: genEnrollmentData({ isVerified: true }),
    grades: { isPassing: true },
    courseRun: { isStarted: true },
    certificates: genCertificateData({ isRestricted: true }),
    entitlements: { isEntitlement: false },
  },
  // verified, earned but not available
  {
    enrollment: genEnrollmentData({ isVerified: true }),
    grades: { isPassing: true },
    courseRun: { isStarted: true },
    certificates: genCertificateData({
      isEarned: true,
      availableDate: futureDate,
    }),
    entitlements: { isEntitlement: false },
  },
  // verified, earned, downloadable (web + link)
  {
    enrollment: genEnrollmentData({ isAudit: false, isVerified: true }),
    grades: { isPassing: true },
    courseRun: { isStarted: true },
    certificates: genCertificateData({
      isEarned: true,
      isAvailable: true,
      isDownloadable: true,
      availableDate: pastDate,
      downloadUrls: {
        preview: logos.edx,
        download: logos.social,
      },
    }),
    entitlements: { isEntitlement: false },
  },
  // verified, earned, downloadable (link)
  {
    enrollment: genEnrollmentData({ isAudit: false, isVerified: true }),
    grades: { isPassing: true },
    courseRun: { isStarted: true },
    certificates: genCertificateData({
      isEarned: true,
      isAvailable: true,
      isDownloadable: true,
      availableDate: pastDate,
      downloadUrls: {
        download: logos.social,
      },
    }),
    entitlements: { isEntitlement: false },
  },
  // Entitlement Course Run - Cannot view yet
  {
    enrollment: genEnrollmentData({ isAudit: false, isVerified: true }),
    grades: { isPassing: true },
    courseRun: { isPending: true },
    certificates: genCertificateData(),
    entitlements: {
      isEntitlement: true,
      isFulfilled: true,
      isRefundable: true,
      canViewCourse: false,
      canChange: true,
      changeDeadline: futureDate,
      isExpired: false,
    },
  },
  // Entitlement Course Run - Can View and Change
  {
    enrollment: genEnrollmentData({ isAudit: false, isVerified: true }),
    grades: { isPassing: true },
    courseRun: { isStarted: true },
    certificates: genCertificateData(),
    entitlements: {
      isEntitlement: true,
      isFulfilled: true,
      isRefundable: true,
      canViewCourse: true,
      canChange: true,
      changeDeadline: futureDate,
      isExpired: false,
    },
  },
  // Entitlement Course Run - Can View but not Change
  {
    enrollment: genEnrollmentData({ isAudit: false, isVerified: true }),
    grades: { isPassing: true },
    courseRun: { isStarted: true },
    certificates: genCertificateData(),
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
    enrollment: genEnrollmentData({ isAudit: false, isVerified: true }),
    grades: { isPassing: true },
    courseRun: {
      isStarted: true,
      isFinished: true,
      isArchived: true,
      endDate: pastDate,
    },
    certificates: genCertificateData(),
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

export const entitlementCourses = [
  {
    course: { title: genCourseTitle(100) },
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
    course: { title: genCourseTitle(101) },
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
    course: { title: genCourseTitle(102) },
    entitlements: {
      isEntitlement: true,
      availableSessions,
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
    const courseNumber = genCourseID(index);
    const providerIndex = index % 3;
    const iteratedData = [
      { provider: providers.edx, course: { title, bannerUrl: logos.edx } },
      { provider: providers.mit, course: { title, bannerUrl: logos.science } },
      { provider: null, course: { title, bannerUrl: logos.social } },
    ];
    return {
      ...data,
      relatedPrograms,
      courseRun: genCourseRunData({ ...data.courseRun, courseNumber }),
      ...iteratedData[providerIndex],
      credit: { isPurchased: false, requestStatus: null },
    };
  },
);

export default {
  courseRunData,
  entitlementCourses,
};
