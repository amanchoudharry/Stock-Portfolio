import React, { useState } from "react";
import PortfolioDashboard from "./components/PortfolioDashboard";
import StockList from "./components/StockList";
import StockForm from "./components/StockForm";
import AddRandomStocksButton from "./components/AddRandomStocksButton";

const App = () => {
  const [refresh, setRefresh] = useState(false);

  // Toggle the refresh state to re-render components
  const handleRefresh = () => {
    setRefresh(!refresh);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Portfolio Tracker</h1>

      {/* Dashboard showing portfolio metrics */}
      <PortfolioDashboard key={refresh} />

      {/* Button to add random stocks */}
      <AddRandomStocksButton onStocksAdded={handleRefresh} />

      {/* Form to add or edit stocks */}
      <StockForm onStockAdded={handleRefresh} />

      {/* Table displaying current stocks */}
      <StockList key={refresh} onStockUpdated={handleRefresh} />
    </div>
  );
};

export default App;
