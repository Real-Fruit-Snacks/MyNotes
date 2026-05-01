<https://tryhackme.com/room/bypassinguac>
<https://github.com/hfiref0x/UACME>

manual uac bypass:
<https://ivanitlearning.wordpress.com/2019/07/07/bypassing-default-uac-settings-manually/> 
## Enumeration:

whoami /groups

If you you have "Medium Mandatory Level" mean you can run stuff as Admin.

But a popup will ask you to press "yes", and since we don't have RDP or graphical session available to us, we need to perform UAC bypass to circumwent this in our privesc this time.

Run from the command prompt
```
REG QUERY HKEY_LOCAL_MACHINE\Software\Microsoft\Windows\CurrentVersion\Policies\System\ /v EnableLUA
if you get

HKEY_LOCAL_MACHINE\Software\Microsoft\Windows\CurrentVersion\Policies\System
    EnableLUA    REG_DWORD    0x1
    
UAC is enabled, but if you get

HKEY_LOCAL_MACHINE\Software\Microsoft\Windows\CurrentVersion\Policies\System
    EnableLUA    REG_DWORD    0x0
    
UAC is disabled.
```

