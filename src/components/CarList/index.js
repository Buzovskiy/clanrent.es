import React, {Component} from "react";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {Container, Row, Col} from "react-bootstrap";
import {
   FaCar,
   FaCogs,
   FaTachometerAlt,
   FaAngleDoubleRight, FaAngleDoubleLeft,
} from "react-icons/fa";
// import {bgLoader} from "../bgLoader";
import axios from "axios";
import {CategoryItem} from "./categoryItem";
import {toggleBgLoader} from "../bgLoader";


class CarList extends Component {
   constructor(props) {
      super(props);
      this.state = {
         carList: [],
         product: {},
         pickup_location: '',
         return_location: '',
         dates: '',
         page: 1,
         count_pages: 1,
         show_loader: true
      }
   }

   componentDidMount() {
      toggleBgLoader(this.state.show_loader);
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
         pickup_location: pickup_location,
         return_location: return_location,
      }

      let page = searchParams.get('page');
      if (page != null && +page) {
         params['page'] = +searchParams.get('page');
      }

      axios
         .get(`${process.env.REACT_APP_API_LINK}/v1/booking/search/`, {params: params})
         .then((res) => {
            let cars = res.data['vehicles'];
            this.setState({page: res.data['pagination'].page})
            this.setState({count_pages: res.data['pagination'].count_pages})
            let car_list_two_dim_array = []
            let num_cols = 3 // The number of columns in a row
            let product = {}

            cars.map(item => {
               // car_list_two_dim_array = makeTwoDimensionalArr(car_list_two_dim_array, num_cols, item);
               product[item.id] = item;
            });

            // this.setState({carList: car_list_two_dim_array});
            this.setState({carList: cars});
            this.setState({product: product});
            this.setState({show_loader: false}, () => toggleBgLoader(this.state.show_loader));
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

   renderPagination = () => {
      const pages = [];
      const params = {
         dates: this.state.dates,
         pickup_location: this.state.pickup_location,
         return_location: this.state.return_location,
      }
      for (let i = 1; i < this.state.count_pages + 1; i++) {
         if (i > 1) params['page'] = i;
         let page_data = {};
         page_data['page'] = i;
         page_data['url'] = `/car-listing?${this.props.createSearchParams(params)}`
         page_data['active'] = i === this.state.page ? 'active' : '';
         pages.push(page_data);
      }

      let arrow_right;
      if (this.state.count_pages > 1 && this.state.count_pages !== this.state.page) {
         params['page'] = this.state.page + 1;
         let url = `/car-listing?${this.props.createSearchParams(params)}`
         arrow_right = this.renderPaginationArrow(url, 'right');
      }

      let arrow_left;
      if (this.state.count_pages > 1 && this.state.page !== 1) {
         params['page'] = this.state.page - 1;
         if (+params['page'] === 1) delete params['page'];
         let url = `/car-listing?${this.props.createSearchParams(params)}`
         arrow_left = this.renderPaginationArrow(url, 'left');
      }

      const pagesListRendered = pages.map((item, key) => (
         <li key={key} className={item.active}>
            <a href={item.url}>{item.page}</a>
         </li>
      ))

      return (
         <>
            {arrow_left}
            {pagesListRendered}
            {arrow_right}
         </>
      )
   }

   renderPaginationArrow = (url, type) => {
      let icon = type === 'left' ? <FaAngleDoubleLeft/> : <FaAngleDoubleRight/>
      return <li><a href={url}>{icon}</a></li>
   }

   onClick = (e) => {
      e.preventDefault();
   };

   clickProduct = (e) => {
      // todo: add clean cart function

      let product_id = e.target.closest('.single-offers').dataset.id;
      let product_obj = this.state.product[product_id];
      let booking_info = {
         product: product_obj,
         pickup_location: this.state.pickup_location,
         return_location: this.state.return_location,
         dates: this.state.dates
      }
      let cart_storage = localStorage.getItem('cart');
      let cart = cart_storage === null ? {} : JSON.parse(cart_storage);
      cart[product_obj.id] = {...booking_info};
      localStorage.setItem('cart', JSON.stringify(cart));
   }

   renderCarList = () => {
      return this.state.carList.map((item, ind) => (
         <Col key={ind} md={4}>
            <CategoryItem item={item} t={this.props.t} clickProduct={this.clickProduct}/>
         </Col>
      ))
   }

   render() {
      const {t} = this.props
      return (
         <section className="gauto-car-listing section_70">
            <Container>
               <Row>
                  <Col lg={12}>
                     <div className="car-listing-right">
                        <div className="pagination-box-row">
                           <p>Page {this.state.page} of {this.state.count_pages}</p>
                        </div>
                        <Row className='car-grid-list'>{this.renderCarList()}</Row>
                        <div className="pagination-box-row">
                           <p>Page {this.state.page} of {this.state.count_pages}</p>
                           <ul className="pagination">
                              {this.renderPagination()}
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
