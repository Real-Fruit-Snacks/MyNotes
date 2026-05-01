<https://book.hacktricks.xyz/pentesting/pentesting-ftp>
Try anonymous login like this:
```
ftp 10.10.77.213
*anonymous*
```

Check for guest account access
```
get file.txt
put malicousfile.aspx
```

Trick: (This basically downloads everything at once, much faster than get)
```
prompt off
recurse on
mget *
```

You can also do it like this: (Sometimes this is quicker and more stable)
```
wget -r <ftp://steph:billabong@10.1.1.68>
```
![unnamed_c41adc15e50e42c6878abc4e9e03ff49](docs/Attachments/Methodology/1.%20Enumeration/Other%20Services/21%20(FTP)/21%20(FTP)/{{notename}}-202605011506.png)

test more with this, mby the browser u use impacts it too
<ftp://anonymous:null@disco.os:21/shelluw.asp>

