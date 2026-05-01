cat params.txt | qsreplace 'FUZZ' > params.tmp

cat params.tmp |  while read url; do ffuf -w /opt/tools/webapp/fuzzing/sqli_sleep.txt -u "${url}" -t 50 -mt '<4000' -fc 404 -H "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3"; done | tee sqli.txt
