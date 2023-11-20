import './MobileMenu.css';
import  { NavLink } from "react-router-dom";

function MobileMenu( {onShowMenuBlock, currentItem} ) {
    return (
        <div className="mob-menu">
            <div className="mob-menu-item" onClick={onShowMenuBlock}><NavLink exact="true" to="/">Меню</NavLink></div>
            <div className="mob-menu-item" onClick={onShowMenuBlock}><NavLink exact="true" to="/delivery">Адреса</NavLink></div>
            <div className="mob-menu-item" onClick={onShowMenuBlock}><NavLink exact="true" to="/cart">Корзина</NavLink></div>
            <div id={currentItem === 'Главная' ? 'active' : 'nonactive'} className="mob-menu-item" onClick={onShowMenuBlock}>
                <NavLink exact="true" to="/login">Вход</NavLink>
            </div>
            <div id={currentItem === 'Профиль' ? 'active' : 'nonactive'} className="mob-menu-item" onClick={onShowMenuBlock}>
                <NavLink exact to="/profile">Личный кабинет</NavLink>
            </div>
        </div>
    );

}

export default MobileMenu