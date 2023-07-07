import { useState, useEffect } from "react";
import FormInput from "../../components/form_input/FormInput";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    email:"",
    password:""
  });

  const [error, setError] = useState(false)
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  
  const inputs = [
    {
      id:1,
      name:"email", 
      type:"email",
      placeholder:"Email",
      label:"Email",
      errorMessage:"Please enter a valid email address",
      required: true
    },
    {
      id:2,
      name:"password",
      type:"password",
      placeholder:"password",
      label:"password",
      errorMessage:"Password must be at least 8 characters long and should include a number",
      pattern: "^(?=.*\\d).{8,}$",
      required: true
    } 
  ]

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Make the Axios POST request here
    await axios.post('https://scissor-url-shortener-mern-backend.onrender.com/login', values)
      .then(response => {
        // Handle the response data
        
        const token = response.data.token;

        localStorage.setItem('token', token);

        navigate('/') 
      })
      .catch(error => {
        // Handle the error
        if (error.response.data == "Invalid Email") {
          setError(true)
          setEmailError(error.response.data)
          setPasswordError("")
        } 

        if (error.response.data == "Invalid Password") {
          setError(true)
          setEmailError("")
          setPasswordError(error.response.data)
        } 
        
      });
  };

  const onChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value});
  }

  useEffect(() => {
    const clearToken = () => {
      localStorage.removeItem("token");
    };

    // Set a timeout for 24 hours
    const timeout = setTimeout(clearToken, 24 * 60 * 60 * 1000);

    // Clean up the timeout when the component unmounts or when the token changes
    return () => clearTimeout(timeout);
  }, []);


  
  return ( 
    <div className="register">
      <div className="top">
        <h1>SCISSOR</h1>
        <Link to="/register">Register</Link>
      </div>

      {error && <div className="error">
        <p>{emailError}</p>
        <p>{passwordError}</p>
      </div>}
      
      <form onSubmit={handleSubmit}>
        <h2>Sign in to Scissor</h2>
        <p>We'll cut that URL short</p>
        {inputs.map((input) => (
          <FormInput key={input.id} {...input} value = {values[input.name]} onChange={onChange}/>
        ))}
        <button>Sign in</button>
      </form>
      
    </div>
   );
}
 
export default Login; 