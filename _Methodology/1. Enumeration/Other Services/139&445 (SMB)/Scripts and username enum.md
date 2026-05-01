Very useful. Can find OS info, shares, rpc info etc

/opt/enum4linux-ng/enum4linux-ng.py -A 10.11.1.8 > enum4linux.txt

(Run this, can find more users to than the other usually, but takes long)
enum4linux -a 10.11.1.8

Nmap Username scan:
nmap -sV 10.1.1.68 --script smb-enum-users.nse -oN nmap_smb_username_script