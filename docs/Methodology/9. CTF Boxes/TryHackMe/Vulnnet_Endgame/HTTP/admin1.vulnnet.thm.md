```
└─# gobuster dir -u <http://admin1.vulnnet.thm> -w /usr/share/seclists/Discovery/Web-Content/directory-list-lowercase-2.3-medium.txt                    130 ⨯
===============================================================
Gobuster v3.1.0
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@firefart)
===============================================================
[+] Url:                     <http://admin1.vulnnet.thm>
[+] Method:                  GET
[+] Threads:                 10
[+] Wordlist:                /usr/share/seclists/Discovery/Web-Content/directory-list-lowercase-2.3-medium.txt
[+] Negative Status codes:   404
[+] User Agent:              gobuster/3.1.0
[+] Timeout:                 10s
===============================================================
2022/10/03 12:48:37 Starting gobuster in directory enumeration mode
===============================================================
/en                   (Status: 301) [Size: 321] [--> <http://admin1.vulnnet.thm/en/]>
/vendor               (Status: 301) [Size: 325] [--> <http://admin1.vulnnet.thm/vendor/]>
/fileadmin            (Status: 301) [Size: 328] [--> <http://admin1.vulnnet.thm/fileadmin/]>
/typo3temp            (Status: 301) [Size: 328] [--> <http://admin1.vulnnet.thm/typo3temp/]>
/typo3                (Status: 301) [Size: 324] [--> <http://admin1.vulnnet.thm/typo3/]>    
/typo3conf            (Status: 301) [Size: 328] [--> <http://admin1.vulnnet.thm/typo3conf/]>

login:
chris_w
vAxWtmNzeTz

Let's delete this. It's used for filtering file extensions


BAM
```

![unnamed_da4564aab091429fbbda86cde6826af7](unnamed_da4564aab091429fbbda86cde6826af7.png)
![unnamed_cbcf0e49a2274134b51a45004aab9208](unnamed_cbcf0e49a2274134b51a45004aab9208.png)
![unnamed_1e50f28cbeb240f280c00f62099c6bbb](unnamed_1e50f28cbeb240f280c00f62099c6bbb.png)

