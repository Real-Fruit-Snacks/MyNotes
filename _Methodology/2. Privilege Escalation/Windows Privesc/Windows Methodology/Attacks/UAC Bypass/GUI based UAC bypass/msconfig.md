windows key + r
msconfig

When hitting launch, we're essentially running an administrative cmd shell as that's who the process is being ran by, and in many cases you won't even get a UAC prompt to verify as admin with credentials. From here you can drop hashes and whatnot. Cheers 

You can do a whoami /all to verify the changes in privelege immediately too. 
![unnamed_6c39b4f6325e4bb08641b07f0c05f28f](docs/Attachments/_Methodology/2.%20Privilege%20Escalation/Windows%20Privesc/Windows%20Methodology/Attacks/UAC%20Bypass/GUI%20based%20UAC%20bypass/msconfig/{{notename}}-202605011742.png)