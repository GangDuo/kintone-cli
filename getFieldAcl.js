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

    const { rights } = await client.app.getFieldAcl({
      app: process.env.KINTONE_APP
    });
    fs.writeFileSync('field-rights.json', JSON.stringify(rights));
  } catch (err) {
    console.log(err);
  }
})();