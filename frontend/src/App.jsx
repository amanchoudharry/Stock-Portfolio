import React, { useState } from "react";
import PortfolioDashboard from "./components/PortfolioDashboard";
import StockList from "./components/StockList";
import StockForm from "./components/StockForm";
import AddRandomStocksButton from "./components/AddRandomStocksButton";
import { Toaster } from "@/components/ui/toaster"
import Hero from "./components/Hero"

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
      <div className="bg-gray-800">
     <Hero />
     <div className="container mx-auto my-2 p-4 bg-gray-800">
           <h1 className="text-2xl text-gray-100 font-bold mb-4">Portfolio Metrics</h1>

           {/* Dashboard showing portfolio metrics */}
           <PortfolioDashboard refresh={refresh} />
             <div class="flex flex-col md:flex-row items-center justify-start gap-4 p-4 mt-4">
               <AddRandomStocksButton onStocksAdded={handleRefresh}  />

               <StockForm
                 key={stockToEdit ? `edit-${stockToEdit.id}` : `new-${Date.now()}`}
                 onStockAdded={handleRefresh}
                 stockToEdit={stockToEdit} // Pass the stock to edit
                 onEditComplete={handleEditComplete} // Handle edit completion
               />
             </div>
           <StockList
             refresh={refresh}
             onStockUpdated={handleRefresh}
             onEdit={handleEdit} // Pass the function to handle edits
           />
           <Toaster />
         </div>
     </div>
  );
};

export default App;
