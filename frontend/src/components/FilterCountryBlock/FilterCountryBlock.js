import React, { useState, useEffect } from 'react';
import './FilterCountryBlock.css';

function FilterCountryBlock({onFilterCountry, selectedCountries}) {
  const [countries, setCountries] = useState([]);

  //console.log(selectedCountries)

  useEffect(() => {
    // Ваш запрос к серверу для получения данных о странах
    fetch('https://biermann-api.onixx.ru/api/items/countries')
      .then(response => response.json())
      .then(data => {
        // Установка данных в состояние
        setCountries(data.countries);
      })
      .catch(error => console.error('Ошибка при запросе данных:', error));
  }, []);

  return (
    <div className="filter-country-block">
      {countries.map((country) => (
        <div key={country.id} className="filter-type">
          <input id={`country${country.id}`} className="checkbox" type="checkbox" onChange={() => onFilterCountry(country.id)} checked={selectedCountries.includes(country.id)}/>
          <div className="filter-name">{country.name}</div>
        </div>
      ))}
    </div>
  );
}

export default FilterCountryBlock;
