import React, {Component} from "react";
import {Link, useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {Container, Row, Col} from "react-bootstrap";
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

import axios from "axios";


class CarDetails extends Component {
   constructor(props) {
      super(props);

      this.state = {
         productId: 0,
         cart: {},
         product: {},
         pickup_location: '',
         return_location: '',
         dates: '',
      }
   }

   componentDidMount() {
      let cart_storage = localStorage.getItem('cart');
      const {productId} = this.props.useParams;
      if (cart_storage === null) window.location.replace("/");
      const cart = JSON.parse(cart_storage);
      if (cart.hasOwnProperty(productId) === false) window.location.replace("/");
      this.setState({
         product: cart[productId].product,
         dates: cart[productId].dates,
         pickup_location: cart[productId].pickup_location,
         return_location: cart[productId].return_location,
         cart: cart
      });
      // // let rental_start_date, rental_end_date;
      // // [rental_start_date, rental_end_date] = booking_info.dates.split(' - ')
   }

   bookingTheCar = () => {
      let bodyFormData = new FormData();
      const product = this.state.product;

      bodyFormData.append('vehicle_id', product.id);
      bodyFormData.append('dates', this.state.dates);
      bodyFormData.append('pickup_location', this.state.pickup_location);
      bodyFormData.append('return_location', this.state.return_location);
      axios
         .post(`${process.env.REACT_APP_API_LINK}/v1/order/create/`, bodyFormData)
         .then((res) => {
            // when the order is created save it to localStorage
            let order = {details: res['data'], creation_timestamp: Date.now()}
            let cart = this.state.cart;
            cart[this.state.product.id]['order'] = order;
            localStorage.setItem('cart', JSON.stringify(cart));
            this.props.navigate({
               pathname: '/car-booking/'+this.state.product.id,
            });
         })
         .catch((error) => { // error is handled in catch block
            console.log(error);
         });
   }

   onClick = (e) => {
      e.preventDefault();
      this.bookingTheCar();
   };

   render() {
      const {t} = this.props
      return (
         <>
            <section className="gauto-car-booking section_70 car-details">
               <Container>
                  <Row>
                     <Col lg={6}>
                        <div className="car-booking-image">
                           <img src={this.state.product['thumbnail']} alt="car"/>
                        </div>
                     </Col>
                     <Col lg={6}>
                        <div className="car-booking-right">
                           <p className="rental-tag">{t("rental")}</p>
                           <h3>mercedes S-class</h3>
                           <div className="price-rating">
                              <div className="price-rent">
                                 <h4>
                                    $50.00<span>/ {t("day")}</span>
                                 </h4>
                              </div>
                              <div className="car-rating">
                                 <ul>
                                    <li>
                                       <FaStar/>
                                    </li>
                                    <li>
                                       <FaStar/>
                                    </li>
                                    <li>
                                       <FaStar/>
                                    </li>
                                    <li>
                                       <FaStar/>
                                    </li>
                                    <li>
                                       <FaStarHalfAlt/>
                                    </li>
                                 </ul>
                                 <p>(123 {t("rating")})</p>
                              </div>
                           </div>
                           <p>
                              {" "}
                              consectetur adipiscing elit. Donec luctus tincidunt aliquam.
                              Aliquam gravida massa at sem vulputate interdum et vel eros.
                              Maecenas eros enim, tincidunt vel turpis vel,dapibus tempus
                              nulla. Donec vel nulla dui.
                           </p>
                           <div className="car-features clearfix">
                              <ul>
                                 <li>
                                    <FaCar/> {t("model")}:2017
                                 </li>
                                 <li>
                                    <FaCogs/> {t("automatic")}
                                 </li>
                                 <li>
                                    <FaTachometerAlt/> 20kmpl
                                 </li>
                                 <li>
                                    <FaEmpire/> V-6 Cylinder
                                 </li>
                              </ul>
                              <ul>
                                 <li>
                                    <FaEye/> GPS Navigation
                                 </li>
                                 <li>
                                    <FaLock/> Anti-Lock Brakes
                                 </li>
                                 <li>
                                    <FaKey/> Remote Keyless
                                 </li>
                                 <li>
                                    <FaDesktop/> Rear-Seat DVD
                                 </li>
                              </ul>
                              <ul>
                                 <li>
                                    <FaCar/> {t("model")}:2017
                                 </li>
                                 <li>
                                    <FaCogs/> {t("automatic")}
                                 </li>
                                 <li>
                                    <FaTachometerAlt/> 20kmpl
                                 </li>
                                 <li>
                                    <FaEmpire/> V-6 Cylinder
                                 </li>
                              </ul>
                           </div>
                        </div>
                     </Col>
                  </Row>
               </Container>
               <Container>
                  <Row>
                     <div className="action-btn">
                        <Link to="/" onClick={this.onClick} className="gauto-btn">
                           {t("researve_now")}
                        </Link>
                     </div>
                  </Row>
               </Container>
            </section>
         </>
      )
   }
}


export default CarDetails;
