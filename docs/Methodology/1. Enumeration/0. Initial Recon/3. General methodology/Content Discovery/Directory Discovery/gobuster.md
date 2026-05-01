General solid ones:
gobuster dir -w /usr/share/seclists/Discovery/Web-Content/directory-list-2.3-medium.txt -u <http://192.168.1.136/>
gobuster dir -w /usr/share/seclists/Discovery/Web-Content/directory-list-2.3-medium.txt -u <http://192.168.1.136/> -x logs,bak,php,html,log,zip,gz,asp,aspx

gobuster over proxychains 
gobuster dir -u '<http://10.3.3.47/action=/'> -w /usr/share/seclists/Discovery/Web-Content/directory-list-2.3-medium.txt --proxy socks5://127.0.0.1:1081

/use/share/wordlists/dirbuster/directory-list-2.3-medium.txt

/usr/share/seclists/Discovery/Web-Content/raft-medium-directories.txt

/usr/share/seclists/Discovery/Web-Content/big.txt

/usr/share/seclists/Discovery/Web-Content/CGIs.txt

/usr/share/seclists/Discovery/Web-Content/common.txt

/usr/share/seclists/Discovery/Web-Content/raft-large-files.txt