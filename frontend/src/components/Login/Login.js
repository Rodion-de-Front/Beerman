import './Login.css';
import  { NavLink } from "react-router-dom";
import close from './img/Vector.png';

function Login({ onLogin }) {

    return (
        <div className="login">
            <div className="form">
                <div className="form-title">Вход</div>
                <div className="form-description">Введите логин и пароль или <NavLink exact to="/signup">зарегистрируйтесь</NavLink></div>
                <input className="input" id="email" type="text" placeholder="Почта"/>
                <input className="input" id="password" type="password" placeholder="Пароль"/>
                <NavLink exact to="/" onClick={onLogin} className="auth-btn">Авторизоваться</NavLink>
                <div className="close"><NavLink exact to="/"><img src={close} /></NavLink></div>
            </div>
        </div>
    );
}

export default Login