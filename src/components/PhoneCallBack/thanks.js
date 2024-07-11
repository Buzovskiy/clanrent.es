// import React, {useState} from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


const Thanks = (props) => {

   return (
      <>
         <Modal show={props.showThanks} onHide={props.handleCloseThanks}>
            <Modal.Header closeButton>
               <Modal.Title>Thank you</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <h4 className="text-center">
                  Our manager will contact you soon
               </h4>
            </Modal.Body>
            <Modal.Footer>
               <Button variant="secondary" onClick={props.handleCloseThanks}>
                  Close
               </Button>
            </Modal.Footer>
         </Modal>
      </>
   );
};

export default Thanks;
