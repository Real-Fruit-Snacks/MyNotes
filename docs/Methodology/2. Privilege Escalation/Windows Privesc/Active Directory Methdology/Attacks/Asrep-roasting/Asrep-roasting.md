This attack will only work on users who has pre-authentification disabled for when requesting tft to kerberos(i think, kinda)
After getting a list of usernames on the domain, we can supply this to hopefully get a hash hash back. 
We can get a list of usernames on the domain using enum4linux for instance.
![unnamed_6b5c572483d24d4689ea06197a135e1f](unnamed_6b5c572483d24d4689ea06197a135e1f.png)

After this, pass the hash around, and/or crack the hash with john, hashcat, or crackstation.
```
impacket-GetNPUsers -dc-ip 10.10.66.150 vulnnet-rst.local/ -usersfile refined_usernames
```