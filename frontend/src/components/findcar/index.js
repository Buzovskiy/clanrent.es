import React, {Component, useRef} from "react";
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
         fields_errors: {
            pickup_location: [],
            return_location: [],
            rental_start_date: [],
            rental_end_date: [],
         },
         settings: {},
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

   onDateChange = (dates, field) => {
      const form_data = {...this.state.form_data};
      if (Array.isArray(dates)) {
         const [start, end] = dates;
         this.updateErrorsState([
            {name: 'rental_end_date', value: end},
            {name: 'rental_start_date', value: start}
         ]);
         form_data['rental_start_date'] = start;
         form_data['rental_end_date'] = end;
      } else if (dates instanceof Date) { // if time
         this.updateErrorsState([{name: field, value: dates}]);
         form_data[field] = dates;
      }
      this.setState({form_data},
         // () => console.log(this.state.form_data)
      );
   }

   /**
    * Method to update the state of the form fields errors
    * @param {Object[]} fields_list[] - array of objects
    * @param {string} fields_list[].name - input name
    * @param {string} fields_list[].value - input value
    */
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
      const form_fields_list = [];
      for (const field in this.state.form_data) {
         form_fields_list.push({name: field, value: this.state.form_data[field]});
      }

      this.updateErrorsState(form_fields_list);

      if (this.hasErrors(this.state.fields_errors)) {
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
      // console.log(params);
      this.props.navigate({
         pathname: '/car-listing',
         search: `?${this.props.createSearchParams(params)}`
      });
   };

   onPlaceChange = (e) => {
      this.updateErrorsState([e.target]);
      // Reset the value of place
      const form_data = {...this.state.form_data, [e.target.name]: ''};
      this.setState({form_data},
         () => {
            // console.log(this.state.form_data);
         }
      );
   };

   onPlaceSelected = (place, name) => {
      if (!place) return false;
      const value = place['formatted_address']
      this.updateErrorsState([{name: name, value: value}]);
      const form_data = {...this.state.form_data, [name]: value};
      this.setState({form_data},
         () => {
            // console.log(this.state.form_data);
         }
      );
   }

   RenderCustomDateInput = React.forwardRef(({value, onClick, input_name, date, showClearButton}, ref) => (
      <CustomDateInput
         onClick={onClick}
         ref={ref}
         value={value}
         input_name={input_name}
         date={date}
         showClearButton={showClearButton}
         t={this.props.t}/>
   ));

   render() {
      const {t} = this.props;
      const RenderCustomDateInput = this.RenderCustomDateInput;

      return (
         <section className="gauto-find-box-area">
            <video autoPlay muted loop className='promo-video-wide'>
               <source src={video_wide} type="video/mp4"/>
            </video>
            <video autoPlay muted loop playsInline className='promo-video-narrow'>
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
                        <form className="find-form" onSubmit={(e) => this.submitHandler(e)}>
                           <div className="fields-container">
                              <div className='field-wrapper order1'>
                                 <InputLocation
                                    css_class={this.getErrorClass('pickup_location')}
                                    settings={this.state.settings}
                                    onPlaceSelected={this.onPlaceSelected}
                                    placeholder={t("from_address")}
                                    onPlaceChange={this.onPlaceChange}
                                    input_name='pickup_location'
                                    id='pickup_location'
                                 />
                                 {/*   {this.renderFieldError('pickup_location')}*/}
                              </div>
                              <div className={`field-wrapper order3 ${this.getErrorClass('rental_start_date')}`}>
                                 <DatePicker
                                    selected={this.state.form_data.rental_start_date}
                                    onChange={(dates) => this.onDateChange(dates, 'rental_start_date')}
                                    selectsRange
                                    // selectsStart
                                    startDate={this.state.form_data.rental_start_date}
                                    endDate={this.state.form_data.rental_end_date}
                                    dateFormat="yyyy-MM-dd HH:mm"
                                    minDate={new Date()}
                                    showTimeSelect
                                    isClearable
                                    customInput={<RenderCustomDateInput
                                       input_name='rental_start_date'
                                       date={this.state.form_data.rental_start_date}
                                       showClearButton={!!this.state.form_data.rental_start_date}
                                    />}
                                 />
                              </div>
                              <div className='field-wrapper order2'>
                                 <InputLocation
                                    css_class={this.getErrorClass('return_location')}
                                    settings={this.state.settings}
                                    onPlaceSelected={this.onPlaceSelected}
                                    placeholder={t("to_address")}
                                    css_class={this.fieldHasError('return_location') ? 'error' : ''}
                                    onPlaceChange={this.onPlaceChange}
                                    input_name='return_location'
                                    id=''
                                 />
                              </div>
                              <div className={`field-wrapper order4 ${this.getErrorClass('rental_end_date')}`}>
                                 <DatePicker
                                    selected={this.state.form_data.rental_end_date}
                                    onChange={(date) => this.onDateChange(date, 'rental_end_date')}
                                    // selectsRange
                                    selectsEnd
                                    startDate={this.state.form_data.rental_start_date}
                                    endDate={this.state.form_data.rental_end_date}
                                    // minDate={this.state.form_data.rental_start_date ? this.state.form_data.rental_start_date : new Date()}
                                    minDate={this.state.form_data.rental_start_date}
                                    dateFormat="yyyy-MM-dd HH:mm"
                                    showTimeSelect
                                    showClearButton={false}
                                    customInput={<RenderCustomDateInput
                                       input_name='rental_end_date'
                                       date={this.state.form_data.rental_end_date}
                                    />}
                                 />
                              </div>
                           </div>
                           <button type="submit" className="gauto-theme-btn">
                              {t("find_car")}
                           </button>
                        </form>
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

export default FindCar;
