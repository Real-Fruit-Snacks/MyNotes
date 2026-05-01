Basic authentification syntax:
smbmap -H 10.11.1.136 (This tests for anonymous and guest access by default here I believe)
smbmap -H 10.11.1.136 -u 'anonymous' -p ‘’
smbmap -H 10.11.1.136 -u 'guest' -p ‘’
smbmap -H 10.11.1.136 -u 'bob' -p ‘Whitebirds231@!’

Recursive output of the directory structure of those shares:
smbmap -H 10.11.1.136 -R 

Upload files to share:
smbmap -H 10.11.1.136 --upload rev.sh 'Bob Share\rev.sh'

Downloads files it can access:
smbmap -H 10.11.1.136 --download "Bob Share\Contract Mr. Suzuki.txt"

