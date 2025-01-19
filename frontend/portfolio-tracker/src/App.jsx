import React, { useState } from "react";
import PortfolioDashboard from "./components/PortfolioDashboard";
import StockList from "./components/StockList";
import StockForm from "./components/StockForm";
import AddRandomStocksButton from "./components/AddRandomStocksButton";

const App = () => {
  const [refresh, setRefresh] = useState(false);
  const [stockToEdit, setStockToEdit] = useState(null); // State to hold the stock to edit

  // Toggle the refresh state to re-render components
  const handleRefresh = () => {
    setRefresh((prev) => !prev);
  };

  // Handle selecting a stock to edit
  const handleEdit = (stock) => {
    setStockToEdit(stock);
  };

  // Handle when editing is complete
  const handleEditComplete = () => {
    setStockToEdit(null); // Clear the stock to edit
    handleRefresh(); // Refresh the stock list
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Portfolio Tracker</h1>

      {/* Dashboard showing portfolio metrics */}
      <PortfolioDashboard refresh={refresh} />

      {/* Button to add random stocks */}
      <AddRandomStocksButton onStocksAdded={handleRefresh} />

      {/* Form to add or edit stock */}
      <StockForm
        key={stockToEdit ? `edit-${stockToEdit.id}` : `new-${Date.now()}`}
        onStockAdded={handleRefresh}
        stockToEdit={stockToEdit} // Pass the stock to edit
        onEditComplete={handleEditComplete} // Handle edit completion
      />

      {/* List of stocks with Edit and Delete actions */}
      <StockList
        refresh={refresh}
        onStockUpdated={handleRefresh}
        onEdit={handleEdit} // Pass the function to handle edits
      />
    </div>
  );
};

export default App;
