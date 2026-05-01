```
PORT    STATE SERVICE     REASON         VERSION
21/tcp  open  ftp         syn-ack ttl 64 ProFTPD 1.3.5
22/tcp  open  ssh         syn-ack ttl 64 OpenSSH 7.4p1 Debian 10+deb9u6 (protocol 2.0)
| ssh-hostkey: 
|   2048 9d:f8:5f:87:20:e5:8c:fa:68:47:7d:71:62:08:ad:b9 (RSA)
| ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC/Cvyjh+QnQHsoZt3FqnW8JazNn1CYvc7uuArLkDPM25xV8l4Jc7Xw9InhmSFKJJD0mXhLALt/9byLeH7CyBEjpKATbSsEIL1iQ7G7ETmuOdZPfZxRnLhmaf1cvUxLapJQ5B3z67VR0PxvjfDk/0ARPAhKu1CuPmZk/y4t2iu8RKHG86j5jzR0KO3o2Aqsb2j+7XOd4IDCSFuoFiP3Eic/Jydtv73pyo+2JxBUvTSLaEtqe1op8sLP8wBFRX4Tvmqz/6zO1/zivBjBph8XMlzuMkMC8la8/XJmPb8U5C/8zfogG+YwycTw6ul7616PIj2ogPP89uyrTX9dM3RuZ9/1
|   256 04:2a:bb:06:56:ea:d1:93:1c:d2:78:0a:00:46:9d:85 (ECDSA)
| ecdsa-sha2-nistp256 AAAAE2VjZHNhLXNoYTItbmlzdHAyNTYAAAAIbmlzdHAyNTYAAABBBKXypIGuum1SlMddq/BrUwIZM1sRIgbzdijCa1zYunAAT+uKTwPGaKO7e9RxYu97+ygLgpuRMthojpUlOgOVGOA=
|   256 28:ad:ac:dc:7e:2a:1c:f6:4c:6b:47:f2:d6:22:5b:52 (ED25519)
|_ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAILluhq57UWA4q/mo/h6CjqWMpMOYB9VjtvBrHc6JsEGk
80/tcp  open  http        syn-ack ttl 64 WebFS httpd 1.21
|_http-server-header: webfs/1.21
|_http-title: Site doesn't have a title (text/html).
| http-methods: 
|_  Supported Methods: GET HEAD
139/tcp open  netbios-ssn syn-ack ttl 64 Samba smbd 3.X - 4.X (workgroup: WORKGROUP)
445/tcp open  netbios-ssn syn-ack ttl 64 Samba smbd 4.5.16-Debian (workgroup: WORKGROUP)
MAC Address: 08:00:27:F0:BA:BA (Oracle VirtualBox virtual NIC)
Service Info: Host: SYMFONOS2; OSs: Unix, Linux; CPE: cpe:/o:linux:linux_kernel

Host script results:
|_clock-skew: mean: 1h40m57s, deviation: 2h53m12s, median: 56s
| smb-security-mode: 
|   account_used: guest
|   authentication_level: user
|   challenge_response: supported
|_  message_signing: disabled (dangerous, but default)
| smb2-security-mode: 
|   3.1.1: 
|_    Message signing enabled but not required
| p2p-conficker: 
|   Checking for Conficker.C or higher...
|   Check 1 (port 28775/tcp): CLEAN (Couldn't connect)
|   Check 2 (port 14795/tcp): CLEAN (Couldn't connect)
|   Check 3 (port 18866/udp): CLEAN (Failed to receive data)
|   Check 4 (port 37956/udp): CLEAN (Failed to receive data)
|_  0/4 checks are positive: Host is CLEAN or ports are blocked
| nbstat: NetBIOS name: SYMFONOS2, NetBIOS user: <unknown>, NetBIOS MAC: <unknown> (unknown)
| Names:
|   SYMFONOS2<00>        Flags: <unique><active>
|   SYMFONOS2<03>        Flags: <unique><active>
|   SYMFONOS2<20>        Flags: <unique><active>
|   \x01\x02__MSBROWSE__\x02<01>  Flags: <group><active>
|   WORKGROUP<00>        Flags: <group><active>
|   WORKGROUP<1d>        Flags: <unique><active>
|   WORKGROUP<1e>        Flags: <group><active>
| Statistics:
|   00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
|   00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
|_  00 00 00 00 00 00 00 00 00 00 00 00 00 00
| smb2-time: 
|   date: 2022-09-10T07:46:59
|_  start_date: N/A
| smb-os-discovery: 
|   OS: Windows 6.1 (Samba 4.5.16-Debian)
|   Computer name: symfonos2
|   NetBIOS computer name: SYMFONOS2\x00
|   Domain name: \x00
|   FQDN: symfonos2
|_  System time: 2022-09-10T02:46:59-05:00
```