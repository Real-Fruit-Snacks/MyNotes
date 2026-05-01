subfinder -d tesla.com

subfinder -d edu.ee -all -v -o subs.txt

cat subs.txt | httpx -probe | grep -i SUCCESS | cut -d '[' -f1 | tee subs.alive

cat subs.alive | httpx -sc -title -ms 'login' -td -cdn -server -p 22,80,443,500,3306,3389,8080,8443 -follow-redirects | tee httpx.log

