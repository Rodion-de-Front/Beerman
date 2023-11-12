import './Navbar.css';
import  { NavLink } from "react-router-dom";
import Icon from './img/Icon.png';
import Icon2 from './img/Icon-2.png';
import Logo from './img/Logo.png';
import Mob_Logo from './img/Mob_Logo.png';
import MobileMenu from '../MobileMenu/MobileMenu';

function Navbar({ currentItem, onShowMenuBlock, showMenuBlock }) {
    return (
        <div>
        {window.innerWidth < 800 ? (
                <div className="navbar">
                    <div className="navbar-title"><img alt="" src={Mob_Logo}/></div>
                    {!showMenuBlock ? (
                        <button className="menu-btn" onClick={onShowMenuBlock}><img alt="" src={Icon} /></button>
                    ) : (
                        <button className="active-menu-btn" onClick={onShowMenuBlock}><img alt="" src={Icon2} /></button>
                    )}
                    {showMenuBlock &&
                        <MobileMenu currentItem = {currentItem} onShowMenuBlock={onShowMenuBlock}/>
                    }
                </div>
        ) : (
            <div className="navbar">
                <div className="navbar-title"><img alt="" src={Logo}/></div>
                <div className="menu-items">
                    <div className="menu-item"><NavLink exact to="/">Меню</NavLink></div>
                    <div className="menu-item"><NavLink exact to="/delivery">О доставке</NavLink></div>
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