import Navbar from '../Navbar/Navbar';
import SelectedGoods from '../SelectedGoods/SelectedGoods';
import './Cart.css';

function Cart( {currentItem} ) {
    return (
        <div>
            <Navbar currentItem={currentItem} />
            <div className="cart-title">Корзина</div>
            <div className="cart">
                <div className="goods-container">
                    <SelectedGoods />
                </div>
                <div class="delivery-data">
                    <div className="delivery-block">
                        <div className="delivery-tittle">Доставка</div>
                        <div className="delivery-adress">Москва, Ленинский проспект, д.4, кв. 610, под. 1, дмф. 1111</div>
                    </div>
                    <div className="delivery-block">
                        <div className="payment delivery-tittle">Оплата картой</div>
                    </div>
                    <div className="delivery-block">
                        <div className="delivery-row">
                            <div className="delivery-description">Товары (1)</div>
                            <div className="delivery-price">8 700 ₽</div>
                        </div>
                    </div>
                    <div className="delivery-block">
                        <div className="delivery-row">
                            <div className="delivery-description">Доставка</div>
                            <div className="delivery-price">150 ₽</div>
                        </div>
                    </div>
                    <div className="delivery-block">
                        <div className="delivery-row">
                            <div className="total delivery-tittle">Итого</div>
                            <div className="final-price">8 850 ₽</div>
                        </div>
                    </div>
                    <div className="delivery-block">
                        <div className="delivery-tittle">Комментарий</div>
                        <textarea placeholder="Можем оставить у двери или предварительно позвонить"></textarea>
                    </div>
                    <div className="order-btn">Заказать</div>
                </div>
            </div>
        </div>
    );
}

export default Cart