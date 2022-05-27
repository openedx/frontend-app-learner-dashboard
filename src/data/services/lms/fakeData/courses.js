import { StrictDict } from 'utils';

export const providers = StrictDict({
  edx: {
    name: 'edX Course Provider',
    website: 'www.edx.com',
    email: 'support@edx.com',
  },
  MIT: {
    name: 'MIT',
    website: 'www.mit.edu',
    email: 'support@mit.edu',
  },
});

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
  minPassingGrade: 70,
  ...data,
});

export const genEnrollmentData = (data = {}) => ({
  isAudit: true,
  isVerified: false,
  canUpgrade: data.verified ? null : false,
  isAuditAccessExpired: data.verified ? null : false,
  ...data,
});

export const genCertificateData = (data = {}) => ({
  availableDate: null,
  isRestricted: false,
  isAvailable: false,
  isEarned: false,
  isRequesting: false,
  isGenerating: false,
  isDownloadable: false,
  downloadUrls: null, // { preview, download, honorCertDownload }
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
    entitlement: { isEntitlement: false },
  },
  // audit, started, cannot upgrade, restricted
  {
    enrollment: genEnrollmentData({ isAudit: true }),
    grades: { isPassing: true },
    courseRun: { isStarted: true },
    certificates: genCertificateData({ isRestricted: true }),
    entitlement: { isEntitlement: false },
  },
  // audit, started, can upgrade
  {
    enrollment: genEnrollmentData({ isAudit: true, canUpgrade: true }),
    grades: { isPassing: true },
    courseRun: { isStarted: true },
    certificates: genCertificateData(),
    entitlement: { isEntitlement: false },
  },
  // audit, started, not passing
  {
    enrollment: genEnrollmentData({ isAudit: true, canUpgrade: true }),
    grades: { isPassing: false },
    courseRun: { isStarted: true, accessExpirationDate: pastDate },
    certificates: genCertificateData(),
    entitlement: { isEntitlement: false },
  },
  // audit, started, audit access expired
  {
    enrollment: genEnrollmentData({ isAudit: true, isAuditAccessExpired: true }),
    grades: { isPassing: true },
    courseRun: { isStarted: true, accessExpirationDate: pastDate },
    certificates: genCertificateData(),
    entitlement: { isEntitlement: false },
  },
  // verified, pending, restricted
  {
    enrollment: genEnrollmentData({ isVerified: true }),
    grades: { isPassing: true },
    courseRun: { isPending: true },
    certificates: genCertificateData({ isRestricted: true }),
    entitlement: { isEntitlement: false },
  },
  // verified, started
  {
    enrollment: genEnrollmentData({ isVerified: true }),
    grades: { isPassing: true },
    courseRun: { isStarted: true },
    certificates: genCertificateData(),
    entitlement: { isEntitlement: false },
  },
  // verified, not passing
  {
    enrollment: genEnrollmentData({ isVerified: true }),
    grades: { isPassing: false },
    courseRun: { isStarted: true },
    certificates: genCertificateData(),
    entitlement: { isEntitlement: false },
  },
  // verified, finished, not passing
  {
    enrollment: genEnrollmentData({ isVerified: true }),
    grades: { isPassing: false },
    courseRun: { isFinished: true },
    certificates: genCertificateData(),
    entitlement: { isEntitlement: false },
  },
  // verified, restricted
  {
    enrollment: genEnrollmentData({ isVerified: true }),
    grades: { isPassing: true },
    courseRun: { isStarted: true },
    certificates: genCertificateData({ isRestricted: true }),
    entitlement: { isEntitlement: false },
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
    entitlement: { isEntitlement: false },
  },
  // verified, earned, requesting
  {
    enrollment: genEnrollmentData({ isVerified: true }),
    grades: { isPassing: true },
    courseRun: { isStarted: true },
    certificates: genCertificateData({
      isEarned: true,
      isAvailable: true,
      isRequesting: true,
      availableDate: pastDate,
    }),
    entitlement: { isEntitlement: false },
  },
  // verified, earned, generating
  {
    enrollment: genEnrollmentData({ isVerified: true }),
    grades: { isPassing: true },
    courseRun: { isStarted: true },
    certificates: genCertificateData({
      isEarned: true,
      isAvailable: true,
      isGenerating: true,
      availableDate: pastDate,
    }),
    entitlement: { isEntitlement: false },
  },
  // verified, earned, downloadable (web + link)
  {
    enrollment: genEnrollmentData({ isVerified: true }),
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
    entitlement: { isEntitlement: false },
  },
  // verified, earned, downloadable (link)
  {
    enrollment: genEnrollmentData({ isVerified: true }),
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
    entitlement: { isEntitlement: false },
  },
  // verified, earned, downloadable (honor cert)
  {
    enrollment: genEnrollmentData({ isVerified: true }),
    grades: { isPassing: true },
    courseRun: { isStarted: true },
    certificates: genCertificateData({
      isEarned: true,
      isAvailable: true,
      isDownloadable: true,
      availableDate: pastDate,
      downloadUrls: {
        honorCertDownload: logos.bio,
      },
    }),
    entitlement: { isEntitlement: false },
  },
  // Entitlement Course Run - Cannot view yet
  {
    enrollment: genEnrollmentData({ isVerified: true }),
    grades: { isPassing: true },
    courseRun: { isPending: true },
    certificates: genCertificateData(),
    entitlement: {
      isEntitlement: true,
      isFulfilled: true,
      isRefundable: true,
      canViewCourse: false,
      changeDeadline: futureDate,
      isExpired: false,
    },
  },
  // Entitlement Course Run - Can View and Change
  {
    enrollment: genEnrollmentData({ isVerified: true }),
    grades: { isPassing: true },
    courseRun: { isStarted: true },
    certificates: genCertificateData(),
    entitlement: {
      isEntitlement: true,
      isFulfilled: true,
      isRefundable: true,
      canViewCourse: true,
      changeDeadline: futureDate,
      isExpired: false,
    },
  },
  // Entitlement Course Run - Can View but not Change
  {
    enrollment: genEnrollmentData({ isVerified: true }),
    grades: { isPassing: true },
    courseRun: { isStarted: true },
    certificates: genCertificateData(),
    entitlement: {
      isEntitlement: true,
      isFulfilled: true,
      isRefundable: true,
      canViewCourse: true,
      changeDeadline: pastDate,
      isExpired: false,
    },
  },
  // Entitlement Course Run - Expired
  {
    enrollment: genEnrollmentData({ isVerified: true }),
    grades: { isPassing: true },
    courseRun: { isStarted: true },
    certificates: genCertificateData(),
    entitlement: {
      isEntitlement: true,
      isFulfilled: true,
      isRefundable: true,
      canViewCourse: true,
      changeDeadline: pastDate,
      isExpired: true,
    },
  },
];

export const entitlementCourses = [
  {
    course: { title: genCourseTitle(100) },
    entitlements: {
      availableSessions,
      isRefundable: true,
      isFulfilled: false,
      canViewCourse: false,
      changeDeadline: futureDate,
      isExpired: false,
    },
  }, {
    course: { title: genCourseTitle(101) },
    entitlements: {
      availableSessions,
      isRefundable: true,
      isFulfilled: false,
      canViewCourse: false,
      changeDeadline: pastDate,
      isExpired: false,
    },
  }, {
    course: { title: genCourseTitle(102) },
    entitlements: {
      availableSessions,
      isRefundable: true,
      isFulfilled: false,
      canViewCourse: false,
      changeDeadline: pastDate,
      isExpired: true,
    },
  },
];

// Entitlement Course - refundable
// Entitlement Course - cannot view yet
// Entitlement Course - can view and change
// Entitlement Course - expired
export const courseRunData = courseRuns.reduce(
  (obj, curr, index) => {
    const out = { ...curr };
    const providerIndex = index % 3;
    const iteratedData = [
      {
        provider: providers.edx,
        course: { title: genCourseTitle(index), bannerUrl: logos.edx },
      },
      {
        provider: providers.mit,
        course: { title: genCourseTitle(index), bannerUrl: logos.bio },
      },
      {
        provider: null,
        course: { title: genCourseTitle(index), bannerUrl: logos.social },
      },
    ];
    out.courseRun.courseNumber = genCourseID(index);
    return {
      ...out,
      ...iteratedData[providerIndex],
      credit: { isPurchased: false, requestStatus: null },
    };
  },
  {},
);
