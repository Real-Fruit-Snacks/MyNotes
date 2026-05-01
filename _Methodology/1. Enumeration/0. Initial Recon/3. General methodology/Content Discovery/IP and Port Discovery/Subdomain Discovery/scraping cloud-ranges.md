Parses domain names in certificate data from the cloud
<https://youtu.be/p4JgIu1mceI?t=3267>

<https://kaeferjaeger.gay/?dir=sni-ip-ranges>

wget '<https://kaeferjaeger.gay/sni-ip-ranges/amazon/ipv4_merged_sni.txt'> && wget '<https://kaeferjaeger.gay/sni-ip-ranges/digitalocean/ipv4_merged_sni.txt'> && wget '<https://kaeferjaeger.gay/sni-ip-ranges/google/ipv4_merged_sni.txt'> && wget '<https://kaeferjaeger.gay/sni-ip-ranges/microsoft/ipv4_merged_sni.txt'> && wget '<https://kaeferjaeger.gay/sni-ip-ranges/oracle/ipv4_merged_sni.txt'> && cat ipv4* | cut -d '[' -f2 | cut -d ']' -f1 | sort | uniq | tr ' ' '\n' | grep -i 'tesla.com' > tesla_subdomains.txt