This fixed it for me:
gedit /etc/samba/smb.conf

Put this in:
[global]
   client min protocol = CORE
   client max protocol = SMB3