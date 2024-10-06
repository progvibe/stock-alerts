import { drizzle } from "drizzle-orm/aws-data-api/pg";
import { Resource } from "sst";
import { RDSDataClient } from "@aws-sdk/client-rds-data";

import * as schema from "./schema";

export const rdsDataClient = new RDSDataClient({});

export const db = drizzle(rdsDataClient, {
  schema,
  database: Resource.StockAlertsDatabase.database,
  secretArn: Resource.StockAlertsDatabase.secretArn,
  resourceArn: Resource.StockAlertsDatabase.clusterArn,
});
