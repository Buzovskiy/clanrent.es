import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


function ModalWindow(props) {
   return (
      <Modal
         {...props}
         size="lg"
         aria-labelledby="contained-modal-title-vcenter"
         centered
      >
         <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
               Message
            </Modal.Title>
         </Modal.Header>
         <Modal.Body>
            <p>
               To make a reservation you must first select dates.
            </p>
         </Modal.Body>
         <Modal.Footer>
            <Button onClick={props.onHide}>Select dates</Button>
         </Modal.Footer>
      </Modal>
   );
}

export default ModalWindow;