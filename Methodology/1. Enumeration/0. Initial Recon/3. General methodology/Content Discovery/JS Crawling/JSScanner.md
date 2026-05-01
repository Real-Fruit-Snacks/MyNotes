cd /opt
git clone <https://github.com/dark-warlord14/JSScanner.git>

./install.sh
sudo ln -s /opt/JSScanner/script.sh /usr/bin/jsscanner

jsscanner alive.txt
