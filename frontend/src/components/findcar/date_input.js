import React from "react";
import {formatDateToAPIStandard} from '../../main-component/utils'

import button from "bootstrap/js/src/button";
import {
   MdEditCalendar
} from "react-icons/md"


class CustomDateInput extends React.Component {
   render() {
      const label = this.props.t(this.props.input_name);
      const date = this.props.date instanceof Date ? formatDateToAPIStandard(this.props.date) : '';
      return (
         <>
            <div className="custom-date-input" onClick={this.props.onClick}>
               <span className='date-icon'><MdEditCalendar/></span>
               <span className='date-label'>{label}</span>
               <input
                  type="text"
                  placeholder='yyyy-mm-dd    --:--'
                  readOnly='readonly'
                  className='date-value'
                  value={date}
               />

            </div>
            <button
               type="button"
               className="react-datepicker__close-icon"
               aria-label="Close"
               tabIndex="-1"
            >
            </button>
         </>
      )
   }
}

export default CustomDateInput;