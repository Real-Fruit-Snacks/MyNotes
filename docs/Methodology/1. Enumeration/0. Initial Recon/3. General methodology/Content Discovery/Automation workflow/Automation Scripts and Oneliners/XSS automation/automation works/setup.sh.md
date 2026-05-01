
```sh
#!/bin/bash

# Update packages and install dependencies
sudo apt-get update
sudo apt-get install -y python3 python3-pip git curl wget gcc libssl-dev libffi-dev python3-dev

# Install Go
wget https://golang.org/dl/go1.16.3.linux-amd64.tar.gz
sudo tar -C /usr/local -xzf go1.16.3.linux-amd64.tar.gz
echo 'export PATH=$PATH:/usr/local/go/bin' >> ~/.zshrc

# Install gospider
sudo wget https://github.com/jaeles-project/gospider/releases/download/v1.1.6/gospider_v1.1.6_linux_x86_64.zip
sudo unzip gospider_v1.1.6_linux_x86_64.zip
sudo ln $PWD/gospider_v1.1.6_linux_x86_64/gospider /usr/bin/gospider
sudo GO111MODULE=on go install github.com/jaeles-project/gospider@latest

# Install paramspider
sudo git clone https://github.com/devanshbatham/ParamSpider /opt/ParamSpider
echo 'export PATH=$PATH:/opt/ParamSpider' >> ~/.zshrc
sudo ln /opt/ParamSpider/paramspider.py /usr/bin/paramspider
python3 /opt/ParamSpider/setup.py build
python3 /opt/ParamSpider/setup.py install
sudo pip3 install /opt/ParamSpider/

# Install Gxss
sudo wget https://github.com/KathanP19/Gxss/releases/download/v4.1/Gxss_4.1_Linux_x86_64.tar.gz
sudo tar -xvf Gxss_4.1_Linux_x86_64.tar.gz
sudo ln $PWD/Gxss /usr/bin/Gxss

# Install gau
sudo wget https://github.com/lc/gau/releases/download/v2.1.2/gau_2.1.2_linux_amd64.tar.gz
sudo tar -xvf gau_2.1.2_linux_amd64.tar.gz
sudo ln $PWD/gau /usr/bin/gau

# Install dalfox
sudo git clone https://github.com/hahwul/dalfox /opt/dalfox
sudo cd /opt/dalfox/
sudo go build dalfox.go
sudo ln -s $PWD/dalfox /usr/bin/dalfox

# Install qsreplace
sudo wget https://github.com/tomnomnom/qsreplace/releases/download/v0.0.3/qsreplace-linux-amd64-0.0.3.tgz
sudo tar -xvf qsreplace-linux-amd64-0.0.3.tgz
sudo ln -s $PWD/qsreplace /usr/bin/qsreplace

# Install katana
sudo wget https://github.com/projectdiscovery/katana/releases/download/v1.1.0/katana_1.1.0_linux_amd64.zip
sudo unzip katana_1.1.0_linux_amd64.zip
sudo ln -s $PWD/katana /usr/bin/katana

source ~/.zshrc

echo "Done! All dependencies installed and tools downloaded"

```
