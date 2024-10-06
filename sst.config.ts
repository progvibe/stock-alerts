/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "stock-alerts",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
    };
  },
  async run() {
    const vpc = new sst.aws.Vpc("StockAlertsVPC");
    const database = new sst.aws.Postgres("StockAlertsDatabase", {
      vpc,
      scaling: {
        min: "2 ACU",
        max: "128 ACU",
      },
    });
    new sst.aws.Nextjs("MyWeb", {
      link: [database],
      vpc,
    });
  },
});
