import './FullForm.css';

function FullForm() {
    return (
        <div>
        {window.innerWidth < 800 ? (
            <div>
                <input className="input" id="name" type="text" placeholder="Имя"/>
                <input className="input" id="login" type="text" placeholder="Фамилия"/>
                <input className="input" id="created_password" type="password" placeholder="Введите пароль"/>
                <input className="input" id="repeated_password" type="password" placeholder="Подтвердить пароль"/>
                <input className="input" id="number" type="text" placeholder="Номер телефона"/>
            </div>
        ):(
        <div>
            <div className="input-name">Имя</div>
            <input className="input" id="name" type="text" />
            <div className="input-name">Логин</div>
            <input className="input" id="login" type="text" />
            <div className="row">
                <div>
                    <div className="input-name">Пароль</div>
                    <input className="input" id="created_password" type="password" />
                </div>
                <div>
                    <div className="input-name">Повторите пароль</div>
                    <input className="input" id="repeated_password" type="password" />
                </div>
            </div>
            <div className="input-name">Номер телефона</div>
            <input className="input" id="number" type="text" />
        </div>
        )}
        </div>
    );
}

export default FullForm