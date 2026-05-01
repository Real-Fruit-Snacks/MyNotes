ports
**22 OpenSSH 7.6p1**

```
80 Golang net/http server
[00:01:50] 301 -    0B  - /aboutus  ->  aboutus/                           
[00:01:51] 301 -   42B  - /admin  ->  /admin/                               
[00:01:55] 301 -    0B  - /css  ->  css/                                    
[00:01:57] 301 -    0B  - /downloads  ->  downloads/                        
[00:02:00] 301 -    0B  - /img  ->  img/                                    
[00:02:01] 301 -    0B  - /index.html  ->  ./                               
[00:02:11] 301 -    0B  - /render/<https://www.google.com>  ->  /render/https:/[www.google.com](http://www.google.com)
```

/admin had a cookie auth bypass.
![unnamed_8defa259d9294e60b551a5d1746bf900](unnamed_8defa259d9294e60b551a5d1746bf900.png)

 You can see the sourcecode of it in /login.js
![unnamed_036d6d604fb84aa9800597618b833bd9](unnamed_036d6d604fb84aa9800597618b833bd9.png)

Got ssh creds, cracked encrypted private key
![unnamed_5aed2cef280444dcb1b8b7d7a6c80e2f](unnamed_5aed2cef280444dcb1b8b7d7a6c80e2f.png)
![unnamed_0c826c63cf6f4c4cbad0b86254bfea1c](unnamed_0c826c63cf6f4c4cbad0b86254bfea1c.png)

Added myself as the hostip for this domain
![unnamed_bd739d2a844a45769d6c67aaa8d159bb](unnamed_bd739d2a844a45769d6c67aaa8d159bb.png)

simulated similar file structure as the server, this is needed. And made a simple bash script for when root executes the curl request through bash
![unnamed_862d731deda44c27b27276b5643c1deb](unnamed_862d731deda44c27b27276b5643c1deb.png)

It triggered, and we run the /bin/bash suid binary and get root!
![unnamed_bd2d1f08fa254cb98e7e415f48c3ed73](unnamed_bd2d1f08fa254cb98e7e415f48c3ed73.png)






