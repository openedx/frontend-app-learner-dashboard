import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getConfig } from '@edx/frontend-platform';
import cardFallbackImg from '@edx/brand/paragon/images/card-imagecap-fallback.png';
import {
  breakpoints,
  Card,
  Row,
} from '@openedx/paragon';
import { ProgramCardProps, AuthoringOrganization } from '../data/types';
import ProgressCategoryBubbles from './ProgressCategoryBubbles';

const ProgramListCard: React.FC<ProgramCardProps> = ({
  program,
}) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  const getBannerImageURL = () => {
    let imageURL = '';
    // We need to check that the breakpoint value exists before using it
    // Otherwise TypeScript will flag it as it can potentially be undefined in Paragon
    if (typeof breakpoints.large.minWidth === 'number' && windowWidth >= breakpoints.large.minWidth) {
      imageURL = program.bannerImage.large.url;
    } else if (typeof breakpoints.medium.minWidth === 'number' && windowWidth >= breakpoints.medium.minWidth) {
      imageURL = program.bannerImage.medium.url;
    } else if (typeof breakpoints.small.minWidth === 'number' && windowWidth >= breakpoints.small.minWidth) {
      imageURL = program.bannerImage.small.url;
    } else {
      imageURL = program.bannerImage.xSmall.url;
    }
    return imageURL;
  };

  // Set key and logoImageUrl to empty strings for fallback image or instances where there are multiple organizations
  let authoringOrganization : AuthoringOrganization = {
    key: '',
    logoImageUrl: '',
  };
  // Otherwise use the logoImageUrl and key for the organization
  if (program.authoringOrganizations?.length === 1 && program.authoringOrganizations[0].logoImageUrl) {
    authoringOrganization = {
      logoImageUrl: program.authoringOrganizations[0].logoImageUrl,
      key: program.authoringOrganizations[0].key,
    };
  }

  return (
    <Card
      className="program-list-card"
      isClickable
      as={Link}
      to={`${getConfig().LMS_BASE_URL}/dashboard/programs/${program.uuid}`}
      data-testid="program-list-card"
    >
      <Card.ImageCap
        src={getBannerImageURL() || cardFallbackImg}
        srcAlt={`program card image for ${program.title}`}
        fallbackSrc={cardFallbackImg}
        logoSrc={authoringOrganization?.logoImageUrl}
        logoAlt={authoringOrganization?.key}
        className="banner-image"
      />
      <Card.Section className="pb-0 small">
        <Row className="justify-content-between px-2.5">
          {program.authoringOrganizations && (
            <p className="truncate-text-1">
              {program.authoringOrganizations.map(org => org.key).join(', ')}
            </p>
          )}
          <p>
            {program.type}
          </p>
        </Row>
      </Card.Section>
      <Card.Section>
        <h3 className="truncate-text-2">{program.title}</h3>
      </Card.Section>
      <Card.Section>
        <ProgressCategoryBubbles
          inProgress={program.progress.inProgress}
          notStarted={program.progress.notStarted}
          completed={program.progress.completed}
        />
      </Card.Section>
    </Card>
  );
};

export default ProgramListCard;
