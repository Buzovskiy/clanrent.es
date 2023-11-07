/**
 * Function that shows modal window with error
 * @param error {object} - error parameter in axios
 * @param app_context - return of useContext hook
 */
const showRequestError = (error, app_context) => {
   const {modalErrorKey, modalErrorContentKey} = app_context
   const setShowModalError = modalErrorKey[1];
   const setModalErrorContent = modalErrorContentKey[1]
   setShowModalError(true);
   const errorMessageProps = {}
   errorMessageProps['code'] = Object.hasOwn(error, 'code') ? error.code : '';
   errorMessageProps['message'] = Object.hasOwn(error, 'message') ? error.message : '';
   errorMessageProps['name'] = Object.hasOwn(error, 'name') ? error.name : '';
   if (Object.hasOwn(error, 'response') && Object.hasOwn(error.response, 'status')) {
      errorMessageProps['response_status'] = error.response.status;
   } else {
      errorMessageProps['response_status'] = '';
   }

   if (Object.hasOwn(error, 'config') && Object.hasOwn(error.config, 'url')) {
      errorMessageProps['request'] = error.config.url;
   } else {
      errorMessageProps['request'] = '';
   }

   setModalErrorContent(<ErrorMessage {...errorMessageProps}/>);
}

const ErrorMessage = (props) => {
   return (
      <div>
         <p>{props.code}</p>
         <p>{props.message}</p>
         <p>{props.name}</p>
         <p>{props.response_status}</p>
         <p>{`Error occurred during the request ${props.request}`}</p>
      </div>
   )
}

export {showRequestError};