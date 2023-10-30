import React from "react";
import {useTranslation} from "react-i18next";


const BookingTotal = (props) => {
   const {t} = useTranslation();
   let delivery_data = [{title: 'Delivery price', price: '0.00'}, {title: 'Return price', price: '0.00'}];
   if (props.delivery_data && props.delivery_data.length){
      delivery_data = props.delivery_data;
   }

   const Delivery = () => {
      return delivery_data.map((item, key) => (
         <div key={key} className='price-details-item'>
            <span>{item.title}</span>
            <span>{props.currency}{item.price}</span>
         </div>
      ))
   }

   return (
      <div className='booking-details-wrapper'>
         <h3>{t("booking_total")}</h3>
         <div className="booking-total clearfix">
            <Delivery/>
            <div className='price-details-item'>
               <span>Rental price</span>
               <span>{props.currency}{props.rental_price}</span>
            </div>
            <div className='price-details-item total'>
               <span>Total Price For {props.count_days} Days</span>
               <span>{props.currency}{props.total_price}</span>
            </div>
         </div>
      </div>
   )
}

export default BookingTotal;