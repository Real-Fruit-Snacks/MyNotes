## Mapping out target infrastructure and targeting VPNs. 

Why do we even care?
The reason we care is because a VPN is the gateway to their internal network. That is a companies biggest fear. Due to persistance, stealing sensitive data, ransomware etc. Hacking a webapp is likely to be in it's own seperate network in a DMZ. If you can mao out and exploit their VPNs, it\s game over.   

Strategy 1: Map out target infrastructure and find VPNs (ONLY IF SELF HOSTED):

Map out targets full IP range first. Find their main domain and simply ping them to get their IP.
ping testphp.vulnweb.com

We can also run reverse dns on IP to see corresponding domain name. 
dig -x 44.228.249.3

In output we can easily see this is an EC2 instance hosted in amazon:
3.249.228.44.in-addr.arpa. 0    IN      PTR     ec2-44-228-249-3.us-west-2.compute.amazonaws.com.

Then take that IP and run a whois to see who owns target and get their full IP range to widen the attack surface:
whois 44.228.249.3

Assuming this is self hosted infrastructure, then scan the entire IP range with either nmap or rustscan. I'd recommend rustscan. Much faster.

If you're after VPNs, I'd recommend scanning all Ips in IP range for these ports:
- UDP 500 for Ike
- UDP 4500 for IPSEC Nat-Traversal Mode
- If port number 443 is open, it is an SSL VPN.
- If port number 3389 is open, it is RDP.
- If port number 22 is open, it's SSH.

These are common ports for either VPNs based or UDP based VPNs, and 22 and 3389 is in case of jump boxes for the targeted organization. All valuable data to have if you want to get into the internal network of that company for ethical penetration tests. 

After this resolve the IPs with dnsx or dig -x and save to a list for domains. And save all IPs elsewhere. You can scan the domains with httpx like shown under, and IPs are better suited for nuclei due to self signed certifcate will likely cause issues for httpx when it comes to exposed VPNs. 

This technique will not work in scenarious it's being hosted in by cloudflare or in the cloud as cloud ranges is given to more than just one company. So unlses the company is hosting the infrastructure themselves which some do, be careful with scanning out of scope. Pay close attention to the Netname, OrgName, and Route fields in the whois lookup. 

Strategy 2: Map out target infrastructure and find VPNs (If not self hosted, but works eitherway):

If you have issues downloading tools, you'll find info at the bottom of this document.

Find every passive DNS related domain related to tesla.com
subfinder -all -silent -d tesla.com | dnsx -silent | tee subdomains.txt

Check for sensitive keywords 
grep -Ei "vpn|cisco|citrix|forti|forticlient|Outlook|login" subdomains.txt

In this example we found 8 exposed live VPN related domains for tesla.com
apacvpn.tesla.com
apacvpn1.tesla.com
apacvpn2.tesla.com
cnvpn1.tesla.com
cnvpn.tesla.com
vpn2.tesla.com
vpn1.tesla.com
vpn3.tesla.com

Using httpx to check for more sensitive exposed VPNs, emails, or general login panels in the html response of the page. 
cat subdomains.txt | httpx -sc -title -mr "\bVpn\b|\bCisco\b|\bCitrix\b|\bForti|forticlient|\bOutlook\b|\blogin\b|\bGlobalProtect\b|\bAzureAttend\b" -p 80,443,8000,8080,8443 -follow-redirects | tee vpn.txt

httpx has an issue where it won't accept self signed certificates. This is an issue because a lot of VPNs are exposed with self signed certs. Luckily we have a way around this using Nuclei. 
nuclei -no-interactsh -nh -stats -follow-host-redirects -l "httpx_domains.clean" -o "nuclei-results.txt" -t "/opt/tools/test.yaml" -vv
Keep in mind “httpx_domains.clean” is the domains and subdomain we want to target, and test.yaml is our nuclei template we will be using.

This is a great methodology for finding companies most valuable treasures. Plenty more guides are coming soon.

Setting up tools:
subfinder:
apt install subfinder -y

DNSX:
apt install dnsx -y

HTTPX:
rm /usr/bin/httpx
wget <https://github.com/projectdiscovery/httpx/releases/download/v1.6.9/httpx_1.6.9_linux_amd64.zip>
unzip httpx_1.6.9_linux_amd64.zip
cp httpx /usr/bin/httpx
```yaml
id: keyword-checker

info:
  name: VPN Keyword Checker
  author: Your Name
  severity: info
  description: Checks for the presence of VPN-related keywords and URLs in the response body.
  tags: tech,cisco,vpn,forticlient,forti

requests:
  - method: GET
    path:
      - "{{BaseURL}}/"
      - "{{BaseURL}}/vpn"
      - "{{BaseURL}}/remote"
      - "{{BaseURL}}/owa"

    redirects: true
    max-redirects: 4
    matchers:
      - type: word
        words:
          - "Cisco"
          - "forticlient"
          - "Citrix"
          - "VPN"
          - "Forti"
          - "Outlook"
          - "CSCOE"
          - "GlobalProtect"
          - "+webvpn+"
          - "AzureAttend"

        condition: or
        part: response

    extractors:
      - type: regex
        part: response
        regex:
          - '(?i)Cisco'
          - '(?i)forticlient'
          - '(?i)Citrix'
          - '(?i)VPN'
          - '(?i)Forti'
          - '(?i)Outlook'
          - '(?i)CSCOE'
          - '(?i)GlobalProtect'
          - '(?i)webvpn'
          - '(?i)AzureAttend'

  - method: GET
    path:
      - "{{BaseURL}}/"
    matchers:
      - type: word
        words:
          - "top.location=window.location;top.location="
          - "window.location.href="
          - "document.location="
          
        condition: or
        part: response

    extractors:
      - type: regex
        part: response
        regex:
          - '(?i)top.location=window.location;top.location='
          - '(?i)window.location.href='
          - '(?i)document.location='
```