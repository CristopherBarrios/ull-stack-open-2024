import { useState } from 'react'
import axios from 'axios'
import './App.css';


const Filter = ({ text, value, change }) => (
  <div>
    {text} <input value={value} onChange={change} />
  </div>
);

const Country = ({country,showCountryDetails}) => {

  return (
  <div>
    {country.name}
    <button value={country.name} onClick={() => showCountryDetails(country)}>Show</button>
    </div>
    )
}

const Countries = ({ countries, showCountryDetails }) => {
  return countries.length > 1 ? (
    <>
      {countries.map(country => (
        <div key={country.alpha3Code}>
          <Country country={country} showCountryDetails={showCountryDetails} />
        </div>
      ))}
    </>
  ) : (
    <>
      {countries.map(country => (
        <div key={country.alpha3Code}>
          <h1>{country.name}</h1>
          <p>Capital: {country.capital}</p>
          <p>Area: {country.area} sq. km</p>
          <div>
            <h3>Languages:</h3>
            <ul>
              {country.languages.map(language => (
                <li key={language.name}>{language.name}</li>
              ))}
            </ul>
          </div>
          <img src={country.flag} alt={`${country.name} flag`} />
        </div>
      ))}
    </>
  );
};


function App() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  

  const handleSearchTerm = (event) => {
    setSearchTerm(event.target.value);
    searchCountry(event.target.value);
  }



  const searchCountry = (value) => {

    if (value.trim() === '') {
      setErrorMessage('Please enter a country name')
      setCountries([]);
      return;
    }
    axios
    .get(`https://restcountries.com/v2/name/${value}`)
    .then(response => {
      setCountries(response.data.rates)

      if (response.data.status === 404) {
        setErrorMessage('Country not found')
        setCountries([]);
        return;
      }

      if (response.data.length > 10) {
        setErrorMessage('Too many matches, please provide a more specific query')
        setCountries([]);
        return;
      }
      setCountries(response.data);
      setErrorMessage('');
    })      

  }
  const showCountryDetails = (country) => {
    setCountries([country]);
  };

  return (
    <>
    <Filter text={"find countries"} value={searchTerm} change={handleSearchTerm}/>
    {errorMessage && <p>{errorMessage}</p>}
    <Countries countries={countries} showCountryDetails={showCountryDetails}/>
    </>
  )
}

export default App
