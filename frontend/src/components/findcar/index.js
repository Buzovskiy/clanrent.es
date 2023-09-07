import React, {Component} from "react";
import {Container, Row, Col} from "react-bootstrap";
import axios from "axios";
import DatePicker from "react-datepicker";
import {formatDateRangeToAPIStandard} from "../../main-component/utils";
import CustomDateInput from "./date_input";

import "react-datepicker/dist/react-datepicker.css";
import video_wide from "../../img/video/video-wide.mp4";
import video_narrow from "../../img/video/video-narrow.mp4";
import button from "bootstrap/js/src/button";


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
            rental_start_date: new Date("2014/02/08"),
            rental_end_date: new Date("2014/02/10"),
            // rental_start_date: tomorrow.toISOString().slice(0, -8),
            // rental_end_date: after_tomorrow.toISOString().slice(0, -8),

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

   onChangeDate = (date, field) => {
      const form_data = {...this.state.form_data, [field]: date};
      this.setState({form_data},
         // () => console.log(this.state.form_data)
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

      const datesRange = formatDateRangeToAPIStandard(
         this.state.form_data.rental_start_date,
         this.state.form_data.rental_end_date
      );

      let params = {
         dates: datesRange,
         pickup_location: this.state.form_data.pickup_location,
         return_location: this.state.form_data.return_location
      };

      console.log(params.dates);

      // this.props.navigate({
      //    pathname: '/car-listing',
      //    search: `?${this.props.createSearchParams(params)}`
      // });
   };

   // RenderCustomInput = () => {
   //    return React.forwardRef(({value, onClick, type}, ref) => (
   //       <CustomDateInput onClick={onClick} ref={ref} value={value}/>
   //       // <button ref={ref} value={value} onClick={onClick}>{type}</button>
   //    ));
   // }


   render() {
      const {t} = this.props;
      const RenderCustomInput = React.forwardRef(({value, onClick, type}, ref) => (
         <CustomDateInput onClick={onClick} ref={ref} value={value} type={type} t={t}/>
      ));

      return (
         <section className="gauto-find-box-area">
            <video autoPlay muted loop className='promo-video-wide'>
               <source src={video_wide} type="video/mp4"/>
            </video>
            <video autoPlay muted loop className='promo-video-narrow'>
               <source src={video_narrow} type="video/mp4"/>
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
                           <div className="fields-container">
                              <div className="field-wrapper">
                                 <input type="text" placeholder={t("from_address")}
                                        name="pickup_location"
                                        id="pickup_location"
                                        value={this.state.form_data.pickup_location}
                                        onChange={this.handleChange}
                                        onBlur={this.onBlur}
                                 />
                                 {this.renderFieldError('pickup_location')}
                              </div>
                              <div className="field-wrapper">
                                 {/*{t("rental_start_date")}*/}
                                 <DatePicker
                                    selected={this.state.form_data.rental_start_date}
                                    onChange={(date) => this.onChangeDate(date, 'rental_start_date')}
                                    selectsStart
                                    startDate={this.state.form_data.rental_start_date}
                                    endDate={this.state.form_data.rental_end_date}
                                    dateFormat="yyyy-MM-dd HH:mm"
                                    showTimeSelect
                                    customInput={<RenderCustomInput type='rental_start_date'/>}
                                 />


                                 {/*<input type="datetime-local"*/}
                                 {/*       id="rental_start_date"*/}
                                 {/*       name="rental_start_date"*/}
                                 {/*       value={this.state.form_data.rental_start_date}*/}
                                 {/*       onChange={this.handleChange}*/}
                                 {/*       onBlur={this.onBlur}*/}
                                 {/*/>*/}
                                 {this.renderFieldError('rental_start_date')}
                              </div>
                              <div className="field-wrapper">
                                 <input type="text" placeholder={t("to_address")}
                                        name="return_location"
                                        id='to_address'
                                        value={this.state.form_data.return_location}
                                        onChange={this.handleChange}
                                        onBlur={this.onBlur}
                                 />
                                 {this.renderFieldError('return_location')}
                              </div>
                              <div className="field-wrapper">
                                 <DatePicker
                                    selected={this.state.form_data.rental_end_date}
                                    onChange={(date) => this.onChangeDate(date, 'rental_end_date')}
                                    selectsEnd
                                    startDate={this.state.form_data.rental_start_date}
                                    endDate={this.state.form_data.rental_end_date}
                                    minDate={this.state.form_data.rental_start_date}
                                    dateFormat="yyyy-MM-dd HH:mm:ss"
                                    showTimeSelect
                                    customInput={<RenderCustomInput type='rental_end_date'/>}
                                 />
                                 {/*{t("rental_end_date")}*/}
                                 {/*<input type="datetime-local"*/}
                                 {/*       id="rental_end_date"*/}
                                 {/*       name="rental_end_date"*/}
                                 {/*       value={this.state.form_data.rental_end_date}*/}
                                 {/*       onChange={this.handleChange}*/}
                                 {/*       onBlur={this.onBlur}*/}
                                 {/*/>*/}
                                 {this.renderFieldError('rental_end_date')}
                              </div>
                           </div>
                           <button type="submit" className="gauto-theme-btn">
                              {t("find_car")}
                           </button>


                           {/*<div className="mb-md-2 row-fields-wrapper">*/}
                           {/*   <Row>*/}
                           {/*      <Col sm={6} className="field-container">*/}

                           {/*      </Col>*/}
                           {/*      <Col sm={6} className="field-container">*/}

                           {/*      </Col>*/}
                           {/*   </Row>*/}
                           {/*</div>*/}
                           {/*<div className="row-fields-wrapper">*/}
                           {/*   <Col sm={12} className="field-container">*/}
                           {/*      <label htmlFor="rental_start_date">{t("rental_start_date")}</label>*/}

                           {/*   </Col>*/}
                           {/*   <Col sm={12} className="field-container">*/}
                           {/*   </Col>*/}
                           {/*   <Col sm={12} className='align-self-end f-c-button-wrapper'>*/}

                           {/*   </Col>*/}
                           {/*</div>*/}
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
