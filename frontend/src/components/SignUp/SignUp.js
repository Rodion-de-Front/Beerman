import './SignUp.css';
import  { NavLink } from "react-router-dom";
import close from './img/Vector.png';
import FullForm from '../FullForm/FullForm';
import Navbar from '../Navbar/Navbar';

function SignUp({ currentItem, onShowMenuBlock, showMenuBlock }) {
    return (
        <div>
        {window.innerWidth < 800 ? (
            <div>
                <Navbar onShowMenuBlock = {onShowMenuBlock} showMenuBlock = {showMenuBlock} currentItem={currentItem} />
                <div className="sign-form">
                    <div className="form-title">Регистрация</div>
                    <FullForm />
                    <NavLink exact to="/address" className="reg-btn">Продолжить</NavLink>
                </div>
            </div>
        ):(
        <div className="signup">
            <div className="sign-form">
                <div className="form-title">Регистрация</div>
                <FullForm />
                <NavLink exact to="/address" className="reg-btn">Продолжить</NavLink>
                <div className="close"><NavLink exact to="/"><img alt ="" src={close} /></NavLink></div>
            </div>
        </div>
        )}
        </div>
    );
}

export default SignUp