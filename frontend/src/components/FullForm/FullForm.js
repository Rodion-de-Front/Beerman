import './FullForm.css';

function FullForm( { misMatch, data } ) {

    //console.log(data)

    return (
        <div>
        {window.innerWidth < 800 ? (
            <div>
            {misMatch ? (
                <div className="input-flex">
                    <input className="input" id="name" type="text" placeholder="Имя"/>
                    <input className="input" id="login" type="text" placeholder="biermann@yandex.ru"/>
                    <input className="input input-mis-match" id="created_password" type="password" placeholder="Введите пароль" />
                    <input className="input input-mis-match" id="repeated_password" type="password" placeholder="Подтвердить пароль" />
                    <div className="mis-match">Пароли не совпадают</div>
                    <input className="input" id="number" type="text" placeholder="Номер телефона"/>
                </div>
            ):(
                <div className="input-flex">
                    <input className="input" id="name" type="text" placeholder="Имя"/>
                    <input className="input" id="login" type="text" placeholder="biermann@yandex.ru"/>
                    <input className="input" id="created_password" type="password" placeholder="Введите пароль"/>
                    <input className="input" id="repeated_password" type="password" placeholder="Подтвердить пароль"/>
                    <input className="input" id="number" type="text" placeholder="Номер телефона"/>
                </div>
            )}
            </div>
        ):(
        <div>
            <div className="input-name">Имя</div>
            <input className="input" id="name" type="text" placeholder="Имя"/>
            <div className="input-name">Логин</div>
            <input className="input" id="login" type="text" placeholder="biermann@yandex.ru"/>
            {misMatch ? (
                <div className="row">
                    <div>
                        <div className="input-name">Пароль</div>
                        <input className="input input-mis-match" id="created_password" type="password" placeholder="Пароль"/>
                    </div>
                    <div>
                        <div className="input-name">Повторите пароль</div>
                        <input className="input input-mis-match" id="repeated_password" type="password" placeholder="Подтвердить пароль"/>
                    </div>
                </div>
            ):(
                <div className="row">
                    <div>
                        <div className="input-name">Пароль</div>
                        <input className="input" id="created_password" type="password" placeholder="Пароль"/>
                    </div>
                    <div>
                        <div className="input-name">Повторите пароль</div>
                        <input className="input" id="repeated_password" type="password" placeholder="Подтвердить пароль"/>
                    </div>
                </div>
            )}
            {misMatch &&
                <div className="mis-match">Пароли не совпадают</div>
            }
            <div className="input-name">Номер телефона</div>
            <input className="input" id="number" type="text" placeholder="+7 (111) 222-33-44"/>
        </div>
        )}
        </div>
    );
}

export default FullForm