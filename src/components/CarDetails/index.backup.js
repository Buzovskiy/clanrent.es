import React, {Component} from "react";
import {Link} from "react-router-dom";
import {Container, Row, Col} from "react-bootstrap";
import CarOptions from "./CarOptions";
import {
   FaStar,
   FaStarHalfAlt,
} from "react-icons/fa";

import axios from "axios";


class CarDetails extends Component {
   constructor(props) {
      super(props);

      this.state = {
         productId: 0,
         cart: {},
         product: {},
         pickup_location: '',
         return_location: '',
         dates: '',
      }
   }

   componentDidMount() {
      let cart_storage = localStorage.getItem('cart');
      const {productId} = this.props.useParams;
      if (cart_storage === null) window.location.replace("/");
      const cart = JSON.parse(cart_storage);
      if (cart.hasOwnProperty(productId) === false) window.location.replace("/");
      this.setState({
         product: cart[productId].product,
         dates: cart[productId].dates,
         pickup_location: cart[productId].pickup_location,
         return_location: cart[productId].return_location,
         cart: cart
      });
   }

   bookingTheCar = () => {
      let bodyFormData = new FormData();
      const product = this.state.product;

      bodyFormData.append('vehicle_id', product.id);
      bodyFormData.append('dates', this.state.dates);
      bodyFormData.append('pickup_location', this.state.pickup_location);
      bodyFormData.append('return_location', this.state.return_location);
      for (const value of bodyFormData.values()) {
         console.log(value);
      }

      const params = {timestamp: new Date().getTime()};
      axios
         .post(`${process.env.REACT_APP_API_LINK}/v1/order/create/`, bodyFormData, {params: params})
         .then((res) => {
            // when the order is created save it to localStorage
            let order = {details: res['data'], creation_timestamp: Date.now()}
            let cart = this.state.cart;
            cart[this.state.product.id]['order'] = order;
            localStorage.setItem('cart', JSON.stringify(cart));
            this.props.navigate({
               pathname: '/car-booking/'+this.state.product.id,
            });
         })
         .catch((error) => { // error is handled in catch block
            console.log(error);
         });
   }

   onClick = (e) => {
      e.preventDefault();
      this.bookingTheCar();
   };

   render() {
      const {t} = this.props
      const product = this.state.product;
      return (
         <>
            <section className="gauto-car-booking section_70 car-details">
               <Container>
                  <Row>
                     <Col lg={6}>
                        <div className="car-booking-image">
                           <img src={product['thumbnail']} alt="car"/>
                        </div>
                     </Col>
                     <Col lg={6}>
                        <div className="car-booking-right">
                           <p className="rental-tag">{t("rental")}</p>
                           <h3>{product.brand} {product.mark}</h3>
                           <div className="price-rating">
                              <div className="price-rent">
                                 <h4>
                                    {product.price}{product.currency}<span>/ {t("day")}</span>
                                 </h4>
                              </div>
                              <div className="car-rating">
                                 <ul>
                                    <li>
                                       <FaStar/>
                                    </li>
                                    <li>
                                       <FaStar/>
                                    </li>
                                    <li>
                                       <FaStar/>
                                    </li>
                                    <li>
                                       <FaStar/>
                                    </li>
                                    <li>
                                       <FaStarHalfAlt/>
                                    </li>
                                 </ul>
                                 <p>(123 {t("rating")})</p>
                              </div>
                           </div>
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
               <Container>
                  <Row>
                     <div className="action-btn">
                        <Link to="/" onClick={this.onClick} className="gauto-btn">
                           {t("researve_now")}
                        </Link>
                     </div>
                  </Row>
               </Container>
            </section>
         </>
      )
   }
}


export default CarDetails;
