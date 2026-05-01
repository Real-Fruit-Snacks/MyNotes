<https://null-byte.wonderhowto.com/how-to/crack-shadow-hashes-after-getting-root-linux-system-0186386/>

copy /etc/passwd to passwd.txt
copy /etc/shadow to shadow.txt

unshadow passwd.txt shadow.txt > passwords.txt 

john passwords.txt

if john manages to crack any of them, start enumerating those machines for the previous priv-esc techniques for trying to eventually get full access
