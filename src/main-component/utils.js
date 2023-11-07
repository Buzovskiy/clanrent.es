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


const getTimeRemainingString = (start, end, hr = ':', min = ':', sec = '') => {
   let {hours, minutes, seconds} = getTimeRemaining(start, end);
   if (seconds < 0) {
      return `00${hr}00${sec}`;
   }
   let time_str = '';
   time_str = hours > 0 ? `${time_str}${hours}${hr}` : time_str;
   // add leading zero to minutes and seconds
   minutes = minutes < 10 ? '0' + minutes : minutes;
   seconds = seconds < 10 ? '0' + seconds : seconds;
   time_str = `${time_str}${minutes}${min}`;
   time_str = `${time_str}${seconds}${sec}`;
   return time_str;
}

const cleanCart = () => {
   console.log('clean cart');
}

/**
 * Excepts js Date object and returns string date
 * formatted by template YYYY:MM:DD hh:mm
 * @param {object} date
 * @returns {string} formatted date string
 */
const formatDateToAPIStandard = (date) => {
   const year = date.getFullYear();

   const month_raw = date.getMonth() + 1;
   const month = month_raw < 10 ? '0' + month_raw : month_raw;

   const day_raw = date.getDate();
   const day = day_raw < 10 ? '0' + day_raw : day_raw;

   const hour_raw = date.getHours();
   const hour = hour_raw < 10 ? '0' + hour_raw : hour_raw;

   const minute_raw = date.getMinutes();
   const minute = minute_raw < 10 ? '0' + minute_raw : minute_raw;

   return `${year}-${month}-${day} ${hour}:${minute}`;
}

/**
 * Excepts js Date objects and returns string date
 * formatted by template YYYY:MM:DD hh:mm - YYYY:MM:DD hh:mm
 * @param {object} date_start
 * @param {object} date_end
 * @returns {string} formatted date string
 */
const formatDateRangeToAPIStandard = (date_start, date_end) => {
   const formatted_date_start = formatDateToAPIStandard(date_start);
   const formatted_date_end = formatDateToAPIStandard(date_end);
   return formatted_date_start + ' - ' + formatted_date_end;
}

export {
   getTimeRemaining,
   getTimeRemainingString,
   cleanCart,
   formatDateRangeToAPIStandard,
   formatDateToAPIStandard
}
export default makeTwoDimensionalArr;