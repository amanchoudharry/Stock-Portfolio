import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PiggyBank } from 'lucide-react';
import { ChartNoAxesCombined } from 'lucide-react';
import { Calculator } from 'lucide-react';


const PortfolioDashboard = ({refresh}) => {
  const [portfolioValue, setPortfolioValue] = useState(0);
  const [stockCount, setStockCount] = useState(0);
  const [topStock, setTopStock] = useState(null);

  useEffect(() => {
    fetchPortfolioMetrics();
  }, [refresh]);

  const fetchPortfolioMetrics = async () => {
    try {
      // Fetch total portfolio value
      const valueResponse = await axios.get("http://localhost:8080/api/stocks/value");
      setPortfolioValue(valueResponse.data);

      // Fetch all stocks
      const stocksResponse = await axios.get("http://localhost:8080/api/stocks");
      const stocks = stocksResponse.data;

      // Set the stock count
      setStockCount(stocks.length);

      // Find the top-performing stock
      if (stocks.length > 0) {
        const top = stocks.reduce(
          (max, stock) => (stock.currPrice > max.currPrice ? stock : max),
          stocks[0]
        );
        setTopStock(top);
      }
    } catch (error) {
      console.error("Error fetching portfolio metrics:", error);
    }
  };

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-3 p-4 w-3/4">
      {/* Portfolio Value Card */}
      <Card>
        <CardHeader>
          <CardDescription><PiggyBank />Portfolio Value</CardDescription>
          <CardTitle>${portfolioValue.toFixed(2)}</CardTitle>
        </CardHeader>
      </Card>

      {/* Total Stocks Card */}
      <Card>
        <CardHeader>
          <CardDescription><Calculator /> Stocks</CardDescription>
          <CardTitle>{stockCount}</CardTitle>
        </CardHeader>
      </Card>

      {/* Top-Performing Stock Card */}
      {topStock && (
        <Card>
          <CardHeader>
            <CardDescription><ChartNoAxesCombined />Top-Performing Stock</CardDescription>
            <CardTitle>{topStock.name} (${topStock.currPrice.toFixed(2)})</CardTitle>
          </CardHeader>
        </Card>
      )}
    </div>
  );
};

export default PortfolioDashboard;
