import './FilterBlock.css';

function FilterBlock( {onShowSorts} ) {
    return (
        <div className="filter-block">
            <div className="filter-type">
                <input className="checkbox" id="" type="checkbox" />
                <span></span>
                <div class="filter-name">Светлое</div>
            </div>
            <div className="filter-type">
                <input id="" type="checkbox" />
                <div class="filter-name">Темное</div>
            </div>
            <div className="filter-type">
                <input id="" type="checkbox" />
                <div class="filter-name">Лаггер</div>
            </div>
            <div className="filter-type">
                <input id="" type="checkbox" />
                <div class="filter-name">Сидр</div>
            </div>
            <div className="apply-btn" onClick={onShowSorts}>Применить</div>
        </div>
    );
}

export default FilterBlock