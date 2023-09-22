import React from "react"
import Autocomplete from "react-google-autocomplete";


const InputLocation = (props) => {
   if (Object.keys(props.settings).length === 0) {
      return <input type="text" placeholder={props.placeholder}/>
   }
   return (
      <Autocomplete
         apiKey={props.settings.maps_key}
         onPlaceSelected={(place) => props.onPlaceSelected(place, props.input_name)}
         options={{
            componentRestrictions: {
               country: ['es']
            },
            types: [],
         }}
         placeholder={props.placeholder}
         className={props.css_class}
         onChange={props.onPlaceChange}
         name={props.input_name}
      />
   )
}

export {InputLocation};