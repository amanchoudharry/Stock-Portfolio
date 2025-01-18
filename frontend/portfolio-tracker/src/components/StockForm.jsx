import React, { useState } from "react";
import axios from "axios";

const StockForm = ({ onStockAdded }) => {
  const [name, setName] = useState("");
  const [ticker, setTicker] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [currPrice, setCurrPrice] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newStock = { name, ticker, quantity, currPrice: parseFloat(buyPrice) };

    try {
      await axios.post("http://localhost:8080/api/stocks", newStock);
      alert("Stock added successfully!");
      onStockAdded(); // Trigger refresh in parent component
      setName("");
      setTicker("");
      setQuantity(1);
      setCurrPrice("");
    } catch (error) {
      console.error("Error adding stock:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-4">
      <h2 className="text-xl font-bold mb-4">Add/Edit Stock</h2>
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
          value={currPrice}
          onChange={(e) => setCurrPrice(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
};

export default StockForm;
