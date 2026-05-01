Put notes and thoughts here as you go through the machines. (Does not need to be pretty or structured. Whatever works for you)

example:

ftp anonymous access? nope
check webmin version, public exploit? nope


smb is open, run enum4linux
find any usernames? can bruteforce smb and ssh
sqli? 

---
#### privesc

**SUDO 

[+] We can sudo without supplying a password!
Matching Defaults entries for asterisk on ip-10-10-11-144:
    env_reset, mail_badpass, secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin

Runas and Command-specific defaults for asterisk:
    Defaults!/usr/bin/fail2ban-client !requiretty

User asterisk may run the following commands on ip-10-10-11-144:
    (ALL) NOPASSWD: /usr/bin/fail2ban-client**


Active Internet connections (only servers)
Proto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program name    
tcp        0      0 127.0.0.1:631           0.0.0.0:*               LISTEN      -                   
tcp        0      0 0.0.0.0:3306            0.0.0.0:*               LISTEN      -                   
tcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN      -                   
tcp        0      0 0.0.0.0:5038            0.0.0.0:*               LISTEN      -                   
tcp6       0      0 :::3306                 :::*                    LISTEN      -                   
tcp6       0      0 ::1:631                 :::*                    LISTEN      -                   
tcp6       0      0 :::80                   :::*                    LISTEN      -                   
tcp6       0      0 :::22                   :::*                    LISTEN      -  


-] Sudo version:
Sudo version 1.9.13p3


[-] MYSQL version:
mysql  Ver 15.1 Distrib 10.11.11-MariaDB, for debian-linux-gnu (x86_64) using  EditLine wrapper


[-] htpasswd found - could contain passwords:
/usr/lib/python3/dist-packages/fail2ban/tests/files/config/apache-auth/basic/authz_owner/.htpasswd
username:$apr1$1f5oQUl4$21lLXSN7xQOPtNsj5s4Nk/
/usr/lib/python3/dist-packages/fail2ban/tests/files/config/apache-auth/basic/file/.htpasswd
username:$apr1$uUMsOjCQ$.BzXClI/B/vZKddgIAJCR.
/usr/lib/python3/dist-packages/fail2ban/tests/files/config/apache-auth/digest_time/.htpasswd
username:digest private area:fad48d3a7c63f61b5b3567a4105bbb04
/usr/lib/python3/dist-packages/fail2ban/tests/files/config/apache-auth/digest_anon/.htpasswd
username:digest anon:25e4077a9344ceb1a88f2a62c9fb60d8
05bbb04
anonymous:digest anon:faa4e5870970cf935bb9674776e6b26a
/usr/lib/python3/dist-packages/fail2ban/tests/files/config/apache-auth/digest/.htpasswd
username:digest private area:fad48d3a7c63f61b5b3567a4105bbb04
/usr/lib/python3/dist-packages/fail2ban/tests/files/config/apache-auth/digest_wrongrelm/.htpasswd
username:wrongrelm:99cd340e1283c6d0ab34734bd47bdc30
4105bbb04

[-] SUID files:
-rwsr-xr-x 1 root root 59704 Nov 21  2024 /usr/bin/mount
-rwsr-xr-x 1 root root 52880 Apr  7 01:38 /usr/bin/chsh
-rwsr-xr-x 1 root root 62672 Apr  7 01:38 /usr/bin/chfn
-rwsr-xr-x 1 root root 68248 Apr  7 01:38 /usr/bin/passwd
-rwsr-xr-x 1 root root 72000 Nov 21  2024 /usr/bin/su
-rwsr-xr-x 1 root root 14848 May 12 04:22 /usr/bin/vmware-user-suid-wrapper
-rwsr-xr-x 1 root root 26776 Jan 31  2023 /usr/bin/pkexec
-rwsr-xr-x 1 root root 35128 Nov 21  2024 /usr/bin/umount
-rwsr-xr-x 1 root root 35128 Apr 18  2023 /usr/bin/fusermount3
-rwsr-xr-x 1 root root 162752 Oct 27  2024 /usr/bin/ntfs-3g
-rwsr-xr-x 1 root root 281624 Jun 27  2023 /usr/bin/sudo
-rwsr-xr-x 1 root root 88496 Apr  7 01:38 /usr/bin/gpasswd
-rwsr-xr-x 1 root root 48896 Apr  7 01:38 /usr/bin/newgrp
-rwsr-xr-x 1 root root 653888 May  8 01:54 /usr/lib/openssh/ssh-keysign
-rwsr-sr-x 1 root root 14672 Feb 19 03:42 /usr/lib/xorg/Xorg.wrap
-rwsr-xr-- 1 root messagebus 51272 Sep 16  2023 /usr/lib/dbus-1.0/dbus-daemon-launch-helper
-rwsr-xr-x 1 root root 18664 Jan 31  2023 /usr/lib/polkit-1/polkit-agent-helper-1
-rwsr-xr-- 1 root dip 403832 May 13  2022 /usr/sbin/pppd


[-] SGID files:
-rwxr-sr-x 1 root shadow 80376 Apr  7 01:38 /usr/bin/chage
-rwxr-sr-x 1 root _ssh 485760 May  8 01:54 /usr/bin/ssh-agent
-rwxr-sr-x 1 root mail 23040 Feb  4  2021 /usr/bin/dotlockfile
-rwxr-sr-x 1 root shadow 31184 Apr  7 01:38 /usr/bin/expiry
-rwxr-sr-x 1 root crontab 43648 Mar  1  2023 /usr/bin/crontab
-rwxr-sr-x 1 root mail 14736 May 14  2022 /usr/bin/mlock
-rwxr-sr-x 1 root mail 22784 Mar 15  2023 /usr/libexec/camel-lock-helper-1.2
-rwsr-sr-x 1 root root 14672 Feb 19 03:42 /usr/lib/xorg/Xorg.wrap
-rwxr-sr-x 1 root shadow 39160 Sep 21  2023 /usr/sbin/unix_chkpwd


[+] Files with POSIX capabilities set:
/usr/bin/ping cap_net_raw=ep
/usr/lib/x86_64-linux-gnu/gstreamer1.0/gstreamer-1.0/gst-ptp-helper cap_net_bind_service,cap_net_admin=ep

**sudo -l, then sgid, suid, capabilitles. then hashes**