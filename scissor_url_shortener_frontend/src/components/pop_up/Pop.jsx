import "./PopUp.css"
import testImg from "../../assets/bg1.jpg"

const PopUp = (props) => {
  return (props.trigger) ? ( 
    <div className="popUp">
      <div className="popUpInfo">
        <p onClick={() => props.setTrigger(false)}>Click to close</p>
        <img src={testImg} alt="" />
        {props.trigger}
      </div>
    </div>
   ) : "";
}
 
export default PopUp;