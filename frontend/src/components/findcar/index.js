import React, {Component} from "react";
import {Container, Row, Col} from "react-bootstrap";
import axios from "axios";
import DatePicker from "react-datepicker";
import {formatDateRangeToAPIStandard} from "../../main-component/utils";
import CustomDateInput from "./date_input";
import Autocomplete from "react-google-autocomplete";
import {InputLocation} from "./InputLocation";

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
      tomorrow.setHours(10);
      tomorrow.setMinutes(0);
      tomorrow.setSeconds(null);
      after_tomorrow.setHours(10);
      after_tomorrow.setMinutes(0);
      after_tomorrow.setSeconds(null);

      this.state = {
         form_data: {
            pickup_location: '',
            return_location: '',
            // rental_start_date: new Date(tomorrow),
            // rental_end_date: new Date(after_tomorrow),
            rental_start_date: null,
            rental_end_date: null,
         },
         fields_errors: {},
         settings: {},
         css_classes: {
            pickup_location: '',
            return_location: '',
            rental_start_date: '',
            rental_end_date: '',
         }
      }
   }

   componentDidMount() {
      axios
         .get(`${process.env.REACT_APP_API_LINK}/v1/company/settings/`)
         .then((res) => {
            this.setState({settings: res.data});
            // function initialize() {
            //    var input = document.getElementById('autocomplete_search');
            //    var autocomplete = new google.maps.places.Autocomplete(input);
            //    autocomplete.addListener('place_changed', function () {
            //       var place = autocomplete.getPlace();
            //       // // place variable will have all the information you are looking for.
            //       // let lat = $('#lat').val(place.geometry['location'].lat());
            //       // let lng = $('#long').val(place.geometry['location'].lng());
            //       // console.log(place.geometry['location'].lat());
            //       // console.log(place.geometry['location'].lng());
            //    });
            // }
         })
         .catch((error) => console.log(error));
   }

   onInputPlaceChange = (e) => {
      this.updateErrorsState(e.target);
      // let {name, value} = e.target;
      // const form_data = {...this.state.form_data, [name]: value};
      // this.setState({form_data},
      //    // () => {
      //    //    console.log(this.state.form_data);
      //    // }
      // );
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
      const fields_errors_initial = {...this.state.fields_errors, [name]: []};
      const css_classes_initial = {...this.state.css_classes, [name]: ''}
      const {fields_errors, css_classes} = this.checkFieldError(element, fields_errors_initial, css_classes_initial);
      this.setState({fields_errors, css_classes},
         () => {
            console.log(this.state.fields_errors);
            console.log(this.state.css_classes);
         }
      );
   }

   checkFieldError = (element, fields_errors, css_classes) => {
      let {name, value} = element;
      // if (element.required && !value) {
      if (!value) {
         fields_errors[name] = [this.props.t('this_field_may_not_be_blank')];
         css_classes[name] = 'error';
      }
      return {fields_errors, css_classes}
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

      this.props.navigate({
         pathname: '/car-listing',
         search: `?${this.props.createSearchParams(params)}`
      });
   };

   // RenderCustomInput = () => {
   //    return React.forwardRef(({value, onClick, type}, ref) => (
   //       <CustomDateInput onClick={onClick} ref={ref} value={value}/>
   //       // <button ref={ref} value={value} onClick={onClick}>{type}</button>
   //    ));
   // }

   onInputLocationChange = (place, location) => {
      console.log(place, location);
   }


   render() {
      const {t} = this.props;
      const RenderCustomInput = React.forwardRef(({value, onClick, input_name}, ref) => (
         <CustomDateInput onClick={onClick} ref={ref} value={value} input_name={input_name} t={t}/>
      ));

      return (
         <section className="gauto-find-box-area">
            <video autoPlay muted loop className='promo-video-wide'>
               <source src={video_wide} type="video/mp4"/>
            </video>
            <video autoPlay muted loop className='promo-video-narrow'>
               <source src={video_narrow} type="video/mp4"/>
            </video>
            <div className="find-box-area-wrapper">
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
                                 <div className="field-wrapper order1">
                                    <InputLocation
                                       settings={this.state.settings}
                                       onInputLocationChange={this.onInputLocationChange}
                                       placeholder={t("from_address")}
                                       css_class={this.state.css_classes.pickup_location}
                                       onInputPlaceChange={this.onInputPlaceChange}
                                       input_name='pickup_location'
                                    />
                                    {/*<div className="field-wrapper order1">*/}
                                    {/*   <input type="text" placeholder={t("from_address")}*/}
                                    {/*          name="pickup_location"*/}
                                    {/*          id="pickup_location"*/}
                                    {/*          value={this.state.form_data.pickup_location}*/}
                                    {/*          onChange={this.handleChange}*/}
                                    {/*          onBlur={this.onBlur}*/}
                                    {/*   />*/}
                                    {/*   {this.renderFieldError('pickup_location')}*/}
                                    {/*</div>*/}
                                 </div>
                                 <div className="field-wrapper order3">
                                    {/*{t("rental_start_date")}*/}
                                    <DatePicker
                                       selected={this.state.form_data.rental_start_date}
                                       onChange={(date) => this.onChangeDate(date, 'rental_start_date')}
                                       selectsStart
                                       startDate={this.state.form_data.rental_start_date}
                                       endDate={this.state.form_data.rental_end_date}
                                       dateFormat="yyyy-MM-dd HH:mm"
                                       showTimeSelect
                                       customInput={<RenderCustomInput input_name='rental_start_date'/>}
                                    />
                                    {this.renderFieldError('rental_start_date')}
                                 </div>
                                 <div className="field-wrapper order2">
                                    <InputLocation
                                       settings={this.state.settings}
                                       onInputLocationChange={this.onInputLocationChange}
                                       placeholder={t("to_address")}
                                       css_class={this.state.css_classes.return_location}
                                       onInputPlaceChange={this.onInputPlaceChange}
                                       input_name='return_location'
                                    />
                                    {/*<input type="text" placeholder={t("to_address")}*/}
                                    {/*       name="return_location"*/}
                                    {/*       id='to_address'*/}
                                    {/*       value={this.state.form_data.return_location}*/}
                                    {/*       onChange={this.handleChange}*/}
                                    {/*       onBlur={this.onBlur}*/}
                                    {/*/>*/}
                                    {/*{this.renderFieldError('return_location')}*/}
                                 </div>
                                 <div className="field-wrapper order4">
                                    <DatePicker
                                       selected={this.state.form_data.rental_end_date}
                                       onChange={(date) => this.onChangeDate(date, 'rental_end_date')}
                                       selectsEnd
                                       startDate={this.state.form_data.rental_start_date}
                                       endDate={this.state.form_data.rental_end_date}
                                       minDate={this.state.form_data.rental_start_date}
                                       dateFormat="yyyy-MM-dd HH:mm"
                                       showTimeSelect
                                       customInput={<RenderCustomInput input_name='rental_end_date'/>}
                                    />
                                    {this.renderFieldError('rental_end_date')}
                                 </div>
                              </div>
                              <button type="submit" className="gauto-theme-btn">
                                 {t("find_car")}
                              </button>
                           </form>
                        </div>
                     </Col>
                  </Row>
               </div>
               <div className="slider-text">
                  <h2>{t("hero_slide_title")}</h2>
                  <p>{t("hero_slide_subtitle")}</p>
               </div>
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
