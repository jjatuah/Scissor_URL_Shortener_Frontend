import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/home/Home';
import MyLinks from './pages/myLinks/MyLinks';
import QR from './pages/QR/QR';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import PrivateRoute from './PrivateRoute';



const App = () => {
  return (
    <Router>
        <Routes>
          <Route element={<PrivateRoute/>}>
              <Route path='/' element={<Home/>} />
              <Route path='/links' element={<MyLinks/>} />
              <Route path='/qr' element={<QR/>} />
          </Route>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register />}/>
        </Routes>
    </Router>
  );
};

export default App;
