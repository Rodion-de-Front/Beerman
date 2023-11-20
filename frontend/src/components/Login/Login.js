import './Login.css';
import  { NavLink } from "react-router-dom";
import close from './img/Vector.png';
import Navbar from '../Navbar/Navbar';

function Login({ onLogin, onShowMenuBlock, showMenuBlock, currentItem }) {

    return (
        <div>
        {window.innerWidth < 800 ? (
            <div>
                <Navbar onShowMenuBlock = {onShowMenuBlock} showMenuBlock = {showMenuBlock} currentItem={currentItem} />
                <div className="form">
                    <div className="form-title">Вход</div>
                    <div className="login-form-description">Введите логин и пароль или <NavLink exact="true" to="/signup"><span>зарегистрируйтесь</span></NavLink></div>
                    <input className="login-input" id="email" type="text" placeholder="Почта"/>
                    <input className="login-input" id="password" type="password" placeholder="Пароль"/>
                    <NavLink exact="true" to="/" onClick={onLogin} className="auth-btn">Авторизоваться</NavLink>
                </div>
            </div>
            ) : (
            <div className="login">
                <div className="form">
                    <div className="form-title">Вход</div>
                    <div className="login-form-description">Введите логин и пароль или <NavLink exact="true" to="/signup">зарегистрируйтесь</NavLink></div>
                    <input className="login-input" id="email" type="text" placeholder="Почта"/>
                    <input className="login-input" id="password" type="password" placeholder="Пароль"/>
                    <NavLink exact="true" to="/" onClick={onLogin} className="auth-btn">Авторизоваться</NavLink>
                    <div className="close"><NavLink exact="true" to="/"><img alt="" src={close} /></NavLink></div>
                </div>
            </div>
        )}
        </div>

    );
}

export default Login