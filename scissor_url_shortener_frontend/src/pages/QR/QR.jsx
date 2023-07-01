import "./QR.css";
import Nav from "../../components/nav/Nav";
import PopUp from "../../components/pop_up/Pop";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";


const QR = () => {

  const [buttonPopUp, setButtonPopUp] = useState(false)

  const [qrLinks, setQrLinks] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/`)
        console.log(response.data);
        setQrLinks(response.data)
      } catch (error) {
        console.log(error);
      }
    }
    getData()
  }, [])

  return ( 
    <div className="qr">
      <Nav />
      <div className="qrInfo">
        <h2>Links</h2>

        {
            qrLinks.map((qrlink) => (
              <>
                <div className="link">
                  <p>{qrlink.longUrl}</p>
                  <p onClick={() => setButtonPopUp(true)}>Generate QR Code</p>
                </div>

                <PopUp testImg={qrlink.qrCode} setTrigger={setButtonPopUp} trigger={buttonPopUp} />
              </>
            ))
          }
        
      </div>
    </div>
   );
}
 
export default QR;