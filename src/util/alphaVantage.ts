import { z } from "zod";

// Define the schema for daily stock data with coercion
const dailyStockDataSchema = z.object({
  "1. open": z.string().transform((value) => parseFloat(value)), // Coerce to number
  "2. high": z.string().transform((value) => parseFloat(value)),
  "3. low": z.string().transform((value) => parseFloat(value)),
  "4. close": z.string().transform((value) => parseFloat(value)),
  "5. volume": z.string().transform((value) => parseInt(value, 10)), // Coerce to integer
});

// Define the schema for the metadata
const metaDataSchema = z.object({
  "1. Information": z.string(),
  "2. Symbol": z.string(),
  "3. Last Refreshed": z.string(),
  "4. Output Size": z.string(),
  "5. Time Zone": z.string(),
});

// Define the overall schema for the stock data
const stockDataSchema = z.object({
  "Meta Data": metaDataSchema,
  "Time Series (Daily)": z.record(dailyStockDataSchema), // Use z.record to handle dynamic keys (dates)
});

export type MappedStockData = {
  meta: {
    information: string;
    symbol: string;
    lastRefreshed: string; // YYYY-MM-DD format
    outputSize: string;
    timeZone: string;
  };
  timeSeries: Array<{
    date: string; // The date in YYYY-MM-DD format
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
  }>;
};

export function mapAlphaVantageData(data: unknown): MappedStockData {
  const parsedData = stockDataSchema.parse(data);

  // Format "Last Refreshed" date
  const lastRefreshed = new Date(parsedData["Meta Data"]["3. Last Refreshed"]);

  // Mapping function to convert to user-friendly keys
  const mapStockData = (data: typeof parsedData) => {
    const mappedData = {
      meta: {
        information: data["Meta Data"]["1. Information"],
        symbol: data["Meta Data"]["2. Symbol"],
        lastRefreshed:
          lastRefreshed.toISOString().split("T")[0] ?? "XXXX-XX-XX", // Format to YYYY-MM-DD
        outputSize: data["Meta Data"]["4. Output Size"],
        timeZone: data["Meta Data"]["5. Time Zone"],
      },
      timeSeries: Object.entries(data["Time Series (Daily)"]).map(
        ([date, dailyData]) => ({
          date,
          open: dailyData["1. open"],
          high: dailyData["2. high"],
          low: dailyData["3. low"],
          close: dailyData["4. close"],
          volume: dailyData["5. volume"],
        }),
      ),
    };

    return mappedData;
  };

  // Map the parsed data to user-friendly format
  return mapStockData(parsedData);
}
