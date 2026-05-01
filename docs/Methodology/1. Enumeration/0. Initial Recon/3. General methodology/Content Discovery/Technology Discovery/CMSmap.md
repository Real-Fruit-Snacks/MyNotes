cd /opt

git clone <https://github.com/dionach/CMSmap>

git clone <https://github.com/offensive-security/exploit-database>

gedit /opt/CMSmap/cmsmap/cmsmap.conf 

change preexisting info to this:

[exploitdb]
edbtype = GIT
edbpath = /opt/exploit-database

cd /opt/CMSmap
pip3 install .