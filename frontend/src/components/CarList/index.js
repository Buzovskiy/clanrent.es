import React, {Component} from "react";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {Container, Row, Col} from "react-bootstrap";
import {
   FaCar,
   FaCogs,
   FaTachometerAlt,
   FaAngleDoubleRight,
} from "react-icons/fa";

import img2 from "../../img/nissan-offer.png";
import img3 from "../../img/audi-offer.png";
import img4 from "../../img/bmw-offer.png";
import img5 from "../../img/toyota-offer-2.png";
import img6 from "../../img/marcedes-offer.png";
import axios from "axios";


class CarList extends Component {
   constructor(props) {
      super(props);
      this.state = {
         carList: [],
         productObj: {}
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
            let i = 0;
            let num_cols = 2 // The number of columns in a row
            let productObj = {}
            cars.map(item => {
               if (typeof car_list_two_dim_array[i] === 'undefined') car_list_two_dim_array.push([]);
               if (car_list_two_dim_array[i].length > num_cols - 1) {
                  i++;
                  car_list_two_dim_array.push([]);
               }
               car_list_two_dim_array[i].push(item);
               productObj[item.id] = item;
            });
            this.setState({carList: car_list_two_dim_array});
            this.setState({productObj: productObj});
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
      console.log('submit');

      let params = {
         dates: 1,
         pickup_location: 2,
         return_location: 3
      };
      // this.props.navigate({
      //    pathname: '/car-listing',
      //    search: `?${this.props.createSearchParams(params)}`
      // });
      window.location.href = `/car-listing?${this.props.createSearchParams(params)}`;
      // this.componentDidMount();
   };

   onClick = (e) => {
      e.preventDefault();
   };

   clickProduct = (e) => {
      e.preventDefault();
      let product_id = e.target.dataset.id;
      let product_obj = JSON.stringify(this.state.productObj[product_id]);
      localStorage.setItem('product_for_booking', product_obj);
      console.log(e.target.href);
      this.props.navigate({
         pathname: '/car-booking'
      });
   }


   renderCar = (items_row) => {
      const {t} = this.props
      return items_row.map((item, ind) => (
         <Col key={ind} md={6}>
            <div className="single-offers">
               <div className="offer-image">
                  <Link to="/car-booking">
                     <img src={item.thumbnail} alt="offer 1"/>
                  </Link>
               </div>
               <div className="offer-text">
                  <Link to="/car-booking">
                     <h3>{item.brand} {item.mark}</h3>
                  </Link>
                  <h4>
                     {item.price}{item.currency}<span>/ {t("day")}</span>
                  </h4>
                  <ul>
                     <li>
                        <FaCar/>
                        {t("model")}: {item.year}
                     </li>
                     <li>
                        <FaCogs/>
                        {item.transmission}
                     </li>
                     {/*<li>*/}
                     {/*   <FaTachometerAlt/>*/}
                     {/*   20kmpl*/}
                     {/*</li>*/}
                  </ul>
                  <div className="offer-action">
                     <Link to="/car-booking" data-id={item.id} className="offer-btn-1" onClick={this.clickProduct}>
                        {t("rent_car")}
                     </Link>
                  </div>
               </div>
            </div>
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
