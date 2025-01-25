import React, { useState } from "react";
import axios from "axios";
"use client";
import { Button } from "@/components/ui/button";
import { Dices, Loader } from "lucide-react"; // Import Loader icon
import { useToast } from "@/hooks/use-toast";

const AddRandomStocksButton = ({ onStocksAdded }) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false); // State to track loading

  const handleAddStocks = async () => {
    setLoading(true); // Set loading to true
    try {
      const response = await axios.get("http://localhost:8080/api/stocks/random");
      console.log("Random stocks added:", response.data);
      if (onStocksAdded) {
        onStocksAdded(); // Refresh stock list and portfolio value
      }
      toast({
        description: "5 Stocks have been added to your Portfolio",
      });
    } catch (error) {
         console.error("Error adding random stocks:", error);
         let msg = "Failed to add stocks. Please try again.";

         if (error.message === "Request failed with status code 500") {
           msg = "API limit reached.";
         }

         toast({
           title: msg,
           description: "Failed to add stocks. Please try again later or use VPN.",
           variant: "destructive",
         });
       } finally {
         setLoading(false);  // Set loading to false
    }
  };

  return (
    <Button
      onClick={handleAddStocks}
      disabled={loading} // Disable button while loading
      className={`px-4 py-2 text-gray-900 rounded shadow ${
        loading ? "bg-gray-300" : "bg-blue-200 hover:bg-blue-400"
      }`}
    >
      {loading ? (
        <Loader className="animate-spin w-4 h-4 mr-2" /> // Show spinning loader
      ) : (
        <Dices className="mr-2" />
      )}
      {loading ? "Acquiring..." : "Add Random Stocks"}
    </Button>
  );
};

export default AddRandomStocksButton;
