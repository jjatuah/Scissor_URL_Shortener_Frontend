import "./FormInput.css"

const FormInput = (props) => {
  return ( 
    <div className="formInput">
      <label htmlFor="">Username</label>
      <input placeholder={props.placeholder} type="text" />
    </div>
   );
}
 
export default FormInput;