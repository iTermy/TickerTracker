import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const [ticker, setTicker] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/display", { state: { ticker } });
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <div style={{ marginBottom: "20px" }}>
        <div
          style={{
            width: "100px",
            height: "100px",
            backgroundColor: "blue",
            borderRadius: "50%",
            display: "inline-block",
            textAlign: "center",
            lineHeight: "100px",
            color: "white",
            fontWeight: "bold",
          }}
        >
          Logo
        </div>
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
            backgroundColor: "blue",
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