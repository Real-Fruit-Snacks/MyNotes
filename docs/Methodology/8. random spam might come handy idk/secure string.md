dealing with windows secure string on xml file:
```
$cred = import-clixml .\xyan1d3.xml
$cred.getnetworkcredential().password
```

then it'll output the secured string in clear text