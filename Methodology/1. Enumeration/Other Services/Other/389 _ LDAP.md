dumps information found through ldap with set credentials:
ldapsearch -x -H ldap://10.10.126.240 -D 'lparker@fusion.corp' -w '!!abbylvzsvs2k6!' -b 'DC=fusion,DC=corp' | tee ldapdump

grab only users with anon
windapsearch -u "" --dc-ip $target -U | grep '@' | cut -d ' ' -f 2 | cut -d '@' -f 1 | uniq > users.txt

check for creds or other useful ldap info:
windapsearch -d test.local -u '' -p '' -U -full
windapsearch -d test.local -u '' -p '' -U -full | egrep -i "pwd|pass|token|cred"

