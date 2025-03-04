#!/bin/bash

export TENANT=
export API_TOKEN=

# レコード追加
read id code message <<< $(curl -X POST "https://$TENANT.cybozu.com/k/v1/record.json" \
  -H "X-Cybozu-API-Token: $API_TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{
    "app": $APP,
    "record": {
      "姓": { "value": "テスト"},
      "名": { "value": "太郎"}
    }
  }' | jq -r '.id, .code, .message' | xargs)

if [ -n $message ]; then
	# エラー
	# https://cybozu.dev/ja/id/d509b956c8f84c45e1e129ae/#response-error
	echo "id: $id, code: $code, message: $message"
	exit 
fi



# レスポンスのidをレコード編集時に指定する。
echo "id: $id"

# レコード編集
curl -X PUT "https://$TENANT.cybozu.com/k/v1/record.json" \
  -H "X-Cybozu-API-Token: $API_TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{
    "app": $APP,
    "id": $id,
    "record": {
      "電話番号": { "value": "080-1111-111"}
    }
  }'