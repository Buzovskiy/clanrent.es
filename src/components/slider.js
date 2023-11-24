import React from "react";
import {Swiper, SwiperSlide} from 'swiper/react';
import {Keyboard, Pagination, Navigation, Zoom} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/zoom';
import 'swiper/css/navigation';


import img1 from "../img/temp/48119.jpeg";
import img2 from "../img/temp/48121.jpeg";
import img3 from "../img/temp/48123.jpeg";
import img4 from "../img/temp/48125.jpeg";
import img5 from "../img/temp/48127.jpeg";
import img6 from "../img/temp/48129.jpeg";
import img7 from "../img/temp/52219.jpg";


const SimpleSlider = () => {
   const breakpoints = {
      640: {
         slidesPerView: 2,
         spaceBetween: 20,
      },
      768: {
         slidesPerView: 4,
         spaceBetween: 40,
      },
      // 1024: {
      //   slidesPerView: 5,
      //   spaceBetween: 50,
      // },
   };
   return (
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
         <SwiperSlide ><div className="swiper-zoom-container"><img src={img1} alt=""/></div></SwiperSlide>
         <SwiperSlide ><div className="swiper-zoom-container"><img src={img2} alt=""/></div></SwiperSlide>
         <SwiperSlide ><div className="swiper-zoom-container"><img src={img3} alt=""/></div></SwiperSlide>
         <SwiperSlide ><div className="swiper-zoom-container"><img src={img4} alt=""/></div></SwiperSlide>
         <SwiperSlide ><div className="swiper-zoom-container"><img src={img5} alt=""/></div></SwiperSlide>
         <SwiperSlide ><div className="swiper-zoom-container"><img src={img6} alt=""/></div></SwiperSlide>
         <SwiperSlide ><div className="swiper-zoom-container"><img src={img7} alt=""/></div></SwiperSlide>
      </Swiper>
   )
      ;
}

export default SimpleSlider