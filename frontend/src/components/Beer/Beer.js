import { useState, useEffect } from 'react';
import Card from '../Card/Card';
import Carusel from '../Carousel/Carousel';
import Navbar from '../Navbar/Navbar';
import FilterSortBlock from '../FilterSortBlock/FilterSortBlock';
import FilterCountryBlock from '../FilterCountryBlock/FilterCountryBlock';
import './Beer.css';
import expand_more from './img/expand_more.png';
import expand_more_2 from './img/expand_more_2.png';
import filter_icon from './img/Group_11.png';
import filter_active_icon from './img/active_fiter.png';

function Beer( {currentItem, showSortBlock, onShowSorts, onShowCountry, showCountryBlock,  onShowProduct, onShowAddButtons, showAddButtons, onLink, onReColour, showRecoloredButton, onShowMenuBlock, showMenuBlock, images, onClickSnackButton, selectedSnackButton}  ) {

    const[activeBeerFilter, setActiveBeerFilter] = useState(false)

    function onFilterBeer() {
        setActiveBeerFilter(!activeBeerFilter)
    }

    const[activeSnacksFilter, setActiveSnacksFilter] = useState(false)

    function onFilterSnacks() {
        setActiveSnacksFilter(!activeSnacksFilter)
    }

    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Ваш запрос к серверу для получения массива данных
        fetch('https://biermann-api.onixx.ru/api/items/all')
          .then(response => response.json())
          .then(data => {
            setProducts(data.items);
          })
          .catch(error => console.error('Ошибка при запросе данных:', error));
      }, []);

      console.log(products)

    return (
        <div>
            <Navbar onShowMenuBlock = {onShowMenuBlock} showMenuBlock = {showMenuBlock} currentItem={currentItem} />
            <Carusel images={images} />
            <div className="beer-block">
                <div className="beer-header">
                    <div className="position">

                        {window.innerWidth < 800 ? (

                            <div className="menu-header">
                                <div className="beer-title">ПИВО И СИДРЫ</div>
                                {activeBeerFilter ? (
                                    <div className="">
                                    <button onClick = {onFilterBeer} className="active-mobile-filter-btn"><img alt="" src={filter_active_icon} /></button>
                                    <div className=""></div>
                                    </div>

                                ):(
                                    <button onClick = {onFilterBeer} className="mobile-filter-btn"><img alt="" src={filter_icon} /></button>
                                )}
                            </div>
                        ) : (

                        <div className="position">

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
                <div className="card-container">
                {products.map((product) => (
                    <Card key={product.id} product={product} onLink = {onLink} showAddButtons={showAddButtons} onShowAddButtons={onShowAddButtons} onShowProduct={onShowProduct}/>
                ))}
                </div>
            </div>

            <div className="beer-block">
                <div className="beer-header">
                    <div className="position">
                            {window.innerWidth < 800 ? (
                                <div className="menu-header">
                                <div className="beer-title">Закуски</div>
                                {activeSnacksFilter ? (
                                    <div>
                                        <button onClick = {onFilterSnacks} className="active-mobile-filter-btn"><img alt="" src={filter_active_icon} /></button>
                                        <div className=""></div>
                                    </div>
                                ):(
                                    <button onClick = {onFilterSnacks} className="mobile-filter-btn"><img alt="" src={filter_icon} /></button>
                                )}
                                </div>
                            ):(
                            <div className="title-sort">
                                <div className="beer-title">Закуски</div>
                                <div className="btns">
                                    <button className={selectedSnackButton === 1 ? 'selected' : 'type-btn'} onClick={() => onClickSnackButton(1)}>Всё</button>
                                    <button className={selectedSnackButton === 2 ? 'selected' : 'type-btn'} onClick={() => onClickSnackButton(2)}>Мясные</button>
                                    <button className={selectedSnackButton === 3 ? 'selected' : 'type-btn'} onClick={() => onClickSnackButton(3)}>Сырные</button>
                                    <button className={selectedSnackButton === 4 ? 'selected' : 'type-btn'} onClick={() => onClickSnackButton(4)}>Орешки</button>
                                </div>
                            </div>
                            )}
                    </div>
                </div>
                <div className="card-container"><Card /><Card /><Card /><Card /><Card /><Card onShowProduct = {onShowProduct} /></div>
            </div>
        </div>
    );
}

export default Beer