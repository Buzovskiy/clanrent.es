import React, {Component} from "react";
import {Link} from "react-router-dom";
import {Container, Row, Col} from "react-bootstrap";
import axios from "axios";
import Cookies from 'js-cookie'

import Timer from "./timer";
import CarOptions from "../CarDetails/CarOptions";
import Cart from '../Cart/utils'
import BookingTotal from "./BookingTotal";
import {toggleBgLoader} from "../bgLoader";
import {showRequestError} from "../Error/requestError";
import ProductSwiper from "../CarDetails/productSwiper";


class CarBooking extends Component {
   constructor(props) {
      super(props);

      // todo: обработка ошибки email и телефон

      this.state = {
         product: {
            'photos': []
         },
         pickup_location: '',
         return_location: '',
         rental_start_date: '',
         rental_end_date: '',
         dates: '',
         time_end: 0, // timestamp in ms by which the reservation should be done
         order: {
            details: {options: []},
            creation_timestamp: '',
            product: {
               total_price: '',
               count_days: '',
            }
         }, // information about order from API with order creation timestamp
         form: {
            first_name: '',
            last_name: '',
            email: '',
            phone: '',
            country: '',
            city: 'No specified',
            address: 'No specified',
            birthday: '1990-01-01',
            payment_method: '',
            comment: '',
            // The values of these inputs are sent to API in a separate request.
            options: {},
            insurance: '',
            terms_and_conditions: '',
         },
         fields_errors: {
            first_name: [],
            last_name: [],
            email: [],
            phone: [],
            payment_method: [],
            terms_and_conditions: [],
         },
         settings: {payment_methods: []}, // settings from api
         timer: 'Time left: 00:00',
         showLoader: false,
      }
   }

   componentDidMount() {
      const {productId} = this.props.useParams;

      const CART = new Cart();
      if (CART.cartIsEmpty() || !CART.bookingExists(productId)) {
         window.location.href = '/';
      }

      const booking_info = CART.cart[productId];
      const [rental_start_date, rental_end_date] = booking_info.dates.split(' - ');
      const params = {timestamp: new Date().getTime()};
      let timer = <Timer booking_info={booking_info}/>
      this.setState({timer: timer});

      axios
         .get(`${process.env.REACT_APP_API_LINK}/v1/company/settings/`, {params: params})
         .then((res) => {
            this.setState({settings: res.data});
         })
         // error is handled in catch block
         .catch((error) => showRequestError(error, this.props.app_context));

      let form = {...this.state.form}
      booking_info.details.options.map(option => form[`extras[${option.id}]`] = option['quantity']);
      form['insurance'] = booking_info.details.insurances[0]['id'];

      this.setState({
         product: booking_info.product,
         pickup_location: booking_info.pickup_location,
         return_location: booking_info.return_location,
         rental_start_date: rental_start_date,
         rental_end_date: rental_end_date,
         dates: booking_info.dates,
         order: booking_info,
         form: form
      }, () => {
         // console.log('in componentDidMount', this.state.order);
      });
   }

   bookingTheCar = () => {
      const form_fields_list = [];
      form_fields_list.push({name: 'first_name', value: this.state.form['first_name']});
      form_fields_list.push({name: 'last_name', value: this.state.form['last_name']});
      form_fields_list.push({name: 'email', value: this.state.form['email']});
      form_fields_list.push({name: 'phone', value: this.state.form['phone']});
      form_fields_list.push({name: 'payment_method', value: this.state.form['payment_method']});
      form_fields_list.push({name: 'terms_and_conditions', value: this.state.form['terms_and_conditions']});

      this.updateErrorsState(form_fields_list);

      if (this.hasErrors(this.state.fields_errors)) {
         // If there are errors, return false and show them
         return false;
      }

      this.setState({showLoader: true});

      const order_id = this.state.order.details.order_id;
      const orderConfirmationFormData = new FormData();
      orderConfirmationFormData.append('driver[0][first_name]', this.state.form.first_name);
      orderConfirmationFormData.append('driver[0][last_name]', this.state.form.last_name);
      orderConfirmationFormData.append('driver[0][email]', this.state.form.email);
      orderConfirmationFormData.append('driver[0][phone]', this.state.form.phone);
      orderConfirmationFormData.append('driver[0][country]', this.state.form.country);
      orderConfirmationFormData.append('driver[0][city]', this.state.form.city);
      orderConfirmationFormData.append('driver[0][address]', this.state.form.address);
      orderConfirmationFormData.append('driver[0][birthday]', this.state.form.birthday);
      orderConfirmationFormData.append('payment_method', this.state.form.payment_method);
      orderConfirmationFormData.append('comment', this.state.form.comment);
      const vendor = Cookies.get('vendor') == null ? 'clanrent.es': Cookies.get('vendor')
      orderConfirmationFormData.append('vendor', vendor);

      // for (const value of orderConfirmationFormData.values()) {
      //    console.log(value);
      // }
      const params = {timestamp: new Date().getTime()};
      axios
         .post(`${process.env.REACT_APP_API_LINK}/v1/order/confirm/${order_id}/`, orderConfirmationFormData, {params: params})
         .then((res) => {
            this.setState({showLoader: false});
            if (res.data.status === 'success') {
               new Cart().deleteBooking(this.state.product.id);
               window.location.href = `${res.data.payment_link}?payment_id=${res.data.payment_id}`
            } else {
               throw res.data;
            }
         })
         .catch((error) => { // error is handled in catch block
            this.setState({showLoader: false});
            showRequestError(error, this.props.app_context);
         });
   }

   onClick = (e) => {
      e.preventDefault();
      this.bookingTheCar();
   };

   handleChange = (e) => {
      this.updateErrorsState([e.target]);
      let {name, value} = e.target;
      if (e.target.name === 'terms_and_conditions') {
         value = e.target.checked ? '1' : '';
      }
      // if (e.target.type === "checkbox") {
      //    name = e.target.name;
      //    // value = this.state.formFields.hasOwnProperty(name) ? this.state.formFields[name] : [];
      //    // value = value.filter(item => item !== e.target.value);
      //    // if (e.target.checked) value.push(e.target.value);
      // }

      let form = {...this.state.form, [name]: value}
      this.setState({form}, () => {
         // console.log(this.state);
      });
   };

   updateErrorsState = (fields_list) => {
      const fields_errors = this.state.fields_errors;
      fields_list.forEach((field) => {
         let {name} = field;
         fields_errors[name] = this.checkFieldError(field)
      })
      this.setState({fields_errors},
         () => {
            // console.log(this.state.fields_errors);
         }
      );
   }

   checkFieldError = (field) => {
      let field_errors = []
      if (!field.value) {
         field_errors.push(this.props.t('this_field_may_not_be_blank'));
      }
      let re = /^\S+@\S+\.\S+$/;
      if (field.name === 'email' && !re.test(field.value)) {
         field_errors.push(this.props.t('enter_correct_email'));
      }
      return field_errors
   }

   hasErrors = (fields_errors) => {
      for (const field in fields_errors) {
         if (fields_errors[field].length > 0) return true;
      }
      return false;
   }

   fieldHasError = (name) => this.state.fields_errors[name].length > 0;

   getErrorClass = (name) => this.fieldHasError(name) ? 'error' : '';

   handleChangeEquipment = (e) => {
      let {name, value} = e.target;
      let form = {...this.state.form, [name]: value}
      this.setState({form}, () => {
         let options = this.state.order.details.options.filter(opt => {
            return opt.hasOwnProperty('max_quantity') && `extras[${opt.id}]` in this.state.form;
         });

         let addEquipmentFormData = new FormData();
         options.map((opt) => {
            let opt_val = this.state.form[`extras[${opt.id}]`];
            if (opt_val > 0) {
               addEquipmentFormData.append(`extras[${opt.id}]`, opt_val);
            }
         })

         addEquipmentFormData.append('insurance', this.state.order.details.insurances[0].id);
         const order_id = this.state.order.details.order_id;

         const params = {timestamp: new Date().getTime()};
         axios
            .post(`${process.env.REACT_APP_API_LINK}/v1/order/update/${order_id}/`, addEquipmentFormData, {params: params})
            .then((res) => {
               const order = {...this.state.order, details: res['data']};
               // Update order in state
               this.setState({order});
               // Update cart in local storage
               if (new Cart().cartIsEmpty() || !new Cart().bookingExists(this.state.product.id)) {
                  window.location.href = '/';
               }
               let booking_info = {...new Cart().cart[this.state.product.id], details: res['data']};
               if (!(JSON.stringify(order) === JSON.stringify(booking_info))) {
                  throw {message: 'State and storage are not equal'};
               }
               new Cart().addBooking(this.state.product.id, booking_info);
            })
            .catch((error) => { // error is handled in catch block
               showRequestError(error, this.props.app_context);
            });
      });
   }

   renderPaymentMethods = () => {
      const {t} = this.props;
      return this.state.settings.payment_methods.map((item, key) => (
         <div key={key} className="payment">
            <input onClick={this.handleChange} value={item.name}
                   type="radio" id={item.id} name="payment_method"/>
            <label htmlFor={item.id}>
               {item.name}
            </label>
            <div className="check">
               <div className="inside"/>
            </div>
            {/*<p>{t("car_booking.payment_text")}</p>*/}
         </div>
      ))
   }

   renderOptionsInputs() {
      const {t} = this.props
      let options = this.state.order.details.options.filter(opt => {
         return opt.hasOwnProperty('max_quantity') && `extras[${opt.id}]` in this.state.form;
      });
      return options.map((option, ind) => (
         <Col md={6} key={ind}>
            <p>
               <label htmlFor={'option-' + option.id}>{option.title}</label>
               <input id={'option-' + option.id} type="number" name={'extras[' + option.id + ']'}
                      max={option.max_quantity} min='0' onChange={this.handleChangeEquipment}
                      value={this.state.form[`extras[${option.id}]`]}
               />
            </p>
         </Col>
      ))
   }

   render() {
      const {t} = this.props
      const product = this.state.product;
      toggleBgLoader(this.state.showLoader);
      return (
         <>
            <section className="gauto-car-booking booking-page">
               <Container>
                  <Row>
                     <Col>
                        <div className="car-booking-right">
                           <h3>{product.brand} {product.mark}</h3>
                           <div className='rental-tag-wrapper'>
                              <p className="rental-tag">{t("rental")}</p>
                              <span className="time-left">{this.state.timer}</span>
                           </div>
                           <div className="price-rating">
                              <div className="price-rent">
                                 <h4>
                                    {product.price}{product.currency}<span>/ {t("day")}</span>
                                 </h4>
                              </div>
                           </div>
                        </div>
                     </Col>
                  </Row>
                  <Row>
                     <Col className='product-swiper-wrapper'>
                        <ProductSwiper product={this.state.product}/>
                     </Col>
                  </Row>

                  <Row>
                     <Col>
                        <div>
                           {/*<p>*/}
                           {/*   {" "}*/}
                           {/*   consectetur adipiscing elit. Donec luctus tincidunt aliquam.*/}
                           {/*   Aliquam gravida massa at sem vulputate interdum et vel eros.*/}
                           {/*   Maecenas eros enim, tincidunt vel turpis vel,dapibus tempus*/}
                           {/*   nulla. Donec vel nulla dui.*/}
                           {/*</p>*/}
                           <div className='car-options'>
                              <h3>Car configuration</h3>
                              <div className="options-container">
                                 <div className="options-wrapper">
                                    <CarOptions options={product.options}/>
                                 </div>
                              </div>
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
                                             className={this.getErrorClass('first_name')}
                                             type="text"
                                             placeholder={t("car_booking.first_name")}
                                             name="first_name"
                                             value={this.state.form.first_name}
                                             onChange={this.handleChange}
                                          />
                                       </p>
                                    </Col>
                                    <Col md={6}>
                                       <p>
                                          <input
                                             className={this.getErrorClass('last_name')}
                                             type="text"
                                             placeholder={t("car_booking.last_name")}
                                             name="last_name"
                                             value={this.state.form.last_name}
                                             onChange={this.handleChange}
                                          />
                                       </p>
                                    </Col>
                                 </Row>
                                 <Row>
                                    <Col md={6}>
                                       <p>
                                          <input
                                             className={this.getErrorClass('email')}
                                             type="email"
                                             placeholder={t("car_booking.email")}
                                             name="email"
                                             value={this.state.form.email}
                                             onChange={this.handleChange}
                                          />
                                       </p>
                                    </Col>
                                    <Col md={6}>
                                       <p>
                                          <input
                                             className={this.getErrorClass('phone')}
                                             type="tel"
                                             placeholder={t("car_booking.phn")}
                                             name="phone"
                                             value={this.state.form.phone}
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
                                 <Row>{this.renderOptionsInputs()}</Row>
                                 <Row>
                                    <Col md={12}>
                                       <p>
                                         <textarea
                                            placeholder={t('write_here')}
                                            name='comment'
                                            value={this.state.form.comment}
                                            onChange={this.handleChange}
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
                           <div className={`gauto-payment clearfix ${this.getErrorClass('payment_method')}`}>
                              {this.renderPaymentMethods()}
                           </div>
                           <div className='terms-and-conditions-wrapper'>
                              <label className='terms-and-conditions' htmlFor="terms_and_conditions">
                                 <input
                                    id='terms_and_conditions'
                                    name='terms_and_conditions'
                                    type="checkbox"
                                    onChange={this.handleChange}
                                 />
                                 <div className={this.getErrorClass('terms_and_conditions')}>
                                    Accept <a href="/terms-and-conditions">terms and conditions</a> and <a
                                    href="/privacy-policy">privacy policy</a>
                                 </div>
                              </label>
                           </div>
                           <BookingTotal
                              delivery_data={this.state.order.details.delivery_data}
                              rental_price={this.state.order.product.total_price}
                              total_price={this.state.order.details.total_price}
                              count_days={this.state.order.product.count_days}
                              currency={this.state.settings.currency}
                           />
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
