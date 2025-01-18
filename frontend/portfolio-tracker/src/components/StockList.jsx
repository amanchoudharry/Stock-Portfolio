import React, { useState, useEffect } from "react";
import axios from "axios";

const StockList = ({ onStockUpdated }) => {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    fetchStocks();
  }, []);

  const fetchStocks = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/stocks");
      console.log(response.data)
      setStocks(response.data);
    } catch (error) {
      console.error("Error fetching stocks:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this stock?")) {
      try {
        await axios.delete(`http://localhost:8080/api/stocks/${id}`);
        alert("Stock deleted successfully!");
        fetchStocks(); // Refresh the stock list
        if (onStockUpdated) onStockUpdated(); // Notify parent component for updates
      } catch (error) {
        console.error("Error deleting stock:", error);
        alert("Failed to delete the stock. Please try again.");
      }
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Your Stocks</h2>
      {stocks.length === 0 ? (
        <p>No stocks available. Add some to get started!</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Ticker</th>
              <th className="border px-4 py-2">Quantity</th>
              <th className="border px-4 py-2">Buy Price</th>
              <th className="border px-4 py-2">Value</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((stock) => (
              <tr key={stock.ticker}>
                <td className="border px-4 py-2">{stock.name}</td>
                <td className="border px-4 py-2">{stock.ticker}</td>
                <td className="border px-4 py-2">{stock.quantity}</td>
                <td className="border px-4 py-2">${stock.buyPrice}</td>
                <td className="border px-4 py-2">
                  ${stock.currPrice && stock.currPrice > 0 ? stock.currPrice.toFixed(2) : "Fetching..."}
                </td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleDelete(stock.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 mr-2"
                  >
                    Delete
                  </button>
                  {/* Placeholder for Edit functionality */}
                  <button
                    onClick={() => alert("Edit functionality not implemented yet.")}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StockList;
