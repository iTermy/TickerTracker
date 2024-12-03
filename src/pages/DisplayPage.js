import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

function DisplayPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { ticker } = location.state || { ticker: "" };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1 style={{ fontSize: "48px", color: "green" }}>{ticker}</h1>
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