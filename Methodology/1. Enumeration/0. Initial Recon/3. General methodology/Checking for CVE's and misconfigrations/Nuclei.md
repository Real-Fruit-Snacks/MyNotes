<https://github.com/projectdiscovery/nuclei>
```
go install -v github.com/projectdiscovery/nuclei/v2/cmd/nuclei@latest

nuclei -u https://www.example.com -o nuclei.txt -H 'Cookie: __utma=3888939.1525145704.1681934326.1682325240.1682336033.7; __utmz=3888939.1682336033.7.3.utmcsr=burpsuite|utmccn=(referral)|utmcmd=referral|utmcct=/; optimizelyEndUserId=oeu1681934326465r0.21988294222220184; optimizelySegments=%7B%7D; optimizelyBuckets=%7B%7D; __utmc=3888939; __gads=ID=ee3e4f3ff600bee0-221dfa15abdd00d6:T=1682241482:RT=1682241482:S=ALNI_MZmEwEJmLePmDeB73-j6k6bkHYs2w; __gpi=UID=00000bee4645a8fe:T=1682241482:RT=1682325604:S=ALNI_MYw9Y650SP71kBJ43eC0sqwW865Mg; ASP.controls_findbusiness_ascx=1; __utmb=3888939.11.10.1682336033; __utmt=1'  -t exposures/ -t cves/ -t vulnerabilities/ -t fuzzing/ -t misconfiguration/ -t technologies/
```
### This option attempts to fingerprint the technology stack and components used on the target, then select templates that have been tagged with those tech stack keywords. Example:

```
`nuclei` `-u` `https://jira.targetdomain.site` `-s` `critical,high,medium,low,info`  `-as`
```