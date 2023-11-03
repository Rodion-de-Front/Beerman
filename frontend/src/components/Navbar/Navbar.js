import './Navbar.css';
import  { NavLink } from "react-router-dom";

function Navbar({ currentItem }) {
    return (
        <div className="navbar">
            <div className="navbat-title">ХМЕЛЬНАЯ ДОСТАВКА</div>
            <div className="menu-items">
                <div className="menu-item"><NavLink exact to="/">Пиво и сидры</NavLink></div>
                <div className="menu-item"><NavLink exact to="/">Закуски</NavLink></div>
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
    );
}

export default Navbar