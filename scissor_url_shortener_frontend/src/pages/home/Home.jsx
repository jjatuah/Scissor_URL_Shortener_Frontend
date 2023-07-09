import "./Home.css";
import Nav from "../../components/nav/Nav";
import axios from "axios";
import { useState, useEffect } from "react";


const Home = () => {

  const baseData = {longUrl: "", urlCode: ""}

  const [inputData, setIputData] = useState(baseData)

  const [isSubmitted, setIsSubmitted] = useState(false);

  const [textContent, setTextContent] = useState("Short URL that will be generated")
  

  const handleData = (e) => {
    setIputData({...inputData, [e.target.name]:e.target.value})
  }

  //Get the token from the local storage
  const token = localStorage.getItem('token');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Make the Axios POST request here
    await axios.post('https://short-3u0c.onrender.com/', inputData, {
      headers: {
        Authorization: token
      }
    })
      .then(response => {
        // Handle the response data
        setTextContent(true)
        setTextContent(`${response.data.shortUrl || response.data}`)
      })
      .catch(error => {
        // Handle the error
      });

    setIsSubmitted(true);
  };

  useEffect(() => {
    if (isSubmitted) {
      // This effect will run when the form is submitted
      // You can perform any additional actions here
      // console.log('Form submitted:', inputData);

      

      // Reset the form data and submission flag
      setIputData({longUrl: "", urlCode: ""});
      setIsSubmitted(false);
    }
  }, [isSubmitted]);


  return ( 
    <div className="home">
      <Nav />
      <div className="inputs">
        <form onSubmit={handleSubmit}>
          <p>Let's help you cut that URL short</p>
          <label>Long URL</label>
          <input value={inputData.longUrl} name="longUrl" type="url" placeholder="Enter Long URL" onChange={handleData} required/>
          <label>Shortcode For Customization</label>
          <input type="text" value={inputData.urlCode} name="urlCode" placeholder="Enter Your own shortcode if you feel like" onChange={handleData}/>
          <button type="submit">Shorten</button>
        </form>
      </div>

      <div className="outputs">
        <pre>Here is your short URL below:</pre>
        <p>{textContent}</p>
        <button  onClick={() => {
          navigator.clipboard.writeText(textContent);}}>Click to copy short URL</button>
      </div>
    </div>
   );
}
 
export default Home;