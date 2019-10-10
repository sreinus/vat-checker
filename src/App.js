import React, {useState} from 'react';

import axios from 'axios';

import './App.css';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [details, setDetails] = useState(null);
  const [status, setStatus] = useState(null);

  const validateVat = () => {
    axios.post(
      `https://vat.erply.com/numbers?vatNumber=${inputValue}`
    ).then(res => {
      setDetails(
        {
          CountryCode: res.data.CountryCode,
          VATNumber: res.data.VATNumber,
          RequestDate: res.data.RequestDate,
          Valid: res.data.Valid,
          Name: res.data.Name,
        }
      );
      setStatus(null);
    })
    .catch(error => {
      console.log(error);
      setStatus(`${error}`);
    });
  }

  const handleChange = (e) => {
    setInputValue(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    setDetails(null);
    setStatus('Loading...');
    validateVat();
  }

  const renderDetails = () => {
    if (details) {
      return (
        <ul>
          <li><b>CountryCode:</b> {details.CountryCode}</li>
          <li><b>VATNumber:</b> {details.VATNumber}</li>
          <li><b>RequestDate:</b> {details.RequestDate}</li>
          <li><b>Valid:</b> {details.Valid ? 'true' : 'false'}</li>
          <li><b>Name:</b> {details.Name}</li>
        </ul>
      )
    }
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="Insert VAT number"
        />
        <input type="submit" value="Check" />
      </form>
      {status ? <div>{status}</div> : renderDetails()}
    </div>
  );
}

export default App;
