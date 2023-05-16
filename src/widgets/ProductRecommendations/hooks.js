import { useState, useEffect } from "react";
import { StrictDict } from 'utils';

import api from './api';
import * as module from './hooks';

// export const state = StrictDict({
//   requestState: (val) => useState(val), // eslint-disable-line
//   courses: (val) => useState(val), // eslint-disable-line
// });

const useFetchMostRecentCourse = () => {
  // Gets the most recent course a user is enrolled in
  // Goes through the courses enrollment property and checks the lastEnrolled property?
  // Can we assume that the order the courses are listed on the Dashbaord is the order that the course was enrolled in?
};

const useFetchCrossProductCourses = () => {
  const [productRecommendations, setProductRecommendations] = useState([]);
  const [isProductRecommendationsLoading, setIsProductRecommendationsLoading] = useState(false);

  // Uses the data from the most recently enrolled course to get the courseId to query our cross product endpoint
  // const mostRecentCourse = useFetchMostRecentCourse()
  useEffect(() => {
    let isMounted = true;
    setIsProductRecommendationsLoading(true);
    if (isMounted) {
      api
        .fetchCrossProductCourses('course-v1:IBM+IBMBCC001+1T2022')
        .then((response) => {
          if (response.status === 200) {
            setIsProductRecommendationsLoading(false);
            setProductRecommendations(response.data.courses);
          }
        });
    }
    return () => { isMounted = false; };
  }, []); // most recent course ID will be the dependancy

  return {
    productRecommendations,
    isProductRecommendationsLoading,
  };
};

const useFetchAlgoliaRecommendations = () => {
  // This hook will fetch algolia reccs and return the reccs
}

export default useFetchCrossProductCourses;
