import "./QR.css";
import Nav from "../../components/nav/Nav";


const QR = () => {
  return ( 
    <div className="qr">
      <Nav />
      <div className="qrInfo">
        <h2>Links</h2>
        <div className="link">
          <p>www.Google.com</p>
          <p>Generate QR Code</p>
        </div>

        <div className="link">
          <p>https://www.hotnigerianjobs.com/field/236/web-developer-jobs-in-nigeria</p>
          <p>Generate QR Code</p>
        </div>
      </div>
    </div>
   );
}
 
export default QR;