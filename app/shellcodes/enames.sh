# 添加事件名称
len=10

:<<EOF
EOF
# 交通事故
#!/bin/bash
trafficincidentarr=("车辆刮擦" "追尾" "翻车" "自燃" "撞护栏" "危化品事故" "隧道事故" "连环追尾" "客车事故" "其他")
trafficincident="5eac2026384cfe06f10a4fda"
# echo ${#wulanchabusecondaries[@]}
# echo ${wulanchabusecondaries[*]}
for((i=0;i<${#trafficincidentarr[@]};i++));
do
if [ `expr $i + 1` -lt $len ]
then 
		value="010"`expr $i + 1`
else 
		value="01"`expr $i + 1`
fi
	curl --location --request POST 'http://localhost:8080/eventnames' \
	--header 'Content-Type: application/json' \
	--data-raw '{
    "typeid":"'$trafficincident'",
		"uid": "'$value'",
		"label": "'${trafficincidentarr[$i]}'"
	}'
done;
# 车流量大
#!/bin/bash
heavytrafficarr=("收费站车流量大" "煤检站车流量大" "省内治超站车流量大" "车辆多导致车流量大" "施工导致车流量大" "邻省交通影响导致车流量大" "省内交通影响导致车流量大" "恶劣天气导致车流量大" "路面状况不良导致车流量大" "其他原因导致车流量大")
heavytraffic="5eabfd85384cfe06f10a4f34"
# echo ${#wulanchabusecondaries[@]}
# echo ${wulanchabusecondaries[*]}
for((i=0;i<${#heavytrafficarr[@]};i++));
do
if [ `expr $i + 1` -lt $len ]
then 
		value="020"`expr $i + 1`
else 
		value="02"`expr $i + 1`
fi
	curl --location --request POST 'http://localhost:8080/eventnames' \
	--header 'Content-Type: application/json' \
	--data-raw '{
    "typeid":"'$heavytraffic'",
		"uid": "'$value'",
		"label": "'${heavytrafficarr[$i]}'"
	}'
done;

# 自然灾害
#!/bin/bash
naarr=("水毁" "泥石流" "塌方" "雷击" "其他")
na="5eabfd85384cfe06f10a4f35"
# echo ${#wulanchabusecondaries[@]}
# echo ${wulanchabusecondaries[*]}
for((i=0;i<${#naarr[@]};i++));
do
if [ `expr $i + 1` -lt $len ]
then 
		value="030"`expr $i + 1`
else 
		value="03"`expr $i + 1`
fi
	curl --location --request POST 'http://localhost:8080/eventnames' \
	--header 'Content-Type: application/json' \
	--data-raw '{
    "typeid":"'$na'",
		"uid": "'$value'",
		"label": "'${naarr[$i]}'"
	}'
done;

# 站点事件
#!/bin/bash
sitearr=("治超磅坏" "设备维修" "停电" "其他")
site="5eabfd85384cfe06f10a4f36"
# echo ${#wulanchabusecondaries[@]}
# echo ${wulanchabusecondaries[*]}
for((i=0;i<${#sitearr[@]};i++));
do
if [ `expr $i + 1` -lt $len ]
then 
		value="040"`expr $i + 1`
else 
		value="04"`expr $i + 1`
fi
	curl --location --request POST 'http://localhost:8080/eventnames' \
	--header 'Content-Type: application/json' \
	--data-raw '{
    "typeid":"'$site'",
		"uid": "'$value'",
		"label": "'${sitearr[$i]}'"
	}'
done;

# 交通管制
#!/bin/bash
trafficcontrolarr=("主线封闭" "执行勤务" "道路施工" "恶劣天气" "邻省交通影响" "省内交通影响" "其他")
trafficcontrol="5eabfd85384cfe06f10a4f37"
# echo ${#wulanchabusecondaries[@]}
# echo ${wulanchabusecondaries[*]}
for((i=0;i<${#trafficcontrolarr[@]};i++));
do
if [ `expr $i + 1` -lt $len ]
then 
		value="050"`expr $i + 1`
else 
		value="05"`expr $i + 1`
fi
	curl --location --request POST 'http://localhost:8080/eventnames' \
	--header 'Content-Type: application/json' \
	--data-raw '{
    "typeid":"'$trafficcontrol'",
		"uid": "'$value'",
		"label": "'${trafficcontrolarr[$i]}'"
	}'
done;

# 其他事件
#!/bin/bash
otherarr=("道路障碍" "社会公众事件" "车辆救助" "其他")
other="5eabfd85384cfe06f10a4f38"
# echo ${#wulanchabusecondaries[@]}
# echo ${wulanchabusecondaries[*]}
for((i=0;i<${#otherarr[@]};i++));
do
if [ `expr $i + 1` -lt $len ]
then 
		value="060"`expr $i + 1`
else 
		value="06"`expr $i + 1`
fi
	curl --location --request POST 'http://localhost:8080/eventnames' \
	--header 'Content-Type: application/json' \
	--data-raw '{
    "typeid":"'$other'",
		"uid": "'$value'",
		"label": "'${otherarr[$i]}'"
	}'
done;