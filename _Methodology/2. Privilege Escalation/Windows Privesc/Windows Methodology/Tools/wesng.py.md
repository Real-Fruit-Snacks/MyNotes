git clone <https://github.com/bitsadmin/wesng.git>

python3 wes.py --update

pip3 install mechanicalsoup   (this is needed for the --muc-lookup feature. Basically further validation to mitigate false positives)



Quick check for privesc:
python3 wes.py systeminfo.txt -e -i "Elevation of Privilege" | tee wesng.txt

Only ones with critical tag:
python3 wes.py systeminfo.txt -e -i "Elevation of Privilege" -s critical | tee wesng.txt

Only ones with critical tag and does checkup to minimize false positives (takes longer)
python3 wes.py systeminfo.txt -e -i "Elevation of Privilege" -s critical --muc-lookup | tee wesng.txt

