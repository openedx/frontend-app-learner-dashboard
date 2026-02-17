import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import {
  Alert, CardGrid, Col, Container, Row, Spinner,
} from '@openedx/paragon';
import { getConfig } from '@edx/frontend-platform';
import { logError } from '@edx/frontend-platform/logging';
import { camelCaseObject } from '@edx/frontend-platform/utils';
import { useIntl } from '@edx/frontend-platform/i18n';

import appMessages from 'messages';
import { getProgramsListData } from '../data/api';
import { ProgramData } from '../data/types';
import ProgramListCard from './ProgramListCard';
import ExploreProgramsCTA from './ExploreProgramsCTA';
import messages from './messages';

import './index.scss';

const ProgramsList: React.FC = () => {
  const { formatMessage } = useIntl();
  const [programsData, setProgramsData] = useState<ProgramData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorState, setErrorState] = useState<boolean>(false);

  useEffect(() => {
    getProgramsListData()
      .then(responseData => {
        setProgramsData(camelCaseObject(responseData));
        setIsLoading(false);
      })
      .catch(err => {
        logError(err);
        setIsLoading(false);
        setErrorState(true);
      });
  }, []);

  const renderPrograms = () => {
    if (isLoading) {
      return (
        <Row className="justify-content-center py-4">
          <Spinner animation="border" screenReaderText={formatMessage(appMessages.loadingSR)} />
        </Row>
      );
    }
    if (programsData.length > 0) {
      return (
        <>
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
        </>
      );
    }
    return (
      <Col md={9}>
        <ExploreProgramsCTA hasEnrollments={false} />
      </Col>
    );
  };

  const renderFailureAlert = () => {
    const contactUrl = getConfig().CONTACT_URL;
    return (
      <Alert className="mx-auto container-mw-md" variant="danger">
        {formatMessage(messages.errorLoadingProgramEnrollments, {
          contactSupportUrl: (
            <Alert.Link href={contactUrl}>
              {contactUrl}
            </Alert.Link>
          ),
        })}
      </Alert>
    );
  };

  return (
    <>
      <Helmet>
        <title>
          {formatMessage(messages.programDashboardPageTitle)}
        </title>
      </Helmet>
      <Container size="lg" className="p-4.5">
        <h2>
          {formatMessage(messages.programsListHeaderText)}
        </h2>
        <Row className="py-3">
          {errorState ? (
            renderFailureAlert()
          ) : (
            renderPrograms()
          )}
        </Row>
      </Container>
    </>
  );
};

export default ProgramsList;
