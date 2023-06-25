import './App.css';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import MyLinks from './pages/myLinks/MyLinks';
import Nav from './components/nav/Nav';
import QR from './pages/QR/QR';


function App() {
  return (
    <div className="App">
      {/* <Register />
      <Login /> */}
      {/* <Home /> */}
      {/* <MyLinks /> */}
      <QR />
    </div>
  );
}

export default App;
