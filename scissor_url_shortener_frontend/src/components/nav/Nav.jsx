import "./Nav.css";
import { Link } from "react-router-dom";

//<Link className="link" to="/"><span>Homepage</span></Link>
const Nav = () => {
  return ( 
    <div className="nav">
      <div className="header">
        <h1>SCISSOR</h1>
      </div>

      <div className="navLinks">        
        <Link to="/links">My Links</Link>
        <Link to="/qr">QR Code</Link>
        <Link to="/">Create Link</Link>
      </div>
    </div>
   );
}
 
export default Nav;