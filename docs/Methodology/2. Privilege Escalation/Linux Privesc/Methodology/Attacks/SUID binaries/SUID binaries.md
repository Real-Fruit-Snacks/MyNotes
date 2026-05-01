run this. see what processes has scary SUID binaries set on them 
find / -type f -perm -04000 -ls 2>/dev/null

secondly, go to https://gtfobins.github.io/#+suid and go down the list and see what processes potentially match with victim machine. You might find some juice privesc binary to use

