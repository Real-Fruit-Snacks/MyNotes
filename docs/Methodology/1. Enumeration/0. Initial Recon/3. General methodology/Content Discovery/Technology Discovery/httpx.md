<https://github.com/projectdiscovery/httpx>
go install -v github.com/projectdiscovery/httpx/cmd/httpx@latest

Feed it subdomains and it'll skim those and quickly find some technology stack it utilizes.

cat tesla_subdomains.txt | httpx -title -ip -tech-detect -status-code -web-server -o servers.txt | grep 200

