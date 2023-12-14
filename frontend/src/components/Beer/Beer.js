import { useState, useEffect } from 'react';
import Card from '../Card/Card';
import Product from "../Product/Product";
import Carusel from '../Carousel/Carousel';
import Navbar from '../Navbar/Navbar';
import FilterSortBlock from '../FilterSortBlock/FilterSortBlock';
import FilterCountryBlock from '../FilterCountryBlock/FilterCountryBlock';
import './Beer.css';
import expand_more from './img/expand_more.png';
import expand_more_2 from './img/expand_more_2.png';
import filter_icon from './img/Group_11.png';
import filter_active_icon from './img/active_fiter.png';
function Beer( {items, handleClickLink, currentItem, showSortBlock, onShowSorts, onShowCountry, showCountryBlock,  onShowProduct, onLink, onShowMenuBlock, showMenuBlock, images, profileName, showProductBlock}  ) {

    const[activeBeerFilter, setActiveBeerFilter] = useState(false)

    function onFilterBeer() {
        setActiveBeerFilter(!activeBeerFilter)
    }

    const[activeSnacksFilter, setActiveSnacksFilter] = useState(false)

    function onFilterSnacks() {
        setActiveSnacksFilter(!activeSnacksFilter)
    }

    const [Beer, setBeer] = useState([]);
    const [Snacks, setSnacks] = useState([]);
    const [SnacksFilters, setSnacksFilters] = useState([]);
    const [Drinks, setDrinks] = useState([]);
    const [CartItems, setCartItems] = useState([]);
    const [productList, setProductList] = useState([])

    function getCart() {
        if (localStorage.getItem("token") === null) {

            fetch(`https://biermann-api.onixx.ru/api/cart/all?cart_id=${localStorage.getItem("cart_id")}`, {
            method: "GET",
            })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setCartItems(data.items)
            })
            .catch((error) => {
                console.log(error);
            });

        } else {

            fetch(`https://biermann-api.onixx.ru/api/cart/all`, {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            },
            })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setCartItems(data.items)
            })
            .catch((error) => {
                console.log(error);
            });
        }
    }

    useEffect(() => {
        const fetchData = async () => {
          try {
            // Первый запрос
            const response1 = await fetch('https://biermann-api.onixx.ru/api/items/all?category_ids=15');
            const data1 = await response1.json();

            // Второй запрос
            const response2 = await fetch('https://biermann-api.onixx.ru/api/items/all?category_ids=16');
            const data2 = await response2.json();

            // Третий запрос
            const response3 = await fetch('https://biermann-api.onixx.ru/api/items/all?category_ids=17');
            const data3 = await response3.json();

            // Объединение результатов
            const combinedData = [...data1.items, ...data2.items, ...data3.items];

            // Установка объединенных данных в состояние
            setBeer(combinedData);

            // Первый запрос
            const response4 = await fetch('https://biermann-api.onixx.ru/api/items/all?category_ids=13');
            const snacks = await response4.json();

            setSnacks(snacks.items)

            // Первый запрос
            const response5 = await fetch('https://biermann-api.onixx.ru/api/items/all?category_ids=14');
            const drinks = await response5.json();

            setDrinks(drinks.items)

            //запрос на получение данных из корзины если они есть
            const response6 = await fetch('https://biermann-api.onixx.ru/api/items/category/13/types');
            const snacksFilters = await response6.json();

            setSnacksFilters(snacksFilters.types)

          } catch (error) {
            console.error('Ошибка при запросе данных:', error);
          }
        };

        // Вызов функции fetchData
        fetchData();
        getCart();
      }, []);

    //   console.log(Beer)

    // функция для филтров пива
    const [showRecoloredButton, setSelectedButton] = useState(1);

    const onReColour = (buttonId) => {

        setSelectedButton(buttonId);
        setSelectedCountries([]);
        setSelectedSorts([]);

        if(buttonId === 1) {
            const fetchData = async () => {
                try {
                  // Первый запрос
                  const response1 = await fetch('https://biermann-api.onixx.ru/api/items/all?category_ids=15');
                  const data1 = await response1.json();

                  // Второй запрос
                  const response2 = await fetch('https://biermann-api.onixx.ru/api/items/all?category_ids=16');
                  const data2 = await response2.json();

                  // Третий запрос
                  const response3 = await fetch('https://biermann-api.onixx.ru/api/items/all?category_ids=17');
                  const data3 = await response3.json();

                  // Объединение результатов
                  const combinedData = [...data1.items, ...data2.items, ...data3.items];

                  // Установка объединенных данных в состояние
                  setBeer(combinedData);
                } catch (error) {
                    console.error('Ошибка при запросе данных:', error);
                }
            }
            fetchData();
        } else {

            fetch(`https://biermann-api.onixx.ru/api/items/all?category_ids=${buttonId}`, {
            method: "GET",
            })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setBeer(data.items)
            })
            .catch((error) => {
                console.log(error);
            });

        }

    }

    const [checked, setCheckInput] = useState([])
    const [url, setUrl] = useState("https://biermann-api.onixx.ru/api/items/all?")
    const [urlWithCategoryBottle, setUrlWithCategoryBottle] = useState(`https://biermann-api.onixx.ru/api/items/all?category_ids=16`)
    const [urlWithCategoryDraft, setUrlWithCategoryDraft] = useState(`https://biermann-api.onixx.ru/api/items/all?category_ids=15`)
    const [selectedSorts, setSelectedSorts] = useState([])
    const [selectedCountries, setSelectedCountries] = useState([])

    function onFilterCountry(sortId) {

        let checkCountry = document.getElementById(`country${sortId}`)

        if (checkCountry.checked) {

            setSelectedCountries([...selectedCountries, sortId])

            if (showRecoloredButton === 1) {

                setUrl(url + `&country_ids=${sortId}`)
                console.log(url)
                fetch(url + `&country_ids=${sortId}`, {
                    method: "GET",
                    })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log(data);
                        setBeer(data.items)
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
            if (showRecoloredButton === 16) {
                setUrlWithCategoryBottle(urlWithCategoryBottle + `&country_ids=${sortId}`)
                console.log(urlWithCategoryBottle)
                fetch(urlWithCategoryBottle + `&country_ids=${sortId}`, {
                    method: "GET",
                    })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log(data);
                        setBeer(data.items)
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
            if (showRecoloredButton === 15) {
                setUrlWithCategoryDraft(urlWithCategoryDraft + `&country_ids=${sortId}`)
                console.log(urlWithCategoryDraft)
                fetch(urlWithCategoryDraft + `&country_ids=${sortId}`, {
                    method: "GET",
                    })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log(data);
                        setBeer(data.items)
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }

        } else {

            setSelectedCountries(selectedCountries.filter((id) => id !== sortId));

            console.log(url)
            let suburl = '&country_ids=' + sortId;
            if (url.replace(new RegExp(suburl, 'g'), '') === "https://biermann-api.onixx.ru/api/items/all?" && showRecoloredButton === 1) {
                const fetchData = async () => {
                    try {
                      // Первый запрос
                      const response1 = await fetch('https://biermann-api.onixx.ru/api/items/all?category_ids=15');
                      const data1 = await response1.json();

                      // Второй запрос
                      const response2 = await fetch('https://biermann-api.onixx.ru/api/items/all?category_ids=16');
                      const data2 = await response2.json();

                      // Третий запрос
                      const response3 = await fetch('https://biermann-api.onixx.ru/api/items/all?category_ids=17');
                      const data3 = await response3.json();

                      // Объединение результатов
                      const combinedData = [...data1.items, ...data2.items, ...data3.items];

                      // Установка объединенных данных в состояние
                      setBeer(combinedData);
                    } catch (error) {
                        console.error('Ошибка при запросе данных:', error);
                    }
                }
                fetchData();
            }
            if (url.replace(new RegExp(suburl, 'g'), '') !== "https://biermann-api.onixx.ru/api/items/all?") {
                let suburl = '&country_ids=' + sortId;
                console.log(suburl);
                setUrl(url.replace(new RegExp(suburl, 'g'), ''))
                fetch(url.replace(new RegExp(suburl, 'g'), ''), {
                    method: "GET",
                    })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log(data);
                        setBeer(data.items)
                    })
                    .catch((error) => {
                        console.log(error);
                });
            }

            if (showRecoloredButton === 16) {
                    let suburl = '&country_ids=' + sortId;
                    console.log(suburl);
                    setUrlWithCategoryBottle(urlWithCategoryBottle.replace(new RegExp(suburl, 'g'), ''))
                    fetch(urlWithCategoryBottle.replace(new RegExp(suburl, 'g'), ''), {
                        method: "GET",
                        })
                        .then((response) => response.json())
                        .then((data) => {
                            console.log(data);
                            setBeer(data.items)
                        })
                        .catch((error) => {
                            console.log(error);
                    });
            }

            if (showRecoloredButton === 15) {
                let suburl = '&country_ids=' + sortId;
                console.log(suburl);
                setUrlWithCategoryDraft(urlWithCategoryDraft.replace(new RegExp(suburl, 'g'), ''))
                fetch(urlWithCategoryDraft.replace(new RegExp(suburl, 'g'), ''), {
                    method: "GET",
                    })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log(data);
                        setBeer(data.items)
                    })
                    .catch((error) => {
                        console.log(error);
                });
            }
        }

    }

    function onFilter(sortId) {

        console.log(showRecoloredButton)

        let checkSort = document.getElementById(`sort${sortId}`)

        if (checkSort.checked) {

            setSelectedSorts([...selectedSorts, sortId])

            if (showRecoloredButton === 1) {

                setUrl(url + `&brewing_type_ids=${sortId}`)
                console.log(url)
                fetch(url + `&brewing_type_ids=${sortId}`, {
                    method: "GET",
                    })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log(data);
                        setBeer(data.items)
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
            if (showRecoloredButton === 16) {
                setUrlWithCategoryBottle(urlWithCategoryBottle + `&brewing_type_ids=${sortId}`)
                console.log(urlWithCategoryBottle)
                fetch(urlWithCategoryBottle + `&brewing_type_ids=${sortId}`, {
                    method: "GET",
                    })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log(data);
                        setBeer(data.items)
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
            if (showRecoloredButton === 15) {

                setUrlWithCategoryDraft(urlWithCategoryDraft + `&brewing_type_ids=${sortId}`)
                console.log(urlWithCategoryDraft)
                fetch(urlWithCategoryDraft + `&brewing_type_ids=${sortId}`, {
                    method: "GET",
                    })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log(data);
                        setBeer(data.items)
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }

        } else {

            setSelectedSorts(selectedSorts.filter((id) => id !== sortId));

            console.log(url)
            let suburl = '&brewing_type_ids=' + sortId;
            if (url.replace(new RegExp(suburl, 'g'), '') === "https://biermann-api.onixx.ru/api/items/all?" && showRecoloredButton === 1) {
                const fetchData = async () => {
                    try {
                      // Первый запрос
                      const response1 = await fetch('https://biermann-api.onixx.ru/api/items/all?category_ids=15');
                      const data1 = await response1.json();

                      // Второй запрос
                      const response2 = await fetch('https://biermann-api.onixx.ru/api/items/all?category_ids=16');
                      const data2 = await response2.json();

                      // Третий запрос
                      const response3 = await fetch('https://biermann-api.onixx.ru/api/items/all?category_ids=17');
                      const data3 = await response3.json();

                      // Объединение результатов
                      const combinedData = [...data1.items, ...data2.items, ...data3.items];

                      // Установка объединенных данных в состояние
                      setBeer(combinedData);
                    } catch (error) {
                        console.error('Ошибка при запросе данных:', error);
                    }
                }
                fetchData();
            }
            if (url.replace(new RegExp(suburl, 'g'), '') !== "https://biermann-api.onixx.ru/api/items/all?") {
                let suburl = '&brewing_type_ids=' + sortId;
                console.log(suburl);
                setUrl(url.replace(new RegExp(suburl, 'g'), ''))
                console.log(url.replace(new RegExp(suburl, 'g'), ''))
                fetch(url.replace(new RegExp(suburl, 'g'), ''), {
                    method: "GET",
                    })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log(data);
                        setBeer(data.items)
                    })
                    .catch((error) => {
                        console.log(error);
                });
            }

            if (showRecoloredButton === 16) {
                console.log(urlWithCategoryBottle)
                    let suburl = '&brewing_type_ids=' + sortId;
                    console.log(suburl);
                    console.log(urlWithCategoryBottle.replace(suburl, ""))
                    setUrlWithCategoryBottle(urlWithCategoryBottle.replace(new RegExp(suburl, 'g'), ''))
                    fetch(urlWithCategoryBottle.replace(suburl, ""), {
                        method: "GET",
                        })
                        .then((response) => response.json())
                        .then((data) => {
                            console.log(data);
                            setBeer(data.items)
                        })
                        .catch((error) => {
                            console.log(error);
                    });
            }

            if (showRecoloredButton === 15) {
                let suburl = '&brewing_type_ids=' + sortId;
                console.log(suburl);
                setUrlWithCategoryDraft(urlWithCategoryDraft.replace(new RegExp(suburl, 'g'), ''))
                fetch(urlWithCategoryDraft.replace(suburl, ""), {
                    method: "GET",
                    })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log(data);
                        setBeer(data.items)
                    })
                    .catch((error) => {
                        console.log(error);
                });
            }
        }

    }

    // функция для филтров закусок
    const [selectedSnackButton, setSelectedSnackButton] = useState(0);

    const onClickSnackButton = (buttonId) => {

        setSelectedSnackButton(buttonId);

        if (buttonId === 0) {

            fetch(`https://biermann-api.onixx.ru/api/items/all?category_ids=13`, {
            method: "GET",
            })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setSnacks(data.items)
            })
            .catch((error) => {
                console.log(error);
            });

        } else {
            fetch(`https://biermann-api.onixx.ru/api/items/all?category_ids=13&type_ids=${buttonId}`, {
            method: "GET",
            })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setSnacks(data.items)
            })
            .catch((error) => {
                console.log(error);
            });
        }

    }

    return (
        <div>
            <Navbar onShowMenuBlock = {onShowMenuBlock} showMenuBlock = {showMenuBlock} currentItem={currentItem} profileName={profileName} />
            <Carusel images={images} />
            <div className="beer-block">
                <div className="beer-header">
                    <div className="position">

                        {window.innerWidth < 800 ? (

                            <div className="menu-header">
                                <div className="beer-title">ПИВО И СИДРЫ</div>
                                {activeBeerFilter ? (
                                    <div>
                                        <button onClick = {onFilterBeer} className="active-mobile-filter-btn"><img alt="" src={filter_active_icon} /></button>
                                        <div className="mobile-filters-block">
                                            <FilterSortBlock onFilterCountry={onFilterCountry} selectedCountries={selectedCountries} selectedSorts={selectedSorts} onFilter={onFilter}/>
                                        </div>
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
                                <button className={showRecoloredButton === 16 ? 'selected' : 'type-btn'} onClick={() => onReColour(16)}>Бутылочное</button>
                                <button className={showRecoloredButton === 15 ? 'selected' : 'type-btn'} onClick={() => onReColour(15)}>Разливное</button>
                            </div>
                        </div>

                        <div className="filltes">
                        {!showSortBlock ? (
                                <button className="fillter-btn" onClick={onShowSorts}>Сорт<img alt="" src={expand_more}/></button>
                            ) : (
                                <button className="togled-fillter-btn" onClick={onShowSorts}>Сорт<img alt="" src={expand_more_2}/></button>
                        )}
                        {showSortBlock &&
                                <FilterSortBlock onFilterCountry={onFilterCountry} selectedCountries={selectedCountries} selectedSorts={selectedSorts} onFilter={onFilter}/>
                        }
                        {!showCountryBlock ? (
                                <button className="fillter-btn" onClick={onShowCountry}>Страна<img alt="" src={expand_more}/></button>
                            ) : (
                                <button className="togled-fillter-btn" onClick={onShowCountry}>Страна<img alt="" src={expand_more_2}/></button>
                            )}
                        {showCountryBlock &&
                            <FilterCountryBlock selectedCountries={selectedCountries} onFilterCountry={onFilterCountry}/>
                        }
                        </div>

                        </div>
                        )}
                    </div>
                </div>
                <div className="card-container">
                {Beer.map((beer) => {
                    const isInCart = CartItems && CartItems.some(item => item.product_id === beer.id);
                    return (
                    <Card
                        key={beer.id}
                        product={beer}
                        onLink={onLink}
                        onShowProduct={onShowProduct}
                        extraVariable={isInCart}
                        CartItems={CartItems}
                    />
                    );
                })}
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
                                        {SnacksFilters.map((snacksFilters, index) => (
                                            <div key={index} className="filter-snacks-block">
                                                {Array.from({ length: SnacksFilters.length }).map((_, fieldIndex) => (
                                                <div key={fieldIndex} className="filter-type">
                                                    <input id={`checkbox${index}-${fieldIndex}`} type="checkbox" />
                                                    <div className="filter-name">{SnacksFilters[fieldIndex].name}</div>
                                                </div>
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                ):(
                                    <button onClick = {onFilterSnacks} className="mobile-filter-btn"><img alt="" src={filter_icon} /></button>
                                )}
                                </div>
                            ):(
                            <div className="title-sort">
                                <div className="beer-title">Закуски</div>
                                    <div className="btns">
                                        <button className={selectedSnackButton === 0 ? 'selected' : 'type-btn'} onClick={() => onClickSnackButton(0)}>Всё</button>
                                        {SnacksFilters.map((snacksFilters) => (
                                            <button
                                            id={snacksFilters.id}
                                            key={snacksFilters.id} // добавляем ключ для уникальной идентификации каждой кнопки
                                            className={selectedSnackButton === snacksFilters.id ? 'selected' : 'type-btn'}
                                            onClick={() => onClickSnackButton(snacksFilters.id)}
                                            >
                                            {snacksFilters.name}
                                            </button>
                                        ))}
                                    </div>
                            </div>
                            )}
                    </div>
                </div>
                <div className="card-container">
                {Snacks.map((snacks) => {
                    const isInCart = CartItems && CartItems.some(item => item.product_id === snacks.id);
                    return (
                        <Card extraVariable={isInCart} CartItems={CartItems} key={snacks.id} product={snacks} onLink={onLink} />
                    );
                })}
                </div>
            </div>

            <div className="beer-block">
                <div className="beer-header">
                    <div className="position2">
                        <div className="menu-header">
                            <div className="beer-title">Б/a напитки</div>

                            </div>
                    </div>
                </div>
                <div className="card-container">
                {Drinks.map((drinks) => {
                    const isInCart = CartItems && CartItems.some(item => item.product_id === drinks.id);
                    return (
                        <Card extraVariable={isInCart} CartItems={CartItems} key={drinks.id} product={drinks} onLink={onLink} />
                    );
                })}
                </div>
            </div>
            {showProductBlock &&
                <Product items = {items} onShowProduct = {onShowProduct}/>
            }
        </div>
    );
}

export default Beer