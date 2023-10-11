import React, {Component} from "react";
import {Link} from "react-router-dom";
import {Container, Row, Col} from "react-bootstrap";
import CarOptions from "./CarOptions";
import {
   FaStar,
   FaStarHalfAlt,
} from "react-icons/fa";
import Error from "../Error";
import {toggleBgLoader} from "../bgLoader";
import DefaultPlaceholderImg from '../../img/default-placeholder.png'


import axios from "axios";

class CarDetails extends Component {
   constructor(props) {
      super(props);

      this.state = {
         product: {
            'thumbnail': DefaultPlaceholderImg
         },
         page_404: false,
         show_loader: true
      }
   }

   componentDidMount() {
      toggleBgLoader(this.state.show_loader);
      const {productId} = this.props.useParams;
      const params = {timestamp: new Date().getTime()};
      axios
         .get(`${process.env.REACT_APP_API_LINK}/v1/product/get_vehicle/${productId}/`, {params: params})
         .then((res) => {
            this.setState({product: res.data});
            this.setState({show_loader: false}, () => toggleBgLoader(this.state.show_loader));
         })
         .catch(error => {
            if (error.response.status === 404) {
               this.setState({page_404: true})
            }
         })
   }

   onClick = (e) => {
      e.preventDefault();
   };

   render() {
      const {t} = this.props
      const product = this.state.product;
      if (this.state.page_404) {
         return <Error/>
      }
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
                                    <CarOptions options={product.options} />
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
                        <a className="gauto-btn" href="/">{t("researve_now")}</a>
                     </div>
                  </Row>
               </Container>
            </section>
         </>
      )
   }
}


export default CarDetails;
