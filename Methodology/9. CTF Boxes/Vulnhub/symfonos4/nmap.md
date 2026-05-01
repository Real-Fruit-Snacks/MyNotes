```
└─# cat nmap_all   
# Nmap 7.92 scan initiated Wed Sep 14 15:30:08 2022 as: nmap -sC -sV -oN nmap_all -vvv -p 22,80 192.168.1.136
Nmap scan report for 192.168.1.136
Host is up, received arp-response (0.00029s latency).
Scanned at 2022-09-14 15:30:09 EDT for 7s

PORT   STATE SERVICE REASON         VERSION
22/tcp open  ssh     syn-ack ttl 64 OpenSSH 7.9p1 Debian 10 (protocol 2.0)
| ssh-hostkey: 
|   2048 f9:c1:73:95:a4:17:df:f6:ed:5c:8e:8a:c8:05:f9:8f (RSA)
| ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDc6WD+nd5ZbnlOmJHKiExjfgbFX6q+QAKK3N+lsm6vntaQ3CRgdDBf37SsO5ptEHMUZrDPGBch03b0An18k6pHwSLfz5AuCTN3W0Rtqd2iFRqkhgoVatSEoESxCwULEpsRB738QhCeAfiTgHr/s5WtdQAgEoSBS6e4k8KHRD1M+8FVHrolrvJA//cQ7VzVvCDbQ/eYWh3kUjRJj/cFzY/Jpgwu0QxNhzXmHwroAjtzd0D59f/KIxG0ULyAr9aQoQVjy7fMN7wJyZZxhLLKSSMoT7G51khfn9Bwun9peI32IwZnVJ3L87fGgsSy/KdOjJDRLsGCXJNtT+jUviHAaTWz
|   256 be:c1:fd:f1:33:64:39:9a:68:35:64:f9:bd:27:ec:01 (ECDSA)
| ecdsa-sha2-nistp256 AAAAE2VjZHNhLXNoYTItbmlzdHAyNTYAAAAIbmlzdHAyNTYAAABBBIh5KJU7muB4UyLIXStFY9R+LekTaOgLGzYh/sWHOO+aj7OOE8QDWgjPTSZt0uDG9+bmT3Uz8v3EY2b0QDP5X9I=
|   256 66:f7:6a:e8:ed:d5:1d:2d:36:32:64:39:38:4f:9c:8a (ED25519)
|_ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIGBDJ/OjwxXNZ01JjiQXyOVhcY3z9ADXsEWJEOUMdHpd
80/tcp open  http    syn-ack ttl 64 Apache httpd 2.4.38 ((Debian))
| http-methods: 
|_  Supported Methods: POST OPTIONS HEAD GET
|_http-title: Site doesn't have a title (text/html).
|_http-server-header: Apache/2.4.38 (Debian)
MAC Address: 08:00:27:E2:EE:F0 (Oracle VirtualBox virtual NIC)
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

Read data files from: /usr/bin/../share/nmap
Service detection performed. Please report any incorrect results at <https://nmap.org/submit/> .
# Nmap done at Wed Sep 14 15:30:16 2022 -- 1 IP address (1 host up) scanned in 7.63 seconds
```