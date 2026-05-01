Fuzzing paramaters:

wget <https://raw.githubusercontent.com/whiteknight7/wordlist/main/fuzz-lfi-params-list.txt>


ffuf -c -u '<https://172.31.3.1/forum.chatlogs/chatlogs.php?FUZZ=id>' -w /usr/share/seclists/Discovery/Web-Content/burp-parameter-names.txt -ignore-body

