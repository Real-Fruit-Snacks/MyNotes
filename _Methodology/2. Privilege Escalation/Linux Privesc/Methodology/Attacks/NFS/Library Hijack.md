### We saw root execute this script through python essentially. We couldn't do anything with the script, but we saw ftplib library, and given our group permission, we were able to replace the original ftplib.py my moving it and then making our own with os.commands inserted. 

### Then when root tries to execute ftpclient.py through python, the library it depends on will be exucute through the context of root as well. And as a result, we're able to get a root session.

![unnamed_18988b0f6dc2435190fdcd49a8ae24e7](docs/Attachments/_Methodology/2.%20Privilege%20Escalation/Linux%20Privesc/Methodology/Attacks/NFS/Library%20Hijack/{{notename}}-202605011742.png)
![unnamed_0084038ed1ea403ab7efa74478878ceb](docs/Attachments/_Methodology/2.%20Privilege%20Escalation/Linux%20Privesc/Methodology/Attacks/NFS/Library%20Hijack/{{notename}}-202605011742-1.png)
So now we see if can perform library hijacking. 
![unnamed_1de266d024ea4476b8c9cbe0d2c79b60](docs/Attachments/_Methodology/2.%20Privilege%20Escalation/Linux%20Privesc/Methodology/Attacks/NFS/Library%20Hijack/{{notename}}-202605011743.png)
So we cannot write or execute this file, but we are apparently allowed to move it. Should be innocent enough, right? Right? ;))))
Edit new file:
![unnamed_32bb8c0c69804a4db65f08072466811f](docs/Attachments/_Methodology/2.%20Privilege%20Escalation/Linux%20Privesc/Methodology/Attacks/NFS/Library%20Hijack/{{notename}}-202605011743-1.png)

Now, since we know root is running python 2.7 and executing the ftpclient.py script, which again, contains ftplib as a library, we can hijack that library path given our group permissions. 
![unnamed_25f8628fc0ff4919a36ecbaa4c315f01](docs/Attachments/_Methodology/2.%20Privilege%20Escalation/Linux%20Privesc/Methodology/Attacks/NFS/Library%20Hijack/{{notename}}-202605011743-2.png)
And we are root, yummy ;)


