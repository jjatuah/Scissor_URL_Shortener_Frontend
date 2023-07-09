import "./MyLinks.css";
import Nav from "../../components/nav/Nav";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";



const MyLinks = () => {

  const [links, setLinks] = useState([]);

  const token = localStorage.getItem('token');

  useEffect(() => {        
    const getData = async () => {
      try {
        const response = await axios.get(`https://short-3u0c.onrender.com/` , {
          headers: {
            Authorization: token
          }
        })
        setLinks(response.data)
      } catch (error) {
      }
    }
    getData()
  }, [links])

  const handleDelete = async (id) => {
    try {
      console.log(id);
      await axios.delete(`https://short-3u0c.onrender.com/${id}` , {
        headers: {
          Authorization: token
        }
      });
      // Remove the deleted item from the state
      setLinks(links.filter((link) => link._id !== id));
    } catch (error) {
    }
  };

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
                <th>Clicks/Visted</th>
                <th>Visitors IP</th>
              </tr>
            </thead>

            <tbody>
              {
                links.map((link) => (
                  <tr key={link._id}>
                    <td>{link.longUrl}</td>
                    <td>{link.shortUrl}</td>
                    <td>{link.clicks}</td>
                    <td>{link.ipAddress}</td>
                    <td><a href={link.shortUrl}>Visit</a></td>
                    <td><p onClick={() => handleDelete(link._id)} >Delete</p></td>
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