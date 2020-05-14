# 添加涉事车辆信息表数据
#!/bin/bash
vehicleinvoled=("小型轿车" "大型轿车" "消防车" "汽车起重机" "清障车" "三轮车" "摩托车")
for((i=0;i<${#vehicleinvoled[@]};i++));
do
curl --location --request POST 'http://localhost:8080/vehicleinvoleds' \
--header 'Content-Type: application/json' \
--data '{
	"uid": "00'$i'",
	"label": "'${vehicleinvoled[$i]}'"
}'

done;

