import axios from "axios";
import Timer from "../components/CarBooking/timer";
import React from "react";

/**
 *
 * @param arr - array with arrays inside
 * @param num_cols - number of elements in arrays
 * @param inst - item that we push to array
 * @returns array
 */
const makeTwoDimensionalArr = function (arr, num_cols, inst) {
   if (arr.length === 0) arr.push([]);
   if (arr[arr.length - 1].length === num_cols) arr.push([]);
   arr[arr.length - 1].push(inst);
   return arr;
}


/**
 * Function that returns remaining time between time start and time end
 * @param start time in milliseconds
 * @param end time in milliseconds
 * @returns {{total: number, hours: number, seconds: number, minutes: number}}
 */
const getTimeRemaining = (start, end) => {
   const total = end - start;
   const seconds = Math.floor((total / 1000) % 60);
   const minutes = Math.floor((total / 1000 / 60) % 60);
   const hours = Math.floor((total / 1000 / 60 / 60) % 24);
   return {
      total, hours, minutes, seconds
   };
}


const getTimeRemainingString = (start, end, hr=':', min=':', sec='') => {
   let {hours, minutes, seconds} = getTimeRemaining(start, end);
   if (seconds < 0){
      return `00${hr}00${sec}`;
   }
   let time_str = '';
   time_str = hours > 0 ? `${time_str}${hours}${hr}`: time_str;
   // add leading zero to minutes and seconds
   minutes = minutes < 10 ? '0'+minutes: minutes;
   seconds = seconds < 10 ? '0'+seconds: seconds;
   time_str = `${time_str}${minutes}${min}`;
   time_str = `${time_str}${seconds}${sec}`;
   return time_str;
}

// const cleanCart = () => {
//       axios
//          .get(`${process.env.REACT_APP_API_LINK}/v1/company/settings/`)
//          .then((res) => {
//             this.setState({settings: res.data});
//             let time_end = order.creation_timestamp + res.data.time_for_booking * 1000;
//             this.setState({time_end: time_end});
//             let timer = <Timer time_end={time_end} t={this.props.t}/>
//             this.setState({timer: timer});
//          })
//       .catch((error) => console.log(error));
// }

export {getTimeRemaining, getTimeRemainingString}
export default makeTwoDimensionalArr;