import React from "react";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import img1 from "../img/temp/48119.jpeg";
import img2 from "../img/temp/48121.jpeg";
import img3 from "../img/temp/48123.jpeg";
import img4 from "../img/temp/48125.jpeg";
import img5 from "../img/temp/48127.jpeg";
import img6 from "../img/temp/48129.jpeg";
import img7 from "../img/temp/52219.jpg";
import img8 from "../img/temp/56577.jpg";

const responsive = {
   superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: {max: 4000, min: 3000},
      items: 5
   },
   desktop: {
      breakpoint: {max: 3000, min: 1024},
      items: 3
   },
   tablet: {
      breakpoint: {max: 1024, min: 464},
      items: 2
   },
   mobile: {
      breakpoint: {max: 464, min: 0},
      items: 1
   }
};


const WithStyles = (props) => {
   return (
      <div><img src={props.image} alt=""/></div>
   )
}


const Slider = () => {

   return (
      <Carousel
         responsive={{
            desktop: {
               breakpoint: {
                  max: 3000,
                  min: 1024
               },
               items: 1,
               partialVisibilityGutter: 40
            },
            mobile: {
               breakpoint: {
                  max: 464,
                  min: 0
               },
               items: 1,
               partialVisibilityGutter: 30,
            },
            tablet: {
               breakpoint: {
                  max: 1024,
                  min: 464
               },
               items: 1,
               partialVisibilityGutter: 30
            }
         }}
         autoPlaySpeed={3000}
         centerMode={true}
         draggable
         focusOnSelect={false}
         infinite
         keyBoardControl
         minimumTouchDrag={80}
         pauseOnHover
         renderArrowsWhenDisabled={false}
         renderButtonGroupOutside={false}
         renderDotsOutside={false}
         rewind={false}
         rewindWithAnimation={false}
         rtl={false}
         shouldResetAutoplay
         showDots={false}
         sliderClass=""
         slidesToSlide={1}
         swipeable
      >
         <WithStyles
            description="React Carousel with Server Side Rendering Support – Part 2"
            headline="w3js.com - web front-end studio"
            image="https://images.unsplash.com/photo-1549989476-69a92fa57c36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
         />
         {/*<WithStyles*/}
         {/*   description="Appending currency sign to a purchase form in your e-commerce site using plain JavaScript."*/}
         {/*   headline="w3js.com - web front-end studio"*/}
         {/*   image="https://images.unsplash.com/photo-1549396535-c11d5c55b9df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"*/}
         {/*/>*/}
         {/*<WithStyles*/}
         {/*   description="React Carousel with Server Side Rendering Support – Part 1"*/}
         {/*   headline="w3js.com - web front-end studio"*/}
         {/*   image="https://images.unsplash.com/photo-1550133730-695473e544be?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"*/}
         {/*/>*/}
         {/*<WithStyles*/}
         {/*   description="Fixing CSS load order/style.chunk.css incorrect in Nextjs"*/}
         {/*   headline="w3js.com - web front-end studio"*/}
         {/*   image="https://images.unsplash.com/photo-1550167164-1b67c2be3973?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"*/}
         {/*/>*/}
         {/*<WithStyles*/}
         {/*   description="Appending currency sign to a purchase form in your e-commerce site using plain JavaScript."*/}
         {/*   headline="w3js.com - web front-end studio"*/}
         {/*   image="https://images.unsplash.com/photo-1550338861-b7cfeaf8ffd8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"*/}
         {/*/>*/}
         {/*<WithStyles*/}
         {/*   description="Fixing CSS load order/style.chunk.css incorrect in Nextjs"*/}
         {/*   headline="w3js.com - web front-end studio"*/}
         {/*   image="https://images.unsplash.com/photo-1550223640-23097fc71cb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"*/}
         {/*/>*/}
         {/*<WithStyles*/}
         {/*   description="Appending currency sign to a purchase form in your e-commerce site using plain JavaScript."*/}
         {/*   headline="w3js.com - web front-end studio"*/}
         {/*   image="https://images.unsplash.com/photo-1550353175-a3611868086b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"*/}
         {/*/>*/}
         {/*<WithStyles*/}
         {/*   description="Fixing CSS load order/style.chunk.css incorrect in Nextjs"*/}
         {/*   headline="w3js.com - web front-end studio"*/}
         {/*   image="https://images.unsplash.com/photo-1550330039-a54e15ed9d33?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"*/}
         {/*/>*/}
         {/*<WithStyles*/}
         {/*   description="React Carousel with Server Side Rendering Support – Part 1"*/}
         {/*   headline="w3js.com - web front-end studio"*/}
         {/*   image="https://images.unsplash.com/photo-1549737328-8b9f3252b927?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"*/}
         {/*/>*/}
         {/*<WithStyles*/}
         {/*   description="Fixing CSS load order/style.chunk.css incorrect in Nextjs"*/}
         {/*   headline="w3js.com - web front-end studio"*/}
         {/*   image="https://images.unsplash.com/photo-1549833284-6a7df91c1f65?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"*/}
         {/*/>*/}
         {/*<WithStyles*/}
         {/*   description="React Carousel with Server Side Rendering Support – Part 2"*/}
         {/*   headline="w3js.com - web front-end studio"*/}
         {/*   image="https://images.unsplash.com/photo-1549985908-597a09ef0a7c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"*/}
         {/*/>*/}
         {/*<WithStyles*/}
         {/*   description="Appending currency sign to a purchase form in your e-commerce site using plain JavaScript."*/}
         {/*   headline="w3js.com - web front-end studio"*/}
         {/*   image="https://images.unsplash.com/photo-1550064824-8f993041ffd3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"*/}
         {/*/>*/}
      </Carousel>


      // <Carousel
      //    additionalTransfrom={0}
      //    arrows
      //    autoPlaySpeed={3000}
      //    centerMode={false}
      //    className=""
      //    containerClass="container-with-dots"
      //    dotListClass=""
      //    draggable
      //    focusOnSelect={false}
      //    infinite
      //    itemClass=""
      //    keyBoardControl
      //    minimumTouchDrag={80}
      //    pauseOnHover
      //    renderArrowsWhenDisabled={false}
      //    renderButtonGroupOutside={false}
      //    renderDotsOutside={false}
      //    responsive={{
      //       desktop: {
      //          breakpoint: {
      //             max: 3000,
      //             min: 1024
      //          },
      //          items: 3,
      //          partialVisibilityGutter: 40
      //       },
      //       mobile: {
      //          breakpoint: {
      //             max: 464,
      //             min: 0
      //          },
      //          items: 1,
      //          partialVisibilityGutter: 30
      //       },
      //       tablet: {
      //          breakpoint: {
      //             max: 1024,
      //             min: 464
      //          },
      //          items: 2,
      //          partialVisibilityGutter: 30
      //       }
      //    }}
      //    rewind={false}
      //    rewindWithAnimation={false}
      //    rtl={false}
      //    shouldResetAutoplay
      //    showDots={false}
      //    sliderClass=""
      //    slidesToSlide={1}
      //    swipeable
      // >
      //    <div><img src={img1} alt=""/></div>
      //    <div><img src={img2} alt=""/></div>
      //    <div><img src={img3} alt=""/></div>
      //    <div><img src={img4} alt=""/></div>
      //    <div><img src={img5} alt=""/></div>
      //    <div><img src={img6} alt=""/></div>
      //    <div><img src={img7} alt=""/></div>
      //    <div><img src={img8} alt=""/></div>
      // </Carousel>
   );
};

export default Slider;
