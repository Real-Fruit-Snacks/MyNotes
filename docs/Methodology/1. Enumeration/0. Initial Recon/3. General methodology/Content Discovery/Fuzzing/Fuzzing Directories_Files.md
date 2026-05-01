Dirs:
ffuf -c -u 'http://$t/FUZZ' -w /usr/share/wordlists/dirbuster/directory-list-lowercase-2.3-medium.txt -r

Files:
ffuf -c -u 'http://$t/FUZZ' -w /usr/share/seclists/Discovery/Web-Content/raft-large-files.txt -r

