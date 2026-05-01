<https://gtfobins.github.io/>
Manual Enumeration:
(Keep in mind manual enumeration tends to be more stealthy)
Useful to start with:

systeminfo and general
hostnamectl
whoami
id
uname -a
sudo -l
history
dpkg -l | grep logrotate

Networking
ss -ltu
ss -lntu
netstat -antop
ifconfig
ip route
-----
OS info:
uname -a
cat /etc/issue
cat /proc/version

ps (view running processes)
ps -A (see all running processes)
ps axjf (see full process tree)
ps aux (will show processes for all users, and who's running them)

env (This command will show environmental variables.)
-----------------
upgrading shell more:
DONT USE RLWRAP WHEN DOING THIS

python3 -c 'import pty;pty.spawn("/bin/bash")'
or
python -c 'import pty;pty.spawn("/bin/bash")'

export TERM=xterm-color

( then ctrl + z to background process)

stty raw -echo; fg
-----------------
cat /etc/passwd | grep home 
(to find all actual users. As some of which are system orservice users that would not be very useful)

: Find world-writeablefolders
`find / -writable -type d 2>/dev/null` 

will list files that have SUID or SGID bits set.
`find / -type f -perm -04000 -ls 2>/dev/null` 

will list files with all permissions
find / -type f -perm 0777

find enabled capabilities:
getcap -r / 2>/dev/null

see running cron jobs:
cat /etc/crontab

see network shares:
showmount -e 10.10.28.220
cat /etc/exports

![unnamed_3c5d0c64e8c14bff99cc140139b7b0f2](docs/Attachments/_Methodology/2.%20Privilege%20Escalation/Linux%20Privesc/Methodology/Manual%20Enumeration/{{notename}}-202605011742.png)