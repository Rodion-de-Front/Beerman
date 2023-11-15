import './AdressForm.css';
import  { NavLink } from "react-router-dom";
import close from './img/Frame_57.png';
import Navbar from '../Navbar/Navbar';

function AdressForm( { currentItem, onShowMenuBlock, showMenuBlock, onLogin } ) {
    return (
        <div>
        {window.innerWidth < 800 ? (
            <div>
                <Navbar onShowMenuBlock = {onShowMenuBlock} showMenuBlock = {showMenuBlock} currentItem={currentItem} />
                <div className="address-form">
                    <div className="adress-title">Адрес доставки</div>
                    <input className="input" id="adress" type="text" placeholder="Населенный пункт"/>
                    <div className="row">
                        <input className="input" id="street" type="text" placeholder="Улица"/>
                        <input className="input" id="house" type="text" placeholder="Дом"/>
                    </div>
                    <div className="map">
                        <div>
                            <iframe title="Bristol" src="https://yandex.ru/map-widget/v1/?ll=37.322745%2C55.616488&mode=search&ol=geo&ouri=ymapsbm1%3A%2F%2Fgeo%3Fdata%3DCgg1MzIwNTIyORJ50KDQvtGB0YHQuNGPLCDQnNC-0YHQutCy0LAsINC_0L7RgdC10LvQtdC90LjQtSDQnNC-0YHQutC-0LLRgdC60LjQuSwg0LrQvtGC0YLQtdC00LbQvdGL0Lkg0L_QvtGB0ZHQu9C-0Log0JHRgNC40YHRgtC-0LvRjCIKDa5LFUIVyndeQg%2C%2C&z=15.88" width="320px" height="200" allowFullScreen={true}></iframe>
                        </div>
                    </div>
                    <NavLink exact to="/profile" className="reg-btn">Завершить</NavLink>
                </div>
            </div>
        ):(
            <div className="adress">
                <div className="address-form">
                    <div className="address-form-inputs">
                        <div className="adress-title">Адрес доставки</div>
                        <input className="address-input" id="adress" type="text" placeholder="Населенный пункт"/>
                        <div className="row">
                            <input className="address-input" id="street" type="text" placeholder="Улица"/>
                            <input className="address-input" id="house" type="text" placeholder="Дом"/>
                        </div>
                        <NavLink exact to="/profile" className="adress-btn" onClick={onLogin}>Сохранить</NavLink>
                    </div>
                    <div className="map">
                    <div>
                        <iframe title="Bristol" src="https://yandex.ru/map-widget/v1/?ll=37.322745%2C55.616488&mode=search&ol=geo&ouri=ymapsbm1%3A%2F%2Fgeo%3Fdata%3DCgg1MzIwNTIyORJ50KDQvtGB0YHQuNGPLCDQnNC-0YHQutCy0LAsINC_0L7RgdC10LvQtdC90LjQtSDQnNC-0YHQutC-0LLRgdC60LjQuSwg0LrQvtGC0YLQtdC00LbQvdGL0Lkg0L_QvtGB0ZHQu9C-0Log0JHRgNC40YHRgtC-0LvRjCIKDa5LFUIVyndeQg%2C%2C&z=15.88" width="485px" height="600" allowFullScreen={true}></iframe>
                    </div>
                </div>
                    <div className="close"><NavLink exact to="/"><img alt ="" src={close} /></NavLink></div>
                </div>
            </div>
        )}
        </div>
    );
}

export default AdressForm