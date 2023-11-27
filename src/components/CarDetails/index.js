import React, {Component, Fragment} from "react";
import {Container, Row, Col} from "react-bootstrap";
import axios from "axios";
import CarOptions from "./CarOptions";
import Error from "../Error";
import {toggleBgLoader} from "../bgLoader";
import DefaultPlaceholderImg from '../../img/default-placeholder.png'
import ModalWindow from "./modalWindow";
import {showRequestError} from "../Error/requestError";
import ProductSwiper from "./productSwiper";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/zoom';
import 'swiper/css/navigation';


class CarDetails extends Component {
   constructor(props) {
      super(props);

      this.state = {
         product: {
            'thumbnail': DefaultPlaceholderImg,
            'photos': []
         },
         page_404: false,
         show_loader: true,
         modal_show: false,
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
         })
         .catch(error => {
            if (error.response.status === 404) {
               this.setState({page_404: true})
            } else {
               showRequestError(error, this.props.app_context);
            }
         })
         .finally(() => {
            this.setState({show_loader: false}, () => toggleBgLoader(this.state.show_loader));
         })
   }

   onClick = (e) => {
      e.preventDefault();
      this.setState({modal_show: true})
   };

   onHide = () => {
      this.setState({modal_show: false}, () => {
         window.location.href = '/';
      })
   }

   render() {
      const {t} = this.props
      const product = this.state.product;
      if (this.state.page_404) {
         return <Error/>
      }
      return (
         <>
            <section className="gauto-car-booking car-details">
               <Container>
                  <Row>
                     <Col>
                        <div className="car-booking-right">
                           <h3>{product.brand} {product.mark}</h3>
                           <p className="rental-tag">{t("rental")}</p>
                           <div className="price-rating">
                              <div className="price-rent">
                                 <h4>
                                    {product.price}{product.currency}<span>/ {t("day")}</span>
                                 </h4>
                              </div>
                           </div>
                        </div>
                     </Col>
                  </Row>
                  <Row>
                     <Col className='product-swiper-wrapper'>
                        <ProductSwiper product={this.state.product}/>
                     </Col>
                  </Row>
                  <Row>
                     <Col>
                        <div className="car-booking-right">

                        </div>
                     </Col>
                  </Row>
                  <Row>
                     <Col lg={12}>
                        <div className="car-booking-right">
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
                        <a className="gauto-btn" onClick={this.onClick} href="/">{t("researve_now")}</a>
                     </div>
                  </Row>
               </Container>
            </section>
            <ModalWindow show={this.state.modal_show} onHide={this.onHide}/>
         </>
      )
   }
}


export default CarDetails;
