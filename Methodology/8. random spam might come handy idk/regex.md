Regex 101:
![unnamed_f1b2d56217194910bb4a4c27e6488cb7](docs/Attachments/Methodology/8.%20random%20spam%20might%20come%20handy%20idk/regex/{{notename}}-202605011506.png)

Grepping for usernames: (6-12 character long, a-z characters, upper and lowercase 0-9 numbers)
```
egrep '^[a-ZA-Z0-9]{6,12}$' filename.txt
```

Grepping for emails: (contains '.' and '@' symbols)
```
egrep '^.+@.+\.com$' filename.txt
```

Grepping for websites:
```
grep -Eo '(http|https)://[^?"]+'
```
