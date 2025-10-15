import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { logError } from '@edx/frontend-platform/logging';
import { getProgramsListData } from './api';

interface ProgramsData {
  uuid: String,
  title: String,
  type: String,
  banner_image: object,
  authorizing_organizations: object[],
  progress: object,
}

const ProgramDashboard = () => {
  const [programsData, setProgramsData] = useState<ProgramsData[]>([]);

  useEffect(() => {
    getProgramsListData()
      .then(responseData => setProgramsData(responseData.data))
      .catch(err => logError(err));
  }, []);

  return (
    <>
      <Helmet>
        <title>Program Dashboard</title>
      </Helmet>
      <div>
        {programsData.map(item => (
          <div>
            {item.title}
          </div>
        ))}
      </div>
    </>
  );
};

export default ProgramDashboard;
