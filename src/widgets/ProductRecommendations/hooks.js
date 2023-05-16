import { useState, useEffect } from "react";
import { StrictDict } from 'utils';

import { RequestStates } from 'data/constants/requests';
import api from './api';
import * as module from './hooks';

export const state = StrictDict({
  requestState: (val) => useState(val), // eslint-disable-line
  courses: (val) => useState(val), // eslint-disable-line
});

const useFetchMostRecentCourse = () => {
  // Gets the most recent course a user is enrolled in
  // Goes through the courses enrollment property and checks the lastEnrolled property?
  // Can we assume that the order the courses are listed on the Dashbaord is the order that the course was enrolled in?
};

const useFetchCrossProductCourses = (setRequestState, setCourses) => {

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      setTimeout(() => {
        console.log("timing")
        api
        .fetchCrossProductCourses('course-v1:IBM+IBMBCC001+1T2022')
        .then((response) => {
          console.log("Here is the response", response)
          if (response.status === 200) {
            setRequestState(RequestStates.completed);
            setCourses(response.data.courses);
          }
        }).catch(err => {
          console.log("here is the error", err);
        });
      }, 5000);
      
    }
    return () => { isMounted = false; };
  /* eslint-disable */
  }, []); // most recent course ID will be the dependancy;
};

const useFetchAlgoliaRecommendations = () => {
  // This hook will fetch algolia reccs and return the reccs
}

const useCrossProductRecommendationsData = () => {
  const [requestState, setRequestState] = state.requestState(RequestStates.pending);
  const [courses, setCourses] = state.courses([]);
  useFetchCrossProductCourses(setRequestState, setCourses);

  return {
    courses,
    isLoading: requestState === RequestStates.pending
  }

}

export default useCrossProductRecommendationsData;
