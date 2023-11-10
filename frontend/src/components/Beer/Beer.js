import Card from '../Card/Card';
import Carusel from '../Carusel/Carusel';
import Navbar from '../Navbar/Navbar';
import FilterSortBlock from '../FilterSortBlock/FilterSortBlock';
import FilterCountryBlock from '../FilterCountryBlock/FilterCountryBlock';
import './Beer.css';
import expand_more from './img/expand_more.png';
import expand_more_2 from './img/expand_more_2.png';
import filter_icon from './img/Group_11.png';

function Beer( {currentItem, showSortBlock, onShowSorts, onShowCountry,showCountryBlock,  onShowProduct, onShowAddButtons, showAddButtons, onLink, onReColour, showRecoloredButton}  ) {
    return (
        <div>
            <Navbar currentItem={currentItem} />
            <Carusel />
            <div className="beer-block">
                <div className="beer-header">
                    <div className="position">

                        {window.innerWidth < 800 ? (

                            <div className="menu-header">
                                <div className="beer-title">ПИВО И СИДРЫ</div>
                                <button className="mobile-filter-btn"><img alt="" src={filter_icon} /></button>
                            </div>
                        ) : (

                        <div>

                        <div className="title-sort">
                            <div className="beer-title">ПИВО И СИДРЫ</div>
                            <div className="btns">
                                <button className={showRecoloredButton === 1 ? 'selected' : 'type-btn'} onClick={() => onReColour(1)}>Всё</button>
                                <button className={showRecoloredButton === 2 ? 'selected' : 'type-btn'} onClick={() => onReColour(2)}>Бутылочное</button>
                                <button className={showRecoloredButton === 3 ? 'selected' : 'type-btn'} onClick={() => onReColour(3)}>Разливное</button>
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
                        )}
                    </div>
                </div>
                <div className="card-container"><Card onLink = {onLink} showAddButtons={showAddButtons} onShowAddButtons={onShowAddButtons} onShowProduct={onShowProduct} /><Card onShowProduct= {onShowProduct} /><Card onShowProduct= {onShowProduct} /><Card onShowProduct= {onShowProduct} /><Card /><Card /></div>
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