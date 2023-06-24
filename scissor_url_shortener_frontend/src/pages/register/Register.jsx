import { useState } from "react";
import "./Register.css";
import FormInput from "../../components/form_input/FormInput";

const Register = () => {

  const [values, setValues] = useState({
    email:"",
    password:"",
    confirmpassword:""
  });
  //pattern: `^(?=.*[0-9])(?=.*[a-zA-Z](?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`
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
      type:"text",
      placeholder:"password",
      label:"password",
      errorMessage:"Password must be at least 8 characters long and should include a number",
      pattern: "^(?=.*\\d).{8,}$",
      required: true
    },
    {
      id:3,
      name:"confirmPassword",
      type:"password",
      placeholder:"confirm password",
      label:"confirm password",
      errorMessage:"Passwords don't match",
      required: true
    }  
  ]

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const onChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value});
  }

  console.log(values);

  return ( 
    <div className="register">
      <div className="top">
        <h1>SCISSOR</h1>
        <h2>Sign In</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <h2>Signup to Scissor</h2>
        <p>We'll cut that URL short</p>
        {inputs.map((input) => (
          <FormInput key={input.id} {...input} value = {values[input.name]} onChange={onChange}/>
        ))}
        <button>Register</button>
      </form>
    </div>
   );
}
 
export default Register; 