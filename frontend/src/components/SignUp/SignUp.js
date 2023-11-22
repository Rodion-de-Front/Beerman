import './SignUp.css';
import  { NavLink } from "react-router-dom";
import close from './img/Vector.png';
import FullForm from '../FullForm/FullForm';
import Navbar from '../Navbar/Navbar';

function SignUp({ currentItem, onShowMenuBlock, showMenuBlock, sign_up_step1, misMatch }) {

    return (
        <div>
        {window.innerWidth < 800 ? (
            <div>
                <Navbar onShowMenuBlock = {onShowMenuBlock} showMenuBlock = {showMenuBlock} currentItem={currentItem} />
                <div className="sign-form">
                    <div className="form-title">Регистрация</div>
                    <FullForm misMatch = {misMatch}/>
                    <NavLink exact="true" to="address" className="reg-btn">Продолжить</NavLink>
                </div>
            </div>
        ):(
        <div className="signup">
            <div className="sign-form">
                <div className="form-title">Регистрация</div>
                <FullForm misMatch = {misMatch}/>
                <NavLink exact="true" to="/address" id="addressPage"></NavLink>
                <div className="reg-btn" onClick = {sign_up_step1}>Продолжить</div>
                <div className="close"><NavLink exact="true" to="/"><img alt ="" src={close} /></NavLink></div>
            </div>
        </div>
        )}
        </div>
    );
}

export default SignUp