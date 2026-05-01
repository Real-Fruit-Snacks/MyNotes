Light:
feroxbuster -u <http://testphp.vulnweb.com/> -e -q -n --no-state -w /usr/share/seclists/Discovery/Web-Content/common.txt -o ferox_light.txt

Heavier:
feroxbuster -u <http://testphp.vulnweb.com/> -e -q -b -E --no-state -w gedit /usr/share/seclists/Discovery/Web-Content/raft-medium-directories.txt -o ferox_medium.txt
feroxbuster -u <http://testphp.vulnweb.com/> -e -q -E -b --no-state -w gedit /usr/share/seclists/Discovery/Web-Content/raft-medium-words-lowercase.txt -o ferox_medium.txt

https scan:
feroxbuster -u <https://set.windcorp.thm:443> -o dir.txt -e -q --no-state -t 80 -k


/use/share/wordlists/dirbuster/directory-list-2.3

/usr/share/seclists/Discovery/Web-Content/raft-medium-directories.txt

/usr/share/seclists/Discovery/Web-Content/big.txt

/usr/share/seclists/Discovery/Web-Content/CGIs.txt

/usr/share/seclists/Discovery/Web-Content/common.txt

/usr/share/seclists/Discovery/Web-Content/raft-large-files.txt

jhaddix all.txt:
<https://gist.githubusercontent.com/jhaddix/86a06c5dc309d08580a018c66354a056/raw/96f4e51d96b2203f19f6381c8c545b278eaa0837/all.txt>

feroxbuster -u <http://testphp.vulnweb.com/> -e -q --no-state -o ferox.txt -w /usr/share/seclists/Discovery/Web-Content/common.txt

Extract URLs only:
cat ferox.txt | grep -oE 'https?://[^[:space:]]+'


