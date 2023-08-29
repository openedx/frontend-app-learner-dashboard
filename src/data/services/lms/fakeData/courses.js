import { StrictDict } from 'utils';
import creditVals from 'data/constants/credit';

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
export const genCourseShareUrl = (index) => `home.edx.org?social-share-url/${index}`;
export const genEntitlementUUID = (index) => `entitlement-course-uuid-${index}`;

const bannerImgSrc = '/asset-v1:edX+DemoX+Demo_Course+type@asset+block@images_course_image.jpg';

export const farPastDate = '1900-11-11T00:00:00Z';
export const pastDate = '2000-11-11T00:00:00Z';
export const futureDate = '3030-11-11T00:00:00Z';
export const farFutureDate = '4040-11-11T00:00:00Z';
export const soonDate = new Date();
soonDate.setDate(soonDate.getDate() + 60);
export const soonDateStr = soonDate.toDateString();

export const globalData = {
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
  socialShareSettings: {
    facebook: {
      isEnabled: true,
      socialBrand: 'edx.org',
      utmParams: 'utm_campaign=social-sharing-db&utm_medium=social&utm_source=facebook',
    },
    twitter: {
      isEnabled: true,
      socialBrand: 'edx.org',
      utmParams: 'utm_campaign=social-sharing-db&utm_medium=social&utm_source=twitter',
    },
  },
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

export const creditData = {
  providerStatusUrl: 'test-provider-status-url',
  providerName: 'Credit Provider Name',
  providerId: 'credit-provider-id',
  error: false,
  purchased: false,
  requestStatus: null,
};

export const genEnrollmentData = (data = {}) => ({
  coursewareAccess: {
    isTooEarly: false,
    hasUnmetPrerequisites: false,
    isStaff: false,
  },
  accessExpirationDate: ((data.isEnrolled === false) ? null : futureDate),
  canUpgrade: (data.isVerified ? null : true),
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

const auditCourses = [
  // audit, course run not started
  {
    courseName: 'Audit Course, Course run not started',
  },
  // audit, course run not started, too early to view
  {
    courseName: 'Audit Course, Course run not started, Too early to view',
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
    courseName: 'Audit Course, Course run not started, Too early to view, Has unmet prereqs.',
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
    courseName: 'Audit Course, Course run not started',
    courseRun: { isStarted: true },
  },
  // audit, course run started, unmet prereqs
  {
    courseName: 'Audit Course, Course run not started, Has unmet prereqs',
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
    courseName: 'Audit Course, Course run started, Audit ccess expired, Learner not started',
    courseRun: { isStarted: true },
    enrollment: {
      accessExpirationDate: pastDate,
      isAuditAccessExpired: true,
    },
  },
  // audit, course run started, access expired, cannot upgrade, learner not started
  {
    courseName: 'Audit course, Course run not started, Audit access expired, Cannot upgrade, Learner not started',
    courseRun: { isStarted: true },
    enrollment: {
      accessExpirationDate: pastDate,
      canUpgrade: false,
      isAuditAccessExpired: true,
    },
  },
  // audit, course run ended, access expired, cannot upgrade, learner not started
  {
    courseName: 'Audit Course, Course run ended, Audit access expired, Cannot upgrade, Learner not started',
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
    courseName: 'Audit Course, Course run archived, Audit access expired, Cannot upgrade, Learner not started',
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
    courseName: 'Audit Course, Course run and learner started, Passing',
    courseRun: { isStarted: true },
    enrollment: { hasStarted: true },
  },
  // audit, course run and learner started, access expired
  {
    courseName: 'Audit Course, Course run and learner started, Audit access expired',
    courseRun: { isStarted: true },
    enrollment: {
      accessExpirationDate: pastDate,
      isAuditAccessExpired: true,
      hasStarted: true,
    },
  },
  // audit, course run and learner started, access expired, cannot upgrade
  {
    courseName: 'Audit Course, Course run and learner started, Audit access expired, Cannot upgrade',
    courseRun: { isStarted: true },
    enrollment: {
      accessExpirationDate: pastDate,
      canUpgrade: false,
      isAuditAccessExpired: true,
      hasStarted: true,
    },
  },
  // audit, course run ended, learner started, expired, cannot upgraded, not passing
  {
    courseName: 'Audit Course, Course run ended, Learner started, Access expired, Cannot upgrade, Not passing',
    courseRun: {
      isStarted: true,
      endDate: pastDate,
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
    courseName: 'Audit Course, Course run archived, Learner started, Access expired, Cannot upgrade, Not passing',
    courseRun: {
      isStarted: true,
      isArchived: true,
      endDate: pastDate,
    },
    enrollment: {
      accessExpirationDate: pastDate,
      canUpgrade: false,
      isAuditAccessExpired: true,
      hasStarted: true,
    },
    grade: { isPassing: false },
  },
];
const verifiedCourses = [
  // verified, course not started, learner not started
  {
    courseName: 'Verified Course, Course and learner not started',
    enrollment: { isVerified: true },
  },
  // verified, course started, learner not started
  {
    courseName: 'Verified Course, Course started, Learner not started',
    courseRun: { isStarted: true },
    enrollment: { isVerified: true },
  },
  // verified, course started, learner started, passing
  {
    courseName: 'Verified Course, Course and learner started, Passing',
    courseRun: { isStarted: true },
    enrollment: { hasStarted: true, isVerified: true },
  },
  // verified, course started, learner started, not passing
  {
    courseName: 'Verified Course, Course and learner started, not passing',
    courseRun: { isStarted: true },
    gradeData: { isPassing: false },
    enrollment: { hasStarted: true, isVerified: true },
  },
  // verified, learner finished, not passing, cert not earned
  {
    courseName: 'Verified Course, Learner finished, cert not earned',
    enrollment: {
      hasStarted: true,
      isVerified: true,
    },
    courseRun: { isStarted: true, isArchived: true },
    gradeData: { isPassing: false },
    certificate: {
      isEarned: false,
    },
  },
  // verified, learner finished, passing, cert earned but not available
  {
    courseName: 'Verified Course, Learner finished, Cert earned but not available',
    enrollment: {
      hasStarted: true,
      isVerified: true,
    },
    courseRun: { isStarted: true, isArchived: true },
    certificate: {
      isEarned: true,
      availableDate: futureDate,
    },
  },
  // verified, learner finished, passing, restricted
  {
    courseName: 'Verified Course, Learner finished, Passing, Certificate restricted',
    enrollment: {
      hasStarted: true,
      isVerified: true,
    },
    courseRun: { isStarted: true, isArchived: true },
    certificate: { isRestricted: true },
  },
  // verified, learner finished, cert earned, downloadable (web + link)
  {
    courseName: 'Verified Course, Learner finished, Passing, Certificate downloadable and viewable',
    enrollment: {
      hasStarted: true,
      isVerified: true,
    },
    courseRun: { isStarted: true, isArchived: true },
    certificate: {
      isEarned: true,
      isDownloadable: true,
      availableDate: pastDate,
      certPreviewUrl: bannerImgSrc,
    },
  },
  // verified, course ended, learner finished, cert earned, downloadable (link only),
  {
    courseName: 'Verified Course, Course ended, Learner finished, Passing, Certificate downloadable',
    enrollment: {
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
    },
  },
  // verified, course ended, learner finished, cert earned, downloadable (web + link)
  {
    courseName: 'Verified Course, Course ended, Learner finished, Passing, Certificate downloadable and viewable',
    enrollment: {
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
];
const fulfilledEntitlementCourses = [
  // Entitlement - not started
  {
    courseName: 'Entitlement Course, not started',
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
    courseName: 'Entitlement Course, Course run started, Learner not started, Has unmet prereqs',
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
    courseName: 'Entitlement Course, Course run started, Learner started, Not passing',
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
    courseName: 'Entitlement Course, Course run and learner started, Passing, Cannot change sessions',
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
    courseName: 'Entitlement Course, Learner finished but did not pass',
    enrollment: {
      isVerified: true,
    },
    courseRun: { isStarted: true, isArchived: false },
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
    courseName: 'Entitlement course, Learner finished and passed, Cannot refund, Previewable Cert',
    enrollment: {
      isVerified: true,
    },
    courseRun: { isStarted: true, isArchived: false },
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
    courseName: 'Entitlement Course, Learner finished and failed, Cannot refund, Course ended',
    enrollment: {
      isVerified: true,
    },
    courseRun: {
      isStarted: true,
      isArchived: false,
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
  // Entitlement - Learner finished and passed.  cannot refund.  cert downloadable
  {
    courseName: 'Entitlement Course, Learner finished and passed, Cannot refund, Cert downloadable',
    enrollment: {
      isVerified: true,
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
const creditCourses = [
  {
    courseName: 'Credit - Eligible for credit from unknown provider',
    credit: {
      ...creditData,
      providerName: null,
      providerId: null,
    },
    enrollment: { isEnrolled: true },
  },
  {
    courseName: 'Credit - Eligible for credit from known provider',
    credit: creditData,
    enrollment: { isEnrolled: true },
  },
  {
    courseName: 'Credit - Purchased but must request',
    credit: { ...creditData, purchased: true },
    enrollment: { isEnrolled: true },
  },
  {
    courseName: 'Credit - Credit Request Pending',
    credit: {
      ...creditData,
      purchased: true,
      requestStatus: creditVals.requestStatuses.pending,
    },
    enrollment: { isEnrolled: true },
  },
  {
    courseName: 'Credit - Credit Request Approved',
    credit: {
      ...creditData,
      purchased: true,
      requestStatus: creditVals.requestStatuses.approved,
    },
    enrollment: { isEnrolled: true },
  },
  {
    courseName: 'Credit - Credit Request Rejected, Error thrown',
    credit: {
      ...creditData,
      purchased: true,
      requestStatus: creditVals.requestStatuses.rejected,
      error: true,
    },
    enrollment: { isEnrolled: true },
  },
];

export const courseRuns = [
  ...auditCourses,
  ...verifiedCourses,
  ...fulfilledEntitlementCourses,
  ...creditCourses,
];

// unfulfilled entitlement select session
// unfulfilled entitlement select session with deadline
// unfulfilled entitlement select session pass deadline with available session {banner different from 4th}
// unfulfilled entitlement select session pass deadline without available session
export const entitlementCourses = [
  {
    courseName: 'Unfulfilled Entitlement select session',
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
    courseName: 'Unfulfilled Entitlement select session with upcoming deadline',
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
    courseName: 'Unfulfilled Entitlement select session past deadline, With available session',
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
    courseName: 'Unfulfilled Entitlement select session past deadline, With available no session',
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

const providerOptions = [
  providers.edx,
  providers.mit,
  null,
];

const emailOptions = [
  { isEmailEnabled: false, hasOptedOutOfEmail: false },
  { isEmailEnabled: true, hasOptedOutOfEmail: false },
  { isEmailEnabled: true, hasOptedOutOfEmail: true },
];

const programsOptions = [
  { relatedPrograms },
  { relatedPrograms: [relatedPrograms[0]] },
  { relatedPrograms: [] },
];

const getOption = (options, index) => options[index % options.length];

export const compileCourseRunData = ({ courseName, ...data }, index) => {
  const courseId = genCourseId(index);
  const courseNumber = genCourseNumber(index);
  const socialShareUrl = genCourseShareUrl(index);
  const lastEnrolledDate = new Date();
  lastEnrolledDate.setDate(lastEnrolledDate.getDate() - index - 1);
  const lastEnrolled = lastEnrolledDate.toISOString();
  const out = {
    gradeData: { isPassing: true },
    entitlement: null,
    credit: {},
    ...data,
    certificate: genCertificateData(data.certificate),
    enrollment: genEnrollmentData({
      lastEnrolled,
      ...getOption(emailOptions, index),
      ...data.enrollment,
    }),
    courseRun: genCourseRunData({
      ...data.courseRun,
      courseId,
    }),
    course: {
      courseName,
      bannerImgSrc,
      courseNumber,
      socialShareUrl,
    },
    courseProvider: getOption(providerOptions, index),
    programs: getOption(programsOptions, index),
  };
  if (out.enrollment.canUpgrade) {
    out.courseRun.upgradeUrl = 'test-upgrade-url';
  }
  return out;
};

export const compileEntitlementData = ({ courseName, ...data }, index) => {
  const courseNumber = genCourseNumber(100 + index);
  const socialShareUrl = genCourseShareUrl(100 + index);
  return {
    enrollment: genEnrollmentData({
      isEnrolled: false,
      lastEnrolled: null,
      accessExpirationDate: null,
      canUpgrade: false,
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
    course: {
      courseName,
      courseNumber,
      bannerImgSrc,
      socialShareUrl,
    },
    courseProvider: getOption(providerOptions, index),
    programs: getOption(programsOptions, index),
  };
};

// Entitlement Course - refundable
// Entitlement Course - cannot view yet
// Entitlement Course - can view and change
// Entitlement Course - expired
export const courseRunData = courseRuns.map(compileCourseRunData);
export const entitlementData = entitlementCourses.map(compileEntitlementData);

export default {
  compileEntitlementData,
  compileCourseRunData,
  courseRunData,
  entitlementData,
  globalData,
};
