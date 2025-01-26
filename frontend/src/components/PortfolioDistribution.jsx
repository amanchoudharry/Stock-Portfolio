import React, { useState, useEffect } from "react"
import axios from "axios"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884D8",
  "#82CA9D",
  "#A4DE6C",
  "#D0ED57",
  "#FFA07A",
  "#20B2AA",
  "#B0C4DE",
  "#DDA0DD",
]

export function PortfolioDistribution() {
  const [stocks, setStocks] = useState([])
  const [portfolioValue, setPortfolioValue] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const stocksResponse = await axios.get("http://localhost:8080/api/stocks")
        setStocks(stocksResponse.data)

        const valueResponse = await axios.get("http://localhost:8080/api/stocks/value")
        setPortfolioValue(valueResponse.data)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    fetchData()
  }, [])

  const chartData = stocks.map((stock) => ({
    name: stock.name,
    value: stock.quantity * stock.currPrice,
    ticker: stock.ticker,
  }))

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="custom-tooltip bg-white p-4 border border-gray-200 rounded shadow-md">
          <p className="label font-bold">{`${data.name} (${data.ticker})`}</p>
          <p className="value">{`Value: $${data.value.toFixed(2)}`}</p>
          <p className="percent">{`Percentage: ${((data.value / portfolioValue) * 100).toFixed(2)}%`}</p>
        </div>
      )
    }
    return null
  }

  const renderLegend = (props) => {
    const { payload } = props
    return (
      <ul className="flex flex-wrap justify-center gap-4 mt-4">
        {payload.map((entry, index) => (
          <li key={`item-${index}`} className="flex items-center">
            <div className="w-3 h-3 mr-2" style={{ backgroundColor: entry.color }}></div>
            <span className="text-sm">{`${entry.payload.ticker} (${((entry.payload.value / portfolioValue) * 100).toFixed(1)}%)`}</span>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Portfolio Distribution</CardTitle>
        <CardDescription>Stock distribution by value</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={chartData} cx="50%" cy="50%" outerRadius={120} fill="#8884d8" dataKey="value">
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend content={renderLegend} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

