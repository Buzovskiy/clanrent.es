import React, {Component} from "react";
import {useTranslation} from "react-i18next";
import {Container, Row, Col} from "react-bootstrap";
import {registerLicense} from "@syncfusion/ej2-base";
import axios from "axios";

import {
   DatePickerComponent,
   TimePickerComponent,
} from "@syncfusion/ej2-react-calendars";


registerLicense(
   "ORg4AjUWIQA/Gnt2VVhiQlFadVlJXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxRdk1jXX9cc3dRR2BbWEM="
);


class FindCar extends Component {
   constructor(props) {
      super(props);
      this.state = {
         pickup_location: '',
         return_location: '',
      }
   }

   componentDidMount() {
      axios
         .get(`${process.env.REACT_APP_API_LINK}/v1/company/settings/`)
         .then((res) => {
            // console.log(res);
         })
         .catch((error) => { // error is handled in catch block
            // if (error.response) { // status code out of the range of 2xx
            //    // console.log("Status :" + error.response.status);
            //    if (error.response.status === 400 && typeof (error.response.data) === 'object') {
            //       let fields_errors = error.response.data;
            //       this.setState({fields_errors});
            //       if (error.response.data.hasOwnProperty('non_field_errors')) {
            //          let form_errors = [...this.state.form_errors, ...error.response.data.non_field_errors];
            //          this.setState({form_errors});
            //       }
            //    } else {
            //       let form_errors = [...this.state.form_errors, String(error.response.data)];
            //       this.setState({form_errors});
            //    }
            // } else if (error.request) { // The request was made but no response was received
            //    let form_errors = [...this.state.form_errors, error.request];
            //    this.setState({form_errors});
            // } else {// Error on setting up the request
            //    let form_errors = [...this.state.form_errors, error.message];
            //    this.setState({form_errors});
            // }
         });
   }

   handleChange = (e) => {
      let {name, value} = e.target;
      // this.checkFieldErrors(e.target);
      // if (e.target.type === "checkbox") {
      //    name = e.target.name;
      //    value = this.state.formFields.hasOwnProperty(name) ? this.state.formFields[name] : [];
      //    value = value.filter(item => item !== e.target.value);
      //    if (e.target.checked) value.push(e.target.value);
      // }
      // const formFields = {...this.state.formFields, [name]: value};
      // this.setState({formFields});
   };

   submitHandler = (e, data2) => {
      e.preventDefault();
      let data = {
         vehicle_id: '31025',
         dates: '2023-07-28 12:00 - 2023-07-30 12:00',
         pickup_location: '7151',
         return_location: '7151'
      }
      axios
         .post(`${process.env.REACT_APP_API_LINK}/v1/order/create/`, data)
         .then((res) => {
            // console.log(res);
         })
         .catch((error) => { // error is handled in catch block
            // if (error.response) { // status code out of the range of 2xx
            // } else {// Error on setting up the request
            //    let form_errors = [...this.state.form_errors, error.message];
            //    this.setState({form_errors});
            // }
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
                                 <form onSubmit={(e) => this.submitHandler(e, {field1: 'value1'})}>
                                    <Row>
                                       <Col md={4}>
                                          <p>
                                             <input
                                                type="text"
                                                placeholder={t("from_address")}
                                                value={this.state.pickup_location}
                                                onChange={this.handleChange}
                                             />
                                          </p>
                                       </Col>
                                       <Col md={4}>
                                          <p>
                                             <input type="text" placeholder={t("to_address")}/>
                                          </p>
                                       </Col>
                                       <Col md={4}>
                                          <p>
                                             <select placeholder={t("SelectCar")}>
                                                <option>{t("ac_car")}</option>
                                                <option>{t("non_ac_car")}</option>
                                             </select>
                                          </p>
                                       </Col>
                                    </Row>
                                    <Row>
                                       <Col md={4}>
                                          <p>
                                             <DatePickerComponent
                                                id="datepicker"
                                                placeholder={t("journey_date")}
                                             ></DatePickerComponent>
                                          </p>
                                       </Col>
                                       <Col md={4}>
                                          <p>
                                             <TimePickerComponent
                                                id="timepicker"
                                                placeholder={t("journey_time")}
                                             ></TimePickerComponent>
                                          </p>
                                       </Col>
                                       <Col md={4}>
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
