# 添加路段名称表数据
#!/bin/bash
roaduid=("G6" "G7" "G25" "G2511" "G45" "G55" "G5511" "G65" "G10" "G12" "G16" "G18" "G0601" "S20" "S22" "S24" "S21" "S23" "S27")
roadlabel=("京藏高速" "京新高速" "长深高速" "新鲁高速" "大广高速" "二广高速" "集阿高速" "包茂高速" "绥满高速" "珲乌高速" "丹锡高速" "荣乌高速" "呼市绕城高速" "阿锡高速" "呼白高速" "兴巴高速" "海乌高速" "鲁霍高速" "锡张高速")
for((i=0;i<19;i++));
do
curl --location --request POST 'http://localhost:8080/eventroads' \
--header 'Content-Type: application/json' \
--data '{
	"uid": "'${roaduid[$i]}'",
	"label": "'${roadlabel[$i]}'"
}'

done;

