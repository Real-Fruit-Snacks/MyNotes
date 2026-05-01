<https://github.com/devanshbatham/ParamSpider>

Spiders for paramaters mainly using waybackmachine and OSINT. Does not actively touch the target. Definitely use with bug bountys

python3 paramspider --domain tesla.com --exclude woff,png,svg,php,jpg --output /home/kali/bugbounty/tesla/tesla_params.txt

Use with gf: (A wrapper around grep with premade common regex. In this case, will be used to quickly parse data for juicy params.)
<https://github.com/tomnomnom/gf>

# Install gf
sudo go install github.com/tomnomnom/gf@latest
cd /opt/
sudo git clone <https://github.com/tomnomnom/gf.git>
echo 'export PATH=$PATH:/root/go/bin' >> /root/.zshrc
echo 'export PATH=$PATH:/root/go/pkg/mod/github.com/tomnomnom/gf@v0.0.0-20200618134122-dcd4c361f9f5' >> /root/.zshrc
source /root/.zshrc
cp -r /opt/gf/examples ~/.gf 
sudo git clone <https://github.com/1ndianl33t/Gf-Patterns> /opt/Gf-Patterns
cp /opt/Gf-Patterns/*.json ~/.gf



<https://medium.com/@dhaliwalsargam/gf-tool-installation-8fcd285a4be2>
<https://youtu.be/m7JzOZKwbeE?t=323>

