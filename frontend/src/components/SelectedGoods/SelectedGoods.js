import './SelectedGoods.css';

function SelectedGoods() {
    return (
        <div className="selected-goods">
            <div className="goods-info">
                <div className="goods-photo"></div>
                <div className="goods-text">
                    <div className="goods-name">
                        Delirium Red Huyghe
                    </div>
                    <div className="goods-charact">
                        Бельгия, 0.33 л
                    </div>
                </div>
            </div>
            <div className="price-quantity">
                <div className="goods-price">
                    1 450 ₽
                </div>
                <div className="goods-quantity">
                    <div className="quantity-btn">-</div>
                    <div className="quantity-number">1</div>
                    <div className="quantity-btn">+</div>
                </div>
            </div>
        </div>
    );
}

export default SelectedGoods