const { KintoneRestAPIClient } = require('@kintone/rest-api-client');
const fs = require('fs');

(async () => {
  let text = fs.readFileSync("reports.json");
  const reports = JSON.parse(text);

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

    const resp = await client.app.updateReports({
      app: process.env.KINTONE_APP,
      reports,
    });
    console.log(resp);

    /* アプリ更新
    await client.app.deployApp({
        apps: [{app: APP_ID}]
    })
    */
  } catch (err) {
    console.log(err);
  }
})();