import React, { useState, useEffect } from "react";
import axios from "axios";

const PortfolioDashboard = () => {
  const [portfolioValue, setPortfolioValue] = useState(0);
  const [stockCount, setStockCount] = useState(0);
  const [topStock, setTopStock] = useState(null);

  useEffect(() => {
    fetchPortfolioMetrics();
  }, []);

  const fetchPortfolioMetrics = async () => {
    try {
      // Fetch total portfolio value
      const valueResponse = await axios.get("http://localhost:8080/api/stocks/value");
      setPortfolioValue(valueResponse.data);

      // Fetch all stocks
      const stocksResponse = await axios.get("http://localhost:8080/api/stocks");
      const stocks = stocksResponse.data;

      // Set the stock count
      setStockCount(stocks.length);

      // Find the top-performing stock
      if (stocks.length > 0) {
        const top = stocks.reduce(
          (max, stock) => (stock.currPrice > max.currPrice ? stock : max),
          stocks[0]
        );
        setTopStock(top);
      }
    } catch (error) {
      console.error("Error fetching portfolio metrics:", error);
    }
  };

  return (
    <div className="bg-gray-100 p-4 rounded shadow mb-4">
      <h2 className="text-xl font-bold">Portfolio Dashboard</h2>
      <p className="text-lg">Total Portfolio Value: ${portfolioValue.toFixed(2)}</p>
      <p className="text-lg">Total Stocks: {stockCount}</p>
      {topStock && (
        <p className="text-lg">
          Top-Performing Stock: {topStock.name} (${topStock.currPrice.toFixed(2)})
        </p>
      )}
    </div>
  );
};

export default PortfolioDashboard;
