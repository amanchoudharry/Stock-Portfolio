"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { PiggyBank, BarChartIcon as ChartNoAxesCombined, Calculator } from "lucide-react"
import { PortfolioDistribution } from "./PortfolioDistribution"

export default function PortfolioDashboard({ refresh }) {
  const [portfolioValue, setPortfolioValue] = useState(0)
  const [stockCount, setStockCount] = useState(0)
  const [topStock, setTopStock] = useState(null)
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPortfolioMetrics()
  }, [refresh])

  const fetchPortfolioMetrics = async () => {
        setLoading(true);

    try {
      const valueResponse = await axios.get(`${import.meta.env.VITE_API_URL}/api/stocks/value`)
      setPortfolioValue(valueResponse.data)

      const stocksResponse = await axios.get(`${import.meta.env.VITE_API_URL}/api/stocks`)
      const stocks = stocksResponse.data

      setStockCount(stocks.length)

      if (stocks.length > 0) {
        const top = stocks.reduce((max, stock) => (stock.currPrice > max.currPrice ? stock : max), stocks[0])
        setTopStock(top)
      }
    } catch (error) {
      console.error("Error fetching portfolio metrics:", error)
    }finally {
    setLoading(false);
    }
  }

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 p-4 w-full">
      {/* Left Column - Metrics Cards */}
      <div className="flex flex-col gap-4">
        {/* Portfolio Value Card */}
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardDescription className="flex items-center gap-2">
              <PiggyBank className="h-4 w-4" />
              Portfolio Value
            </CardDescription>
            <CardTitle>${portfolioValue.toFixed(2)}</CardTitle>
          </CardHeader>
        </Card>

        {/* Total Stocks Card */}
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardDescription className="flex items-center gap-2">
              <Calculator className="h-4 w-4" />
              Total Stocks
            </CardDescription>
            <CardTitle>{stockCount}</CardTitle>
          </CardHeader>
        </Card>

        {/* Top-Performing Stock Card */}
        {topStock && (
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardDescription className="flex items-center gap-2">
                <ChartNoAxesCombined className="h-4 w-4" />
                Top-Performing Stock
              </CardDescription>
              <CardTitle>
                {topStock.name} (${topStock.currPrice.toFixed(2)})
              </CardTitle>
            </CardHeader>
          </Card>
        )}
      </div>
      {/* Right Column - Portfolio Distribution */}
      <div className="row-span-3">
          <PortfolioDistribution refresh={refresh} />
      </div>

    </div>
  )
}

