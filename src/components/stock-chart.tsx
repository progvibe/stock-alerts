"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { type MappedStockData } from "../util/alphaVantage";

const mockData = [
  { date: "2023-01-01", price: 100 },
  { date: "2023-02-01", price: 120 },
  { date: "2023-03-01", price: 110 },
  { date: "2023-04-01", price: 130 },
  { date: "2023-05-01", price: 140 },
  { date: "2023-06-01", price: 135 },
];

export default function StockChart({
  stockData,
}: {
  stockData: MappedStockData;
}) {
  return (
    <div className="h-[300px]">
      {stockData.meta.symbol ? (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={stockData.timeSeries}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="close"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <div className="flex h-full items-center justify-center">
          <p className="text-muted-foreground">
            Search for a stock to view its chart
          </p>
        </div>
      )}
    </div>
  );
}
