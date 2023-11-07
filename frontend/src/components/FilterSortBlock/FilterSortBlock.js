import './FilterSortBlock.css';

function FilterBlock() {
    return (
        <div className="filter-sort-block">
            <div className="filter-type">
                <input id="" className="checkbox" type="checkbox" />
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
        </div>
    );
}

export default FilterBlock