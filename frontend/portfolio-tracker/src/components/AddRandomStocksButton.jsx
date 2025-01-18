import React from "react";
import axios from "axios";

const AddRandomStocksButton = ({ onStocksAdded }) => {
  const handleAddStocks = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/stocks/random");
      console.log("Random stocks added:", response.data);
      if (onStocksAdded) {
        onStocksAdded(); // Refresh stock list and portfolio value
      }
    } catch (error) {
      console.error("Error adding random stocks:", error);
    }
  };

  return (
    <button
      onClick={handleAddStocks}
      className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
    >
      Add Random Stocks
    </button>
  );
};

export default AddRandomStocksButton;
