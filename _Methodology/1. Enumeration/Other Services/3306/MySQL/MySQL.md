sudo apt install default-mysql-client

mysql -h 10.10.36.102 -u root -p

show databases;
use mysql;
show tables;
show variables;
SELECT * from users;

using metasploit:
![unnamed_ef59fdf8e21942eb8d6633fa9739e4b7](docs/Attachments/_Methodology/1.%20Enumeration/Other%20Services/3306/MySQL/MySQL/{{notename}}-202605011742.png)

Dumping tables:
![unnamed_5d255c4a77d74321b28639ab1d870fe4](docs/Attachments/_Methodology/1.%20Enumeration/Other%20Services/3306/MySQL/MySQL/{{notename}}-202605011742-1.png)

Dumping Hases:
![unnamed_bb181b2de6ba45d192b0ee8b23a04bb1](docs/Attachments/_Methodology/1.%20Enumeration/Other%20Services/3306/MySQL/MySQL/{{notename}}-202605011743.png)
