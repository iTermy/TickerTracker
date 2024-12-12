import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { restClient } from "@polygon.io/client-js";
import { WatchlistContext } from "../App";
import TickerTrackerLogo from "./TickerTrackerLogo.png";
import "./DisplayPage.css";
import NewsPage from './NewsPage';

function DisplayPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { ticker } = location.state || { ticker: "" };
  const { watchlist } = useContext(WatchlistContext);

  const { addToWatchlist } = useContext(WatchlistContext);
  const [priceData, setPriceData] = useState(null);
  const [error, setError] = useState(null);

  const API_KEY = ""; // Removed API Key

  useEffect(() => {
    const fetchStockData = async () => {
      const rest = restClient(API_KEY);

      try {
        const data = await rest.stocks.previousClose(ticker);
        if (data && data.results && data.results[0]) {
          const { o, c } = data.results[0];
          const percentChange = ((c - o) / o) * 100;
          setPriceData({ open: o, close: c, percentChange });
        } else {
          throw new Error("No data found for the given ticker.");
        }
      } catch (error) {
        setError(error.message);
      }
    };

    if (ticker) {
      fetchStockData();
    }
  }, [ticker, API_KEY]);

  return (
    <div className="display-page" style={{ display: "flex" }}>
      {/* Left Side Panel */}
      <div className="news-panel">
        <NewsPage ticker={ticker}/>
      </div>

      {/* Right Side Panel */}
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
  
      {/* Main Content */}
      <div style={{ width: "80%", padding: "20px" }}>
        <img
          src={TickerTrackerLogo}
          alt="Ticker Tracker Logo"
          className="logo"
        />
        <div className="header">
          <h1 className="ticker-name">{ticker}</h1>
          <button
            className="add-watchlist-button"
            onClick={() => addToWatchlist({ ticker })}
            title="Add to Watchlist"
          >
            ➕
          </button>
        </div>
        {error ? (
          <p className="error-message">Error: {error}</p>
        ) : priceData ? (
          <div>
            <p className="stock-price">Open Price: ${priceData.open}</p>
            <p className="stock-price">Close Price: ${priceData.close}</p>
            <p
              className="stock-price"
              style={{
                color: priceData.percentChange >= 0 ? "green" : "red",
              }}
            >
              Percent Change: {priceData.percentChange.toFixed(2)}%
            </p>
          </div>
        ) : (
          <p className="loading">Loading...</p>
        )}
        <button onClick={() => navigate("/")} className="back-button">
          Go Back
        </button>
      </div>
    </div>
  );
}

export default DisplayPage;
