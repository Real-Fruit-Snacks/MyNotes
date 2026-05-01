amass -d enum tesla.com > domains.txt && awk < domains.txt '{ system("resolveip -s "$1)' > ips.txt
