```
└─# enum4linux -a 192.168.1.46 | tee enum4linux.log                                                                                      130 ⨯
Starting enum4linux v0.9.1 ( <http://labs.portcullis.co.uk/application/enum4linux/> ) on Sat Sep 10 04:39:37 2022

 =========================================( Target Information )=========================================
                                                                                                                                               
Target ........... 192.168.1.46                                                                                                                
RID Range ........ 500-550,1000-1050
Username ......... ''
Password ......... ''
Known Usernames .. administrator, guest, krbtgt, domain admins, root, bin, none


 ============================( Enumerating Workgroup/Domain on 192.168.1.46 )============================
                                                                                                                                               
                                                                                                                                               
[+] Got domain/workgroup name: WORKGROUP                                                                                                       
                                                                                                                                               
                                                                                                                                               
 ================================( Nbtstat Information for 192.168.1.46 )================================
                                                                                                                                               
Looking up status of 192.168.1.46                                                                                                              
        SYMFONOS2       <00> -         B <ACTIVE>  Workstation Service
        SYMFONOS2       <03> -         B <ACTIVE>  Messenger Service
        SYMFONOS2       <20> -         B <ACTIVE>  File Server Service
        ..__MSBROWSE__. <01> - <GROUP> B <ACTIVE>  Master Browser
        WORKGROUP       <00> - <GROUP> B <ACTIVE>  Domain/Workgroup Name
        WORKGROUP       <1d> -         B <ACTIVE>  Master Browser
        WORKGROUP       <1e> - <GROUP> B <ACTIVE>  Browser Service Elections

        MAC Address = 00-00-00-00-00-00

 ===================================( Session Check on 192.168.1.46 )===================================
                                                                                                                                               
                                                                                                                                               
[+] Server 192.168.1.46 allows sessions using username '', password ''                                                                         
                                                                                                                                               
                                                                                                                                               
 ================================( Getting domain SID for 192.168.1.46 )================================
                                                                                                                                               
Domain Name: WORKGROUP                                                                                                                         
Domain Sid: (NULL SID)

[+] Can't determine if host is part of domain or part of a workgroup                                                                           
                                                                                                                                               
                                                                                                                                               
 ===================================( OS information on 192.168.1.46 )===================================
                                                                                                                                               
                                                                                                                                               
[E] Can't get OS info with smbclient                                                                                                           
                                                                                                                                               
                                                                                                                                               
[+] Got OS info for 192.168.1.46 from srvinfo:                                                                                                 
        SYMFONOS2      Wk Sv PrQ Unx NT SNT Samba 4.5.16-Debian                                                                                
        platform_id     :       500
        os version      :       6.1
        server type     :       0x809a03


 =======================================( Users on 192.168.1.46 )=======================================
                                                                                                                                               
Use of uninitialized value $users in print at ./enum4linux.pl line 972.                                                                        
Use of uninitialized value $users in pattern match (m//) at ./enum4linux.pl line 975.

Use of uninitialized value $users in print at ./enum4linux.pl line 986.
Use of uninitialized value $users in pattern match (m//) at ./enum4linux.pl line 988.

 =================================( Share Enumeration on 192.168.1.46 )=================================
                                                                                                                                               
                                                                                                                                               
        Sharename       Type      Comment
        ---------       ----      -------
        print$          Disk      Printer Drivers
        anonymous       Disk      
        IPC$            IPC       IPC Service (Samba 4.5.16-Debian)
Reconnecting with SMB1 for workgroup listing.

        Server               Comment
        ---------            -------

        Workgroup            Master
        ---------            -------
        WORKGROUP            SYMFONOS2

[+] Attempting to map shares on 192.168.1.46                                                                                                   
                                                                                                                                               
//192.168.1.46/print$   Mapping: DENIED Listing: N/A Writing: N/A                                                                              
//192.168.1.46/anonymous        Mapping: OK Listing: OK Writing: N/A

[E] Can't understand response:                                                                                                                 
                                                                                                                                               
NT_STATUS_OBJECT_NAME_NOT_FOUND listing \*                                                                                                     
//192.168.1.46/IPC$     Mapping: N/A Listing: N/A Writing: N/A

 ============================( Password Policy Information for 192.168.1.46 )============================
                                                                                                                                               
                                                                                                                                               

[+] Attaching to 192.168.1.46 using a NULL share

[+] Trying protocol 139/SMB...

[+] Found domain(s):

        [+] SYMFONOS2
        [+] Builtin

[+] Password Info for Domain: SYMFONOS2

        [+] Minimum password length: 5
        [+] Password history length: None
        [+] Maximum password age: 37 days 6 hours 21 minutes 
        [+] Password Complexity Flags: 000000

                [+] Domain Refuse Password Change: 0
                [+] Domain Password Store Cleartext: 0
                [+] Domain Password Lockout Admins: 0
                [+] Domain Password No Clear Change: 0
                [+] Domain Password No Anon Change: 0
                [+] Domain Password Complex: 0

        [+] Minimum password age: None
        [+] Reset Account Lockout Counter: 30 minutes 
        [+] Locked Account Duration: 30 minutes 
        [+] Account Lockout Threshold: None
        [+] Forced Log off Time: 37 days 6 hours 21 minutes 



[+] Retieved partial password policy with rpcclient:                                                                                           
                                                                                                                                               
                                                                                                                                               
Password Complexity: Disabled                                                                                                                  
Minimum Password Length: 5


 =======================================( Groups on 192.168.1.46 )=======================================
                                                                                                                                               
                                                                                                                                               
[+] Getting builtin groups:                                                                                                                    
                                                                                                                                               
                                                                                                                                               
[+]  Getting builtin group memberships:                                                                                                        
                                                                                                                                               
                                                                                                                                               
[+]  Getting local groups:                                                                                                                     
                                                                                                                                               
                                                                                                                                               
[+]  Getting local group memberships:                                                                                                          
                                                                                                                                               
                                                                                                                                               
[+]  Getting domain groups:                                                                                                                    
                                                                                                                                               
                                                                                                                                               
[+]  Getting domain group memberships:                                                                                                         
                                                                                                                                               
                                                                                                                                               
 ==================( Users on 192.168.1.46 via RID cycling (RIDS: 500-550,1000-1050) )==================
                                                                                                                                               
                                                                                                                                               
[I] Found new SID:                                                                                                                             
S-1-22-1                                                                                                                                       

[I] Found new SID:                                                                                                                             
S-1-5-32                                                                                                                                       

[I] Found new SID:                                                                                                                             
S-1-5-32                                                                                                                                       

[I] Found new SID:                                                                                                                             
S-1-5-32                                                                                                                                       

[I] Found new SID:                                                                                                                             
S-1-5-32                                                                                                                                       

[+] Enumerating users using SID S-1-5-21-629329663-2933547119-2337616968 and logon username '', password ''                                    
                                                                                                                                               
S-1-5-21-629329663-2933547119-2337616968-501 SYMFONOS2\nobody (Local User)                                                                     
S-1-5-21-629329663-2933547119-2337616968-513 SYMFONOS2\None (Domain Group)

[+] Enumerating users using SID S-1-22-1 and logon username '', password ''                                                                    
                                                                                                                                               
S-1-22-1-1000 Unix User\aeolus (Local User)                                                                                                    
S-1-22-1-1001 Unix User\cronus (Local User)

[+] Enumerating users using SID S-1-5-32 and logon username '', password ''                                                                    
                                                                                                                                               
S-1-5-32-544 BUILTIN\Administrators (Local Group)                                                                                              
S-1-5-32-545 BUILTIN\Users (Local Group)
S-1-5-32-546 BUILTIN\Guests (Local Group)
S-1-5-32-547 BUILTIN\Power Users (Local Group)
S-1-5-32-548 BUILTIN\Account Operators (Local Group)
S-1-5-32-549 BUILTIN\Server Operators (Local Group)
S-1-5-32-550 BUILTIN\Print Operators (Local Group)

 ===============================( Getting printer info for 192.168.1.46 )===============================
                                                                                                                                               
No printers returned.                                                                                                                          
enum4linux complete on Sat Sep 10 04:39:46 2022
```