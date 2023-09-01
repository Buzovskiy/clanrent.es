import React from "react";
import Slider from "react-slick";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {Col, Container, Row} from "react-bootstrap";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import hero1 from "../../img/slider-1.jpg";
import video_wide from "../../video/video-wide.mp4"
// import hero2 from "../../img/slider-2.jpg";


const Hero = () => {
   const {t} = useTranslation();

   const onClick = (e) => {
      e.preventDefault();
   };

   return (
      <section className="gauto-slider-area fix">
         <video autoPlay muted loop className='promo-video'>
            <source src={video_wide} type="video/mp4"/>
         </video>
         {/*<Slider {...settings}>*/}
         {/*  <div className="slide">*/}
         {/*    <div*/}
         {/*      className=" gauto-main-slide"*/}
         {/*      style={{ backgroundImage: `url(${hero1})` }}*/}
         {/*    >*/}
         {/*      <div className="gauto-main-caption">*/}
         {/*        <div className="gauto-caption-cell">*/}
         {/*          <Container>*/}
         {/*            <Row className="justify-content-center">*/}
         {/*              <Col md={8}>*/}
         {/*                <div className="slider-text">*/}
         {/*                  <h2>{t("hero_slide_title")}</h2>*/}
         {/*                  <p>{t("hero_slide_subtitle")}</p>*/}
         {/*                  <Link to="/car-booking-iframe" className="gauto-btn">*/}
         {/*                    {t("researve_now")}*/}
         {/*                  </Link>*/}
         {/*                  /!*<Link to="/reservation.html" className="gauto-btn">*!/*/}
         {/*                  /!*  {t("researve_now")}*!/*/}
         {/*                  /!*</Link>*!/*/}
         {/*                </div>*/}
         {/*              </Col>*/}
         {/*            </Row>*/}
         {/*          </Container>*/}
         {/*        </div>*/}
         {/*      </div>*/}
         {/*    </div>*/}
         {/*  </div>*/}
         {/*</Slider>*/}
      </section>
   );
};

export default Hero;
