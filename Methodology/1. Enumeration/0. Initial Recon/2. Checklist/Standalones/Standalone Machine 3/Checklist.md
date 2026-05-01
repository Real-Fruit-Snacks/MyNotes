Checklist:

Initial Recon & Access:
- [ ] Scan all TCP ports
- [ ] Do directory bruteforcing on web server
- [ ] Do file bruteforcing on web server on starting directory / and on on every new found directory
- [ ] Check /robots.txt, /sitemap.xml, /sitemap
- [ ] Do proper fingerprinting with -sV -sC, nmap vuln scan, wappalyzer, check CMS, check server headers, nc -nvv, check every TCP port etc
- [ ] Check for public exploits on exploitDB and google
- [ ] Check for subdomains. If you find any do file and directory bruteforcing again
- [ ] Rescan if you're stuck, verify tools are working properly and you're running them properly
- [ ] Check UDP ports

Linux Privesc:
- [ ] Run Linpeas & Possible LSE(Linux Smart Enumeration)
- [ ] Check listening ports too in case you need to port forward
- [ ] This will give you all info tbh. Save output and slowly go over it
- [ ] If you get completely stuck, you can manually check for things too. If that doesn't help you likely need to relearn the privesc attacks

Windows Privesc:
- [ ] Run whoami /all for easy wins
- [ ] Check PowerUp.ps1, privesccheck.ps1 then WinPEAS
- [ ] Check listening ports too in case you need to port forward
- [ ] This will give you all info tbh. Save output and slowly go over it
- [ ] If you get completely stuck, you can manually check for things too like creds, also try more privesc tools. If that doesn't help you likely need to relearn the privesc attacks, and consider if privesc is even needed here

## [[Methodology/1. Enumeration/0. Initial Recon/1. Initial Recon/Initial Recon]]
## [[Methodology/2. Privilege Escalation/Linux Privesc/Methodology/Linux - Manual Enumeration]]
## [[Methodology/2. Privilege Escalation/Windows Privesc/Windows Methodology/Windows - Manual Enumeration]]
