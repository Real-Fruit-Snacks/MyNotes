<https://github.com/003random/getJS>
<https://github.com/projectdiscovery/katana>

katana -u <http://127.0.0.1:80> -jc --depth 4 -silent


go through burp
katana -u <http://testphp.vulnweb.com/> -jc --depth 3 -silent -fx -s 'breadth-first' --proxy <http://127.0.0.1:8080>

ffuf -c -u 'http://testphp.vulnweb.com/FUZZ' -w /usr/share/wordlists/dirbuster/directory-list-lowercase-2.3-medium.txt -r -x <http://127.0.0.1:8080>

