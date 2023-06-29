import "./MyLinks.css";
import Nav from "../../components/nav/Nav";


const MyLinks = () => {
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
              <tr>
                <td>https://www.hotnigerianjobs.com/field/236/web-developer-jobs-in-nigeria</td>
                <td>bit.ly/dhfldyvff</td>
                <td>5</td>
                <td>192.652.658.214,198.235.32.22,192.369.257.12,158.258.321.55,192.673.787.32</td>
                <td><a href="#">Delete</a></td>
              </tr>

              <tr>
                <td>https://www.hotnigerianjobs.com/field/236/web-developer-jobs-in-nigeria</td>
                <td>bit.ly/dhfldyvff</td>
                <td>5</td>
                <td>192.652.658.214,198.235.32.22,192.369.257.12,158.258.321,55</td>
                <td><a href="#">Delete</a></td>
              </tr>

              <tr>
                <td>https://www.hotnigerianjobs.com/field/236/web-developer-jobs-in-nigeria</td>
                <td>bit.ly/dhfldyvff</td>
                <td>5</td>
                <td>192.652.658.214,198.235.32.22,192.369.257.12,158.258.321,55</td>
                <td><a href="#">Delete</a></td>
              </tr>

              <tr>
                <td>https://www.hotnigerianjobs.com/field/236/web-developer-jobs-in-nigeria</td>
                <td>bit.ly/dhfldyvff</td>
                <td>5</td>
                <td>192.652.658.214,198.235.32.22,192.369.257.12,158.258.321,55</td>
                <td><a href="#">Delete</a></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
   );
}
 
export default MyLinks;