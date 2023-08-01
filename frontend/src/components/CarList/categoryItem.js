import {Link} from "react-router-dom";
import {FaCar, FaCogs} from "react-icons/fa";
import {Col} from "react-bootstrap";
import React from "react";
import {useTranslation} from "react-i18next";

export const CategoryItem = (item) => {
   const {t} = useTranslation();
   return (
      <div className="single-offers">
         {/*<div className="offer-image">*/}
         {/*   <Link to="/car-booking">*/}
         {/*      <img src={item.thumbnail} alt="offer 1"/>*/}
         {/*   </Link>*/}
         {/*</div>*/}
         {/*<div className="offer-text">*/}
         {/*   <Link to="/car-booking">*/}
         {/*      <h3>{item.brand} {item.mark}</h3>*/}
         {/*   </Link>*/}
         {/*   <h4>*/}
         {/*      {item.price}{item.currency}<span>/ {t("day")}</span>*/}
         {/*   </h4>*/}
         {/*   <ul>*/}
         {/*      <li>*/}
         {/*         <FaCar/>*/}
         {/*         {t("model")}: {item.year}*/}
         {/*      </li>*/}
         {/*      <li>*/}
         {/*         <FaCogs/>*/}
         {/*         {item.transmission}*/}
         {/*      </li>*/}
         {/*      /!*<li>*!/*/}
         {/*      /!*   <FaTachometerAlt/>*!/*/}
         {/*      /!*   20kmpl*!/*/}
         {/*      /!*</li>*!/*/}
         {/*   </ul>*/}
         {/*   <div className="offer-action">*/}
         {/*      <a href="/car-booking" data-url='/car-booking' data-id={item.id}*/}
         {/*         onClick={this.clickProduct} onContextMenu={this.clickProduct}>*/}
         {/*         {t("rent_car")}*/}
         {/*      </a>*/}
         {/*   </div>*/}
         {/*</div>*/}
      </div>
   )
}