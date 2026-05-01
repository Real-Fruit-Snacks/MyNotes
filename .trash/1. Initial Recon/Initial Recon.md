### **Network Scanning:**
### **Web Content Discovery:** 
## Directories:
```bash
ffuf -u http://$target/FUZZ -w /usr/share/seclists/Discovery/Web-Content/raft-large-directories.txt -recursion -recursion-depth 1 -o dirs_ffuf
ffuf -u http://$target/FUZZ -w /usr/share/seclists/Discovery/Web-Content/big.txt -recursion -recursion-depth 1
ffuf -u http://$target/FUZZ -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt -recursion -recursion-depth 1
ffuf -u http://$target/FUZZ -w /usr/share/seclists/Discovery/Web-Content/raft-large-words.txt -recursion -recursion-depth 1
```
## Files:
```bash
ffuf -u http://$target/FUZZ -w /usr/share/seclists/Discovery/Web-Content/big.txt -e .php,.html -o files_ffuf
ffuf -u http://$target/FUZZ -w /usr/share/seclists/Discovery/Web-Content/common.txt -t 50 -e .php,.asp,.aspx,.jsp,.html,.txt,.json
ffuf -u http://$target/FUZZ -w /usr/share/seclists/Discovery/Web-Content/raft-large-words.txt -t 50 -e .php,.asp,.aspx,.jsp,.html,.txt,.json
```
## Parse ffuf output:
```bash
cat dirs | jq -r '.results[] | [.status, .url] | @tsv' | sort
cat files | jq -r '.results[] | [.status, .url] | @tsv' | sort
```
## Wordlists:
```bash
/usr/share/seclists/Discovery/Web-Content/common.txt
/usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt
/usr/share/seclists/Discovery/Web-Content/raft-large-directories-lowercase.txt

/usr/share/seclists/Discovery/Web-Content/big.txt
/usr/share/seclists/Discovery/Web-Content/raft-large-files.txt
/usr/share/seclists/Discovery/Web-Content/raft-large-words.txt
```
## [[Methodology/2. Privilege Escalation/Linux Privesc/Methodology/Linux - Manual Enumeration]]
## [[Methodology/2. Privilege Escalation/Windows Privesc/Windows Methodology/Windows - Manual Enumeration]]
## [[Methodology/2. Privilege Escalation/Windows Privesc/Active Directory Methdology/Active Directory Methdology]]
## [[Methodology/1. Enumeration/0. Initial Recon/2. Checklist/! Checklists Overview/Checklist|Checklist]]