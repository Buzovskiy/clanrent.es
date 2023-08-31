#!/usr/bin/bash
name=Vitalii
surname=Buzovskyi
echo "hello world"
echo $surname
echo $name
res=$((3 / 2))
echo $res
if [ 1 -eq 1 ]
then
echo 'eq'
fi

for i in {1..5}
do
    echo $i
done

LINE=1

while read -r CURRENT_LINE
	do
		echo "$LINE: $CURRENT_LINE"
    ((LINE++))
done < "test_for_hello_sh.txt"