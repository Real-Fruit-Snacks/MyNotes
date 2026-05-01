Experiment a little with nmap scans. This one is pretty fast, but test it's reliability:
nmap -v -sV -p- 10.10.34.220 --max-retries 1 --min-rate 5000

Sometimes something like this will appear:

If there's a service you're unfamiliar with, try this netcat command, and also google it.

![unnamed_e5f289d54b57451f9720736872a7f170](docs/Attachments/Methodology/1.%20Enumeration/Other%20Services/Other/Other/{{notename}}-202605011506.png)
![unnamed_929d40b6829b46d08b8782ee6cc6fc99](docs/Attachments/Methodology/1.%20Enumeration/Other%20Services/Other/Other/{{notename}}-202605011506-1.png)
