import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Container, Row, Col } from "react-bootstrap";
import {
  FaStar,
  FaStarHalfAlt,
  FaCar,
  FaCogs,
  FaTachometerAlt,
  FaEmpire,
  FaDesktop,
  FaKey,
  FaLock,
  FaEye,
} from "react-icons/fa";

import img1 from "../../img/booking.jpg";
import img2 from "../../img/master-card.jpg";
import img3 from "../../img/paypal.jpg";


const CarBooking = () => {
  const { t } = useTranslation();

  const SubmitHandler = (e) => {
    e.preventDefault();
  };

  const onClick = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <section className="gauto-car-booking section_70">
        <Container>
          <Row>
            <Col>
              <iframe style={{width: "100%", height: "900px"}} src="https://rentsyst.com/ua/settings/iframe-constructor/?token=_EuisLmYq2hCMmyepiNHtOSN33k4uYzn&id=4365"></iframe>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default CarBooking;
