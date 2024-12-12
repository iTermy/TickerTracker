import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import TickerTrackerLogo from './TickerTrackerLogo.png';
import './HomePage.css';
import { WatchlistContext } from "../App";

function HomePage() {
  const [ticker, setTicker] = useState("");
  const navigate = useNavigate();
  const { watchlist } = useContext(WatchlistContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ticker.trim() !== "") {
      navigate("/display", { state: { ticker } });
    }
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
      <div className="watchlist">
        <h2>Watchlist</h2>
        <div className="watchlist-items">
          {watchlist.map((item) => (
            <div
              key={item.ticker}
              className="watchlist-item"
              onClick={() => navigate("/display", { state: { ticker: item.ticker } })}
            >
              <p>{item.ticker}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
