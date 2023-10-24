import React from "react";
import CookieConsent from "react-cookie-consent";

const CookieAccept = () => {

   return (
      <CookieConsent style={{justifyContent: 'center', alignItems: 'center'}}
                     enableDeclineButton
                     buttonText='Accept'
                     declineButtonText='Reject'
                     expires={30}
                     overlay={true}
                     cookieName='CookieConsent'
                     containerClasses='cc-container-custom'
      >
         Notice
         We and selected third parties use cookies or similar technologies for technical purposes and, with your
         consent, for functionality, experience, measurement and marketing (personalized ads) as specified in the
         <a style={{textdecoration: 'underline'}} href="/privacy-policy"> Privacy policy</a>. Denying consent may make
         related features unavailable.
         You can give or deny your consent.
         Use the “Accept” button to consent. Use the “Reject” button to continue without accepting.
      </CookieConsent>
   );
};

export default CookieAccept;