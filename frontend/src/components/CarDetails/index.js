import React, {Component} from "react";
import {Link} from "react-router-dom";
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

import img1 from "../../img/booking.jpg";
import img2 from "../../img/master-card.jpg";
import img3 from "../../img/paypal.jpg";
import axios from "axios";


class CarDetails extends Component {
   constructor(props) {
      super(props);

      this.state = {
         product: {},
         // pickup_location: '',
         // return_location: '',
         // rental_start_date: '',
         // rental_end_date: '',
         // dates: '',
         // first_name: '',
         // last_name: '',
         // email: '',
         // phone: '',
         // country: 'Spain',
         // city: 'No specified',
         // address: '',
         // birthday: '2000-01-01',
         // payment_method: 'Cart',
         // comment: 'Hola',
         // order: {} // information about order from API with order creation timestamp
      }
   }

   componentDidMount() {
      let booking_info = localStorage.getItem('booking_info');
      if (booking_info === null) window.location.replace("/");
      booking_info = JSON.parse(booking_info);
      // let rental_start_date, rental_end_date;
      // [rental_start_date, rental_end_date] = booking_info.dates.split(' - ')
      this.setState({
         product: booking_info.product,
         // pickup_location: booking_info.pickup_location,
         // return_location: booking_info.return_location,
         // rental_start_date: rental_start_date,
         // rental_end_date: rental_end_date,
         // dates: booking_info.dates,
      }, () => {
         // // We are trying to get order details from localstorage. If we can't then we
         // // create a new order
         // let order = localStorage.getItem('order');
         // if (order === null) {
         //    this.bookingTheCar();
         // } else this.setState({order});
      });
   }

   // bookingTheCar = () => {
   //    let bodyFormData = new FormData();
   //    bodyFormData.append('vehicle_id', this.state.product.id);
   //    bodyFormData.append('dates', this.state.dates);
   //    bodyFormData.append('pickup_location', this.state.pickup_location);
   //    bodyFormData.append('return_location', this.state.return_location);
   //    console.log('request')
   //    axios
   //       .post(`${process.env.REACT_APP_API_LINK}/v1/order/create/`, bodyFormData)
   //       .then((res) => {
   //          // when the order is created save
   //          let order = {details: res['data'], creation_timestamp: Date.now()}
   //          localStorage.setItem('order', JSON.stringify(order));
   //          this.setState({order});
   //
   //          // console.log(res);
   //          // let order_id = res['data']['order_id'];
   //          // let insurance_id = res['data']['insurances'][0].id;
   //          // let option_id = res['data']['options'][0].id
   //       })
   //       .catch((error) => { // error is handled in catch block
   //          console.log(error);
   //       });
   // }

   // onClick = (e) => {
   //    e.preventDefault();
   //    this.bookingTheCar();
   // };

   // handleChange = (e) => {
   //    let {name, value} = e.target;
   //    if (e.target.type === "checkbox") {
   //       name = e.target.name;
   //       // value = this.state.formFields.hasOwnProperty(name) ? this.state.formFields[name] : [];
   //       // value = value.filter(item => item !== e.target.value);
   //       // if (e.target.checked) value.push(e.target.value);
   //    }
   //    this.setState({[name]: value},
   //       () => {
   //          console.log(this.state[name]);
   //       }
   //    );
   // };

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
