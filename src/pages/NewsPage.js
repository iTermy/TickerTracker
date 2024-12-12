import React, { useState, useEffect } from "react";
import axios from "axios";//npm install axios

function NewsPage({ ticker }) {
  const [news, setNews] = useState([]);
  const [newsError, setNewsError] = useState(null);

  const API_KEY = "JEzvbAEpCWZxR8VL5Bk3MNeSNbogdf0p"; // Removed API Key
  const API_URL = "https://api.polygon.io/v2/reference/news";

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(API_URL, {
          params: {
            apiKey: API_KEY,
            ticker: ticker, 
            limit: 5, //How many articles
          },
        });

        if (response.data.results) {
          setNews(response.data.results); //SV update
        } else {
          setNewsError("Sorry, no news!  Try again Later.");
        }
      } catch (error) {
        setNewsError(error.message); 
      }
    };

    if (ticker) {
      fetchNews(); 
    }
  }, [ticker, API_KEY]);

  return (
    <div className="news-container">
    <h2 style={{ color: "#7200ff" }}>Latest News</h2>
      {newsError ? (
        <p style={{ color: "red" }}>{newsError}</p>
      ) : news.length === 0 ? (
        <p>The news is loading....</p>
      ) : (
        <ul style={{ paddingLeft: "0", listStyleType: "none" }}>
          {news.map((article, index) => (
            <li key={index} style={{ marginBottom: "15px" }}>
              <a href={article.url} target="_blank"rel="noopener noreferrer" style={{textDecoration: "none", color: "#007bff",fontWeight: "bold"}}>
                {article.title}
              </a>
              <p style={{ fontSize: "14px", color: "#555" }}>{article.source}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default NewsPage;
