const { KintoneRestAPIClient } = require('@kintone/rest-api-client');
const fs = require('fs');

(async () => {
  try {
    // クライアントの作成
    const client = new KintoneRestAPIClient({
      baseUrl: `https://${process.env.KINTONE_TENANT}.cybozu.com`,
      // Use password authentication
      auth: {
        username: process.env.KINTONE_USERNAME,
        password: process.env.KINTONE_PASSWORD,
      },
    });

    const { reports } = await client.app.getReports({
      app: process.env.KINTONE_APP
    });
    fs.writeFileSync('reports.json', JSON.stringify(reports));
  } catch (err) {
    console.log(err);
  }
})();