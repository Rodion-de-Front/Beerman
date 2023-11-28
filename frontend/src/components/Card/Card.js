import './Card.css';
import Icon from './img/Icon_Fill.png';
import  { NavLink } from "react-router-dom";

function Card( {onShowProduct, onShowAddButtons, showAddButtons, onLink, product} ) {

    // Проверка, что product определен
    if (!product) {
        return <div>Product is undefined</div>;
    }

    // Деструктурирование свойств после проверки
    const { id, price, name, description, image } = product;

    const cardStyle = {
        backgroundImage: `url(data:image/png;base64, ${image})`,
        borderRadius: '5px 5px 0 0',
        backgroundSize: 'cover',
      };

    return (
        <div id={id} className="card" onClick={onShowProduct}>
            <div className="card-photo" style={cardStyle}></div>
            <div className="card-text">
                <div className="price">{price + " ₽"}</div>
                <div className="name">{name}</div>
                <div className="description">{description}</div>
                {!showAddButtons ? (
                    <button className="card-btn" onClick={onShowAddButtons}>В корзину</button>
                ) : (
                    <div className="add-btns">
                        <button className="cart-btn">-</button>
                        <div className="added-quantity">1</div>
                        <button className="cart-btn">+</button>
                        <NavLink exact="true" to="/cart"><button className="add-to-cart-btn" onClick={onLink}><img alt="" src={Icon}/></button></NavLink>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Card