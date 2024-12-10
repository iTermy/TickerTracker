import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { restClient } from "@polygon.io/client-js";
import TickerTrackerLogo from './TickerTrackerLogo.png';
function DisplayPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { ticker } = location.state || { ticker: "" };

  const [price, setPrice] = useState(null);
  const [error, setError] = useState(null);

  const API_KEY = ""; // Enter API Key

  useEffect(() => {
    const fetchStockPrice = async () => {
      const rest = restClient(API_KEY);

      try {
        const data = await rest.stocks.previousClose(ticker);
        if (data && data.results && data.results[0]) {
          setPrice(data.results[0].c); // `c` is daily close price
        } else {
          throw new Error("No data found for the given ticker.");
        }
      } catch (error) {
        setError(error.message);
      }
    };

    if (ticker) {
      fetchStockPrice();
    }
  }, [ticker, API_KEY]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
       <img
            src={TickerTrackerLogo}  // Use the imported image variable
            alt="Ticker Tracker Logo"
            style={{ width: '30%', height: '30%', objectFit: 'cover' }} // Adjusted size
          />
      <h1 style={{ fontSize: "48px", color: "#7200ff !important" }}>{ticker}</h1>
      {error ? (
        <p style={{ color: "red" }}>Error: {error}</p>
      ) : price !== null ? (
        <p style={{ fontSize: "24px" }}>Previous Close Price: ${price}</p>
      ) : (
        <p style={{ fontSize: "24px", color: "#7200ff !important" }}>Loading...</p>
      )}
      <button
        onClick={() => navigate("/")}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#7200ff",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Go Back
      </button>
    </div>
  );
}

export default DisplayPage;
