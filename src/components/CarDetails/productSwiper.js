import {Swiper, SwiperSlide} from "swiper/react";
import React from "react";
import {Keyboard, Navigation, Pagination, Zoom} from "swiper/modules";


const swiper_config = {
   slidesPerView: 1,
   grabCursor: true,
   spaceBetween: 30,
   centeredSlides: true,
   zoom: true,
   loop: true,
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

const ProductSwiper = (props) => {
   const photos = props.product['photos'];
   return (
      <Swiper {...swiper_config}>
         {photos.map((photo, index) => (
            <SwiperSlide key={index}>
               <div className="swiper-zoom-container"><img src={photo} alt=""/></div>
            </SwiperSlide>
         ))}
      </Swiper>
   )
}

export default ProductSwiper;