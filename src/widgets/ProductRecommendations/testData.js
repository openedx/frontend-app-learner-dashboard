export const getCoursesWithType = (courseTypes) => {
  const courses = [];

  courseTypes.forEach((type) => {
    courses.push({
      title: 'Introduction to Computer Science',
      courseRunKey: 'course-v1:Test+Course+2022T2',
      marketingUrl: 'https://www.edx.org/course/some-course?utm_source=source',
      courseType: type,
      image: {
        src: 'https://www.image-2.com/ed79a49b-64c1-48d2-afdc-054bf921e38d-6a76ceb47dea.small.jpg',
      },
      owners: [
        {
          key: 'HarvardX',
          name: 'Harvard University',
          logoImageUrl: 'http://www.image.com/ef72daf3-c9a1-4c00-ba37-b3514392bdcf-8839c516815a.png',
        },
      ],
    });
  });

  return courses;
};

export const mockFooterRecommendationsHook = {
  showAndLoad: { shouldShowFooter: true, shouldLoadFooter: true },
  showDontLoad: { shouldShowFooter: true, shouldLoadFooter: false },
  loadDontShow: { shouldShowFooter: false, shouldLoadFooter: true },
  dontShowOrLoad: { shouldShowFooter: false, shouldLoadFooter: false },
};

export const mockCrossProductCourses = getCoursesWithType(['executive-education-2u', 'bootcamp-2u']);
export const mockOpenCourses = getCoursesWithType(['verified-audit', 'audit', 'verified', 'course']);

export const mockCrossProductResponse = {
  crossProductCourses: mockCrossProductCourses,
  amplitudeCourses: mockOpenCourses,
};

export const mockAmplitudeResponse = {
  amplitudeCourses: mockOpenCourses,
};
