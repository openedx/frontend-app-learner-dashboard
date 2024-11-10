/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  faFacebookF,
  faLinkedin,
  faTelegram,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useIntl } from '@edx/frontend-platform/i18n';
import logoWhite from '../assets/logo-white.png';
import plower from '../assets/plower.png';
import './Footer.scss';
import messages from './messages';

const Footer = () => {
  const { formatMessage } = useIntl();
  return (
    <footer>
      {/* Top Footer */}
      <div className="footer-top font-inter">
        <Container
          fluid
          className="d-flex flex-row align-content-center justify-content-center"
        >
          <Row>
            <Col
              className=" d-flex flex-column justify-content-center "
              xl={{ span: 5, offset: 1 }}
              md={6}
            >
              <h2 className="text-white"> {formatMessage(messages.learnAndGrow)}</h2>
              <p>
                {formatMessage(messages.learnAndGrowDetail)}
              </p>
              <strong> {formatMessage(messages.experience)}</strong>
              <p>
                {formatMessage(messages.experienceDetail)}
              </p>
              <strong>{formatMessage(messages.practice)}</strong>
              <p>
                {formatMessage(messages.practiceDetail)}
              </p>
              <strong>{formatMessage(messages.apply)}</strong>
              <p>
                {formatMessage(messages.applyDetail)}
              </p>
            </Col>
            <Col
              className=" d-flex justify-content-center align-items-center"
              md={6}
            >
              <img src={plower} alt="Logo" style={{ maxWidth: '300px' }} />
            </Col>
          </Row>
        </Container>
      </div>

      {/* Bottom Footer */}
      <div className="footer-bottom font-red-hat-display">
        <Container fluid>
          <Row className="text-left text-white text-md-left">
            {/* Logo and Social Media */}
            <Col
              xs={12}
              md={12}
              lg={3}
              className="mb-4 mb-md-0 d-flex flex-column align-items-center"
            >
              <img
                src={logoWhite}
                alt="Logo"
                style={{ maxWidth: '200px' }}
              />
              <ul
                className="list-unstyled list-inline social-icons mt-3"
                style={{ maxWidth: '300px' }}
              >
                <li className="list-inline-item">
                  <a href="https://www.facebook.com/creditbureaucambodia/">
                    <FontAwesomeIcon icon={faFacebookF} />
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="https://www.youtube.com/channel/UCq_XVx9Ov7TpTCYh-gGRnwg">
                    <FontAwesomeIcon icon={faYoutube} />
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="https://www.linkedin.com/company/credit-bureau-cambodia/posts/'">
                    <FontAwesomeIcon icon={faLinkedin} />
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="https://t.me/Creditbureaucambodia">
                    <FontAwesomeIcon icon={faTelegram} />
                  </a>
                </li>
              </ul>

              <p className="mt-3">&copy; 2024 CBC. All rights reserved.</p>
            </Col>

            {/* Our Products */}
            <Col xs={6} md={2} className="mb-4 mb-md-0">
              <h5 className="text-uppercase text-white mb-4 font-weight-bold">
                {formatMessage(messages.browseCourses)}
              </h5>
              <ul className="list-unstyled  small">
                <li><a href="https://www.creditbureau.com.kh/b2c-personal-credit-report">Personal Credit Report</a></li>
                <li><a href="https://www.creditbureau.com.kh/b2c-financial-health-check">Financial Health Check</a></li>
                <li><a href="https://www.creditbureau.com.kh/b2b-credit-report-commercial-credit-report">Commercial Credit Report</a></li>
                <li><a href="https://www.creditbureau.com.kh/b2b-credit-report-consumer-credit-report">Consumer Credit Report</a></li>
                <li><a href="https://www.creditbureau.com.kh/b2c-k-score">K-Score</a></li>
                <li><a href="https://www.creditbureau.com.kh/b2b-bi-data-analytics-report">Data Analytic Report</a></li>

                <li><a href="https://www.creditbureau.com.kh/b2b-bi-credit-risk-heat-map">Credit Risk Heat Map</a></li>
                <li><a href="https://www.creditbureau.com.kh/b2b-portfolio-monitoring-service-portfolio-monitoring-service">Portfolio Monitoring</a></li>

                <li><a href="https://www.creditbureau.com.kh/b2b-customized-solutions">Customized Solution</a></li>
              </ul>
            </Col>

            {/* Reports */}
            <Col xs={6} md={2} className="mb-4 mb-md-0">
              <h5 className="text-uppercase text-white mb-4 font-weight-bold">
                {formatMessage(messages.reports)}
              </h5>
              <ul className="list-unstyled  small">
                <li><a href="https://www.creditbureau.com.kh/data-for-good-annual-report">Annual Reports</a></li>
                <li><a href="https://www.creditbureau.com.kh/news-and-event-newsletter">Newsletter</a></li>
                <li><a href="https://www.creditbureau.com.kh/data-for-good-consumer-credit-index">Consumer Credit Index</a></li>
                <li><a href="https://www.creditbureau.com.kh/data-for-good-other-reports">Other Reports</a></li>
              </ul>
            </Col>

            {/* Media */}
            <Col xs={6} md={2} className="mb-4 mb-md-0">
              <h5 className="text-uppercase text-white mb-4 font-weight-bold">
              {formatMessage(messages.cbcMembers)}
              </h5>
              <ul className="list-unstyled  small">
                <li><a href="https://www.creditbureau.com.kh/null">Benefits</a></li>
                <li><a href="https://www.creditbureau.com.kh/b2b-our-members-become-member">How to Become Member</a></li>
                <li><a href="https://www.creditbureau.com.kh/b2b-our-members-member-directory">Member Directory</a></li>
              </ul>
            </Col>
            <Col xs={6} md={2} className="mb-4 mb-md-0">
              <h5 className="text-uppercase text-white mb-4 font-weight-bold">
                {formatMessage(messages.aboutUs)}
              </h5>
              <ul className="list-unstyled  small">
                <li><a href="https://www.creditbureau.com.kh/null">Company Profile</a></li>
                <li><a href="https://www.creditbureau.com.kh/null">Organizational Chart</a></li>
                <li><a href="https://www.creditbureau.com.kh/about-cbc-vision">Visions, Missions, Core Value</a></li>

                <li><a href="https://www.creditbureau.com.kh/about-cbc-shareholders">Shareholders</a></li>
                <li><a href="https://www.creditbureau.com.kh/about-cbc-board-of-directors">Board of Directors </a></li>
                <li><a href="https://www.creditbureau.com.kh/about-cbc-management-team">Management Team</a></li>
                <li><a href=" https://www.creditbureau.com.kh/career-current-opportunity">Careers</a></li>
                <li><a href="https://www.creditbureau.com.kh/news-upcoming-event">Latest News</a></li>
                <li><a href="https://www.creditbureau.com.kh/about-cbc-csr-and-sustainability">CSR Activities</a></li>
              </ul>
            </Col>
            {/* Our Members */}
            <Col xs={6} md={1} className="mb-4 mb-md-0">

              <div>
                <h5 className="text-uppercase text-white mb-4 font-weight-bold">
                </h5>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
