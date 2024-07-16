import React, {useContext, useState} from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'
import {AppContext} from "../AppContext";
import Thanks from "./thanks";

import "./callback.css";


const PhoneCallBack = () => {
   const {modalPhoneCallBack} = useContext(AppContext);
   const [showModalPhoneCallBack, setModalPhoneCallBack] = modalPhoneCallBack;
   const [showThanks, setShowThanks] = useState(false);
   const [phoneNumber, setPhoneNumber] = useState("");
   const [validated, setValidated] = useState(true);

   const handleClose = () => setModalPhoneCallBack(false);
   const handleCloseThanks = () => setShowThanks(false);

   const handleSubmit = async (event) => {
      const form = event.currentTarget;
      event.preventDefault();
      if (form.checkValidity() === true) {
         event.stopPropagation();
         const headers = new Headers();
         headers.append("Content-Type", "application/json");
         headers.append("Accept", "application/json");
         const options = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({phone_number: phoneNumber})
         }
         const url = `${process.env.REACT_APP_API_LINK}/v1/communication/request-callback/`;
         try {
            const response = await fetch(url, options);
            if (!response.ok) {
               console.log(response);
            } else {
               setModalPhoneCallBack(false)
               setShowThanks(true);
            }

         } catch (e) {
            console.log(e)
         }
      }

      setValidated(true);
   }

   return (
      <>
         <Thanks showThanks={showThanks} handleCloseThanks={handleCloseThanks}/>
         <Modal show={showModalPhoneCallBack} onHide={handleClose} centered className="dialog__callback">
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
               <Modal.Header closeButton>
                  <Modal.Title>Call me back</Modal.Title>
               </Modal.Header>
               <Modal.Body>
                  <h4 className="text-center">
                     Welcome, write your phone number and our manager will offer you best cars and the lowest prices
                  </h4>
                  <Form.Group className="mb-3" controlId="formPhoneNumber">
                     <Form.Label>Phone number:</Form.Label>
                     <Form.Control
                        required
                        type="text"
                        placeholder="For example: (+34) 000 00 00 00"
                        onChange={(e) => setPhoneNumber(e.target.value)}
                     />
                     <Form.Control.Feedback type="invalid">
                        Please choose a username.
                     </Form.Control.Feedback>
                     <Form.Text className="text-muted">
                        We'll never share your phone number with anyone else.
                     </Form.Text>
                  </Form.Group>
               </Modal.Body>
               <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>Close</Button>
                  <Button type="submit" variant="primary">Send</Button>
               </Modal.Footer>
            </Form>
         </Modal>
      </>
   );
};

export default PhoneCallBack;
