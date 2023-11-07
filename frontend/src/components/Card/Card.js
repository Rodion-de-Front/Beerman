import './Card.css';
import Icon from './img/Icon_Fill.png';

function Card( {onShowProduct, onShowAddButtons, showAddButtons} ) {
    return (
        <div className="card" onClick={onShowProduct}>
            <div className="card-photo"></div>
            <div className="card-text">
                <div className="price">450 ₽</div>
                <div className="name">Delirium Red Huyghe</div>
                <div className="description">Бельгия, 0.33 л</div>
                {!showAddButtons ? (
                    <button className="card-btn" onClick={onShowAddButtons}>В корзину</button>
                ) : (
                    <div className="add-btns">
                        <button className="cart-btn">-</button>
                        <div className="added-quantity">1</div>
                        <button className="cart-btn">+</button>
                        <button className="add-to-cart-btn"><img alt="" src={Icon}/></button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Card