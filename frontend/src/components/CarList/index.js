import React, {Component} from "react";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {Container, Row, Col} from "react-bootstrap";
import makeTwoDimensionalArr from "../../main-component/utils";
import {
   FaCar,
   FaCogs,
   FaTachometerAlt,
   FaAngleDoubleRight,
} from "react-icons/fa";
import axios from "axios";
import {CategoryItem} from "./categoryItem";


class CarList extends Component {
   constructor(props) {
      super(props);
      this.state = {
         carList: [],
         product: {},
         pickup_location: '',
         return_location: '',
         dates: '',
      }
   }

   componentDidMount() {
      const [searchParams] = this.props.searchParams
      let dates = searchParams.get('dates');
      let pickup_location = searchParams.get('pickup_location');
      let return_location = searchParams.get('return_location');

      if (!(dates && pickup_location && return_location)) {
         console.log('Problem with the params of the request');
         return false;
      }

      this.setState({
         pickup_location: pickup_location,
         return_location: return_location,
         dates: dates
      })

      let params = {
         dates: dates,
         pickup_location: dates,
         return_location: dates,
      }

      axios
         .get(`${process.env.REACT_APP_API_LINK}/v1/booking/search/`, {params: params})
         .then((res) => {
            let cars = res.data['vehicles'];
            let car_list_two_dim_array = []
            let num_cols = 2 // The number of columns in a row
            let product = {}

            cars.map(item => {
               car_list_two_dim_array = makeTwoDimensionalArr(car_list_two_dim_array, num_cols, item);
               product[item.id] = item;
            });

            this.setState({carList: car_list_two_dim_array});
            this.setState({product: product});
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

   SubmitHandler = (e) => {
      e.preventDefault();
      let params = {
         dates: 1,
         pickup_location: 2,
         return_location: 3
      };
      window.location.href = `/car-listing?${this.props.createSearchParams(params)}`;
   };

   onClick = (e) => {
      e.preventDefault();
   };

   clickProduct = (e) => {
      let product_id = e.target.closest('.single-offers').dataset.id;
      let product_obj = this.state.product[product_id];
      let booking_info = {
         product: product_obj,
         pickup_location: this.state.pickup_location,
         return_location: this.state.return_location,
         dates: this.state.dates
      }
      localStorage.setItem('booking_info', JSON.stringify(booking_info));
      if (e.type === 'click') {
         e.preventDefault();
         let url = e.target.closest('.single-offers').dataset.url
         this.props.navigate({
            pathname: url
         });
      }
   }


   renderCar = (items_row) => {
      const {t} = this.props
      return items_row.map((item, ind) => (
         <Col key={ind} md={6}>
            <CategoryItem item={item} t={t} clickProduct={this.clickProduct}/>
         </Col>
      ))
   }

   renderCarList = () => {
      return this.state.carList.map((items_row, row_ind) => (
         <Row key={row_ind}>
            {this.renderCar(items_row)}
         </Row>
      ))
   }

   render() {
      const {t} = this.props
      return (
         <section className="gauto-car-listing section_70">
            <Container>
               <Row>
                  <Col lg={4}>
                     <div className="car-list-left">
                        <div className="sidebar-widget">
                           <form onSubmit={this.SubmitHandler}>
                              <p>
                                 <input type="text" placeholder={t("from_address")}/>
                              </p>
                              <p>
                                 <input type="text" placeholder={t("to_address")}/>
                              </p>
                              <p>
                                 <select>
                                    <option>{t("ac_car")}</option>
                                    <option>{t("non_ac_car")}</option>
                                 </select>
                              </p>
                              <p>
                                 {/*<DatePickerComponent*/}
                                 {/*   id="datepicker"*/}
                                 {/*   placeholder={t("journey_date")}*/}
                                 {/*></DatePickerComponent>*/}
                                 <input type="text"/>
                              </p>
                              <p>
                                 {/*<TimePickerComponent*/}
                                 {/*   id="timepicker"*/}
                                 {/*   placeholder={t("journey_time")}*/}
                                 {/*></TimePickerComponent>*/}
                                 <input type="text"/>
                              </p>
                              <p>
                                 <button type="submit" className="gauto-theme-btn">
                                    {t("find_car")}
                                 </button>
                              </p>
                           </form>
                        </div>
                        <div className="sidebar-widget">
                           <ul className="service-menu">
                              <li className="active">
                                 <Link to="/" onClick={this.onClick}>
                                    All Brands<span>(2376)</span>
                                 </Link>
                              </li>
                              <li>
                                 <Link to="/" onClick={this.onClick}>
                                    Toyota<span>(237)</span>
                                 </Link>
                              </li>
                              <li>
                                 <Link to="/" onClick={this.onClick}>
                                    nissan<span>(123)</span>
                                 </Link>
                              </li>
                              <li>
                                 <Link to="/" onClick={this.onClick}>
                                    mercedes<span>(23)</span>
                                 </Link>
                              </li>
                              <li>
                                 <Link to="/" onClick={this.onClick}>
                                    hyundai<span>(467)</span>
                                 </Link>
                              </li>
                              <li>
                                 <Link to="/" onClick={this.onClick}>
                                    Audi<span>(123)</span>
                                 </Link>
                              </li>
                              <li>
                                 <Link to="/" onClick={this.onClick}>
                                    datsun<span>(23)</span>
                                 </Link>
                              </li>
                              <li>
                                 <Link to="/" onClick={this.onClick}>
                                    Mitsubishi<span>(223)</span>
                                 </Link>
                              </li>
                           </ul>
                        </div>
                     </div>
                  </Col>
                  <Col lg={8}>
                     <div className="car-listing-right">
                        <div className="car-grid-list">
                           {this.renderCarList()}
                        </div>
                        <div className="pagination-box-row">
                           <p>Page 1 of 6</p>
                           <ul className="pagination">
                              <li className="active">
                                 <Link to="/" onClick={this.onClick}>
                                    1
                                 </Link>
                              </li>
                              <li>
                                 <Link to="/" onClick={this.onClick}>
                                    2
                                 </Link>
                              </li>
                              <li>
                                 <Link to="/" onClick={this.onClick}>
                                    3
                                 </Link>
                              </li>
                              <li>...</li>
                              <li>
                                 <Link to="/" onClick={this.onClick}>
                                    6
                                 </Link>
                              </li>
                              <li>
                                 <Link to="/" onClick={this.onClick}>
                                    <FaAngleDoubleRight/>
                                 </Link>
                              </li>
                           </ul>
                        </div>
                     </div>
                  </Col>
               </Row>
            </Container>
         </section>
      )
   }
}

export default CarList;
