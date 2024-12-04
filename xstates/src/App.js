import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState("Select country");
  const [selectedState, setSelectedState] = useState("Select state");
  const [selectedCity, setSelectedCity] = useState("Select city");

  useEffect(() => {
    fetch("https://crio-location-selector.onrender.com/countries")
      .then((res) => res.json())
      .then((data) => setCountries(data))
      .catch((err) => console.error("Error fetching countries: " + err));
  }, []);

  useEffect(() => {
    if (selectedCountry !== "Select country") {
      fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`)
        .then((res) => res.json())
        .then((data) => setStates(data))
        .catch((err) => console.error("Error fetching states: " + err));
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedState !== "Select state") {
      fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`)
        .then((res) => res.json())
        .then((data) => setCities(data))
        .catch((err) => console.error("Error fetching cities: " + err));
    }
  }, [selectedState]);

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
    setSelectedState("Select state");
    setSelectedCity("Select city");
    setStates([]);
    setCities([]);
  };

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
    setSelectedCity("Select city");
    setCities([]);
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  return (
    <div>
      <select name="country" onChange={handleCountryChange}>
        <option value={selectedCountry}>{selectedCountry}</option>
        {countries.map((country, index) => (
          <option key={index} value={country}>
            {country}
          </option>
        ))}
      </select>

      <select name="state" onChange={handleStateChange} disabled={states.length === 0}>
        <option value={selectedState}>{selectedState}</option>
        {states.map((state, index) => (
          <option key={index} value={state}>
            {state}
          </option>
        ))}
      </select>


      <select name="city" onChange={handleCityChange} disabled={cities.length === 0}>
        <option value={selectedCity}>{selectedCity}</option>
        {cities.map((city, index) => (
          <option key={index} value={city}>
            {city}
          </option>
        ))}
      </select>
      {selectedCity !== "Select city" && (
  <div>
    <h3>You selected {`${selectedCity}, ${selectedState}, ${selectedCountry}`}</h3>
  </div>
)}
    </div>
  );
}

export default App;
