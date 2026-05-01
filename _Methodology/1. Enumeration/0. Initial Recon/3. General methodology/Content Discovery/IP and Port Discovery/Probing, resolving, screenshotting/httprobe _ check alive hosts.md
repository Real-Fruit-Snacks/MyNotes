<https://github.com/tomnomnom/httprobe>
go install github.com/tomnomnom/httprobe@latest

cat tesla_subdomains.txt | httprobe -p http:81 -p http:3000 -p https:3001 -p http:3001 -p https:3001 -p http:8000 -p http:8080 -p https:8443 -p http:8880 -p http:8888 -p http:9000 -p http:9001 -p http:9003 -c 50 | tee tesla_alive_domains.txt 
