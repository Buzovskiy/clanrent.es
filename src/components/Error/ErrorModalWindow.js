import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {useContext} from "react";
import {ErrorModalWindowContext} from "./ErrorModalWindowContext";

function ErrorModalWindow() {

   const {showModalErrorValue, modalErrorContentValue} = useContext(ErrorModalWindowContext);
   const [showModalError, setShowModalError] = showModalErrorValue;
   const [modalErrorContent] = modalErrorContentValue;

   return (
      <Modal
         show={showModalError}
         onHide={() => setShowModalError(false)}
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
            {modalErrorContent}
         </Modal.Body>
         <Modal.Footer>
            <Button onClick={() => setShowModalError(false)}>Close</Button>
         </Modal.Footer>
      </Modal>
   );
}

export default ErrorModalWindow;