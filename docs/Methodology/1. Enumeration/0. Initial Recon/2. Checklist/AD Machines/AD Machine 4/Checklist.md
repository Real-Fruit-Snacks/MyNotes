Checklist:

Active Directory:
- [ ] Scan all TCP ports.
- [ ] Check ldap, rpc, smb with anonymous access. Check for public share.
- [ ] Find usernames: If you get access, look for usernames with stuff like netexec --rid-brute, --users, and enumdomuser with rpcclient to get list of users in domain without needed initial credentials. Check usernames with kerbrute.
- [ ] Test for asreproasting after you have collected usernames. If successful, try cracking.
- [ ] Check for kerberoasting after you have a username and password.
- [ ] Try authenticating with every possible protocol with those set of credentials. winrm, rdp, mssql, smb, rpc, ldap etc.
- [ ] Enumerate shares for every user you get access to. Every new user means you should recheck their shares.
- [ ] If you get shell as a user, check for privesc, and dump all hashes and collect them in a file for possible bruteforcing and lateral movement.
- [ ] Run bloodhound and check for attack paths, roasting, and dcsync. 
- [ ] Check for Certificate based attacks with certipy 
- [ ] Check if writeable share could be a path to steal hashes with responder
- [ ] If it's an AD network, check for additional network adapters in case of pivoting being needed. If so, set up a pivot and relay all tools over that “jumpbox” so you can target the other machines in the other network.
- [ ] Remember to bruteforce different protocols with credentials you have. Remember to use NTLM authentication too.
- [ ] For post exploitation dump all hashes using [[Remote Hashdump & Bruteforce Hashes]]
- [ ] Check UDP ports. 
- [ ] Rescan if you're stuck, verify tools are working properly and you're running them properly.

Windows Privesc:
- [ ] Run whoami /all for easy wins
- [ ] Check PowerUp.ps1, privesccheck.ps1 then WinPEAS
- [ ] Check listening ports too in case you need to port forward.
- [ ] This will give you all info tbh. Save output and slowly go over it.
- [ ] If you get completely stuck, you can manually check for things too like creds, also try more privesc tools. If that doesn't help you likely need to relearn the privesc attacks, and consider if privesc is even needed here. 

## [[Windows - Manual Enumeration]]
## [[Active Directory Methdology]]