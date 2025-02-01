import React, { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"

const StockForm = ({ onStockAdded, onClose }) => {
    const { toast } = useToast()
  const [name, setName] = useState("");
  const [ticker, setTicker] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [buyPrice, setBuyPrice] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
      setLoading(true);
    const stockData = { name, ticker, quantity, buyPrice: parseFloat(buyPrice) };
    if (quantity <= 0 || buyPrice <= 0) {
      toast({
        title: "Invalid Input",
        description: "Quantity and Buy Price must be greater than zero.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Add new stock
      await axios.post(`${import.meta.env.VITE_API_URL}/api/stocks`, stockData);
      toast({
          title: "Stock Added!",
          description: `${stockData.name} added to your portfolio`,
          })
      onStockAdded();

      // Reset form fields
      setName("");
      setTicker("");
      setQuantity(1);
      setBuyPrice("");
      onClose(); // Close modal after adding stock
    } catch (error) {
      console.error("Error adding stock:", error);
        toast({
          title: "Error",
          description: "Failed to add stock. Please try again.",
          variant: "destructive",
        });
    }
 finally {
    setLoading(false);
  }
  };

  return (
    <form onSubmit={handleSubmit} className=" p-4 rounded ">
      <h2 className="text-xl font-bold mb-4">Add Stock</h2>
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
          type="button"
          variant="destructive"
          onClick={onClose}
          // className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
        >
          Cancel
        </Button>
        <Button type="submit" variant="secondary" disabled={loading}>
          {loading ? "Adding..." : "Add Stock"}
        </Button>
      </div>
    </form>
  );
};

const StockFormModal = ({ onStockAdded }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div>
      {/* Button to open the modal */}
      <Button
      variant="secondary"
        onClick={handleOpenModal}
        // className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 mr-2"
      >
        Add Stock
      </Button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gray-800 p-6 rounded shadow-lg w-1/3">
            <StockForm
              onStockAdded={() => {
                onStockAdded();
                handleCloseModal(); // Close modal after adding stock
              }}
              onClose={handleCloseModal} // Close modal on cancel
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default StockFormModal;
