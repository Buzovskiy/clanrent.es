import React from "react"
import {useTranslation} from "react-i18next";
import Autocomplete from "react-google-autocomplete";


const InputLocation = (props) => {
   const {t} = useTranslation();
   if (Object.keys(props.settings).length === 0) {
      return <input type="text" placeholder={props.placeholder}/>
   }
   return (
      <Autocomplete
         apiKey={props.settings.maps_key}
         onPlaceSelected={(place) => props.onInputLocationChange(place, props.input_name)}
         options={{
            componentRestrictions: {
               country: ['es']
            },
            types: [],
         }}
         placeholder={props.placeholder}
         className={props.css_class}
         onChange={props.onInputPlaceChange}
         name={props.input_name}
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