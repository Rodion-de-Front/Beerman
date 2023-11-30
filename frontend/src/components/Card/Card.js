import './Card.css';
import Icon from './img/Icon_Fill.png';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';

function Card({ onShowProduct, onShowAddButtons, showAddButtons, onLink, product }) {

  const [addProduct, setAddProduct] = useState(false);

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

  const toggleAddButtons = (e) => {
    e.stopPropagation();
    setAddProduct(!addProduct);
  };

  return (
    <div id={id} className="card" onClick={onShowProduct}>
      <div className="card-photo" style={cardStyle}></div>
      <div className="card-text">
        <div className="price">{price + ' ₽'}</div>
        <div className="name">{name}</div>
        <div className="description">{description}</div>
        {!addProduct ? (
          <button className="card-btn" onClick={toggleAddButtons}>
            В корзину
          </button>
        ) : (
          <div className="add-btns">
            <button className="cart-btn">-</button>
            <div className="added-quantity">1</div>
            <button className="cart-btn">+</button>
            <NavLink exact="true" to="/cart">
              <button className="add-to-cart-btn" onClick={onLink}>
                <img alt="" src={Icon} />
              </button>
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
}

export default Card;
