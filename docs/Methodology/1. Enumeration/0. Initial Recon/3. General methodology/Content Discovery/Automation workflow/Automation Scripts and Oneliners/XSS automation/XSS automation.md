Find URLs and parameters
paramspider -d example.com -o output.txt && cat output/output.txt | gau | sort -u > urls.txt

Scan for XSS vulnerabilities
cat urls.txt | Gxss -c 100 -p 'test' | dalfox pipe -o xss.txt

Fast crawling and fuzzing for hidden endpoints
gospider -s <https://example.com> -c 10 -d 2 --blacklist "\.(jpg|jpeg|gif|css|png|ttf|woff|pdf|svg|txt)" | tee crawl.txt
