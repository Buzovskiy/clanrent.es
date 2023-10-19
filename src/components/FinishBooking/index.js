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
               console.log(res.data);
               setCarList(res.data);
               // let cars = res.data['vehicles'];
               // this.setState({page: res.data['pagination'].page})
               // this.setState({count_pages: res.data['pagination'].count_pages})
               // let products = {}
               // cars.forEach(item => products[item.id] = item);
               //
               // this.setState({carList: cars});
               // this.setState({products: products});
               // this.setState({show_loader: false}, () => toggleBgLoader(this.state.show_loader));
            })
            .catch((error) => { // error is handled in catch block
               console.log(error);
            });
      }
   }, []);

   const clickProduct = (e) => {
      e.preventDefault();
      console.log('click');
   }

   return (
      <section className="gauto-car-listing section_70">
         <Container>
            <Row>
               <Col lg={12}>
                  <div className="car-listing-right">
                     <div className="pagination-box-row">
                        {/*<p>Page {this.state.page} of {this.state.count_pages}</p>*/}
                     </div>
                     <Row className='car-grid-list'>
                        <CarListRenderer carList={carList} t={t} clickProduct={clickProduct}/>
                     </Row>
                  </div>
               </Col>
            </Row>
         </Container>
      </section>
   )
}

export default FinishBooking;