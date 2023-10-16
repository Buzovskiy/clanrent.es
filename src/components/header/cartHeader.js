import React, {useContext} from "react";
import {useTranslation} from "react-i18next";
import {CartContext} from "../Cart/CartContext";

export const CartHeader = (props) => {
   const {t} = useTranslation();
   const cartCount = useContext(CartContext);

   const onClick = () => {
      props.setColor(props.color+1);
   }

   return (
      <>
         {/*{t('current_bookings')} ({cartCount})*/}
         <button onClick={onClick}>Click</button>
      </>
   )
}