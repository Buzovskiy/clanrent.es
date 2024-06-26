import {getTimeRemainingString} from "../../main-component/utils";

import React, {useState, useRef, useEffect} from 'react'
import {useTranslation} from "react-i18next";
import Cart from '../Cart/utils'

const Timer = (props) => {
   const {t} = useTranslation();
   // The state for our timer
   const [timer, setTimer] = useState('00:00');
   const startTimer = () => {
      if (Date.now() > props.booking_info.expiration_timestamp){
         new Cart().deleteBooking(props.booking_info.details['vehicle_id']);
         window.location.href = '/';
      }
      const time = getTimeRemainingString(Date.now(), props.booking_info.expiration_timestamp);
      setTimer(time);
   }

   const clearTimer = () => {
      const id = setInterval(() => {
         startTimer();
      }, 1000)
   }

   // We can use useEffect so that when the component
   // mount the timer will start as soon as possible

   // We put empty array to act as componentDid
   // mount only
   useEffect(() => {
      clearTimer();
   }, []);

   return (
      <>{t("time_left")}: {timer}</>
   )
}

export default Timer;

// class Timer extends React.Component {
//    constructor(props) {
//       super(props);
//       this.state = {
//          value: getTimeRemainingString(Date.now(), this.props.time_end)
//       };
//
//       this.intervalRef = React.createRef();
//    }
//
//    componentDidMount() {
//
//       this.intervalRef.current = setInterval(() => {
//          this.setState((prevState) => ({
//             value: getTimeRemainingString(Date.now(), this.props.time_end)
//          }));
//       }, 1000);
//    }
//
//    componentWillUnmount() {
//       this.stopTimer();
//    }
//
//    stopTimer = () => {
//       clearInterval(this.intervalRef.current);
//    };
//
//    render() {
//       const {t} = this.props;
//       return (
//          <>
//             {t("time_left")}: {this.state.value}
//          </>
//       );
//    }
// }
//
// export default Timer;
