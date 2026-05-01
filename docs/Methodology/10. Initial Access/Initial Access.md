### Ways in:
- Exposed services with Rce
- Exposed VPNs are very common. Credentials for this can be phished. So can cookies (although research the specifics more)
- Phishing with malware. Credential/session phishing can give indirect access if you use the technique below with it.
- Jump boxes are a convenient way into resources for an internal network. Common ports exposed on a jump box are ssh and rdp so you can access resources internally. However, if this is not properly hardened, and attacker can use this as a pivot point. Again, credentials could be phished, or ssh private key could potentially be found on a github commit.
- Physical Access (Bootcd, Lanturtle, etc)

<https://enlacehacktivista.org/index.php/Initial_Access_Tactics,_techniques_and_procedures>