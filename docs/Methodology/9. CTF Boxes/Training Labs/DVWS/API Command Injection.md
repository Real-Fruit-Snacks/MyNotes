![unnamed_4c2305f849304ba6805b157d8e96212f](unnamed_4c2305f849304ba6805b157d8e96212f.png)
The admin.html page loads up information about the host in the response. It's using the linux uname system command for this. Let's see if we can modify our chain commands to this request to get command injection 

![unnamed_ab60afcb043d458eafa215ee0d01c754](unnamed_ab60afcb043d458eafa215ee0d01c754.png)
As we can see adding the ;ls to the uname response allows us to get command injection on this host. Replacing the uname with another command also works in this case.