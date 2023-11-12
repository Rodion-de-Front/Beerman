import FullForm from '../FullForm/FullForm';
import Navbar from '../Navbar/Navbar';
import './Profile.css';

function Profile( {currentItem, onShowMenuBlock, showMenuBlock} ) {
    return (
        <div>
        {window.innerWidth < 800 ? (
            <div className="profile">
                <Navbar onShowMenuBlock = {onShowMenuBlock} showMenuBlock = {showMenuBlock} currentItem={currentItem} />
                    <div className="profile-form">
                        <div className="form-title">Личный кабинет</div>
                        <FullForm />
                        <div className="form-title adress-title">Адрес доставки</div>
                        <input className="input" id="adress" type="text" placeholder="Населенный пункт"/>
                        <div className="row">
                            <input className="input" id="street" type="text" placeholder="Улица"/>
                            <input className="input" id="house" type="text" placeholder="Дом"/>
                        </div>
                        <button className="save-btn">Сохранить</button>
                    </div>
            </div>
        ):(
            <div className="profile">
                <Navbar currentItem={currentItem} />
                <div className="profile-form">
                    <div className="form-title">Профиль</div>
                    <FullForm />
                    <button className="save-btn">Сохранить</button>
                </div>
            </div>
        )}
        </div>

    );
}

export default Profile