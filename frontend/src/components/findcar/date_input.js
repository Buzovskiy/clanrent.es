import React from "react";
import {useTranslation} from "react-i18next";

import button from "bootstrap/js/src/button";
import {
   MdEditCalendar
} from "react-icons/md"


class CustomDateInput extends React.Component {
   render() {
      const label = this.props.t(this.props.input_name);
      return (
         <div className="custom-date-input" onClick={this.props.onClick}>
            <span className='date-icon'><MdEditCalendar/></span>
            <span className='date-label'>{label}</span>
            <input
               type="text"
               // placeholder='YYYY-MM-DD hh-mm'
               placeholder='YYYY-MM-DD hh-mm'
               readOnly='readonly'
               className='date-value'
               value={this.props.value}/>
            {/*<span className='date-value'>{this.props.value}</span>*/}
         </div>
      )
   }
}

export default CustomDateInput;