export const getCoursesWithType = (courseTypes, parameters = true) => {
  const courses = [];
  const marketingUrl = parameters
    ? 'https://www.edx.org/course/some-course?utm_source=source'
    : 'https://www.edx.org/course/some-course';

  courseTypes.forEach((type) => {
    courses.push({
      title: 'Introduction to Computer Science',
      courseRunKey: 'course-v1:Test+Course+2022T2',
      marketingUrl,
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
  default: { isExperimentActive: false, inRecommendationsVariant: true },
  activeControl: { isExperimentActive: true, inRecommendationsVariant: false },
  activeTreatment: { isExperimentActive: true, inRecommendationsVariant: true },
};

export const mockCrossProductCourses = getCoursesWithType(['executive-education-2u', 'bootcamp-2u']);
export const mockOpenCourses = getCoursesWithType(['verified-audit', 'audit', 'verified', 'course']);
export const mockFallbackOpenCourse = getCoursesWithType(['course'], false);

export const mockCrossProductResponse = {
  crossProductCourses: mockCrossProductCourses,
  amplitudeCourses: mockOpenCourses,
};

export const mockAmplitudeResponse = {
  amplitudeCourses: mockOpenCourses,
};
