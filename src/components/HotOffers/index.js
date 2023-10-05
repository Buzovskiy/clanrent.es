import React, {Component, ReactNode} from "react";
import makeTwoDimensionalArr from "../../main-component/utils";
import {Container, Row, Col, Tabs, Tab} from "react-bootstrap";
import {FaCar, FaCogs, FaTachometerAlt} from "react-icons/fa";
import axios from "axios";
import {CategoryItem} from "../CarList/categoryItem";


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

               cars.forEach(car => {
                  if (!cars_obj.hasOwnProperty(car.brand)) {
                     cars_obj[car.brand] = [];
                  }
                  cars_obj['All'] = makeTwoDimensionalArr(cars_obj['All'], num_cols, car);
                  cars_obj[car.brand] = makeTwoDimensionalArr(cars_obj[car.brand], num_cols, car);
               })
               this.setState({carList: cars_obj})
            }
         )
         .catch((error) => { // error is handled in catch block
            console.log(error);
         });
   }

   onClick = (e) => {
      e.preventDefault();
   };

   RenderTabs = () => {
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
            <CategoryItem item={item} t={t} clickProduct={function(){}}/>
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
                           {this.RenderTabs()}
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
