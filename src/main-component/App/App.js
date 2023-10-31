import React, {Fragment, useState} from "react";
import AllRoute from "../router";
import {ErrorModalWindowContext} from '../../components/Error/ErrorModalWindowContext'

const App = () => {

   const [showErrorModal, setShowErrorModal] = useState(1);

   return (
      <Fragment>
         <h1>Hello 1: {showErrorModal}</h1>
         <ErrorModalWindowContext.Provider value={{showErrorModal, setShowErrorModal}}>
            <AllRoute/>
         </ErrorModalWindowContext.Provider>
      </Fragment>
   );
};

export default App;
