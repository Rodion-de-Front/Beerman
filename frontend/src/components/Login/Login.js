import './Login.css';
import  { NavLink } from "react-router-dom";
import close from './img/Vector.png';
import Navbar from '../Navbar/Navbar';

function Login({ login, onShowMenuBlock, showMenuBlock, currentItem, noExistence }) {

    return (
        <div>
        {window.innerWidth < 800 ? (
            <div>
                <Navbar onShowMenuBlock = {onShowMenuBlock} showMenuBlock = {showMenuBlock} currentItem={currentItem} />
                <div className="form">
                    <div className="form-title">Вход</div>
                    <div className="login-form-description">Введите логин и пароль или <NavLink exact="true" to="/signup"><span>зарегистрируйтесь</span></NavLink></div>
                    {noExistence ? (
                        <div>
                            <input className="login-input input-mis-match" id="email" type="text" placeholder="Почта"/>
                            <input className="login-input input-no-existe" id="password" type="password" placeholder="Пароль"/>
                            <div className="no-existe">Неверный логин или пароль</div>
                        </div>
                    ):(
                        <div>
                            <input className="login-input" id="email" type="text" placeholder="Почта"/>
                            <input className="login-input" id="password" type="password" placeholder="Пароль"/>
                        </div>
                    )}
                    <NavLink id = "login" exact="true" to="/"></NavLink>
                    <div exact="true" to="/" onClick={login} className="auth-btn">Авторизоваться</div>
                </div>
            </div>
            ) : (
            <div className="login">
                <div className="form">
                    <div className="form-title">Вход</div>
                    <div className="login-form-description">Введите логин и пароль или <NavLink exact="true" to="/signup">зарегистрируйтесь</NavLink></div>
                    {noExistence ? (
                        <div>
                            <input className="login-input input-mis-match" id="email" type="text" placeholder="Почта"/>
                            <input className="login-input input-no-existe" id="password" type="password" placeholder="Пароль"/>
                            <div className="no-existe">Неверный логин или пароль</div>
                        </div>
                    ):(
                        <div>
                            <input className="login-input" id="email" type="text" placeholder="Почта"/>
                            <input className="login-input" id="password" type="password" placeholder="Пароль"/>
                        </div>
                    )}
                    <NavLink id = "login" exact="true" to="/"></NavLink>
                    <div onClick={login} className="auth-btn">Авторизоваться</div>
                    <div className="close"><NavLink exact="true" to="/"><img alt="" src={close} /></NavLink></div>
                </div>
            </div>
        )}
        </div>

    );
}

export default Login