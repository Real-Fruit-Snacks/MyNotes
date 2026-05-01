Subdomain enumeration with size filter to get back unique responses:
ffuf -u 'http://10.10.10.10' -c -w /usr/share/seclists/Discovery/DNS/subdomains-top1million-20000.txt -H 'Host: FUZZ.harder.local' -t 100 -fs 1985

ffuf -c -u 'http://10.10.10.10' -w /usr/share/seclists/Discovery/DNS/subdomains-top1million-110000.txt -H 'Host: FUZZ.xor.com' -fs 0 | tee ./subdomain_discovery

ffuf -u 'http://10.10.10.10' -c -w /usr/share/seclists/Discovery/DNS/subdomains-top1million-20000.txt -t 100 -H "Host: FUZZ.vulnnet.thm"