"use client";

import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export default function AlertForm({ symbol }: { symbol: string }) {
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState("above");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = (e: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    e.preventDefault();
    // In a real application, you would save this alert to a database or state management system
    console.log("Alert created:", { symbol, price, condition });
    // Reset form
    setPrice("");
    setCondition("above");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="symbol"
          className="block text-sm font-medium text-gray-700"
        >
          Symbol
        </label>
        <Input id="symbol" value={symbol || ""} disabled />
      </div>
      <div>
        <label
          htmlFor="price"
          className="block text-sm font-medium text-gray-700"
        >
          Price
        </label>
        <Input
          id="price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          placeholder="Enter target price"
        />
      </div>
      <div>
        <label
          htmlFor="condition"
          className="block text-sm font-medium text-gray-700"
        >
          Condition
        </label>
        <Select value={condition} onValueChange={setCondition}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="above">Above</SelectItem>
            <SelectItem value="below">Below</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button type="submit" disabled={!symbol}>
        Create Alert
      </Button>
    </form>
  );
}
