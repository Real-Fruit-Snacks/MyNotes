Finding subdomains and filtering out dead ones: (the rustscan wont work properly over tor)
subfinder -d tesla.com -o subdomains.txt && cat subdomains.txt | httpx -status-code -cdn | tee alive_hosts.txt
Check for CVEs and vulns with nuclei:
nuclei -u https://www.example.com -t /opt/nuclei-templates/exposures/ -t /opt/nuclei-templates/cves/ -t /opt/nuclei-templates/vulnerabilities/ -t /opt/nuclei-templates/fuzzing/ -t /opt/nuclei-templates/misconfiguration/ -t /opt/nuclei-templates/technologies/

Fingerprint cdn/waf and  technology stack:
```
cat URL.txt| httpx -cdn -td
```
