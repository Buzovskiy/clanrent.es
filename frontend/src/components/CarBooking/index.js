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
         dates: '',
         form: {
            first_name: 'Brad',
            last_name: 'Pitt',
            email: 'brad@gmail.com',
            phone: '+3412345678',
            country: 'Spain',
            city: 'No specified',
            address: '',
            birthday: '2000-01-01',
            payment_method: '',
            comment: ''
         }
      }
   }

   componentDidMount() {
      let booking_info = localStorage.getItem('booking_info');
      if (booking_info != null) {
         booking_info = JSON.parse(booking_info);
         this.setState({
            product: booking_info.product,
            pickup_location: booking_info.pickup_location,
            return_location: booking_info.return_location,
            dates: booking_info.dates,
         })
      }
   }

   bookingTheCar = () => {
      // let params = {
      //    vehicle_id: this.state.product.id,
      //    dates: this.state.dates,
      //    pickup_location: this.state.pickup_location,
      //    return_location: this.state.return_location,
      // }
      let bodyFormData = new FormData();
      bodyFormData.append('vehicle_id', this.state.product.id);
      bodyFormData.append('dates', this.state.dates);
      bodyFormData.append('pickup_location', this.state.pickup_location);
      bodyFormData.append('return_location', this.state.return_location);

      axios
         .post(`${process.env.REACT_APP_API_LINK}/v1/order/create/`, bodyFormData, {
            // headers: {'Content-Type': 'multipart/form-data'}
         })
         .then((res) => {
            console.log(res);
            // let cars = res.data['vehicles'];
            // let car_list_two_dim_array = []
            // let i = 0;
            // let num_cols = 2 // The number of columns in a row
            // let product = {}
            // cars.map(item => {
            //    if (typeof car_list_two_dim_array[i] === 'undefined') car_list_two_dim_array.push([]);
            //    if (car_list_two_dim_array[i].length > num_cols - 1) {
            //       i++;
            //       car_list_two_dim_array.push([]);
            //    }
            //    car_list_two_dim_array[i].push(item);
            //    product[item.id] = item;
            // });
            // this.setState({carList: car_list_two_dim_array});
            // this.setState({product: product});
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
      this.bookingTheCar();
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
                                          />
                                       </p>
                                    </Col>
                                    <Col md={6}>
                                       <p>
                                          <input
                                             type="text"
                                             placeholder={t("car_booking.last_name")}
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
                                          />
                                       </p>
                                    </Col>
                                    <Col md={6}>
                                       <p>
                                          <input
                                             type="tel"
                                             placeholder={t("car_booking.phn")}
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
                                          <input type="text" placeholder={t("from_address")}/>
                                       </p>
                                    </Col>
                                    <Col md={6}>
                                       <p>
                                          <input type="text" placeholder={t("to_address")}/>
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
                                    <Col md={6}>
                                       <p>
                                          {/*<DatePickerComponent*/}
                                          {/*  id="datepicker"*/}
                                          {/*  placeholder={t("journey_date")}*/}
                                          {/*></DatePickerComponent>*/}
                                          <input type="text"/>
                                       </p>
                                    </Col>
                                    <Col md={6}>
                                       {/*<p>*/}
                                       {/*  <TimePickerComponent*/}
                                       {/*    id="timepicker"*/}
                                       {/*    placeholder={t("journey_time")}*/}
                                       {/*  ></TimePickerComponent>*/}
                                       {/*</p>*/}
                                       <input type="text"/>
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
