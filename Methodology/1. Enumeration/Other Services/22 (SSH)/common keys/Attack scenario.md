Found shares on bob user through RPC using enum4linuxng.

Did more enumeration and found Bob's shares through the guest user using smbmap:
![unnamed_b9f7ad68fdb24a01ab735be2e461e441](docs/Attachments/Methodology/1.%20Enumeration/Other%20Services/22%20(SSH)/common%20keys/Attack%20scenario/{{notename}}-202605011507-2.png)
I could now login normally!
![unnamed_1decf4276d4c4a7c995a89486d93a719](docs/Attachments/Methodology/1.%20Enumeration/Other%20Services/22%20(SSH)/common%20keys/Attack%20scenario/{{notename}}-202605011507-3.png)
Entered the share using smbclient:
smbclient -U "" '//10.11.1.136/Bob Share/'
![unnamed_2daf10e0cb6f433e8a15d292c0f52e4d](docs/Attachments/Methodology/1.%20Enumeration/Other%20Services/22%20(SSH)/common%20keys/Attack%20scenario/{{notename}}-202605011507-4.png)

I find this vulnerability on this samba version that allows us to link the underlying system to a share. And this metasploit module helps us do just that.
![unnamed_1c3663f1e82c4b2dbb8c9b8644ab66b3](docs/Attachments/Methodology/1.%20Enumeration/Other%20Services/22%20(SSH)/common%20keys/Attack%20scenario/{{notename}}-202605011507-5.png)

We can now see that rootfs has been succesfully added.
![unnamed_5de8e4a6d57346d9ab45bfacbd05080a](docs/Attachments/Methodology/1.%20Enumeration/Other%20Services/22%20(SSH)/common%20keys/Attack%20scenario/{{notename}}-202605011507-6.png)

Indeed, it seems to be working. Let's see what we can find and try to find a gameplan that can allow us get further access on the system. 
![[docs/Attachments/Methodology/1. Enumeration/Other Services/22 (SSH)/common keys/Attack scenario/{{notename}}-202605011506.png]]

A backups folder, very interesting. Let's take a look. 
![[docs/Attachments/Methodology/1. Enumeration/Other Services/22 (SSH)/common keys/Attack scenario/{{notename}}-202605011506-1.png]]

This might be valuable. Let's download them to our host and inspect further. 
![[docs/Attachments/Methodology/1. Enumeration/Other Services/22 (SSH)/common keys/Attack scenario/{{notename}}-202605011506-2.png]]

So I saw they are ssh-dss keys, meaning they are DSA keys. I was looking for their private keys through the ftp, but I couldn't find anything. My next thought were if I could bruteforce this in some way, and then I had an idea. I found this github repo of common dsa files, so I wanted to attempt comparing them to the authorized key file I found and see if I could find a match. <https://github.com/g0tmi1k/debian-ssh/tree/master/common_keys>

So I took this **AAAAB3NzaC1kc3MAAACBAOgzzMCD3Im5bRnAVdV3yLwTsyNAi3IiFShIfx9bUcUNmyFDM7SaFrVBuuIW+2qnDF7vybPiMNI9/dQ7ck2gLUqPu2F4gfXml8W9RKcqTOVksRmQ5s0O4c88mCqV3F1nzKKMSZbK9yYWbafabX91f2SinBQZbfMGv8+R2TyE78LjAAAAFQDXtJ7Pca0RkEBFcBLfPzmCUBpSeQAAAIEAlK4NYlfGt3uInBaKG0kK/N0nZwX7ji++5xSiLLjI/0M9xacdWaZcPBZ4GretGGIhnYEPlBote8GlG1Ap7li39ATazIXJQguG+Mgun3de73RugX/oGsUt5oatCS2Lo9mfRBijlVYChLyQbgkZMwKziwR1BHUWE/jkCKT7bPEJvw8AAACBAJZHIWHJybvrIcs9oB5hTL/8r+C9gDx+R3vcEFQq58D/UDi5FWzA71IZfcOt2+EPabP77gB6Ad/nNy3BrqmkocwLX+Of1uwMhgD63UeE5fUOuIbW+z4OF1M9tuzFAGALDMHJSx8U8Z11lsiuO4Owx11pAo8Ebq0sKNDd0GzvVQxE** and compared it against all I could find in that common dsa keys file I found.

And sure enough we did!

So I found the corresponding public key, and the corresponding private key is in the list too, so we might get ssh access through key authentification!

![[docs/Attachments/Methodology/1. Enumeration/Other Services/22 (SSH)/common keys/Attack scenario/{{notename}}-202605011507.png]]

`chmod 600 f1fb2162a02f0f7c40c210e6167f05ca-16858`

I got some errors at first, but after using ssh with -vv flag, and doing some research.. I found the issue.

I needed to add **PubkeyAcceptedKeyTypes +ssh-rsa** to my [/etc/ssh/ssh_config](file L2V0Yy9zc2gvc3NoX2NvbmZpZw==) file. And after doing so, we get in as bob!

![[docs/Attachments/Methodology/1. Enumeration/Other Services/22 (SSH)/common keys/Attack scenario/{{notename}}-202605011507-1.png]]

`ssh -i f1fb2162a02f0f7c40c210e6167f05ca-16858 bob@10.11.1.136`