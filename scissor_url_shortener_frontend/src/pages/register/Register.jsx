import "./Register.css";
import FormInput from "../../components/form_input/FormInpur";

const Register = () => {
  return ( 
    <div className="register">
      <FormInput placeholder="username"/>
      <FormInput placeholder="email"/>
      <FormInput placeholder="password"/>
      <FormInput placeholder="confirm Password"/>
    </div>
   );
}
 
export default Register; 