import { configuration } from 'config';
import { setCookie, getCookie } from 'utils/cookies';

import track from '../track';
import './index.scss';

export const useCourseCardData = (course, isPersonalized) => {
  const handleCourseClick = (e) => {
    e.preventDefault();

    const cookieName = configuration.PERSONALIZED_RECOMMENDATION_COOKIE_NAME;
    let recommendedCourses = getCookie(cookieName);
    if (typeof recommendedCourses === 'undefined') {
      recommendedCourses = { course_keys: [course.courseKey] };
    } else if (!recommendedCourses.course_keys.includes(course.courseKey)) {
      recommendedCourses.course_keys.push(course.courseKey);
    }
    recommendedCourses.is_personalized_recommendation = isPersonalized;
    setCookie(cookieName, JSON.stringify(recommendedCourses), 365);

    track.recommendedCourseClicked(
      course.courseKey,
      isPersonalized,
      course?.marketingUrl,
    )(e);
  };
  return { handleCourseClick };
};

export default useCourseCardData;
