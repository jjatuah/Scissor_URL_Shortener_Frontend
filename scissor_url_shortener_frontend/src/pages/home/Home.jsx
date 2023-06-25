import "./Home.css";
import Nav from "../../components/nav/Nav";

const Home = () => {

  const text = "Short URL that will be generated"
  return ( 
    <div className="home">
      <Nav />
      <div className="inputs">
        <form>
          <p>Let's help you cut that URL short</p>
          <label>Long URL</label>
          <input type="url" placeholder="Enter Long URL" required/>
          <label>Shortcode For Customization</label>
          <input type="text" placeholder="Enter Your own shortcode if you feel like"/>
          <button>Shorten</button>
        </form>
      </div>

      <div className="outputs">
        <p>{text}</p>
        <button  onClick={() => {
          navigator.clipboard.writeText(text);}}>Click to copy short URL</button>
      </div>
    </div>
   );
}
 
export default Home;