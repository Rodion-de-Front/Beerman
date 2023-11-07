import Card from '../Card/Card';
import Carusel from '../Carusel/Carusel';
import Navbar from '../Navbar/Navbar';
import FilterSortBlock from '../FilterSortBlock/FilterSortBlock';
import FilterCountryBlock from '../FilterCountryBlock/FilterCountryBlock';
import './Beer.css';
import expand_more from './img/expand_more.png';
import expand_more_2 from './img/expand_more_2.png';

function Beer( {currentItem, showSortBlock, onShowSorts, onShowCountry,showCountryBlock,  onShowProduct, onShowAddButtons, showAddButtons}  ) {
    return (
        <div>
            <Navbar currentItem={currentItem} />
            <Carusel />
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
                                <button className="fillter-btn" onClick={onShowSorts}>Сорт<img alt="" src={expand_more}/></button>
                            ) : (
                                <button className="togled-fillter-btn" onClick={onShowSorts}>Сорт<img alt="" src={expand_more_2}/></button>
                            )}
                        {showSortBlock &&
                                <FilterSortBlock/>
                        }
                        {!showCountryBlock ? (
                                <button className="fillter-btn" onClick={onShowCountry}>Страна<img alt="" src={expand_more}/></button>
                            ) : (
                                <button className="togled-fillter-btn" onClick={onShowCountry}>Страна<img alt="" src={expand_more_2}/></button>
                            )}
                        {showCountryBlock &&
                            <FilterCountryBlock/>
                        }
                        </div>
                    </div>
                </div>
                <div className="card-container"><Card showAddButtons={showAddButtons} onShowAddButtons={onShowAddButtons} onShowProduct={onShowProduct} /><Card onShowProduct= {onShowProduct} /><Card onShowProduct= {onShowProduct} /><Card onShowProduct= {onShowProduct} /><Card /><Card /></div>
            </div>



            <div className="beer-block">
                <div className="beer-header">
                    <div className="position">
                        <div className="title-sort">
                            <div className="beer-title">Закуски</div>
                            <div className="btns">
                                <button className="all-btn">Всё</button>
                                <button className="type-btn">Бутылочное</button>
                                <button className="type-btn">Разливное</button>
                            </div>
                        </div>
                        {/* <div className="filltes">
                        {!showSortBlock ? (
                                <button className="fillter-btn" onClick={onShowSorts}>Сорт<img alt="" src={expand_more}/></button>
                            ) : (
                                <button className="togled-fillter-btn" onClick={onShowSorts}>Сорт<img alt="" src={expand_more_2}/></button>
                            )}
                        {showSortBlock &&
                                <FilterBlock onShowSorts={onShowSorts}/>
                        }
                        <button className="fillter-btn">Страна<img alt="" src={expand_more}/></button>
                        </div> */}
                    </div>
                </div>
                <div className="card-container"><Card /><Card /><Card /><Card /><Card /><Card onShowProduct = {onShowProduct} /></div>
            </div>


        </div>
    );
}

export default Beer