import React, {useContext, useEffect, useState} from "react";
import {Container, Row, Col, Tabs, Tab} from "react-bootstrap";
import axios from "axios";
import {useTranslation} from "react-i18next";
import {AppContext} from "../AppContext";
import {CategoryItem} from "../CarList/categoryItem";
import {showRequestError} from "../Error/requestError";


const HotOffers = () => {
   const [carList, setCarList] = useState({});
   const {modalPhoneCallBack} = useContext(AppContext);
   const setModalPhoneCallBack = modalPhoneCallBack[1];
   const {t} = useTranslation();
   const app_context = useContext(AppContext);

   useEffect(() => {
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
                  if (car.brand === 'LAND ROVER') {
                     cars_obj['RANGE ROVER'].push(car);
                  } else {
                     cars_obj[car.brand].push(car);
                  }
               })
               setCarList(cars_obj);
            }
         )
         .catch((error) => { // error is handled in catch block
            showRequestError(error, app_context)
         });
   }, []);

   const renderTabs = () => {
      return Object.keys(carList).map((brand, ind) => (
         <Tab eventKey={brand} title={brand} key={ind}>
            <Row>
               {renderCarsList(brand)}
            </Row>
         </Tab>
      ))
   }

   const onClick = (e) => {
      e.preventDefault();
      setModalPhoneCallBack(true);
   };

   const renderCarsList = (brand) => {

      return carList[brand].map((item, ind) => (
         <Col key={ind} lg={4}>
            <CategoryItem item={item} t={t} clickProduct={onClick}/>
         </Col>
      ))
   }

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
                        {renderTabs()}
                     </Tabs>
                  </div>
               </Col>
            </Row>
         </Container>
      </section>
   )
}

export default HotOffers;
