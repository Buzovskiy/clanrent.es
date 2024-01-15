import React, {Component} from "react";
import makeTwoDimensionalArr from "../../main-component/utils";
import {Container, Row, Col, Tabs, Tab} from "react-bootstrap";
import axios from "axios";
import {CategoryItem} from "../CarList/categoryItem";
import {showRequestError} from "../Error/requestError";


class HotOffers extends Component {
   constructor(props) {
      super(props);
      this.state = {
         carList: {},
      }
   }

   componentDidMount() {
      const params = {timestamp: new Date().getTime()};
      axios
         .get(`${process.env.REACT_APP_API_LINK}/v1/vehicle/index/`, {params: params})
         .then((res) => {
               let cars = res.data;
               let cars_obj = {'All': []}
               cars_obj['RANGE ROVER'] = []
               cars.forEach(car => {
                  if (!cars_obj.hasOwnProperty(car.brand) && car.brand !== 'LAND ROVER') {
                     cars_obj[car.brand] = [];
                  }

                  cars_obj['All'].push(car);
                  // Push the cars of brand LAND ROVER to the group of brand RANGE ROVER
                  if (car.brand === 'LAND ROVER'){
                     cars_obj['RANGE ROVER'].push(car);
                  } else {
                     cars_obj[car.brand].push(car);
                  }
               })
            // console.log(cars_obj);
               this.setState({carList: cars_obj})
            }
         )
         .catch((error) => { // error is handled in catch block
            showRequestError(error, this.props.app_context)
         });
   }

   onClick = (e) => {
      e.preventDefault();
   };

   RenderTabs = () => {
      return Object.keys(this.state.carList).map((brand, ind) => (
         <Tab eventKey={brand} title={brand} key={ind}>
            <Row>
               {this.renderCarsList(brand)}
            </Row>
         </Tab>
      ))
   }

   renderCarsList(brand) {
      const {t} = this.props;
      return this.state.carList[brand].map((item, ind) => (
         <Col key={ind} lg={4}>
            <CategoryItem item={item} t={t} clickProduct={function () {
            }}/>
         </Col>
      ))
   }

   // renderCar(row) {
   //    const {t} = this.props;
   //    return row.map((item, ind) => (
   //       <Col key={ind} lg={4}>
   //          <CategoryItem item={item} t={t} clickProduct={function () {
   //          }}/>
   //       </Col>
   //    ))
   // }

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
