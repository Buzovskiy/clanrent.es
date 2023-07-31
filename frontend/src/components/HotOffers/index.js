import React, {Component} from "react";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {Container, Row, Col, Tabs, Tab} from "react-bootstrap";
import {FaCar, FaCogs, FaTachometerAlt} from "react-icons/fa";

import img1 from "../../img/offer-toyota.png";
import img2 from "../../img/nissan-offer.png";
import img3 from "../../img/audi-offer.png";
import img4 from "../../img/bmw-offer.png";
import img5 from "../../img/toyota-offer-2.png";
import img6 from "../../img/marcedes-offer.png";
import axios from "axios";


class HotOffers extends Component {
   constructor(props) {
      super(props);
      this.state = {
         carList: [],
         product: {},
      }
   }

   componentDidMount() {
      axios
         .get(`${process.env.REACT_APP_API_LINK}/v1/vehicle/index/`)
         .then((res) => {
            let cars = res.data['vehicles'];
            let car_list_two_dim_array = []
            let i = 0;
            let num_cols = 2 // The number of columns in a row
            let product = {}
            cars.map(item => {
               if (typeof car_list_two_dim_array[i] === 'undefined') car_list_two_dim_array.push([]);
               if (car_list_two_dim_array[i].length > num_cols - 1) {
                  i++;
                  car_list_two_dim_array.push([]);
               }
               car_list_two_dim_array[i].push(item);
               product[item.id] = item;
            });
            this.setState({carList: car_list_two_dim_array});
            this.setState({product: product});
         })
         .catch((error) => { // error is handled in catch block
            console.log(error);
            // if (error.response) { // status code out of the range of 2xx
            // } else {// Error on setting up the request
            //    let form_errors = [...this.state.form_errors, error.message];
            //    this.setState({form_errors});
            // }
         });
   }

   onClick = (e) => {
      e.preventDefault();
   };

   render() {
      const {t} = this.props
      return (
         <section className="gauto-offers-area section_70">
            <Container>
               <Row>
                  <Col md={12}>
                     <div className="site-heading">
                        <h4>{t("come_with")}</h4>
                        <h2>{t("hot_offers")}</h2>
                     </div>
                  </Col>
               </Row>
               <Row>
                  <Col md={12}>
                     <div className="offer-tabs" id="offerTab">
                        <Tabs
                           defaultActiveKey="all"
                           transition={true}
                           id="uncontrolled-tab-example"
                        >
                           {/* All Brands Start */}
                           <Tab eventKey="all" title="All Brands">
                              <Row>
                                 <Col lg={4}>
                                    <div className="single-offers">
                                       <div className="offer-image">
                                          <Link to="/car-booking">
                                             <img src={img1} alt="offer 1"/>
                                          </Link>
                                       </div>
                                       <div className="offer-text">
                                          <Link to="/car-booking">
                                             <h3>Toyota Alphard</h3>
                                          </Link>
                                          <h4>
                                             $50.00<span>/ {t("day")}</span>
                                          </h4>
                                          <ul>
                                             <li>
                                                <FaCar/>
                                                {t("model")}:2017
                                             </li>
                                             <li>
                                                <FaCogs/>
                                                {t("automatic")}
                                             </li>
                                             <li>
                                                <FaTachometerAlt/>
                                                20kmpl
                                             </li>
                                          </ul>
                                          {/*<div className="offer-action">*/}
                                          {/*  <Link*/}
                                          {/*    to="/car-booking"*/}
                                          {/*    onClick={this.onClick}*/}
                                          {/*    className="offer-btn-1"*/}
                                          {/*  >*/}
                                          {/*    {t("rent_car")}*/}
                                          {/*  </Link>*/}
                                          {/*  <Link*/}
                                          {/*    to="/car-booking"*/}
                                          {/*    onClick={this.onClick}*/}
                                          {/*    className="offer-btn-2"*/}
                                          {/*  >*/}
                                          {/*    {t("details")}*/}
                                          {/*  </Link>*/}
                                          {/*</div>*/}
                                       </div>
                                    </div>
                                 </Col>
                                 <Col lg={4}>
                                    <div className="single-offers">
                                       <div className="offer-image">
                                          <Link to="/car-booking">
                                             <img src={img2} alt="offer 1"/>
                                          </Link>
                                       </div>
                                       <div className="offer-text">
                                          <Link to="/car-booking">
                                             <h3>Nissan 370Z</h3>
                                          </Link>
                                          <h4>
                                             $75.00<span>/ {t("day")}</span>
                                          </h4>
                                          <ul>
                                             <li>
                                                <FaCar/>
                                                {t("model")}:2017
                                             </li>
                                             <li>
                                                <FaCogs/>
                                                {t("automatic")}
                                             </li>
                                             <li>
                                                <FaTachometerAlt/>
                                                20kmpl
                                             </li>
                                          </ul>
                                          <div className="offer-action">
                                             <Link
                                                to="/car-booking"
                                                onClick={this.onClick}
                                                className="offer-btn-1"
                                             >
                                                {t("rent_car")}
                                             </Link>
                                             <Link
                                                to="/car-booking"
                                                onClick={this.onClick}
                                                className="offer-btn-2"
                                             >
                                                {t("details")}
                                             </Link>
                                          </div>
                                       </div>
                                    </div>
                                 </Col>
                                 <Col lg={4}>
                                    <div className="single-offers">
                                       <div className="offer-image">
                                          <Link to="/car-booking">
                                             <img src={img3} alt="offer 1"/>
                                          </Link>
                                       </div>
                                       <div className="offer-text">
                                          <Link to="/car-booking">
                                             <h3>Audi Q3</h3>
                                          </Link>
                                          <h4>
                                             $45.00<span>/ {t("day")}</span>
                                          </h4>
                                          <ul>
                                             <li>
                                                <FaCar/>
                                                {t("model")}:2017
                                             </li>
                                             <li>
                                                <FaCogs/>
                                                {t("automatic")}
                                             </li>
                                             <li>
                                                <FaTachometerAlt/>
                                                20kmpl
                                             </li>
                                          </ul>
                                          {/*<div className="offer-action">*/}
                                          {/*  <Link*/}
                                          {/*    to="/car-booking"*/}
                                          {/*    onClick={this.onClick}*/}
                                          {/*    className="offer-btn-1"*/}
                                          {/*  >*/}
                                          {/*    {t("rent_car")}*/}
                                          {/*  </Link>*/}
                                          {/*  <Link*/}
                                          {/*    to="/car-booking"*/}
                                          {/*    onClick={this.onClick}*/}
                                          {/*    className="offer-btn-2"*/}
                                          {/*  >*/}
                                          {/*    {t("details")}*/}
                                          {/*  </Link>*/}
                                          {/*</div>*/}
                                       </div>
                                    </div>
                                 </Col>
                              </Row>
                              <Row>
                                 <Col lg={4}>
                                    <div className="single-offers">
                                       <div className="offer-image">
                                          <Link to="/car-booking">
                                             <img src={img4} alt="offer 1"/>
                                          </Link>
                                       </div>
                                       <div className="offer-text">
                                          <Link to="/car-booking">
                                             <h3>BMW X3</h3>
                                          </Link>
                                          <h4>
                                             $50.00<span>/ {t("day")}</span>
                                          </h4>
                                          <ul>
                                             <li>
                                                <FaCar/>
                                                {t("model")}:2017
                                             </li>
                                             <li>
                                                <FaCogs/>
                                                {t("automatic")}
                                             </li>
                                             <li>
                                                <FaTachometerAlt/>
                                                20kmpl
                                             </li>
                                          </ul>
                                          <div className="offer-action">
                                             <Link
                                                to="/car-booking"
                                                onClick={this.onClick}
                                                className="offer-btn-1"
                                             >
                                                {t("rent_car")}
                                             </Link>
                                             <Link
                                                to="/car-booking"
                                                onClick={this.onClick}
                                                className="offer-btn-2"
                                             >
                                                {t("details")}
                                             </Link>
                                          </div>
                                       </div>
                                    </div>
                                 </Col>
                                 <Col lg={4}>
                                    <div className="single-offers">
                                       <div className="offer-image">
                                          <Link to="/car-booking">
                                             <img src={img3} alt="offer 1"/>
                                          </Link>
                                       </div>
                                       <div className="offer-text">
                                          <Link to="/car-booking">
                                             <h3>Audi Q3</h3>
                                          </Link>
                                          <h4>
                                             $75.00<span>/ {t("day")}</span>
                                          </h4>
                                          <ul>
                                             <li>
                                                <FaCar/>
                                                {t("model")}:2017
                                             </li>
                                             <li>
                                                <FaCogs/>
                                                {t("automatic")}
                                             </li>
                                             <li>
                                                <FaTachometerAlt/>
                                                20kmpl
                                             </li>
                                          </ul>
                                          <div className="offer-action">
                                             <Link
                                                to="/car-booking"
                                                onClick={this.onClick}
                                                className="offer-btn-1"
                                             >
                                                {t("rent_car")}
                                             </Link>
                                             <Link
                                                to="/car-booking"
                                                onClick={this.onClick}
                                                className="offer-btn-2"
                                             >
                                                {t("details")}
                                             </Link>
                                          </div>
                                       </div>
                                    </div>
                                 </Col>
                                 <Col lg={4}>
                                    <div className="single-offers">
                                       <div className="offer-image">
                                          <Link to="/car-booking">
                                             <img src={img5} alt="offer 1"/>
                                          </Link>
                                       </div>
                                       <div className="offer-text">
                                          <Link to="/car-booking">
                                             <h3>Toyota Camry</h3>
                                          </Link>
                                          <h4>
                                             $55.00<span>/ {t("day")}</span>
                                          </h4>
                                          <ul>
                                             <li>
                                                <FaCar/>
                                                {t("model")}:2017
                                             </li>
                                             <li>
                                                <FaCogs/>
                                                {t("automatic")}
                                             </li>
                                             <li>
                                                <FaTachometerAlt/>
                                                20kmpl
                                             </li>
                                          </ul>
                                          <div className="offer-action">
                                             <Link
                                                to="/car-booking"
                                                onClick={this.onClick}
                                                className="offer-btn-1"
                                             >
                                                {t("rent_car")}
                                             </Link>
                                             <Link
                                                to="/car-booking"
                                                onClick={this.onClick}
                                                className="offer-btn-2"
                                             >
                                                {t("details")}
                                             </Link>
                                          </div>
                                       </div>
                                    </div>
                                 </Col>
                              </Row>
                           </Tab>
                           {/* All Brands End */}

                           {/* marcedes Start */}
                           <Tab eventKey="mercedes" title="mercedes">
                              <Row>
                                 <Col lg={4}>
                                    <div className="single-offers">
                                       <div className="offer-image">
                                          <Link to="/car-booking">
                                             <img src={img6} alt="offer 1"/>
                                          </Link>
                                       </div>
                                       <div className="offer-text">
                                          <Link to="/car-booking">
                                             <h3>marcedes S-class</h3>
                                          </Link>
                                          <h4>
                                             $50.00<span>/ {t("day")}</span>
                                          </h4>
                                          <ul>
                                             <li>
                                                <FaCar/>
                                                {t("model")}:2017
                                             </li>
                                             <li>
                                                <FaCogs/>
                                                {t("automatic")}
                                             </li>
                                             <li>
                                                <FaTachometerAlt/>
                                                20kmpl
                                             </li>
                                          </ul>
                                          <div className="offer-action">
                                             <Link
                                                to="/car-booking"
                                                onClick={this.onClick}
                                                className="offer-btn-1"
                                             >
                                                {t("rent_car")}
                                             </Link>
                                             <Link
                                                to="/car-booking"
                                                onClick={this.onClick}
                                                className="offer-btn-2"
                                             >
                                                {t("details")}
                                             </Link>
                                          </div>
                                       </div>
                                    </div>
                                 </Col>
                                 <Col lg={4}>
                                    <div className="single-offers">
                                       <div className="offer-image">
                                          <Link to="/car-booking">
                                             <img src={img3} alt="offer 1"/>
                                          </Link>
                                       </div>
                                       <div className="offer-text">
                                          <Link to="/car-booking">
                                             <h3>Audi Q3</h3>
                                          </Link>
                                          <h4>
                                             $45.00<span>/ {t("day")}</span>
                                          </h4>
                                          <ul>
                                             <li>
                                                <FaCar/>
                                                {t("model")}:2017
                                             </li>
                                             <li>
                                                <FaCogs/>
                                                {t("automatic")}
                                             </li>
                                             <li>
                                                <FaTachometerAlt/>
                                                20kmpl
                                             </li>
                                          </ul>
                                          <div className="offer-action">
                                             <Link
                                                to="/car-booking"
                                                onClick={this.onClick}
                                                className="offer-btn-1"
                                             >
                                                {t("rent_car")}
                                             </Link>
                                             <Link
                                                to="/car-booking"
                                                onClick={this.onClick}
                                                className="offer-btn-2"
                                             >
                                                {t("details")}
                                             </Link>
                                          </div>
                                       </div>
                                    </div>
                                 </Col>
                              </Row>
                           </Tab>
                           {/*marcedees end*/}
                        </Tabs>
                     </div>
                  </Col>
               </Row>
            </Container>
         </section>
      )
   }

}

export default HotOffers;
