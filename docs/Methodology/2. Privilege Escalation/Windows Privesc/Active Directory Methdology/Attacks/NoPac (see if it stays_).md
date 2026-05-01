primary tool:
<https://github.com/WazeHell/sam-the-admin>

more indepth explanation:
<https://exploit.ph/cve-2021-42287-cve-2021-42278-weaponisation.html>

It will create a new machine account and use the SAM impersonation to give you the DC machine account.
SAM, aka Security Account Manager.

You more or less somehow get access to add a new user that's a domain controller and utilize that user to obviously have full access to domain. Haven't researched to know the actual details yet.

Do this: (remember you might need to something like this rdate -n 10.10.190.87, or ntpdate raz0rblack.thm if the clock synchronization messed up)
python3 sam_the_admin.py -dc-ip 10.10.190.87 raz0rblack.thm/twilliams:roastpotatoes

Then do this. The script will practically tell you what to do

Not sure if this is most common way, but food for thought :)

![unnamed_814b419cfc464d4cbfca7df0d3e6eb79](unnamed_814b419cfc464d4cbfca7df0d3e6eb79.png)
