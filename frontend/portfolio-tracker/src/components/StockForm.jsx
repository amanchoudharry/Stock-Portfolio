import React, { useState, useEffect } from "react";
import axios from "axios";

const StockForm = ({ onStockAdded, stockToEdit, onEditComplete }) => {
  const [id, setId] = useState(null);
  const [name, setName] = useState("");
  const [ticker, setTicker] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [buyPrice, setBuyPrice] = useState("");

  useEffect(() => {
    if (stockToEdit) {
      setId(stockToEdit.id);
      setName(stockToEdit.name);
      setTicker(stockToEdit.ticker);
      setQuantity(stockToEdit.quantity);
      setBuyPrice(stockToEdit.buyPrice);
    }
  }, [stockToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const stockData = { name, ticker, quantity, buyPrice: parseFloat(buyPrice) };

    try {
      if (id) {
        // Edit existing stock
        await axios.put(`http://localhost:8080/api/stocks/${id}`, stockData);
        alert("Stock updated successfully!");
        onEditComplete(); // Notify parent component to refresh and exit edit mode
      } else {
        // Add new stock
        await axios.post("http://localhost:8080/api/stocks", stockData);
        alert("Stock added successfully!");
        onStockAdded();
      }

      // Reset form fields
      setId(null);
      setName("");
      setTicker("");
      setQuantity(1);
      setBuyPrice("");
    } catch (error) {
      console.error("Error saving stock:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-4">
      <h2 className="text-xl font-bold mb-4">{id ? "Edit Stock" : "Add Stock"}</h2>
      <div className="mb-4">
        <label className="block font-bold mb-2">Stock Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block font-bold mb-2">Ticker Symbol</label>
        <input
          type="text"
          value={ticker}
          onChange={(e) => setTicker(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block font-bold mb-2">Quantity</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block font-bold mb-2">Buy Price</label>
        <input
          type="number"
          value={buyPrice}
          onChange={(e) => setBuyPrice(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {id ? "Update Stock" : "Add Stock"}
      </button>
    </form>
  );
};

export default StockForm;
