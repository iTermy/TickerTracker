import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TickerTrackerLogo from './TickerTrackerLogo.png';
import './HomePage.css';

function HomePage() {
  const [ticker, setTicker] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/display", { state: { ticker } });
  };

  return (
    <div className="home-page">
      <div className="logo-container">
        <img src={TickerTrackerLogo} alt="Ticker Tracker Logo" className="logo" />
      </div>
      <form onSubmit={handleSubmit} className="ticker-form">
        <input
          type="text"
          value={ticker}
          onChange={(e) => setTicker(e.target.value.toUpperCase())}
          placeholder="Enter Ticker"
          className="ticker-input"
        />
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
}

export default HomePage;
