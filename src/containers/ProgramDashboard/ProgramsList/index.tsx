import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import {
  CardGrid, Col, Container, Row,
} from '@openedx/paragon';
import { logError } from '@edx/frontend-platform/logging';
import { camelCaseObject } from '@edx/frontend-platform/utils';
import { useIntl } from '@edx/frontend-platform/i18n';

import { getProgramsListData } from '../data/api';
import { ProgramData } from '../data/types';
import ProgramListCard from './ProgramListCard';
import ExploreProgramsCTA from './ExploreProgramsCTA';
import messages from './messages';

import './index.scss';

const ProgramsList: React.FC = () => {
  const { formatMessage } = useIntl();

  const [programsData, setProgramsData] = useState<ProgramData[]>([]);

  useEffect(() => {
    getProgramsListData()
      .then(responseData => {
        setProgramsData(camelCaseObject(responseData.data));
      })
      .catch(err => logError(err));
  }, []);

  return (
    <>
      <Helmet>
        <title>
          {formatMessage(messages.programDashboardPageTitle)}
        </title>
      </Helmet>
      <Container className="p-4.5">
        <div className="h2">
          {formatMessage(messages.programsListHeaderText)}
        </div>
        <Row className="py-3 gap-2">
          <Col sm={12} md={9}>
            <CardGrid columnSizes={{ xs: 12, lg: 6 }}>
              {programsData.map(program => (
                <ProgramListCard key={program.uuid} program={program} />
              ))}
            </CardGrid>
          </Col>
          <Col sm={12} md={3}>
            <ExploreProgramsCTA />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProgramsList;
