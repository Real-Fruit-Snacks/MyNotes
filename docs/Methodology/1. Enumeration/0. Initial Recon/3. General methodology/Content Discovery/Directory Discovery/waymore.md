Can find allurls from a domain from archived endpoints, and can also find paramaters and links from the source code it downloads:
<https://github.com/xnl-h4ck3r/waymore>

Installation:
git clone <https://github.com/xnl-h4ck3r/waymore.git>
cd waymore
sudo pip3 install -r requirements.txt
sudo ln -s /opt/waymore/waymore.py /usr/bin/waymore.py


Basic tool usage:
waymore.py -i tesla.com  -mode -B

Extract endpoints from output with xnLinkFinder:
xnLinkFinder.py -i ~/opt/waymore/results/tesla.com/ -sp <http://tesla.com> -sf tesla.com -o tesla.txt

If you wanna look for other subdomains than tesla.com:
cat tesla.txt | grep -v tesla.com