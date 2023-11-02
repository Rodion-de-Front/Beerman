import './SignUp.css';
import  { NavLink } from "react-router-dom";
import close from './img/Vector.png';
import FullForm from '../FullForm/FullForm';

function SignUp({ onLogin }) {
    return (
        <div className="signup">
            <div className="sign-form">
                <div className="form-title">Регистрация</div>
                <FullForm />
                <NavLink exact to="/" className="reg-btn" onClick={onLogin} >Зарегистрироваться</NavLink>
                <div className="close"><NavLink exact to="/"><img src={close} /></NavLink></div>
            </div>
        </div>
    );
}

export default SignUp