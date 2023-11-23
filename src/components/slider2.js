import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import img1 from "../img/temp/48119.jpeg";
import img2 from "../img/temp/48121.jpeg";
import img3 from "../img/temp/48123.jpeg";
import img4 from "../img/temp/48125.jpeg";
import img5 from "../img/temp/48127.jpeg";
import img6 from "../img/temp/48129.jpeg";
import img7 from "../img/temp/52219.jpg";


const SimpleSlider = () => {
   const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      rows: 1,
      // centerMode: true,
   };
   return (
      <Slider {...settings}>
         <div><img src={img1} alt=""/></div>
         {/*<div><img src={img2} alt=""/></div>*/}
         {/*<div><img src={img3} alt=""/></div>*/}
         {/*<div><img src={img4} alt=""/></div>*/}
         {/*<div><img src={img5} alt=""/></div>*/}
         {/*<div><img src={img6} alt=""/></div>*/}
         {/*<div><img src={img7} alt=""/></div>*/}
      </Slider>
   );
}

export default SimpleSlider