### **Network Scanning:**
```
nmap -p- -Pn $target -v --min-rate 1000 --max-rtt-timeout 1000ms --max-retries 5 -oN nmap_ports.txt && sleep 5 && nmap -Pn $target -sV -sC -v -oN nmap_sVsC.txt && sleep 5 && nmap -T5 -Pn $target -v --script vuln -oN nmap_vuln.txt 

rustscan --ulimit 5000 -a $target -- -sC -sV -Pn -oN nmap_full
```
### **Web Content Discovery:** 
## Directories:
```
ffuf -u http://$target/FUZZ -w /usr/share/seclists/Discovery/Web-Content/raft-large-directories.txt -recursion -recursion-depth 1 -o dirs
ffuf -u http://$target/FUZZ -w /usr/share/seclists/Discovery/Web-Content/big.txt -recursion -recursion-depth 1
ffuf -u http://$target/FUZZ -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt -recursion -recursion-depth 1
ffuf -u http://$target/FUZZ -w /usr/share/seclists/Discovery/Web-Content/raft-large-words.txt -recursion -recursion-depth 1
```
## Files:
```
ffuf -u http://$target/FUZZ -w /usr/share/seclists/Discovery/Web-Content/big.txt -e .php,.html -o files
ffuf -u http://$target/FUZZ -w /usr/share/seclists/Discovery/Web-Content/common.txt -t 50 -e .php,.asp,.aspx,.jsp,.html,.txt,.json
ffuf -u http://$target/FUZZ -w /usr/share/seclists/Discovery/Web-Content/raft-large-words.txt -t 50 -e .php,.asp,.aspx,.jsp,.html,.txt,.json
```
## Parse ffuf output:
```
cat dirs | jq -r '.results[] | [.status, .url] | @tsv' | sort
cat files | jq -r '.results[] | [.status, .url] | @tsv' | sort
```
## Wordlists:
```
/usr/share/seclists/Discovery/Web-Content/common.txt
/usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt
/usr/share/seclists/Discovery/Web-Content/raft-large-directories-lowercase.txt

/usr/share/seclists/Discovery/Web-Content/big.txt
/usr/share/seclists/Discovery/Web-Content/raft-large-files.txt
/usr/share/seclists/Discovery/Web-Content/raft-large-words.txt
```
## [[Linux - Manual Enumeration]]
## [[Windows - Manual Enumeration]]
## [[Active Directory Methdology]]
## [[Methodology/1. Enumeration/0. Initial Recon/2. Checklist/! Checklists Overview/Checklist|Checklist]]