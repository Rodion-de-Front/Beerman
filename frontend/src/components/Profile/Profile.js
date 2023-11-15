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
                        <div className="profile-map">
                            <div>
                                <iframe title="Bristol" src="https://yandex.ru/map-widget/v1/?ll=37.322745%2C55.616488&mode=search&ol=geo&ouri=ymapsbm1%3A%2F%2Fgeo%3Fdata%3DCgg1MzIwNTIyORJ50KDQvtGB0YHQuNGPLCDQnNC-0YHQutCy0LAsINC_0L7RgdC10LvQtdC90LjQtSDQnNC-0YHQutC-0LLRgdC60LjQuSwg0LrQvtGC0YLQtdC00LbQvdGL0Lkg0L_QvtGB0ZHQu9C-0Log0JHRgNC40YHRgtC-0LvRjCIKDa5LFUIVyndeQg%2C%2C&z=15.88" width="320px" height="500px" allowFullScreen={true}></iframe>
                            </div>
                        </div>
                        <button className="save-btn">Сохранить</button>
                    </div>
            </div>
        ):(
            <div className="profile">
                <Navbar currentItem={currentItem} />
                <div className="profile-elements">
                    <div className="profile-form">
                        <div className="form-title">Профиль</div>
                        <FullForm />
                        <div className="input-name">Адрес доставки</div>
                        <input className="input" id="adress" type="text" placeholder="Населенный пункт"/>
                        <div className="row">
                            <input className="input" id="street" type="text" placeholder="Улица"/>
                            <input className="input" id="house" type="text" placeholder="Дом"/>
                        </div>
                        <button className="save-btn">Сохранить</button>
                    </div>
                    <div className="profile-map">
                        <div>
                            <iframe title="Bristol" src="https://yandex.ru/map-widget/v1/?ll=37.322745%2C55.616488&mode=search&ol=geo&ouri=ymapsbm1%3A%2F%2Fgeo%3Fdata%3DCgg1MzIwNTIyORJ50KDQvtGB0YHQuNGPLCDQnNC-0YHQutCy0LAsINC_0L7RgdC10LvQtdC90LjQtSDQnNC-0YHQutC-0LLRgdC60LjQuSwg0LrQvtGC0YLQtdC00LbQvdGL0Lkg0L_QvtGB0ZHQu9C-0Log0JHRgNC40YHRgtC-0LvRjCIKDa5LFUIVyndeQg%2C%2C&z=15.88" width="584px" height="764px" allowFullScreen={true}></iframe>
                        </div>
                    </div>
                </div>
            </div>
        )}
        </div>

    );
}

export default Profile