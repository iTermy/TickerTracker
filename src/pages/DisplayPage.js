import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { restClient } from "@polygon.io/client-js";
import TickerTrackerLogo from "./TickerTrackerLogo.png";
import "./DisplayPage.css";

function DisplayPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { ticker } = location.state || { ticker: "" };

  const [priceData, setPriceData] = useState(null);
  const [error, setError] = useState(null);

  const API_KEY = "5aEkwn18xwkYWhQxG_dwsQp8K0jYH14K"; // Enter API Key

  useEffect(() => {
    const fetchStockData = async () => {
      const rest = restClient(API_KEY);

      try {
        const data = await rest.stocks.previousClose(ticker);
        if (data && data.results && data.results[0]) {
          const { o, c } = data.results[0]; // Daily open and close
          const percentChange = ((c - o) / o) * 100;
          setPriceData({ open: o, close: c, percentChange });
        }
        else {
          throw new Error("No data found for the given ticker.");
        }
      }
      catch (error) {
        setError(error.message);
      }
    };

    if (ticker) {
      fetchStockData();
    }
  }, [ticker, API_KEY]);

  return (
    <div className="display-page">
      <img
        src={TickerTrackerLogo} // Use the imported image variable
        alt="Ticker Tracker Logo"
        className="logo"
      />
      <h1 className="ticker-name">{ticker}</h1>
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
      <button
        onClick={() => navigate("/")}
        className="back-button"
      >
        Go Back
      </button>
    </div>
  );
}

export default DisplayPage;
