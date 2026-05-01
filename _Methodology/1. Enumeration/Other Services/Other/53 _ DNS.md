Reverse zone transfer (Can be useful for finding subdomains):
dig ironcorp.me @10.10.69.0 axfr

Name servers:
dig fire.windcorp.thm @10.10.233.82 -t NS

MX servers: (mail exhange)
dig windcorp.thm @10.10.233.82 -t MX

TXT servers:
dig fire.windcorp.thm @10.10.233.82 -t TXT

All:
dig any fire.windcorp.thm @10.10.233.82