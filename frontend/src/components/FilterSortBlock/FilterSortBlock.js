import './FilterSortBlock.css';
import React, { useState, useEffect } from 'react';

function FilterBlock({onFilter, selectedSorts, selectedCountries, onFilterCountry}) {

    const [sorts, setSorts] = useState([]);
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        // Ваш запрос к серверу для получения данных о странах
        fetch('https://biermann-api.onixx.ru/api/items/brewing_types')
          .then(response => response.json())
          .then(data => {
            // Установка данных в состояние
            setSorts(data.brewing_types);
          })
          .catch(error => console.error('Ошибка при запросе данных:', error));

        fetch('https://biermann-api.onixx.ru/api/items/countries')
            .then(response => response.json())
            .then(data => {
                // Установка данных в состояние
                setCountries(data.countries);
            })
            .catch(error => console.error('Ошибка при запросе данных:', error));
    }, []);

    return (
        <div>
            {window.innerWidth < 800 ? (
            <div className="filter-sort-block">
                <div className="filter-category">Сорт</div>
                {sorts.map((sort) => (
                  <div key={sort.id} className="filter-type">
                    <input id={`sort${sort.id}`} onChange={() => onFilter(sort.id)} className="checkbox" type="checkbox" checked={selectedSorts.includes(sort.id)}/>
                    <div className="filter-name">{sort.name}</div>
                  </div>
                ))}
                <div className="filter-category-country">Страна</div>
                {countries.map((country) => (
                    <div key={country.id} className="filter-type">
                    <input id={`country${country.id}`}  onChange={() => onFilterCountry(country.id)} className="checkbox" type="checkbox" checked={selectedCountries.includes(country.id)}/>
                    <div className="filter-name">{country.name}</div>
                    </div>
                ))}
            </div>
            ):(
            <div className="filter-sort-block">
                {sorts.map((sort) => (
                  <div key={sort.id} className="filter-type">
                    <input id={`sort${sort.id}`}
                    onChange={() => onFilter(sort.id)} className="checkbox" type="checkbox" checked={selectedSorts.includes(sort.id)}/>
                    <div className="filter-name">{sort.name}</div>
                  </div>
                ))}
            </div>
            )}
        </div>
    );
}

export default FilterBlock