import './Navbar.css';
import  { NavLink } from "react-router-dom";
import Icon from './img/Icon.png';
import Icon2 from './img/Icon-2.png';
import Logo from './img/Logo.png';
import Mob_Logo from './img/Mob_Logo.png';
import MobileMenu from '../MobileMenu/MobileMenu';
import { useState, useEffect } from 'react';

function Navbar({ currentItem, onShowMenuBlock, showMenuBlock, profileName}) {

    const [isMenuFixed, setIsMenuFixed] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
        const offset = window.scrollY;
        const threshold = 0; // Регулируйте этот порог по вашему усмотрению

        setIsMenuFixed(offset > threshold);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
        window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div>
        {window.innerWidth < 800 ? (
                <div className="navbar">
                    <div className="navbar-title"><img alt="" src={Logo}/></div>
                    {!showMenuBlock ? (
                        <button className="menu-btn" onClick={onShowMenuBlock}><img alt="" src={Icon} /></button>
                    ) : (
                        <button className="active-menu-btn" onClick={onShowMenuBlock}><img alt="" src={Icon2} /></button>
                    )}
                    {showMenuBlock &&
                        <MobileMenu profileName = {profileName} currentItem = {currentItem} onShowMenuBlock={onShowMenuBlock}/>
                    }
                </div>
        ) : (
            <div className={`your-menu ${isMenuFixed ? 'fixed-menu' : 'navbar'}`}>
                <div className="navbar-title"><img alt="" src={Logo}/></div>
                <div className="menu-items">
                    <div className="menu-item"><NavLink exact="true" to="/">Меню</NavLink></div>
                    <div className="menu-item"><NavLink exact="true" to="/delivery">О доставке</NavLink></div>
                    <div className="menu-item"><NavLink exact="true" to="/cart">Корзина</NavLink></div>
                    <div id={currentItem === 'Главная' ? 'active' : 'nonactive'} className="menu-item">
                        <NavLink exact="true" to="/login">Вход</NavLink>
                    </div>
                    <div id={currentItem === 'Профиль' ? 'active' : 'nonactive'} className="menu-item">
                        <NavLink id="nav_name" exact="true" to="/profile">{profileName}</NavLink>
                    </div>
                </div>
            </div>
        )}
        </div>
    );
}

export default Navbar
