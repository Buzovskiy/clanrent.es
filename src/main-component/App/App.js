import React, {Fragment, useState} from "react";
import AllRoute from "../router";
import {AppContext} from "../../components/AppContext";

const App = () => {

   const [showModalError, setShowModalError] = useState(false);
   const [modalErrorContent, setModalErrorContent] = useState('');
   const prov_value = {
      modalErrorKey: [showModalError, setShowModalError],
      modalErrorContentKey: [modalErrorContent, setModalErrorContent],
   }

   return (
      <Fragment>
         <AppContext.Provider value={{...prov_value}}>
            <AllRoute/>
         </AppContext.Provider>
      </Fragment>
   );
};

export default App;
