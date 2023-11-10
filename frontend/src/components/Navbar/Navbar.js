import './Navbar.css';
import  { NavLink } from "react-router-dom";
import Icon from './img/Icon.png';

function Navbar({ currentItem }) {
    return (
        <div>
        {window.innerWidth < 800 ? (
                <div className="navbar">
                    <div className="navbar-title"><span>Доставка</span> BEIRMANN </div>
                    <button className="menu-btn"><img alt="" src={Icon} /></button>
                </div>
        ) : (
            <div className="navbar">
                <div className="navbar-title"><span>Доставка</span> BEIRMANN </div>
                <div className="menu-items">
                    <div className="menu-item"><NavLink exact to="/">Меню</NavLink></div>
                    <div className="menu-item">О доставке</div>
                    <div className="menu-item"><NavLink exact to="/cart">Корзина</NavLink></div>
                    <div id={currentItem === 'Главная' ? 'active' : 'nonactive'} className="menu-item">
                        <NavLink exact to="/login">Вход</NavLink>
                    </div>
                    <div id={currentItem === 'Профиль' ? 'active' : 'nonactive'} className="menu-item">
                        <NavLink exact to="/profile">Имя</NavLink>
                    </div>
                </div>
            </div>
        )}
        </div>
    );
}

export default Navbar