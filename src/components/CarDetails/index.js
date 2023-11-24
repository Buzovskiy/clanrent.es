import React, {Component} from "react";
import {Container, Row, Col} from "react-bootstrap";
import axios from "axios";
import {Swiper, SwiperSlide} from 'swiper/react';
import {Keyboard, Pagination, Navigation, Zoom} from 'swiper/modules';
import CarOptions from "./CarOptions";
import Error from "../Error";
import {toggleBgLoader} from "../bgLoader";
import DefaultPlaceholderImg from '../../img/default-placeholder.png'
import ModalWindow from "./modalWindow";
import {showRequestError} from "../Error/requestError";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/zoom';
import 'swiper/css/navigation';


import img1 from "../../img/temp/48119.jpeg";
import img2 from "../../img/temp/48121.jpeg";
import img3 from "../../img/temp/48123.jpeg";
import img4 from "../../img/temp/48125.jpeg";
import img5 from "../../img/temp/48127.jpeg";
import img6 from "../../img/temp/48129.jpeg";
import img7 from "../../img/temp/52219.jpg";


const swiper_config = {
   slidesPerView: 2,
   grabCursor: true,
   spaceBetween: 30,
   centeredSlides: true,
   zoom: true,
   keyboard: {enabled: true},
   pagination: {clickable: true},
   navigation: true,
   modules: [Keyboard, Pagination, Navigation, Zoom],
   className: "mySwiper",
   breakpoints: {
      1024: {
         slidesPerView: 2,
         spaceBetween: 20,
      },
   }
}


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
            <section className="gauto-car-booking section_70 car-details">
               <Container>
                  <Row>
                     <Col>
                        <div className="car-booking-right">
                           <p className="rental-tag">{t("rental")}</p>
                           <h3>{product.brand} {product.mark}</h3>
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
                     <Col>
                        <Swiper
                           slidesPerView={2}
                           grabCursor={true}
                           spaceBetween={30}
                           centeredSlides={true}
                           zoom={true}
                           keyboard={{
                              enabled: true,
                           }}
                           pagination={{
                              clickable: true,
                           }}
                           navigation={true}
                           modules={[Keyboard, Pagination, Navigation, Zoom]}
                           className="mySwiper"
                           // breakpoints={breakpoints}
                        >
                           {/*<CarouselImages product={product}/>*/}
                           <SwiperSlide>
                              <div className="swiper-zoom-container"><img src={img1} alt=""/></div>
                           </SwiperSlide>
                           <SwiperSlide>
                              <div className="swiper-zoom-container"><img src={img2} alt=""/></div>
                           </SwiperSlide>
                           <SwiperSlide>
                              <div className="swiper-zoom-container"><img src={img3} alt=""/></div>
                           </SwiperSlide>
                           <SwiperSlide>
                              <div className="swiper-zoom-container"><img src={img4} alt=""/></div>
                           </SwiperSlide>
                           <SwiperSlide>
                              <div className="swiper-zoom-container"><img src={img5} alt=""/></div>
                           </SwiperSlide>
                           <SwiperSlide>
                              <div className="swiper-zoom-container"><img src={img6} alt=""/></div>
                           </SwiperSlide>
                           <SwiperSlide>
                              <div className="swiper-zoom-container"><img src={img7} alt=""/></div>
                           </SwiperSlide>
                        </Swiper>
                     </Col>
                  </Row>
                  <Row>
                     <Col lg={6}>
                        <div className="car-booking-right">
                           <h3>{product.brand} {product.mark}</h3>

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

const CarouselImages = (props) => {
   return props.product['photos'].map((photo, key) => (
      <SwiperSlide key={key}>
         <div className="swiper-zoom-container"><img src={photo} alt=""/></div>
      </SwiperSlide>
   ))
}


export default CarDetails;
