import {useTranslation} from "react-i18next";
import {Col, Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import CarListRenderer from '../CarList/CarListRenderer'
import Cart from "../Cart/utils";
import {toggleBgLoader} from "../bgLoader";

const FinishBooking = () => {
   const {t} = useTranslation();
   const [carList, setCarList] = useState([])
   // const [showLoader, setShowLoader] = useState(true);
   const [requestIsDone, setRequestIsDone] = useState(false);

   useEffect(() => {
      toggleBgLoader(!requestIsDone);
   }, [requestIsDone]);

   useEffect(() => {
      const cart = new Cart().cart;
      const ids_list = [];
      for (const vehicle_id in cart) {
         ids_list.push(cart[vehicle_id].product.id);
      }
      const ids = ids_list.join(',');
      if (ids) {
         const params = {};
         params['timestamp'] = new Date().getTime();
         axios
            .get(`${process.env.REACT_APP_API_LINK}/v1/vehicle/index/${ids}/`, {params: params})
            .then((res) => {
               setCarList(res.data);
               setRequestIsDone(true);
            })
            .catch((error) => { // error is handled in catch block
               setRequestIsDone(true);
               console.log(error);
            });
      } else{
         setRequestIsDone(true);
         window.location.href = '/';
      }
   }, []);

   return (
      <section className="gauto-car-listing section_70">
         <Container>
            <Row>
               <Col lg={12}>
                  <div className="car-listing-right">
                     <Row className='car-grid-list'>
                        <CarListRenderer
                           button_title={t('continue_booking')}
                           carList={carList}
                           t={t}
                           module='FinishBooking'
                        />
                     </Row>
                  </div>
               </Col>
            </Row>
         </Container>
      </section>
   )
}

export default FinishBooking;