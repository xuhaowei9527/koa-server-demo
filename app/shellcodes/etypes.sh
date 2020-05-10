# 添加事件类型表数据
#!/bin/bash
eventtypes=("交通事故" "车流量大" "自然灾害" "站点事件" "交通管制" "其他事件")
for((i=1;i<=5;i++));
do
  echo "这是第 $i 次调用";
	curl --location --request POST 'http://localhost:8080/eventtypes' \
	--header 'Content-Type: application/json' \
	--data-raw '{
		"uid": "00'$i'",
		"label": "'${eventtypes[$i]}'"
	}'
done;

