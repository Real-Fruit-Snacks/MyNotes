
add [vulnnet.thm](http://vulnnet.thm) to /etc/hosts

VHOST Discovery:
ffuf -u '<http://vulnnet.thm/'> -c -w /usr/share/seclists/Discovery/DNS/subdomains-top1million-20000.txt -t 100 -H "Host: FUZZ.vulnnet.thm" -fs 65

add these to /etc/hosts

![unnamed_73d700442ae347c2b444f94dcf6bdb0f](docs/Attachments/Methodology/9.%20CTF%20Boxes/TryHackMe/Vulnnet_Endgame/HTTP/HTTP/{{notename}}-202605011506.png)
