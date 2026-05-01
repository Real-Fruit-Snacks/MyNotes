<https://book.hacktricks.xyz/windows/active-directory-methodology>
<https://cheatsheet.haax.fr/windows-systems/exploitation/kerberos/>

ad attack series:
<https://www.youtube.com/playlist?list=PLPDUz8KkxR5z2z84CJ1JyLXC9JgxkjPBk>  

<https://github.com/carlospolop/PEASS-ng/tree/master/winPEAS>
<https://github.com/PowerShellMafia/PowerSploit.git>

<https://attack.stealthbits.com/>

These are all great. Use them. 

Check for all the exploits in the exploit section and the manual enumeration too if needed.

Take good notes as well.

====

whoami /all
net users /domain
net user john /domain
systeminfo

We want to enumerate smb, ldap, rpc, and kerberos related instances.

Enumerate users through enum4linux-ng, kerbrute, rpc, impacket-lookupsid, crackmapexec rid-brute, and potentially through ldap nmap script, see what you can find.

Perform common attacks, see what you can find. Getting responder up listening early tends to be a good idea.

If you get any hashes, crack the hashes and store them. 

If you can't get anywhere further, see if you've enumerated properly. If you have, then attempt brute forcing what you can. (Keep lockout policy in mind.)

Lastly, if you find full credential-sets, attempt them across RDP, winrm, psexec, and rpcclient. At least one of these should work. (Keep in mind potential honeypots.)

Now, there's a lot you can do with initial credentials. Perform new common attacks you can now do in this position, and get bloodhound up to see how far you can get using policies and trusts to your advantage.

:)

 Attacking kerberos: <https://www.tarlogic.com/blog/how-to-attack-kerberos/>