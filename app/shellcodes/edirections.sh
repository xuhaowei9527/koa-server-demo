# 添加车道方向表数据
#!/bin/bash
roaddirections=("上行" "下行" "双向")
for((i=0;i<${#roaddirections[@]};i++));
do
curl --location --request POST 'http://localhost:8080/directions' \
--header 'Content-Type: application/json' \
--data '{
	"uid": "00'$i'",
	"label": "'${roaddirections[$i]}'"
}'

done;

