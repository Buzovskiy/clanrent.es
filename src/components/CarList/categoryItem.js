import {FaCar, FaCogs} from "react-icons/fa";
import React, {useEffect, useState} from "react";

export const CategoryItem = (props) => {
   const {t, item, clickProduct} = props
   const external_id = 'external_id' in item ? item.external_id: item.id
   const [productUrl, setProductUrl] = useState(`/product-details/${external_id}`)
   useEffect(() => {
      if (props.module === 'FinishBooking'){
         setProductUrl(`/car-booking/${external_id}`);
      }
   }, []);

   return (
      <div className="single-offers" data-url={productUrl} data-id={external_id}>
         <div className="offer-image">
            <a href={productUrl}
               onClick={clickProduct} onContextMenu={clickProduct}>
               <img src={'image_thumbnail_url' in item ? item.image_thumbnail_url: item.image_thumbnail_url} alt="offer 1"/>
            </a>
         </div>
         <div className="offer-text">
            <a href={productUrl}
               onClick={clickProduct} onContextMenu={clickProduct}>
               <h3>{item.brand} {item.mark}</h3>
            </a>
            <h4>
               {item['price']}{item.currency}<span>/ {t("day")}</span>
            </h4>
            <ul>
               <li>
                  <FaCar/>
                  {t("model")}: {item.year}
               </li>
               <li>
                  <FaCogs/>
                  {item['transmission']}
               </li>
            </ul>
            <div className="offer-action">
               <a href={productUrl}
                  onClick={clickProduct} onContextMenu={clickProduct}>
                  {props.button_title ? props.button_title : t("rent_car")}
               </a>
            </div>
         </div>
      </div>
   )
}