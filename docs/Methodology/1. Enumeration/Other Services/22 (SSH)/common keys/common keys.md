<https://github.com/g0tmi1k/debian-ssh/tree/master/common_keys>

If you find some authorized keys from target host through linking their hostsystem through smb vulnerability or something, you can do this trick. In this case some id_rsa keys. Let's say we see this: 
(output from target machine after we did samba_symlink exploit on our targets SMB. For reference, see this: [Attack scenario](Attack%20scenario.md))

We can then grep for this particular string from all the files in this folder we download from github with various common ssh keys:

Once we found a matching one, simply remove the “.pub” to find the private key that correlates with that one, and give it chmod 600 persmissions, and simple ssh in using -i!

It's a cool little trick. ![unnamed_ae526d1ad490406bb77db81b5b953d8b](unnamed_ae526d1ad490406bb77db81b5b953d8b.png)
![unnamed_eca4967cb61d452a999e06c20ab49e6d](unnamed_eca4967cb61d452a999e06c20ab49e6d.png)
![unnamed_8f2f6262169a407a955ec4efc34a7b0d](unnamed_8f2f6262169a407a955ec4efc34a7b0d.png)
