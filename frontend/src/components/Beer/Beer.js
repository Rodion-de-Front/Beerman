import Card from '../Card/Card';
import Navbar from '../Navbar/Navbar';
import FilterBlock from '../FilterBlock/FilterBlock';
import './Beer.css';
import expand_more from './img/expand_more.png';
import expand_more_2 from './img/expand_more_2.png';

function Beer( {currentItem, showSortBlock, onShowSorts}  ) {
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
                        {!showSortBlock ? (
                                <button className="fillter-btn" onClick={onShowSorts}>Сорт<img src={expand_more}/></button>
                            ) : (
                                <button className="togled-fillter-btn" onClick={onShowSorts}>Сорт<img src={expand_more_2}/></button>
                            )}
                            {showSortBlock &&
                                <FilterBlock onShowSorts={onShowSorts}/>
                        }
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