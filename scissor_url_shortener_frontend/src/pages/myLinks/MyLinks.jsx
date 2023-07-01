import "./MyLinks.css";
import Nav from "../../components/nav/Nav";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";



const MyLinks = () => {

  const [links, setLinks] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/`)
        console.log(response.data);
        setLinks(response.data)
      } catch (error) {
        console.log(error);
      }
    }
    getData()
  }, [])
  return ( 
    <div className="myLinks">
      <Nav />
      <div className="linksInfo">
        <div className="infoTable">
          <table>
            <thead>
              <tr>
                <th>Long URL</th>
                <th>Short URL</th>
                <th>Clicks/Used</th>
                <th>Visitors IP</th>
              </tr>
            </thead>

            <tbody>
              {
                links.map((link) => (
                  <tr>
                    <td>{link.longUrl}</td>
                    <td>{link.shortUrl}</td>
                    <td>{link.clicks}</td>
                    <td>{link.ipAddress}</td>
                    <td><a href="#">Delete</a></td>
                  </tr>
                ))
              }
              
            </tbody>
          </table>
        </div>
      </div>
    </div>
   );
}
 
export default MyLinks;