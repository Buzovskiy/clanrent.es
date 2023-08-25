import React, {Component} from "react";
import {Container, Row, Col} from "react-bootstrap";
import axios from "axios";


class FindCar extends Component {
   constructor(props) {
      super(props);
      this.state = {
         form_data: {
            pickup_location: '',
            return_location: '',
            rental_start_date: '',
            rental_end_date: '',
         },
         fields_errors: {},
      }
   }

   componentDidMount() {
   }

   handleChange = (e) => {
      let {name, value} = e.target;
      this.checkFieldErrors(e.target);
      const form_data = {...this.state.form_data, [name]: value};
      this.setState({form_data},
         // () => {
         //    console.log(this.state.form_data);
         // }
      );
   };

   checkFieldErrors = (element) => {
      let {name, value} = element;
      let fields_errors = {...this.state.fields_errors, [name]: []};
      if (element.required && !value) {
         fields_errors[name] = [this.props.t('this_field_may_not_be_blank')];
      }
      this.setState({fields_errors})
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
      // If rental dates and locations not exist don't send request
      if (!(this.state.form_data.rental_start_date && this.state.form_data.rental_end_date)) return false;
      if (!(this.state.form_data.pickup_location && this.state.form_data.return_location)) return false;

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
         <section className="gauto-find-area">
            <Container>
               <Row>
                  <Col md={12}>
                     <div className="find-box">
                        <Row className="align-items-center">
                           <Col md={4}>
                              <div className="find-text">
                                 <h3>{t("search_best_car")}</h3>
                              </div>
                           </Col>
                           <Col md={8}>
                              <div className="find-form">
                                 <form onSubmit={(e) => this.submitHandler(e)}>
                                    <Row>
                                       <Col md={4}>
                                          <p>
                                             <label htmlFor="pickup_location">{t("from_address")}</label>
                                             <input type="text" placeholder={t("from_address")} required
                                                    name="pickup_location"
                                                    id="pickup_location"
                                                    value={this.state.form_data.pickup_location}
                                                    onChange={this.handleChange}
                                             />
                                             {this.renderFieldError('pickup_location')}
                                          </p>
                                       </Col>
                                       <Col md={4}>
                                          <p>
                                             <label htmlFor="pickup_location">{t("to_address")}</label>
                                             <input type="text" placeholder={t("to_address")}
                                                    name="return_location"
                                                    id='to_address'
                                                    value={this.state.form_data.return_location}
                                                    onChange={this.handleChange}
                                             />
                                          </p>
                                       </Col>
                                    </Row>
                                    <Row>
                                       <Col md={4}>
                                          <p>
                                             <label htmlFor="rental_start_date">{t("rental_start_date")}</label>
                                             <input type="datetime-local"
                                                    id="rental_start_date"
                                                    name="rental_start_date"
                                                    value={this.state.form_data.rental_start_date}
                                                    onChange={this.handleChange}
                                             />
                                          </p>
                                       </Col>
                                       <Col md={4}>
                                          <p>
                                             <label htmlFor="rental_end_date">{t("rental_end_date")}</label>
                                             <input type="datetime-local"
                                                    id="rental_end_date"
                                                    name="rental_end_date"
                                                    value={this.state.form_data.rental_end_date}
                                                    onChange={this.handleChange}
                                             />
                                          </p>
                                       </Col>
                                       {/*<Col md={4}>*/}
                                       {/*   <p>*/}
                                       {/*      <TimePickerComponent*/}
                                       {/*         id="timepicker"*/}
                                       {/*         placeholder={t("journey_time")}*/}
                                       {/*      ></TimePickerComponent>*/}
                                       {/*   </p>*/}
                                       {/*</Col>*/}
                                       <Col md={4} className={'align-self-end'}>
                                          <p>
                                             <button type="submit" className="gauto-theme-btn">
                                                {t("find_car")}
                                             </button>
                                          </p>
                                       </Col>
                                    </Row>
                                 </form>
                              </div>
                           </Col>
                        </Row>
                     </div>
                  </Col>
               </Row>
            </Container>
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
