import React, { useState, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DisplayPage from "./pages/DisplayPage";

export const WatchlistContext = createContext();

function App() {
  const [watchlist, setWatchlist] = useState([]);

  const addToWatchlist = (stock) => {
    if (!watchlist.some((item) => item.ticker === stock.ticker)) {
      setWatchlist([...watchlist, stock]);
    }
  };

  return (
    <WatchlistContext.Provider value={{ watchlist, addToWatchlist }}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/display" element={<DisplayPage />} />
        </Routes>
      </Router>
    </WatchlistContext.Provider>
  );
}

export default App;
