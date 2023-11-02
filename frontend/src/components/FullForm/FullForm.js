import './FullForm.css';

function FullForm() {
    return (
        <div>
            <div className="input-name">Имя</div>
            <input className="input" id="name" type="text" />
            <div className="input-name">Логин</div>
            <input className="input" id="login" type="text" />
            <div className="row">
                <div>
                    <div className="input-name">Пароль</div>
                    <input className="input" id="password" type="password" />
                </div>
                <div>
                    <div className="input-name">Повторите пароль</div>
                    <input className="input" id="repeated_password" type="password" />
                </div>
            </div>
            <div className="input-name">Номер телефона</div>
            <input className="input" id="number" type="text" />
            <div className="input-name">Адрес доставки</div>
            <input className="input" id="adress" type="text" placeholder="Населенный пункт"/>
            <div className="row">
                <input className="input" id="street" type="text" placeholder="Улица"/>
                <input className="input" id="house" type="text" placeholder="Дом"/>
            </div>
        </div>
    );
}

export default FullForm