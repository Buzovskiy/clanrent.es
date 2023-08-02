import {Link} from "react-router-dom";
import {FaCar, FaCogs} from "react-icons/fa";
import React from "react";

export const CategoryItem = (props) => {
   const {t, item, clickProduct} = props
   return (
      <div className="single-offers" data-url='/car-booking' data-id={item.id}>
         <div className="offer-image">
            <a href="#"
               onClick={clickProduct} onContextMenu={clickProduct}>
               <img src={item.thumbnail} alt="offer 1"/>
            </a>
         </div>
         <div className="offer-text">
            <a href="#"
               onClick={clickProduct} onContextMenu={clickProduct}>
               <h3>{item.brand} {item.mark}</h3>
            </a>
            <h4>
               {item.price}{item.currency}<span>/ {t("day")}</span>
            </h4>
            <ul>
               <li>
                  <FaCar/>
                  {t("model")}: {item.year}
               </li>
               <li>
                  <FaCogs/>
                  {item.transmission}
               </li>
               {/*<li>*/}
               {/*   <FaTachometerAlt/>*/}
               {/*   20kmpl*/}
               {/*</li>*/}
            </ul>
            <div className="offer-action">
               <a href="#"
                  onClick={clickProduct} onContextMenu={clickProduct}>
                  {t("rent_car")}
               </a>
            </div>
         </div>
      </div>
   )
}