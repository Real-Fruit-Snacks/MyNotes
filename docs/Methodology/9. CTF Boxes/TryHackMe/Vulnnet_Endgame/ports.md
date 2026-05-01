```
# Nmap 7.92 scan initiated Sun Oct  2 21:14:15 2022 as: nmap -sC -sV -Pn -oN nmap_full -vvv -p 22,80 10.10.231.35
Nmap scan report for vulnnet.thm (10.10.231.35)
Host is up, received user-set (0.31s latency).
Scanned at 2022-10-02 21:14:15 EDT for 17s

PORT   STATE SERVICE REASON         VERSION
22/tcp open  ssh     syn-ack ttl 61 OpenSSH 7.6p1 Ubuntu 4ubuntu0.7 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   2048 bb:2e:e6:cc:79:f4:7d:68:2c:11:bc:4b:63:19:08:af (RSA)
| ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDQRQ5sGPZniwdg1TNW71UdA6dc2k3lpZ68EnacCUgKEqZT7sBvppGUJjSAMY7aZqdZJ0m5N9SQajB9iW3ZEKHM5qtbXOadbWkRKp3VrqtZ8VW1IthLa2+oLObY2r1qep6O2NqrghQ/yVCbJYF5H8BsTtjCVNBeVSzf9zetwUviO6xfqIRO3iM+8S2WpZwKGtrBFvA9RaBsqLBGB1XGUjufKxyRUzOx1J2I94Xhs/bDcaOV5Mw6xhSTxgS3q6xVmL6UU3hIbpiXzYcj2vxuAXXszyZCM4ZkxmQ1fddQawxHfmZRnqxVogoHDsOGgh9tpQsc+S/KTrYQa9oFEVARV70x
|   256 80:61:bf:8c:aa:d1:4d:44:68:15:45:33:ed:eb:82:a7 (ECDSA)
| ecdsa-sha2-nistp256 AAAAE2VjZHNhLXNoYTItbmlzdHAyNTYAAAAIbmlzdHAyNTYAAABBBEg9Hw4CIelacGVS0U+uFcwEj183dT+WrY/tvJV4U8/1alrGM/8gIKHEQIsU4yGPtyQ6M8xL9q7ak6ze+YsHd2o=
|   256 87:86:04:e9:e0:c0:60:2a:ab:87:8e:9b:c7:05:35:1c (ED25519)
|_ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIJJDCCks5eMviLJyDQY/oQ3LLgnDoXvqZS0AxNAJGv9T
80/tcp open  http    syn-ack ttl 61 Apache httpd 2.4.29 ((Ubuntu))
| http-methods: 
|_  Supported Methods: HEAD GET POST OPTIONS
|_http-title: Soon &mdash; Fully Responsive Software Design by VulnNet
|_http-server-header: Apache/2.4.29 (Ubuntu)
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel
```