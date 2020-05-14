# 添加影响程度信息表数据
#!/bin/bash
effectlevel=("无" "拥堵" "阻塞" "交通管制")
for((i=0;i<${#effectlevel[@]};i++));
do
curl --location --request POST 'http://localhost:8080/effectlevels' \
--header 'Content-Type: application/json' \
--data '{
	"uid": "00'$i'",
	"label": "'${effectlevel[$i]}'"
}'

done;

