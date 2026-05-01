Just this for general methodology. Note that you might wanna change extensions depending on target 

## Directories:
gobuster dir -u <http://$target> -w /usr/share/seclists/Discovery/Web-Content/raft-large-directories.txt -t 50 -o gb_dirs.txt
gobuster dir -u <http://$target> -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt -t 50 -o gb_dirs2.txt

## Files:
gobuster dir -u <http://$target> -w /usr/share/seclists/Discovery/Web-Content/common.txt -t 50 -x php,asp,xml,html,js,sql,gz,zip -r -o gb_files.txt
gobuster dir -u <http://$target> -w /usr/share/seclists/Discovery/Web-Content/raft-large-files.txt -t 50 -x php,asp,xml,html,js,sql,gz,zip -r -o gb_files2.txt

## Wordlists:
/usr/share/seclists/Discovery/Web-Content/common.txt
/usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt
/usr/share/seclists/Discovery/Web-Content/raft-medium-directories.txt
/usr/share/seclists/Discovery/Web-Content/raft-large-directories-lowercase.txt

/usr/share/seclists/Discovery/Web-Content/big.txt
/usr/share/seclists/Discovery/Web-Content/raft-large-files.txt
/usr/share/seclists/Discovery/Web-Content/raft-large-words.txt

