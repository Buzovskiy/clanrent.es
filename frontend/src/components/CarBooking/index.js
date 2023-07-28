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


class CarBooking extends Component {
   constructor(props) {
      super(props);

      this.state = {
         product: {},
         pickup_location: '',
         return_location: '',
         rental_start_date: '',
         rental_end_date: '',
         dates: '',
         first_name: '',
         last_name: '',
         email: '',
         phone: '',
         country: 'Spain',
         city: 'No specified',
         address: '',
         birthday: '2000-01-01',
         payment_method: 'Cart',
         comment: 'Hola'
      }
   }

   componentDidMount() {
      let booking_info = localStorage.getItem('booking_info');
      if (booking_info != null) {
         booking_info = JSON.parse(booking_info);
         let rental_start_date, rental_end_date;
         [rental_start_date, rental_end_date] = booking_info.dates.split(' - ')
         this.setState({
            product: booking_info.product,
            pickup_location: booking_info.pickup_location,
            return_location: booking_info.return_location,
            rental_start_date: rental_start_date,
            rental_end_date: rental_end_date,
            dates: booking_info.dates,
         })
      }
   }

   bookingTheCar = () => {
      let bodyFormData = new FormData();
      bodyFormData.append('vehicle_id', this.state.product.id);
      bodyFormData.append('dates', this.state.dates);
      bodyFormData.append('pickup_location', this.state.pickup_location);
      bodyFormData.append('return_location', this.state.return_location);

      axios
         .post(`${process.env.REACT_APP_API_LINK}/v1/order/create/`, bodyFormData)
         .then((res) => {
            console.log(res);
            let order_id = res['data']['order_id'];
            let insurance_id = res['data']['insurances'][0].id;
            let option_id = res['data']['options'][0].id
            let orderUpdateFormData = new FormData();
            orderUpdateFormData.append('insurance', insurance_id);
            orderUpdateFormData.append(`extras[${option_id}]`, 1);
            axios
               .post(`${process.env.REACT_APP_API_LINK}/v1/order/update/${order_id}/`, orderUpdateFormData)
               .then((res) => {
                  console.log(res);
                  let order_id = res['data']['order_id'];
                  let orderConfirmationFormData = new FormData();
                  orderConfirmationFormData.append('driver[0][first_name]', this.state.first_name);
                  orderConfirmationFormData.append('driver[0][last_name]', this.state.last_name);
                  orderConfirmationFormData.append('driver[0][email]', this.state.email);
                  orderConfirmationFormData.append('driver[0][phone]', this.state.phone);
                  orderConfirmationFormData.append('driver[0][country]', this.state.country);
                  orderConfirmationFormData.append('driver[0][city]', this.state.city);
                  orderConfirmationFormData.append('driver[0][address]', this.state.address);
                  orderConfirmationFormData.append('driver[0][birthday]', this.state.birthday);
                  orderConfirmationFormData.append('payment_method', this.state.payment_method);
                  orderConfirmationFormData.append('comment', this.state.comment);
                  axios
                     .post(`${process.env.REACT_APP_API_LINK}/v1/order/confirm/${order_id}/`, orderConfirmationFormData)
                     .then((res) => {
                        console.log(res);
                     })
                     .catch((error) => { // error is handled in catch block
                        console.log(error);
                     });
               })
               .catch((error) => { // error is handled in catch block
                  console.log(error);
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

   handleChange = (e) => {
      let {name, value} = e.target;
      if (e.target.type === "checkbox") {
         name = e.target.name;
         // value = this.state.formFields.hasOwnProperty(name) ? this.state.formFields[name] : [];
         // value = value.filter(item => item !== e.target.value);
         // if (e.target.checked) value.push(e.target.value);
      }
      this.setState({[name]: value},
         () => {
            console.log(this.state[name]);
         }
      );
   };

   render() {
      const {t} = this.props
      return (
         <>
            <section className="gauto-car-booking section_70">
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
            </section>
            <section className="gauto-booking-form section_70">
               <Container>
                  <Row>
                     <Col lg={8}>
                        <div className="booking-form-left">
                           <div className="single-booking">
                              <h3>{t("car_booking.personal_information")}</h3>
                              <form>
                                 <Row>
                                    <Col md={6}>
                                       <p>
                                          <input
                                             type="text"
                                             placeholder={t("car_booking.first_name")}
                                             name="first_name"
                                             value={this.state.first_name}
                                             onChange={this.handleChange}

                                          />
                                       </p>
                                    </Col>
                                    <Col md={6}>
                                       <p>
                                          <input
                                             type="text"
                                             placeholder={t("car_booking.last_name")}
                                             name="last_name"
                                             value={this.state.last_name}
                                             onChange={this.handleChange}
                                          />
                                       </p>
                                    </Col>
                                 </Row>
                                 <Row>
                                    <Col md={6}>
                                       <p>
                                          <input
                                             type="email"
                                             placeholder={t("car_booking.email")}
                                             name="email"
                                             value={this.state.email}
                                             onChange={this.handleChange}
                                          />
                                       </p>
                                    </Col>
                                    <Col md={6}>
                                       <p>
                                          <input
                                             type="tel"
                                             placeholder={t("car_booking.phn")}
                                             name="phone"
                                             value={this.state.phone}
                                             onChange={this.handleChange}
                                          />
                                       </p>
                                    </Col>
                                 </Row>
                              </form>
                           </div>
                           <div className="single-booking">
                              <h3>{t("car_booking.booking_details")}</h3>
                              <form>
                                 <Row>
                                    <Col md={6}>
                                       <p>
                                          <label htmlFor="">{t("from_address")}</label>
                                          <input
                                             type="text"
                                             placeholder={t("from_address")}
                                             name="pickup_location"
                                             value={this.state.pickup_location}
                                             disabled='disabled'
                                          />
                                       </p>
                                    </Col>
                                    <Col md={6}>
                                       <p>
                                          <label htmlFor="">{t("to_address")}</label>
                                          <input
                                             type="text"
                                             placeholder={t("to_address")}
                                             name="return_location"
                                             value={this.state.return_location}
                                             disabled='disabled'
                                          />
                                       </p>
                                    </Col>
                                 </Row>
                                 <Row>
                                    <Col md={6}>
                                       <p>
                                          <label htmlFor="">{t("rental_start_date")}</label>
                                          <input
                                             type="text"
                                             placeholder={t("journey_date")}
                                             name="rental_start_date"
                                             value={this.state.rental_start_date}
                                             disabled='disabled'
                                          />
                                       </p>
                                    </Col>
                                    <Col md={6}>
                                       <p>
                                          <label htmlFor="">{t("rental_end_date")}</label>
                                          <input
                                             type="text"
                                             placeholder={t("journey_date")}
                                             name="rental_end_date"
                                             value={this.state.rental_end_date}
                                             disabled='disabled'
                                          />
                                       </p>
                                    </Col>
                                 </Row>
                                 <Row>
                                    <Col md={6}>
                                       <p>
                                          <select>
                                             <option data-display="Select">1 person</option>
                                             <option>2 person</option>
                                             <option>3 person</option>
                                             <option>4 person</option>
                                             <option>5-10 person</option>
                                          </select>
                                       </p>
                                    </Col>
                                    <Col md={6}>
                                       <p>
                                          <select>
                                             <option data-display="Select">1 luggage</option>
                                             <option>2 luggage</option>
                                             <option>3 luggage</option>
                                             <option>4(+) luggage</option>
                                          </select>
                                       </p>
                                    </Col>
                                 </Row>

                                 <Row>
                                    <Col md={12}>
                                       <p>
                                         <textarea
                                            placeholder="Write Here..."
                                            defaultValue={""}
                                         />
                                       </p>
                                    </Col>
                                 </Row>
                              </form>
                           </div>
                        </div>
                     </Col>
                     <Col lg={4}>
                        <div className="booking-right">
                           <h3>{t("car_booking.payment_method")}</h3>
                           <div className="gauto-payment clearfix">
                              <div className="payment">
                                 <input type="radio" id="ss-option" name="selector"/>
                                 <label htmlFor="ss-option">
                                    {t("car_booking.bank_transfer")}
                                 </label>
                                 <div className="check">
                                    <div className="inside"/>
                                 </div>
                                 <p>{t("car_booking.payment_text")}</p>
                              </div>
                              <div className="payment">
                                 <input type="radio" id="f-option" name="selector"/>
                                 <label htmlFor="f-option">
                                    {t("car_booking.check_payment")}
                                 </label>
                                 <div className="check">
                                    <div className="inside"/>
                                 </div>
                              </div>
                              <div className="payment">
                                 <input type="radio" id="s-option" name="selector"/>
                                 <label htmlFor="s-option">
                                    {t("car_booking.credit_card")}
                                 </label>
                                 <div className="check">
                                    <div className="inside"/>
                                 </div>
                                 <img src={img2} alt="credit card"/>
                              </div>
                              <div className="payment">
                                 <input type="radio" id="t-option" name="selector"/>
                                 <label htmlFor="t-option">Paypal</label>
                                 <div className="check">
                                    <div className="inside"/>
                                 </div>
                                 <img src={img3} alt="credit card"/>
                              </div>
                           </div>
                           <div className="action-btn">
                              <Link to="/" onClick={this.onClick} className="gauto-btn">
                                 {t("researve_now")}
                              </Link>
                           </div>
                        </div>
                     </Col>
                  </Row>
               </Container>
            </section>
         </>
      )
   }
}


export default CarBooking;
