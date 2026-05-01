<https://github.com/PinkDraconian/CTF-bash-tools/blob/master/scripts/ctf-ssh.sh>

In this instance we used this ^ script to generate a keypair with no password, give it chmod 600, we then echo our id_rsa to the victim ~/.ssh/authorized_keys folder so we can connect with the keys we just created and make them accept.

ssh -i id_rsa -L 2121:localhost:10000 dwight@172.31.3.1

^ Here we found an internal port on victim machine on port 10000 (webmin server), so we use ssh port forwarding to get access to it via localhost. Basically just using their access to port forward it to our localhost on port 2121 in this instance. 

From here we can access the webmin service from our machine. (ex http://localhost:2121)  

==

To start ssh on kali, just run
sudo systemctl start ssh

gedit /etc/ssh/sshd_config&


