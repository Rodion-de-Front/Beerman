import './Delivery.css';
import Navbar from '../Navbar/Navbar';
import pic_1 from './img/Vector1.png';
import pic_2 from './img/Vector2.png';

function Delivery( {currentItem, onShowMenuBlock, showMenuBlock, profileName} ) {
    return (
            <div>
                <Navbar profileName={profileName} onShowMenuBlock={onShowMenuBlock} showMenuBlock={showMenuBlock} currentItem = {currentItem}/>
                <div className="paper-delivery-block">
                    <div className="about-delivery">
                        <div className="about-delivery-text">
                            <div className="about-delivery-title">
                                О доставке
                            </div>
                            <div className="about-delivery-description-text">
                                Мы стремимся обеспечить максимальное удобство наших клиентов, предоставляя качественные услуги по доставке пива прямо к вашему дверному порогу.
                            </div>
                        </div>
                    </div>
                        <div className="delivery-row-2">
                            <div className="delivery-places">
                                <div className="delivery-title-text">
                                    <div className="delivery-title">
                                        Места доставки
                                    </div>
                                    <div className="delivery-description-text">
                                        К сожалению, на данный момент мы осуществляем доставку в районе Внуково только в коттеджный поселок Бристоль. Мы стараемся расширять нашу зону обслуживания, и Ваш интерес к нашим продуктам важен для нас.
                                    </div>
                                </div>
                                <div className="delivery-places-map">
                                    <iframe title={"map"} src="https://yandex.ru/map-widget/v1/?ll=37.322745%2C55.616488&mode=search&ol=geo&ouri=ymapsbm1%3A%2F%2Fgeo%3Fdata%3DCgg1MzIwNTIyORJ50KDQvtGB0YHQuNGPLCDQnNC-0YHQutCy0LAsINC_0L7RgdC10LvQtdC90LjQtSDQnNC-0YHQutC-0LLRgdC60LjQuSwg0LrQvtGC0YLQtdC00LbQvdGL0Lkg0L_QvtGB0ZHQu9C-0Log0JHRgNC40YHRgtC-0LvRjCIKDa5LFUIVyndeQg%2C%2C&z=15.88"></iframe>
                                </div>
                            </div>
                            <div className="delivery">
                                <div className="delivery-offers">
                                    <div className="delivery-title">
                                        Заказы и обслуживание
                                    </div>
                                    <div className="delivery-description-text">
                                        Чтобы сделать заказ, просто выберите свои любимые пивные напитки из нашего каталога, добавьте их в корзину и оформите заказ. Наша команда готова ответить на ваши вопросы и обеспечить высокий уровень обслуживания. Мы стремимся сделать процесс заказа и доставки максимально комфортным для вас.
                                    </div>
                                </div>
                                <div className="delivery-time">
                                    <div className="delivery-title">
                                        Время доставки
                                    </div>
                                    <div className="delivery-description-text">
                                        Мы ценим ваше время, поэтому стараемся осуществлять доставку как можно быстрее. Максимальное время доставки — 30 минут.
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="delivery-policy">
                            <div>
                                <div className="delivery-title">
                                    Политика возврата
                                </div>
                                <div className="delivery-description-text">
                                    Мы гарантируем качество наших товаров, однако, если по каким-то причинам вы не удовлетворены своим заказом, свяжитесь с нами по номеру телефону: 89153275683
                                </div>
                            </div>
                            <div className="delivery-policy-photo">
                                <img alt="" className="first-pic" src={pic_2}/>
                                <img alt="" className="second-pic" src={pic_1}/>
                            </div>
                        </div>
                </div>
            </div>
    );
}

export default Delivery
