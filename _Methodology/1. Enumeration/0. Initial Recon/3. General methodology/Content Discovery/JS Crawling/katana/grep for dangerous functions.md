katana -u <https://tesla.com> -d 4 -jc > katana.tesla

cat katana.tesla | grep '.js' | grep -v '?' > tesla.js

interlace -tL ./tesla.js -cL commands -threads 5 -v

```
cat tesla_js_dump.txt | grep -v "'" | grep -i "eval"
cat tesla_js_dump.txt | grep -v "'" | grep -i "InnerHTML ()"
cat tesla_js_dump.txt | grep -v "'" | grep -i "Postmessage()"
cat tesla_js_dump.txt | grep -v "'" | grep -i "String.prototype.search()"
cat tesla_js_dump.txt | grep -v "'" | grep -i "access"
cat tesla_js_dump.txt | grep -v "'" | grep -i "apikey"
cat tesla_js_dump.txt | grep -v "'" | grep -i "token"
cat tesla_js_dump.txt | grep -v "'" | grep -i "key"
cat tesla_js_dump.txt | grep -v "'" | grep -i "password"
```

keep an eye on:
<https://github.com/l4yton/RegHex/tree/master/.gf>
<https://medium.com/techiepedia/javascript-code-review-guide-for-bug-bounty-hunters-c95a8aa7037a>

![unnamed_7014da2d7fda4aa28fa277b6dac116e4](docs/Attachments/_Methodology/1.%20Enumeration/0.%20Initial%20Recon/3.%20General%20methodology/Content%20Discovery/JS%20Crawling/katana/grep%20for%20dangerous%20functions/{{notename}}-202605011742.png)
