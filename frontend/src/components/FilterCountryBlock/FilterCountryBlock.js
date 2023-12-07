import React, { useState, useEffect } from 'react';
import './FilterCountryBlock.css';

function FilterCountryBlock() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    // Ваш запрос к серверу для получения данных о странах
    fetch('https://biermann-api.onixx.ru/api/items/countries')
      .then(response => response.json())
      .then(data => {
        // Установка данных в состояние
        setCountries(data.countries);
      })
      .catch(error => console.error('Ошибка при запросе данных:', error));
  }, []); // Пустой массив зависимостей означает, что эффект будет выполнен только один раз после монтирования компонента

  return (
    <div className="filter-country-block">
      {countries.map((country, index) => (
        <div key={index} className="filter-type">
          <input id={`checkbox${index}`} className="checkbox" type="checkbox" />
          <div className="filter-name">{country.name}</div>
        </div>
      ))}
    </div>
  );
}

export default FilterCountryBlock;
