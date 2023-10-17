import React, {useState, useEffect} from "react";
import {useTranslation} from "react-i18next";
import axios from "axios";
import Cart from "../Cart/utils";

export const CartHeader = (props) => {
   const {t} = useTranslation();

   const [cartCount, setCartCount] = useState(0);
   new Cart().removeOldBookings(300);

   useEffect(() => {
      const params = {timestamp: new Date().getTime()};
      axios
         .get(`${process.env.REACT_APP_API_LINK}/v1/company/settings/`, {params: params})
         .then((res) => {
            // this.setState({settings: res.data},
            //    () => this.setDefaultFieldValues());
            setCartCount(2);
         })
         .catch((error) => console.log(error));
   }, []);

   return (
      <>
         {t('current_bookings')} ({cartCount})
      </>
   )
}