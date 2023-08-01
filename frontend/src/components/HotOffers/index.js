import React, {Component} from "react";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import makeTwoDimensionalArr from "../../main-component/utils";
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
         carList: {},
      }
   }


   componentDidMount() {

      axios
         .get(`${process.env.REACT_APP_API_LINK}/v1/vehicle/index/`)
         .then((res) => {
               let cars = res.data;
               let cars_obj = {'All': []}
               let num_cols = 3 // The number of columns in a row

               function make_two_dimm_array(arr, num_cols, inst) {
                  if (arr.length === 0) arr.push([]);
                  if (arr[arr.length - 1].length === num_cols) arr.push([]);
                  arr[arr.length - 1].push(inst);
                  return arr;
               }

               cars.forEach(car => {
                  if (!cars_obj.hasOwnProperty(car.brand)) {
                     cars_obj[car.brand] = [];
                  }
                  cars_obj['All'] = makeTwoDimensionalArr(cars_obj['All'], num_cols, car);
                  cars_obj[car.brand] = makeTwoDimensionalArr(cars_obj[car.brand], num_cols, car);
               })
               this.setState({carList: cars_obj})
               console.log(cars_obj);
            }
         )
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

   renderTabs() {
      console.log(Object.keys(this.state.carList));

      return Object.keys(this.state.carList).map((brand, ind) => (
         <Tab eventKey={brand} title={brand} key={ind}>
            {this.renderRow(brand)}
         </Tab>
      ))
   }

   renderRow(brand) {
      return this.state.carList[brand].map((row, ind) => (
         <Row key={ind}>
            {this.renderCar(row)}
         </Row>
      ))
   }

   renderCar(row) {
      const {t} = this.props;
      return row.map((item, ind) => (
         <Col key={ind} lg={4}>
            <div className="single-offers">
               <div className="offer-image">
                  <Link to="/car-booking">
                     <img src={item.thumbnail} alt="offer 1"/>
                  </Link>
               </div>
               <div className="offer-text">
                  <Link to="/car-booking">
                     <h3>{item.brand} {item.mark}</h3>
                  </Link>
                  <h4>
                     {item.price}{item.currency}<span>/ {t("day")}</span>
                  </h4>
                  <ul>
                     <li>
                        <FaCar/>
                        {t("model")}: {item.year}
                     </li>
                     <li>
                        <FaCogs/>
                        {item.transmission}
                     </li>
                     {/*<li>*/}
                     {/*   <FaTachometerAlt/>*/}
                     {/*   20kmpl*/}
                     {/*</li>*/}
                  </ul>
                  <div className="offer-action">
                     <a href="/car-booking" data-url='/car-booking' data-id={item.id}
                        onClick={this.clickProduct} onContextMenu={this.clickProduct}>
                        {t("rent_car")}
                     </a>
                  </div>
               </div>
            </div>
         </Col>
      ))
   }

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
                           defaultActiveKey="All"
                           transition={true}
                           id="uncontrolled-tab-example"
                        >
                           {this.renderTabs()}
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
