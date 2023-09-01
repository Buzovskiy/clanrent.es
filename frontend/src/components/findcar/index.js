import React, {Component} from "react";
import {Container, Row, Col} from "react-bootstrap";
import axios from "axios";
import Timer from "../CarBooking/timer";
import video_wide from "../../video/video-wide.mp4";


class FindCar extends Component {
   constructor(props) {
      super(props);

      let now = new Date();
      let tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      let after_tomorrow = new Date(now);
      after_tomorrow.setDate(after_tomorrow.getDate() + 2);
      tomorrow.setMinutes(tomorrow.getMinutes() - tomorrow.getTimezoneOffset());
      tomorrow.setSeconds(null);
      after_tomorrow.setMinutes(after_tomorrow.getMinutes() - after_tomorrow.getTimezoneOffset());
      after_tomorrow.setSeconds(null);

      this.state = {
         form_data: {
            pickup_location: '',
            return_location: '',
            rental_start_date: tomorrow.toISOString().slice(0, -8),
            rental_end_date: after_tomorrow.toISOString().slice(0, -8),
         },
         fields_errors: {},
      }
   }

   componentDidMount() {
      axios
         .get(`${process.env.REACT_APP_API_LINK}/v1/company/settings/`)
         .then((res) => {
            this.setState({settings: res.data});
         })
         .catch((error) => console.log(error));
   }

   handleChange = (e) => {
      let {name, value} = e.target;
      this.updateErrorsState(e.target);
      const form_data = {...this.state.form_data, [name]: value};
      this.setState({form_data},
         // () => {
         //    console.log(this.state.form_data);
         // }
      );
   };

   onBlur = (e) => {
      this.updateErrorsState(e.target);
   };

   updateErrorsState = (element) => {
      let {name} = element;
      let fields_errors = {...this.state.fields_errors, [name]: []};
      fields_errors = this.checkFieldError(element, fields_errors)
      this.setState({fields_errors})
   }

   checkFieldError = (element, fields_errors) => {
      let {name, value} = element;
      // if (element.required && !value) {
      if (!value) {
         fields_errors[name] = [this.props.t('this_field_may_not_be_blank')];
      }
      console.log(value);
      return fields_errors
   }

   hasErrors = (fields_errors) => {
      for (const field in fields_errors) {
         if (fields_errors[field].length > 0) return true;
      }
      return false;
   }

   renderFieldError = (field_name) => {
      let fields_errors = [];
      if (this.state.fields_errors.hasOwnProperty(field_name)) {
         fields_errors = this.state.fields_errors[field_name];
      }
      return fields_errors.map((item, id) => (
         <p key={id} className="error">{item}</p>
      ));
   }

   submitHandler = (e) => {
      e.preventDefault();
      let fields_errors = {...this.state.fields_errors};
      for (const field in this.state.form_data) {
         fields_errors = this.checkFieldError({
            name: field,
            value: this.state.form_data[field],
         }, fields_errors)
      }

      this.setState({fields_errors})

      if (this.hasErrors(fields_errors)) {
         // If there are errors, return false and show them
         return false;
      }

      let pickup_date_start = this.state.form_data.rental_start_date.replace('T', ' ');
      let pickup_date_end = this.state.form_data.rental_end_date.replace('T', ' ');

      let params = {
         dates: `${pickup_date_start} - ${pickup_date_end}`,
         pickup_location: this.state.form_data.pickup_location,
         return_location: this.state.form_data.return_location
      };

      this.props.navigate({
         pathname: '/car-listing',
         search: `?${this.props.createSearchParams(params)}`
      });
   };


   render() {
      const {t} = this.props
      return (
         <section className="gauto-find-box-area">
            <video autoPlay muted loop className='promo-video-wide'>
               <source src={video_wide} type="video/mp4"/>
            </video>
            <div className="find-box">
               <Row className="align-items-center">
                  <Col md={12}>
                     <div className="find-text">
                        <h3>{t("search_best_car")}</h3>
                     </div>
                  </Col>
                  <Col md={12}>
                     <div className="find-form">
                        <form onSubmit={(e) => this.submitHandler(e)}>
                           <div className="mb-md-3 row-fields-wrapper">
                              <Col sm={12} className="field-container">
                                 <label htmlFor="pickup_location">{t("from_address")}</label>
                                 <input type="text" placeholder={t("from_address")}
                                        name="pickup_location"
                                        id="pickup_location"
                                        value={this.state.form_data.pickup_location}
                                        onChange={this.handleChange}
                                        onBlur={this.onBlur}
                                 />
                                 {/*<select placeholder={t("SelectCar")}>*/}
                                 {/*   <option>{t("ac_car")}</option>*/}
                                 {/*   <option>{t("non_ac_car")}</option>*/}
                                 {/*</select>*/}
                                 {this.renderFieldError('pickup_location')}
                              </Col>
                              <Col sm={12} className="field-container">
                                 <label htmlFor="return_location">{t("to_address")}</label>
                                 <input type="text" placeholder={t("to_address")}
                                        name="return_location"
                                        id='to_address'
                                        value={this.state.form_data.return_location}
                                        onChange={this.handleChange}
                                        onBlur={this.onBlur}
                                 />
                                 {/*<select placeholder={t("SelectCar")}>*/}
                                 {/*   <option>{t("ac_car")}</option>*/}
                                 {/*   <option>{t("non_ac_car")}</option>*/}
                                 {/*</select>*/}
                                 {this.renderFieldError('return_location')}
                              </Col>
                           </div>
                           <div className="row-fields-wrapper">
                              <Col sm={12} className="field-container">
                                 <label htmlFor="rental_start_date">{t("rental_start_date")}</label>
                                 <input type="datetime-local"
                                        id="rental_start_date"
                                        name="rental_start_date"
                                        value={this.state.form_data.rental_start_date}
                                        onChange={this.handleChange}
                                        onBlur={this.onBlur}
                                 />
                                 {this.renderFieldError('rental_start_date')}
                              </Col>
                              <Col sm={12} className="field-container">
                                 <label htmlFor="rental_end_date">{t("rental_end_date")}</label>
                                 <input type="datetime-local"
                                        id="rental_end_date"
                                        name="rental_end_date"
                                        value={this.state.form_data.rental_end_date}
                                        onChange={this.handleChange}
                                        onBlur={this.onBlur}
                                 />
                                 {this.renderFieldError('rental_end_date')}
                              </Col>
                              <Col sm={12} className='align-self-end f-c-button-wrapper'>
                                 <button type="submit" className="gauto-theme-btn">
                                    {t("find_car")}
                                 </button>
                              </Col>
                           </div>
                        </form>
                     </div>
                  </Col>
               </Row>
            </div>
         </section>
      )
   }
}

// const FindCar = () => {
//   const {t} = useTranslation();
//   const SubmitHandler = (e) => {
//     e.preventDefault();
//   };
//
//   return (
//     <section className="gauto-find-area">
//       <Container>
//         <Row>
//           <Col md={12}>
//             <div className="find-box">
//               <Row className="align-items-center">
//                 <Col md={4}>
//                   <div className="find-text">
//                     <h3>{t("search_best_car")}</h3>
//                   </div>
//                 </Col>
//                 <Col md={8}>
//                   <div className="find-form">
//                     <form onSubmit={SubmitHandler}>
//                       <Row>
//                         <Col md={4}>
//                           <p>
//                             <input
//                               type="text"
//                               placeholder={t("from_address")}
//                             />
//                           </p>
//                         </Col>
//                         <Col md={4}>
//                           <p>
//                             <input type="text" placeholder={t("to_address")}/>
//                           </p>
//                         </Col>
//                         <Col md={4}>
//                           <p>
//                             <select placeholder={t("SelectCar")}>
//                               <option>{t("ac_car")}</option>
//                               <option>{t("non_ac_car")}</option>
//                             </select>
//                           </p>
//                         </Col>
//                       </Row>
//                       <Row>
//                         <Col md={4}>
//                           <p>
//                             <DatePickerComponent
//                               id="datepicker"
//                               placeholder={t("journey_date")}
//                             ></DatePickerComponent>
//                           </p>
//                         </Col>
//                         <Col md={4}>
//                           <p>
//                             <TimePickerComponent
//                               id="timepicker"
//                               placeholder={t("journey_time")}
//                             ></TimePickerComponent>
//                           </p>
//                         </Col>
//                         <Col md={4}>
//                           <p>
//                             <button type="submit" className="gauto-theme-btn">
//                               {t("find_car")}
//                             </button>
//                           </p>
//                         </Col>
//                       </Row>
//                     </form>
//                   </div>
//                 </Col>
//               </Row>
//             </div>
//           </Col>
//         </Row>
//       </Container>
//     </section>
//   );
// };

export default FindCar;
