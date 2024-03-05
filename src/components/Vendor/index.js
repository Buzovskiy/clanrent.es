import {useEffect} from "react";
import Cookies from 'js-cookie'
import {useSearchParams} from 'react-router-dom';


const Vendor = () => {
   const [searchParams] = useSearchParams();
   const vendor = searchParams.get('vendor');

   useEffect(() => {
      if (vendor != null) {
         Cookies.set('vendor', vendor, {expires: 30});
      }
   }, [vendor]);

}

export default Vendor;