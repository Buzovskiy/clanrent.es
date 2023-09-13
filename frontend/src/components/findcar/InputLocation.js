import React from "react"
import {useTranslation} from "react-i18next";
import Autocomplete from "react-google-autocomplete";


const InputLocation = (props) => {
   const {t} = useTranslation();
   const placeholder = props.location === 'pickup_location' ? t("from_address"): t("to_address");
   if (Object.keys(props.settings).length === 0) {
      return <input type="text" placeholder={placeholder}/>
   }
   return (
      <Autocomplete
         apiKey={props.settings.maps_key}
         onPlaceSelected={(place) => props.onInputLocationChange(place, props.location)}
         options={{
            componentRestrictions: {
               country: ['es']
            },
            types: [],
         }}
         placeholder={placeholder}
      />
   )
}

export {InputLocation};


// class InputPickupLocation extends React.Component {
//    render() {
//       console.log(this.props.settings);
//       if (Object.keys(this.props.settings))
//          return (
//             <input type="text" placeholder='hello'/>
//          )
//    }
// }