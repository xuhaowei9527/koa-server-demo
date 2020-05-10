# 添加事件等级表数据
#!/bin/bash
eventlevels=("一级" "二级" "三级" "四级")
for((i=0;i<5;i++));
do
curl --location --request POST 'http://localhost:8080/eventlevels' \
--header 'Content-Type: application/json' \
--data-raw '{
	"uid": "00'$i'",
	"label": "'${eventlevels[$i]}'"
}'

done;

