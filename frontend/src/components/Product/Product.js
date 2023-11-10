import './Product.css';
import close from './img/Vector.png';
import mob_close from './img/Vector-2.png';

function Product( {onShowProduct} ) {
    return (
        <div className="product">
            <div className="product-card">
                {window.innerWidth < 800 ? (
                    <div className="close-product-card" onClick={onShowProduct}><img alt="" src={mob_close} /></div>
                    ) : (
                    <div className="close-product-card" onClick={onShowProduct}><img alt="" src={close} /></div>
                )}
                <div className="close-product-card" onClick={onShowProduct}><img alt="" src={close} /></div>
                <div className="product-card-photo"></div>
                <div className="product-card-text">
                    <div className="product-card-name">Delirium Red Huyghe</div>
                    <div className="product-card-description">Бельгия, 0.33 л</div>
                    <div className="product-card-price">450 ₽</div>
                    <div className="product-card-about-title">О пиве</div>
                    <div className="product-card-about-text">Пиво Delirium Red имеет рубиново-красный цвет, великолепный вишневый аромат с тонами миндаля. Вкус пива Делириум Редсладковато вишневый, ячменный с присущей другим Делириумам яркой и в то же время округлой ноткой хмеля. В составе кроме вишневого сока, входит еще и сок бузины, который делает мягкий вишневый вкус чуть более характерным.</div>
                    <div className="product-card-name-taste-title">Вкусовые сочетания</div>
                    <div className="product-card-taste-text">Мягкий сыр, фрукты, красное мясо, авокадо и сериалы</div>
                    <button className="add-btn">В корзину</button>
                </div>
            </div>
        </div>
    );
}

export default Product