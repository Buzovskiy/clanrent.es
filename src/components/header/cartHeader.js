import React, {useState, useEffect} from "react";
import {useTranslation} from "react-i18next";
import Cart from "../Cart/utils";

export const CartHeader = (props) => {
   const {t} = useTranslation();

   const [cartCount, setCartCount] = useState(0);

   useEffect(() => {
      setCartCount(new Cart().getNumberOfBookings());
   }, []);

   return (
      <>
         {t('finish_booking')} ({cartCount})
      </>
   )
}