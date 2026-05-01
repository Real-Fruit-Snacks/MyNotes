![unnamed_4c2305f849304ba6805b157d8e96212f](docs/Attachments/_Methodology/9.%20CTF%20Boxes/Training%20Labs/DVWS/API%20Command%20Injection/{{notename}}-202605011742.png)
The admin.html page loads up information about the host in the response. It's using the linux uname system command for this. Let's see if we can modify our chain commands to this request to get command injection 

![unnamed_ab60afcb043d458eafa215ee0d01c754](docs/Attachments/_Methodology/9.%20CTF%20Boxes/Training%20Labs/DVWS/API%20Command%20Injection/{{notename}}-202605011742-1.png)
As we can see adding the ;ls to the uname response allows us to get command injection on this host. Replacing the uname with another command also works in this case.