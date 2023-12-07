import './FilterSortBlock.css';

function FilterBlock() {
    return (
        <div>
            {window.innerWidth < 800 ? (
            <div className="filter-sort-block">
                <div className="filter-category">Сорт</div>
                <div className="filter-type">
                    <input id="" className="checkbox" type="checkbox" />
                    <div className="filter-name">Светлое</div>
                </div>
                <div className="filter-type">
                    <input id="" type="checkbox" />
                    <div className="filter-name">Темное</div>
                </div>
                <div className="filter-type">
                    <input id="" type="checkbox" />
                    <div className="filter-name">Лаггер</div>
                </div>
                <div className="filter-type">
                    <input id="" type="checkbox" />
                    <div className="filter-name">Сидр</div>
                </div>
                <div className="filter-category-country">Страна</div>
                <div className="filter-type">
                <input id="" className="checkbox" type="checkbox" />
                <div className="filter-name">Россия</div>
                </div>
                <div className="filter-type">
                    <input id="" type="checkbox" />
                    <div className="filter-name">Бельгий</div>
                </div>
                <div className="filter-type">
                    <input id="" type="checkbox" />
                    <div className="filter-name">Германия</div>
                </div>
                <div className="filter-type">
                    <input id="" type="checkbox" />
                    <div className="filter-name">Чехия</div>
                </div>
                <div className="filter-type">
                    <input id="" type="checkbox" />
                    <div className="filter-name">Англия</div>
                </div>
            </div>
            ):(
            <div className="filter-sort-block">
                <div className="filter-type">
                    <input id="" className="checkbox" type="checkbox" />
                    <div className="filter-name">Светлое</div>
                </div>
                <div className="filter-type">
                    <input id="" type="checkbox" />
                    <div className="filter-name">Темное</div>
                </div>
                <div className="filter-type">
                    <input id="" type="checkbox" />
                    <div className="filter-name">Лаггер</div>
                </div>
                <div className="filter-type">
                    <input id="" type="checkbox" />
                    <div className="filter-name">Сидр</div>
                </div>
            </div>
            )}
        </div>
    );
}

export default FilterBlock