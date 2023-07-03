import "./Nav.css";
import { Link } from "react-router-dom";


const Nav = () => {

  const handleLogout = () => {
    localStorage.removeItem('token');
  }

  return ( 
    <div className="nav">
      <div className="header">
        <h1>SCISSOR</h1>
      </div>

      <div className="navLinks">        
        <Link to="/links">My Links</Link>
        <Link to="/qr">QR Code</Link>
        <Link to="/">Create Link</Link>
        <Link to="/login" onClick={handleLogout}>Log Out</Link>
      </div>
    </div>
   );
}
 
export default Nav;