export const getCoursesWithType = (courseTypes) => {
  const courses = [];

  courseTypes.forEach((type) => {
    courses.push({
      title: 'Introduction to Computer Science',
      image: {
        src: 'https://www.image-2.com/ed79a49b-64c1-48d2-afdc-054bf921e38d-6a76ceb47dea.small.jpg',
      },
      prospectusPath: 'course/introduction-to-computer-sceince',
      owners: [
        {
          key: 'HarvardX',
          name: 'Harvard University',
          logoImageUrl: 'http://www.image.com/ef72daf3-c9a1-4c00-ba37-b3514392bdcf-8839c516815a.png',
        },
      ],
      courseType: type,
    });
  });

  return courses;
};

export const mockCrossProductCourses = getCoursesWithType(['executive-education-2u', 'bootcamp-2u']);
export const mockOpenCourses = getCoursesWithType(['verified-audit', 'audit', 'verified', 'course']);

export const mockResponse = {
  crossProductCourses: mockCrossProductCourses,
  amplitudeCourses: mockOpenCourses,
};
