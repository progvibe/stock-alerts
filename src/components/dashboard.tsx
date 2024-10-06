"use client";

import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { AlertCircle, Search } from "lucide-react";
import StockChart from "./stock-chart";
import AlertForm from "./alert-form";
import { env } from "../env";
import {
  mapAlphaVantageData,
  type MappedStockData,
} from "../util/alphaVantage";

export default function StockDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [stockData, setStockData] = useState<MappedStockData | null>(null);
  const [todayData, setTodayData] = useState<
    MappedStockData["timeSeries"][0] | null
  >(null);

  const handleSearch = async () => {
    // In a real application, you would fetch stock data from an API
    // For this example, we'll use mock data
    const mockData = {
      symbol: searchTerm.toUpperCase(),
      price: Math.random() * 1000,
      change: (Math.random() - 0.5) * 10,
    };

    // Fetch stock data from alpha vantage

    const api = await fetch(
      `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${searchTerm}&apikey=${env.NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY}`,
    );
    const data = await api.json();
    const parsedData = mapAlphaVantageData(data);
    setStockData(parsedData);
    setTodayData(parsedData.timeSeries[0]!);
  };

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Search Stocks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <Input
              placeholder="Enter stock symbol"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button onClick={handleSearch}>
              <Search className="mr-2 h-4 w-4" /> Search
            </Button>
          </div>
          {stockData && todayData && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold">
                {stockData.meta.symbol.toUpperCase()}
              </h3>
              <p>Price: ${todayData.close.toFixed(2)}</p>
              <p>Change: {(todayData.high - todayData.low).toFixed(2)}%</p>
            </div>
          )}
        </CardContent>
      </Card>
      {stockData && (
        <Card>
          <CardHeader>
            <CardTitle>Stock Chart</CardTitle>
          </CardHeader>
          <CardContent>
            <StockChart stockData={stockData} />
          </CardContent>
          <Card>
            <CardHeader>
              <CardTitle>Create Alert</CardTitle>
            </CardHeader>
            <CardContent>
              <AlertForm symbol={stockData.meta.symbol} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Active Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-yellow-500" />
                <p>No active alerts</p>
              </div>
            </CardContent>
          </Card>
        </Card>
      )}
    </div>
  );
}
