- UDP 500 for Ike | Check for this vuln <https://raxis.com/blog/ike-vpns-supporting-aggressive-mode/>
- UDP 4500 for IPSEC Nat-Traversal Mode
- If port number 443 is open, it is an SSL VPN.
- If port number 3389 is open, it is RDP.
- If port number 22 is open, it's SSH.
   
   <https://serverfault.com/questions/451381/which-ports-for-ipsec-lt2p>




Scan IP ranges of ASN for port 3389, 22, 500 and 443. Get all subdomains of websites to look for vpn subdomain. 

subfinder -d edu.ee -all -v -o subs.txt
cat subs.txt | httpx -probe | grep -i SUCCESS | cut -d '[' -f1 | tee subs.alive

cat subs.alive | grep -i vpn
cat subs.alive | grep -i vps
cat subs.alive | grep -i dev
cat subs.alive | grep -i test

cat subs.alive | httpx -sc -title -ms 'VPN' -p 80,443,8080,8443 -follow-redirects | tee httpx.log
cat subs.alive | httpx -sc -title -ms 'citrix' -p 80,443,8080,8443 -follow-redirects | tee httpx.log
(httpx doesnt scan non http/s ports lol)



go to <https://bgp.he.net/> and search ipv4 address of the website you wanna use to find the rest of comapny ASN and ip ranges. grab the ip range/s you wanna test.
rustscan -a 193.40.0.0/16 -p 80,443 --ulimit 5000 -g | tee rust.grep && cut -d ' ' -f1 rust.grep | tee rust.ip

next you can do this to resolve all IPs to the corresponding domains. this will basically find all the alive subdomains in their ip range:
for ip in $(cat rust.ip); do
    domain=$(dig +short -x $ip)
    echo "$ip: $domain" >> ip_domains.txt
done && awk -F ': ' '{print $2}' ip_domains.txt | sed 's/\.$//; /^$/d' | tee ip_domains_clean.txt

check for IPSec based VPNs over UDP: (might wanna run 2-3 times to verify)
rustscan -a rust.ip -p 500 --ulimit 5000 -g -- -sU -v

Go through all domains/subdomains and scout for exposed VPNs:
cat ip_domains_clean.txt | httpx -sc -title -ms 'VPN' -p 80,443,8080,8443 -follow-redirects | tee VPNs.txt
cat ip_domains_clean.txt | httpx -sc -title -ms 'citrix' -p 80,443,8080,8443 -follow-redirects | tee VPNs.txt

Seems to work well:
cat equinor_subs.alive.txt | httpx -sc -title -mr "\bVpn\b|\bCisco\b|\bCitrix\b|\bForti" -p 80,443 -follow-redirects | tee vpn.txt

All over tor technique:
proxychains -q masscan -p0 193.40.0.0/16 --ping --rate=500 | tee pingsweep.txt && cat pingsweep.txt | cut -d 'n' -f 3 | grep -o '[0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}' | tee ips.txt && for ip in $(cat ips.txt); do
    domain=$(proxychains -q dig +short -x $ip)
    echo "$domain"
done >> domains.txt && cat domains.txt| sed 's/\.$//; /^$/d' | grep -v ';;' | tee domains.txt

This works well, but wont work over self signed certificates sadly:
cat equinor_subs.alive.txt | httpx -sc -title -mr "\bVpn\b|\bCisco\b|\bCitrix\b|\bForti|forticlient|\Ooutlook\b" -p 80,443,8000,8080,8443 -follow-redirects | tee vpn.txt

This does, but wont be able to naturally follow redirects and grab the word-matching from the endsite, if its been redirected. Only works on initial one unfortunately:
nuclei -no-interactsh -stats -follow-host-redirects -l "test.txt" -o "nuclei-results.txt" -t "./test.yaml" -vv

#The Nuclei developers are aware of this limitation and are working on a solution to remove nested callbacks and properly follow redirects, as indicated by the open issue (#4980) and the ongoing work in the "feat-4980-callbacks" branch1.

Best workflow <3
proxychains -q masscan -p0 147.91.0.0/16 --ping --rate=500 | tee pingsweep.txt && cat pingsweep.txt | cut -d 'n' -f 3 | grep -o '[0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}' | tee ips.txt && for ip in $(cat ips.txt); do
    domain=$(proxychains -q dig +short -x $ip)
    echo "$domain"
done >> domains.txt && cat domains.txt| sed 's/\.$//; /^$/d' | grep -v ';;' | tee domains.txt 

cat ips.txt | httpx -sc -title -fr -silent | tee httpx.log | cut -d '[' -f 1 | tee httpx_ips.clean
cat domains.txt | httpx -sc -title -fr -silent | tee httpx.log | cut -d '[' -f 1 | tee httpx_domains.clean

nuclei -no-interactsh -nh -stats -follow-host-redirects -l "httpx_ips.clean" -o "nuclei-results.txt" -t "/opt/tools/test.yaml" -vv
nuclei -no-interactsh -nh -stats -follow-host-redirects -l "httpx_domains.clean" -o "nuclei-results.txt" -t "/opt/tools/test.yaml" -vv

DOESNT WORK OVER TOR, BE MINDFUL
rustscan -p 4500,500 -a ips.txt -g -- -sU | tee rust![unnamed_18b2746c8809418b8f2741df79535261](docs/Attachments/_Methodology/10.%20Initial%20Access/VPN/VPN/{{notename}}-202605011742.png)
