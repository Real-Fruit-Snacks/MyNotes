<https://media-exp1.licdn.com/dms/document/C561FAQFMUiAa5fYPhg/feedshare-document-pdf-analyzed/0/1649057128703?e=2147483647&v=beta&t=2MXCYdO_Lpeq1vXOFgwr4exZT-gw16kAhaGG9ZapsH4>

- Start Burp Suite and have it passively listening to requests
- Check web server version and underlying host system
- Any CMS? Check page, source code, check tabs, headers, cookies
- Check network traffic on sites and see if they make any interesting calls to somewhere
- Bruteforce directories, files, and maybe subdomains
- Read sourcecode especially on main page, login pages, and .js files
- Keep burp proxying in the background and look for redirects or pages not obvious for enduser
- Keep an eye on paramaters used on any request -> if so, test SQLI, Command Injection, LFI/RFI, XSS etc
- Check for dumb shit like exposed .bak files etc

