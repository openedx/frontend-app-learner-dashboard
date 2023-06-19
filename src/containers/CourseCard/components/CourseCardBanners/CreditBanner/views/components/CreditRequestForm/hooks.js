import React from 'react';

export const useCreditRequestFormData = (requestData) => {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (requestData !== null) {
      ref.current.click();
    }
  }, [requestData]);
  return { ref };
};

export default useCreditRequestFormData;
