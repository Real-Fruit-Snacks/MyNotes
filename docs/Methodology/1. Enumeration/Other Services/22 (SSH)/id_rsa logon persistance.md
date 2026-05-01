<https://github.com/PinkDraconian/CTF-bash-tools/blob/master/scripts/ctf-ssh.sh>

In this instance we used this ^ script to generate a keypair with no password, give it chmod 600, we then echo our id_rsa to the victim ~/.ssh/authorized_keys folder so we can connect with the keys we just created and make them accept.

ssh -i id_rsa dwight@172.31.3.1

Copy the id_rsa private key from target to your host. Do chmod 600 id_rsa on it. Then ssh -i id_rsa username@target to get shell. If the private key is password-protected, you can try cracking it with John the Ripper using ssh2john to convert it and then running john on the output.

