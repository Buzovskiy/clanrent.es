import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

import Homepage from "../HomePage";
import AboutPage from "../AboutPage";
import ServicePage from "../ServicePage";
import ServiceSingle from "../ServiceDetails";
import CarListingPage from "../CarListingPage";
import CarBookingPage from "../CarBookingPage";
import CarBookingPageIframe from "../CarBookingPageIframe";
import GalleryPage from "../GalleryPage";
import ProductPage from "../ProductPage";
import ProductSinglePage from "../ProductSingle";
import CartPage from "../CartPage";
import Checkout from "../Checkout";
import BlogPage from "../BlogPage";
import BlogSinglePage from "../BlogSinglePage";
import ErrorPage from "../ErrorPage";
import LoginPage from "../LoginPage";
import RegisterPage from "../RegisterPage";
import ContactPage from "../ContactPage";
import ScrollToTop from "../../components/ScrollToTop";
import CarDetailsPage from "../CarDetailsPage";
import PrivacyPage from "../PagesPage/privacyPage";
import TermsAndConditionsPage from "../PagesPage/termsAndConditionsPage";
import FinishBookingPage from "../FinishBooking";
import CookieAccept from "../../components/CookieAccept";
import ErrorModalWindow from "../../components/Error/ErrorModalWindow";
import SimpleSlider from "../../components/slider";


const AllRoute = () => {

   return (
      <div className='all-pages-wrapper'>
         <Router>
            <Routes>
               <Route exact path="/" element={<Homepage/>}/>
               <Route path="/home" element={<Homepage/>}/>
               <Route path="/about" element={<AboutPage/>}/>
               <Route path="/service" element={<ServicePage/>}/>
               <Route path="/service-single" element={<ServiceSingle/>}/>
               <Route path="/car-listing" element={<CarListingPage/>}/>
               <Route path="/car-booking/:productId" element={<CarBookingPage/>}/>
               <Route path="/car-booking-iframe" element={<CarBookingPageIframe/>}/>
               <Route path="/gallery" element={<GalleryPage/>}/>
               <Route path="/product" element={<ProductPage/>}/>
               <Route path="/product-single" element={<ProductSinglePage/>}/>
               <Route path="/cart" element={<CartPage/>}/>
               <Route path="/checkout" element={<Checkout/>}/>
               <Route path="/blog" element={<BlogPage/>}/>
               <Route path="/blog-single" element={<BlogSinglePage/>}/>
               <Route path="/error" element={<ErrorPage/>}/>
               <Route path="/login" element={<LoginPage/>}/>
               <Route path="/register" element={<RegisterPage/>}/>
               <Route path="/contact" element={<ContactPage/>}/>
               <Route path="/product-details/:productId" element={<CarDetailsPage />}/>
               <Route path="/privacy-policy" element={<PrivacyPage />}/>
               <Route path="/terms-and-conditions" element={<TermsAndConditionsPage />}/>
               <Route path="/finish-booking" element={<FinishBookingPage/>}/>
               <Route path="*" element={<ErrorPage/>}/>
               <Route path="/slider" element={<SimpleSlider/>}/>
            </Routes>
            <ScrollToTop/>
            <CookieAccept/>
            <ErrorModalWindow />
         </Router>
      </div>
   );
};

export default AllRoute;
