<https://kavishgr.gitbook.io/kavishgour/windows/sid-rid-bruteforce-with-pythons-impacket>

We're here bruteforcing SIDs at the domain through utilizing anonymous login through rpc, and then taking this output to usernames files using tee
impacket-lookupsid anonymous@10.10.212.32 | tee usernames
impacket-lookupsid "":""@10.10.200.245 | tee usernames

impacket-lookupsid 'guest'@10.10.129.91

![unnamed_23d1151f71044fe592189f0b0d193c14](unnamed_23d1151f71044fe592189f0b0d193c14.png)
