import React from 'react';
import {
  Alert, CardGrid, Col, Container, Row, Spinner,
} from '@openedx/paragon';
import { getConfig } from '@edx/frontend-platform';
import { useIntl } from '@edx/frontend-platform/i18n';

import appMessages from 'messages';
import { useProgramsListData } from '../data/api';
import { ProgramData } from '../data/types';
import ProgramListCard from './ProgramListCard';
import ExploreProgramsCTA from './ExploreProgramsCTA';
import messages from './messages';

import './index.scss';

const ProgramsList: React.FC = () => {
  const { formatMessage } = useIntl();
  const { data: programsData, isLoading, isError: errorState } = useProgramsListData() as { data: ProgramData[]; isLoading: boolean; isError: boolean };

  const renderPrograms = () => {
    if (isLoading) {
      return (
        <Row className="justify-content-center py-4">
          <Spinner animation="border" screenReaderText={formatMessage(appMessages.loadingSR)} />
        </Row>
      );
    }
    if (programsData && programsData.length > 0) {
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
  );
};

export default ProgramsList;
