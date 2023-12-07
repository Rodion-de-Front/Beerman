import './FilterCountryBlock.css';

function FilterCountryBlock() {
    return (
        <div className="filter-country-block">
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
    );
}

export default FilterCountryBlock