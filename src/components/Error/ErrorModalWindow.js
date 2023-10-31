import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {useContext, useState} from 'react';
import {ErrorModalWindowContext} from './ErrorModalWindowContext'


function ErrorModalWindow(props) {

   // const [show, setShow] = useState(useContext(ErrorModalWindowContext));

   return (
      <Modal
         {...props}
         size="lg"
         aria-labelledby="contained-modal-title-vcenter"
         centered
      >
         <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
               Error
            </Modal.Title>
         </Modal.Header>
         <Modal.Body>
            Error body
         </Modal.Body>
         <Modal.Footer>
            {/*<Button onClick={() => setShow(false)}>Select dates</Button>*/}
            {/*<ErrorModalWindowContext.Provider value={show}></ErrorModalWindowContext.Provider>*/}
         </Modal.Footer>
      </Modal>
   );
}

export default ErrorModalWindow;