import "./Home.css";
import Nav from "../../components/nav/Nav";
import axios from "axios";
import { useState } from "react";


const Home = () => {

  const baseData = {longUrl: "", urlCode: ""}

  const [inputData, setIputData] = useState(baseData)

  const handleData = (e) => {
    setIputData({...inputData, [e.target.name]:e.target.value})
  }

  const text = "Short URL that will be generated"
  return ( 
    <div className="home">
      <Nav />
      <div className="inputs">
        <form>
          <p>Let's help you cut that URL short</p>
          <label>Long URL</label>
          <input value={inputData.longUrl} name="longUrl" type="url" placeholder="Enter Long URL" onChange={handleData} required/>
          <label>Shortcode For Customization</label>
          <input type="text" value={inputData.urlCode} name="urlCode" placeholder="Enter Your own shortcode if you feel like" onChange={handleData}/>
          <button>Shorten</button>
        </form>
      </div>

      <div className="outputs">
        <pre>Here is your short URL below:</pre>
        <p>{text}</p>
        <button  onClick={() => {
          navigator.clipboard.writeText(text);}}>Click to copy short URL</button>
      </div>
    </div>
   );
}
 
export default Home;