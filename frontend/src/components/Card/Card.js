import './Card.css';

function Card() {
    return (
        <div className="card">
            <div className="card-photo"></div>
            <div className="card-text">
                <div className="price">450 ₽</div>
                <div className="name">Delirium Red Huyghe</div>
                <div className="description">Бельгия, 0.33 л</div>
                <button className="card-btn">В корзину</button>
            </div>
        </div>
    );
}

export default Card