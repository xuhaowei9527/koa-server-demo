# 添加车道信息表数据
#!/bin/bash
lanes=("车道一" "车道二" "车道三" "车道四" "车道五" "车道六" "车道七" "车道八")
for((i=0;i<${#lanes[@]};i++));
do
curl --location --request POST 'http://localhost:8080/lanes' \
--header 'Content-Type: application/json' \
--data '{
	"uid": "00'$i'",
	"label": "'${lanes[$i]}'"
}'

done;

