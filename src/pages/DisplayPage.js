import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { restClient } from "@polygon.io/client-js";

function DisplayPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { ticker } = location.state || { ticker: "" };

  const [price, setPrice] = useState(null);
  const [error, setError] = useState(null);

  const API_KEY = "";

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
      <h1 style={{ fontSize: "48px", color: "green" }}>{ticker}</h1>
      {error ? (
        <p style={{ color: "red" }}>Error: {error}</p>
      ) : price !== null ? (
        <p style={{ fontSize: "24px" }}>Previous Close Price: ${price}</p>
      ) : (
        <p style={{ fontSize: "24px" }}>Loading...</p>
      )}
      <button
        onClick={() => navigate("/")}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "blue",
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
