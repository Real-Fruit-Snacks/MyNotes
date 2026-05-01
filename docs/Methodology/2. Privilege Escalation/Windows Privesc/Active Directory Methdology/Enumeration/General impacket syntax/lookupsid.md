Checks for sid through rpc using null session for access I believe:
impacket-lookupsid "":""@10.10.200.245

Can be useful for finding more users too once you actually have credentials. Although, many other tools for that too. But can still be useful if initial account only has access to rpc. 

Remember rid can also be enumerated. Use crackmapexec. 