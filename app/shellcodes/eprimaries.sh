# 添加一级单位表数据
#!/bin/bash
primaries=("乌兰察布分公司" "呼和浩特分公司" "包头分公司" "鄂尔多斯分公司" "巴彦淖尔分公司" "乌海分公司" "通辽分公司" "兴安分公司")
for((i=0;i<7;i++));
do
  echo "这是第 $i 次调用";
	curl --location --request POST 'http://localhost:8080/unitprimarys' \
	--header 'Content-Type: application/json' \
	--data-raw '{
		"uid": "00'$i'",
		"label": "'${primaries[$i]}'"
	}'
done;

