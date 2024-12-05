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
    <div style={{ textAlign: "center", marginTop: "50px", backgroundColor: "white", color: "white", height: "100vh" }}>
      <div style={{ marginBottom: "20px" }}>
        <div>
        <img src={TickerTrackerLogo} alt="Ticker Tracker Logo" style={{ width: '30%', height: '30%', objectFit: 'cover' }}/>       </div>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={ticker}
          onChange={(e) => setTicker(e.target.value)}
          placeholder="Enter Ticker"
          style={{ padding: "10px", fontSize: "16px" }}
        />
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            marginLeft: "10px",
            fontSize: "16px",
            backgroundColor: "#7200ff",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default HomePage;