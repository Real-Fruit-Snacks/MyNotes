## Attacking mongo:
<https://infinitelogins.com/2020/12/03/pentesting-oracle-databases-with-odat/>
<https://medium.com/@netscylla/pentesters-guide-to-oracle-hacking-1dcf7068d573>

Login syntax:
```
sqlplus 'web_app'/'dsfdfoj435GEre4'@10.11.1.222:1521/xe; 

sqlplus 'web_app'/test123@10.11.1.222:1521/xe;as sysdba

select * from session_privs;
```
==

SQLPLUS:
sqlplus download outside of the apt install one (if the apt install doesn't work):

<https://zwbetz.com/install-sqlplus-on-linux/#sqlplus-version-193000>
follow this one, but use the newest versions
Go to the directory [/opt/oracle/instantclient_21_5](fold L29wdC9vcmFjbGUvaW5zdGFudGNsaWVudF8yMV81)

also, after the source ~/.bashrc , the bash might likely do some crazy things, and just do /bin/bash and then use the program.
sqlplus -h 
etc..
## Navigation:
<https://www.mongodb.com/docs/manual/reference/mongo-shell/>
<https://blog.e-zest.com/basic-commands-for-mongodb>

![unnamed_74807a229ce44e40a427103185aecd08](unnamed_74807a229ce44e40a427103185aecd08.png)