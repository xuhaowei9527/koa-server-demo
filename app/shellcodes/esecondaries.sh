# 添加二级单位表数据
:<<EOF
EOF
# 乌兰察布
#!/bin/bash
wulanchabusecondaries=("乌兰哈达收费所" "白音察干收费所" "集宁北收费所" "蒙冀界收费所" "集宁西收费所" "蒙晋界收费所" "集宁南收费所" "赛汉塔拉北收费所" "丰镇匝道收费所")
wulanchabu="5eac0c71384cfe06f10a4f51"
# echo ${#wulanchabusecondaries[@]}
# echo ${wulanchabusecondaries[*]}
for((i=0;i<${#wulanchabusecondaries[@]};i++));
do
	curl --location --request POST 'http://localhost:8080/unitsecondarys' \
	--header 'Content-Type: application/json' \
	--data-raw '{
    "upperid":"'$wulanchabu'",
		"uid": "00'$i'",
		"label": "'${wulanchabusecondaries[$i]}'"
	}'
done;

# 呼和浩特
#!/bin/bash
huhehaotesecondaries=("呼和浩特东收费所" "一间房养护所" "察素齐收费所" "盛乐收费所" "郭家营收费所" "毕克奇收费所" "新店子北收费所" "呼和浩特西收费所" "卧佛山隧道管理所")
huhehaote="5eac0c71384cfe06f10a4f52"
for((i=0;i<${#huhehaotesecondaries[@]};i++));
do
	curl --location --request POST 'http://localhost:8080/unitsecondarys' \
	--header 'Content-Type: application/json' \
	--data-raw '{
    "upperid":"'$huhehaote'",
		"uid": "00'$i'",
		"label": "'${huhehaotesecondaries[$i]}'"
	}'
done;

# 包头
#!/bin/bash
baotousecondaries=("包头收费所" "萨拉齐收费所" "黄河大桥收费所" "包钢收费所" "东兴收费所" "哈德门收费所" "包头西收费所" "四道沙河收费所" "九原收费所")
baotou="5eac0c71384cfe06f10a4f53"
for((i=0;i<${#baotousecondaries[@]};i++));
do
	curl --location --request POST 'http://localhost:8080/unitsecondarys' \
	--header 'Content-Type: application/json' \
	--data-raw '{
    "upperid":"'$baotou'",
		"uid": "00'$i'",
		"label": "'${baotousecondaries[$i]}'"
	}'
done;

# 鄂尔多斯
#!/bin/bash
eerduosisecondaries=("耳字壕收费所" "阿镇收费所" "辅线耳字壕收费所" "新街收费所" "康巴什收费所" "成陵收费所" "关碾房收费所" "树林召收费所" "蒙陕界收费所")
eerduosi="5eac0c71384cfe06f10a4f54"
for((i=0;i<${#eerduosisecondaries[@]};i++));
do
	curl --location --request POST 'http://localhost:8080/unitsecondarys' \
	--header 'Content-Type: application/json' \
	--data-raw '{
    "upperid":"'$eerduosi'",
		"uid": "00'$i'",
		"label": "'${eerduosisecondaries[$i]}'"
	}'
done;

# 巴彦淖尔
#!/bin/bash
bayannaoersecondaries=("西小召收费所" "临河东收费所" "临河收费所" "乌拉山收费所" "磴口收费所" "临河新区收费所" "五原收费所" "临河西收费所" "黄河镇收费所")
bayannaoer="5eac0c71384cfe06f10a4f55"
for((i=0;i<${#bayannaoersecondaries[@]};i++));
do
	curl --location --request POST 'http://localhost:8080/unitsecondarys' \
	--header 'Content-Type: application/json' \
	--data-raw '{
    "upperid":"'$bayannaoer'",
		"uid": "00'$i'",
		"label": "'${bayannaoersecondaries[$i]}'"
	}'
done;

# 乌海
#!/bin/bash
wuhaisecondaries=("蒙西收费所" "蒙宁界收费所" "海南收费所" "巴拉贡收费所" "三麻收费所" "乌海收费所" "海渤湾收费所" "巴拉贡北收费所" "机械化养护队")
wuhai="5eac0c71384cfe06f10a4f56"
for((i=0;i<${#wuhaisecondaries[@]};i++));
do
	curl --location --request POST 'http://localhost:8080/unitsecondarys' \
	--header 'Content-Type: application/json' \
	--data-raw '{
    "upperid":"'$wuhai'",
		"uid": "00'$i'",
		"label": "'${wuhaisecondaries[$i]}'"
	}'
done;

# 通辽
#!/bin/bash
tongliaosecondaries=("乌罕达巴收费所" "哲北养护所" "图布信收费所" "隧道管理所" "白音华收费所" "哲北收费所" "路政七大队" "图布信养护所" "扎哈淖尔收费所")
tongliao="5eac0c71384cfe06f10a4f57"
for((i=0;i<${#tongliaosecondaries[@]};i++));
do
	curl --location --request POST 'http://localhost:8080/unitsecondarys' \
	--header 'Content-Type: application/json' \
	--data-raw '{
    "upperid":"'$tongliao'",
		"uid": "00'$i'",
		"label": "'${tongliaosecondaries[$i]}'"
	}'
done;