import React, { useState, useEffect } from "react";
import axios from "axios";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/hooks/use-toast"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const StockList = ({ refresh, onStockUpdated }) => {

  const { toast } = useToast()
  const [stocks, setStocks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stockToEdit, setStockToEdit] = useState(null);
  const [stockToDelete, setStockToDelete] = useState(null);

  useEffect(() => {
    fetchStocks();
  }, [refresh]);

  const fetchStocks = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/stocks");
      setStocks(response.data);
    } catch (error) {
      console.error("Error fetching stocks:", error);
    }
  };

  const confirmDeleteStock = (stock) => {
    setStockToDelete(stock);
  };

  const handleDelete = async () => {
    try {
      if (stockToDelete) {
        await axios.delete(`http://localhost:8080/api/stocks/${stockToDelete.id}`);
        fetchStocks(); // Refresh the stock list
        if (onStockUpdated) onStockUpdated(); // Notify parent component for updates
        toast({
            variant: "destructive",
                 title: "Stock Deleted",
                 description: `${stockToDelete.name} is removed from your portfolio.`
               })
        setStockToDelete(null); // Reset stock to delete
      }
    } catch (error) {
      console.error("Error deleting stock:", error);
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request."
        })
      setStockToDelete(null); // Reset stock to delete
    }
  };

  const handleEdit = (stock) => {
    setStockToEdit(stock);
    setIsModalOpen(true); // Open the modal
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setStockToEdit(null); // Clear the stock being edited
  };

  const handleStockUpdate = async (updatedStock) => {
    try {
      await axios.put(`http://localhost:8080/api/stocks/${updatedStock.id}`, updatedStock);
      fetchStocks(); // Refresh the stock list
      handleModalClose(); // Close the modal

       toast({
           title: "Details updated!",
           description: `${updatedStock.name} updated in your portfolio`,
           })
      if (onStockUpdated) onStockUpdated(); // Notify parent component for updates
    } catch (error) {
      console.error("Error updating stock:", error);
    }
  };

  return (
    <div className="bg-gray-800 text-gray-100 p-4">
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
              <tr key={stock.id}>
                <td className="border px-4 py-2">{stock.name}</td>
                <td className="border px-4 py-2">{stock.ticker}</td>
                <td className="border px-4 py-2">{stock.quantity}</td>
                <td className="border px-4 py-2">${stock.buyPrice}</td>
                <td className="border px-4 py-2">
                  ${stock.currPrice && stock.currPrice > 0 ? stock.currPrice.toFixed(2) : "Fetching..."}
                </td>
                <td className="border py-2 px-1">
                  <div className="flex justify-center space-x-2">
                    <AlertDialog >
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="destructive"
                          onClick={() => confirmDeleteStock(stock)}
                        >
                          Delete
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="bg-gray-800">
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                          <AlertDialogDescription className="text-gray-300">
                            This action cannot be undone. This will permanently delete {" "}
                            <strong>{stock.name}</strong>
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="text-gray-700">Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={handleDelete} className="bg-red-500 hover:bg-red-700">
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                    <Button
                      variant="secondary"
                      onClick={() => handleEdit(stock)} // Open modal with stock data
                    >
                      Edit
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {isModalOpen && (
        <EditModal
          stock={stockToEdit}
          onClose={handleModalClose}
          onUpdate={handleStockUpdate}
        />
      )}
    </div>
  );
};

const EditModal = ({ stock, onClose, onUpdate }) => {
  const [name, setName] = useState(stock.name);
  const [ticker, setTicker] = useState(stock.ticker);
  const [quantity, setQuantity] = useState(stock.quantity);
  const [buyPrice, setBuyPrice] = useState(stock.buyPrice);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({ ...stock, name, ticker, quantity, buyPrice: parseFloat(buyPrice) });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-800 p-8 rounded shadow-lg w-1/3">
        <h2 className="text-xl font-bold mb-4">Edit Stock</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-bold mb-2">Stock Name</label>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-2">Ticker Symbol</label>
            <Input
              type="text"
              value={ticker}
              onChange={(e) => setTicker(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-2">Quantity</label>
            <Input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-2">Buy Price</label>
            <Input
              type="number"
              value={buyPrice}
              onChange={(e) => setBuyPrice(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="flex justify-end space-x-4">
            <Button
              type="Button"
              variant="destructive"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              variant="secondary"
              type="submit"
            >
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StockList;
