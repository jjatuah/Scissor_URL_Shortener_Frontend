import "./QR.css";
import Nav from "../../components/nav/Nav";
import PopUp from "../../components/pop_up/Pop";
import { useState } from "react";


const QR = () => {

  const [buttonPopUp, setButtonPopUp] = useState(false)
  return ( 
    <div className="qr">
      <Nav />
      <div className="qrInfo">
        <h2>Links</h2>
        <div className="link">
          <p>www.Google.com</p>
          <p onClick={() => setButtonPopUp(true)}>Generate QR Code</p>
        </div>

        <div className="link">
          <p>https://www.hotnigerianjobs.com/field/236/web-developer-jobs-in-nigeria</p>
          <p onClick={() => setButtonPopUp(true)}>Generate QR Code</p>
        </div>
        <PopUp setTrigger={setButtonPopUp} trigger={buttonPopUp} />
      </div>
    </div>
   );
}
 
export default QR;