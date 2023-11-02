import React, {Fragment, useState} from "react";
import AllRoute from "../router";
import {ErrorModalWindowContext} from '../../components/Error/ErrorModalWindowContext'

const App = () => {

   const [showModalError, setShowModalError] = useState(false);
   const [modalErrorContent, setModalErrorContent] = useState('');
   const prov_value = {
      showModalErrorValue: [showModalError, setShowModalError],
      modalErrorContentValue: [modalErrorContent, setModalErrorContent],
   }

   return (
      <Fragment>
         <ErrorModalWindowContext.Provider value={{...prov_value}}>
            <AllRoute/>
         </ErrorModalWindowContext.Provider>
      </Fragment>
   );
};

export default App;
