/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  faFacebookF,
  faInstagram,
  faLinkedin,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import logoWhite from '../assets/logo-white.png';
import '../i18n';
import './Footer.scss';

const Footer = () => {
  const { i18n, t } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  useEffect(() => {
    // Ensuring language preference is consistent
    if (localStorage.getItem('i18nextLng')?.length > 2) {
      localStorage.setItem('i18nextLng', 'en');
    }
  }, []);

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
              <h2 className="text-white"> {t('learn&grow')}</h2>
              <p>
                {t('learn&grow-detail')}
              </p>
              <strong> {t('experience')}</strong>
              <p>
                {t('experience-detail')}
              </p>
              <strong>{t('practice')}</strong>
              <p>
                {t('practice-detail')}
              </p>
              <strong>{t('apply')}</strong>
              <p>
                {t('apply-detail')}
              </p>
            </Col>
            <Col
              className=" d-flex justify-content-center align-items-center"
              md={6}
            >
              <img src="/plower.png" alt="Logo" style={{ maxWidth: '300px' }} />
            </Col>
          </Row>
        </Container>
      </div>

      {/* Bottom Footer */}
      <div className="footer-bottom font-red-hat-display">
        <Container fluid>
          <Row className="text-center text-white text-md-left">
            {/* Logo and Social Media */}
            <Col
              xs={12}
              md={4}
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
                <li className="list-inline-item  border-green rounded-circle p-2">
                  <a href="#">
                    <FontAwesomeIcon icon={faFacebookF} />
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="#">
                    <FontAwesomeIcon icon={faYoutube} />
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="#">
                    <FontAwesomeIcon icon={faLinkedin} />
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="#">
                    <FontAwesomeIcon icon={faInstagram} />
                  </a>
                </li>
              </ul>

              <p className="mt-3">&copy; 2024 CBC. All rights reserved.</p>
            </Col>

            {/* Browse Courses */}
            <Col xs={6} md={2} className="mb-4 mb-md-0">
              <h5 className="text-uppercase text-white mb-4 font-weight-bold">
                {t('browseCourses')}
              </h5>
              <ul className="list-unstyled  small">
                <li>
                  <a href="#">Programming</a>
                </li>
                <li>
                  <a href="#">Learn Economics</a>
                </li>
                <li>
                  <a href="#">Learn Project</a>
                </li>
                <li>
                  <a href="#">Learn Business</a>
                </li>
                <li>
                  <a href="#">Learn Software</a>
                </li>
                <li>
                  <a href="#">Learn Computer</a>
                </li>
              </ul>
            </Col>

            {/* About Us */}
            <Col xs={6} md={2} className="mb-4 mb-md-0">
              <h5 className="text-uppercase text-white mb-4 font-weight-bold">
                {t('aboutUs')}
              </h5>
              <ul className="list-unstyled  small">
                <li>
                  <a href="#">Company Profile</a>
                </li>
                <li>
                  <a href="#">Vision, Mission & Core Value</a>
                </li>
                <li>
                  <a href="#">Shareholders</a>
                </li>
                <li>
                  <a href="#">Board of Directors</a>
                </li>
                <li>
                  <a href="#">Management Team</a>
                </li>
              </ul>
            </Col>

            {/* Media */}
            <Col xs={6} md={2} className="mb-4 mb-md-0">
              <h5 className="text-uppercase text-white mb-4 font-weight-bold">
                Media
              </h5>
              <ul className="list-unstyled small">
                <li>
                  <a href="#">Programming</a>
                </li>
                <li>
                  <a href="#">CSR Activities</a>
                </li>
                <li>
                  <a href="#">Videos and Photos</a>
                </li>
              </ul>
            </Col>
            {/* Our Members */}
            <Col xs={6} md={2} className="mb-4 mb-md-0">

              <div>
                <h5 className="text-uppercase text-white mb-4 font-weight-bold">
                  {t('language')}
                </h5>
                <select
                  className="lang p-2 border-0"
                  value={localStorage.getItem('i18nextLng')}
                  onChange={(e) => changeLanguage(e.target.value)}
                >
                  <option value="en">English</option>
                  <option value="kh">ខ្មែរ</option>
                </select>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
