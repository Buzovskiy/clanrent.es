import React from "react";
import {useTranslation} from "react-i18next";

import button from "bootstrap/js/src/button";
import {
   MdEditCalendar
} from "react-icons/md"


class CustomDateInput extends React.Component {
   render() {
      const label = this.props.t(this.props.type);
      return (
         <div className="custom-date-input" onClick={this.props.onClick}>
            <span className='date-icon'><MdEditCalendar/></span>
            <span className='date-label'>{label}</span>
            <span className='date-value'>{this.props.value}</span>
         </div>
      )
   }
}

// const CustomDateInput = (props) => {
//    const {t} = useTranslation();
//    return (
//       <div className="custom-date-input" onClick={props.onClick}>
//          <span className='date-icon'><MdEditCalendar /></span>
//          <span className='date-label'>{t("rental_start_date")}</span>
//          <span className='date-value'>{props.value}</span>
//       </div>
//       // <button>{props.value}</button>
//    )
// }

export default CustomDateInput;