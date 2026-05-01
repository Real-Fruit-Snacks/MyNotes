<https://github.com/ropnop/kerbrute>

```
git clone <https://github.com/ropnop/kerbrute>
make all
```

```
cp /opt/kerbrute/dist/kerbrute . 
```

Kerbrute does it's username enumeration through kerberos. Whilst a tool like enum4linux gets it through RPC. Worth noting. Test both.

Specify domain and userfile you wanna use and let it do its magic(I don't think this could cause lock-out policy events trigger, but keep it in mind. Also, on a red team assessment keep in mind one the users could be a honeypot that would alert them, food for thought ;;_))

```
kerbrute userenum /usr/share/seclists/Usernames/Names/names.txt --dc 10.10.86.201 -d THM-AD
```

To enumerate usernames, Kerbrute sends TGT requests with no pre-authentication. ... However, if the KDC prompts for pre-authentication, we know the username exists and we move on. This does not cause any login failures so it will not lock out any accounts.

Use this tool to take full names and create different possible AD usernames from: give it a list with format of julia thompson etc...

```
git clone <https://github.com/mohinparamasivam/AD-Username-Generator>
```
```
python3 username-generate.py -u names.txt -o generated_users.txt
```
