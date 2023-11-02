import Card from '../Card/Card';
import Navbar from '../Navbar/Navbar';
import './Beer.css';
import expand_more from './img/expand_more.png';

function Beer( {currentItem} ) {
    return (
        <div>
            <Navbar currentItem={currentItem} />
            <div className="beer-block">
                <div className="beer-header">
                    <div className="position">
                        <div className="title-sort">
                            <div className="beer-title">ПИВО И СИДРЫ</div>
                            <div className="btns">
                                <button className="all-btn">Всё</button>
                                <button className="type-btn">Бутылочное</button>
                                <button className="type-btn">Разливное</button>
                            </div>
                        </div>
                        <div className="filltes">
                            <button className="fillter-btn">Сорт<img src={expand_more}/></button>
                            <button className="fillter-btn">Страна<img src={expand_more}/></button>
                        </div>
                    </div>
                </div>
                <div className="card-container"><Card /><Card /><Card /><Card /><Card /><Card /></div>
            </div>
        </div>
    );
}

export default Beer