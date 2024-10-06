import { type Config } from "drizzle-kit";
import { Resource } from "sst";

export default {
  driver: "aws-data-api",
  schema: "./src/server/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    database: Resource.StockAlertsDatabase.database,
    secretArn: Resource.StockAlertsDatabase.secretArn,
    resourceArn: Resource.StockAlertsDatabase.clusterArn,
  },
} satisfies Config;
