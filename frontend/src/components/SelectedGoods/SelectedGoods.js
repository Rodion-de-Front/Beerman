import './SelectedGoods.css';

function SelectedGoods( {cartItem} ) {
    return (
        <div id={cartItem.id} className="selected-goods">
            <div className="goods-info">
                <div className="goods-photo"></div>
                <div className="goods-text">
                    <div className="goods-name">
                        {cartItem.name}
                    </div>
                </div>
            </div>
            <div className="price-quantity">
                <div className="goods-price">
                    {cartItem.price} ₽
                </div>
                <div className="goods-quantity">
                    <div className="quantity-btn">-</div>
                    <div className="quantity-number">{cartItem.quantity}</div>
                    <div className="quantity-btn">+</div>
                </div>
            </div>
        </div>
    );
}

export default SelectedGoods