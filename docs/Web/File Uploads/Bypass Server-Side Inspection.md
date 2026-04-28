---
tags:
  - Web
  - Server-Side
  - File_Uploads
---
## Creating a Polyglot Payload
If a server verifies the magic bytes but still saves the file with a `.php` extension (either because the user provided it or the server failed to sanitize the filename), an attacker can use this method to embed their payload.

1. **Select a Valid Image:** Find a small, legitimate PNG or JPEG file on your computer.
2. **Upload and Intercept:** Attempt to upload the valid image through the web application, but intercept the request using Burp Suite or Caido.
3. **Locate the File Data:** In the raw HTTP POST request, scroll down to the `multipart/form-data` boundary containing your file. You will see a few lines of readable text (the magic bytes and header info) followed by a massive block of gibberish symbols (the actual binary image data).
4. **Trim the Fat:** Highlight almost all of the gibberish binary data and delete it. You only need to keep the very first line or two (which contains the magic bytes) to satisfy the server's `finfo_file()` check.
5. **Inject the Payload:** Immediately after the remaining image bytes, type out your PHP payload (e.g., `<?php system($_GET['cmd']); ?>`).
6. **Modify the Extension:** In the `Content-Disposition` header just above the image data, change the `filename="image.png"` parameter to `filename="shell.php"`.
7. **Forward:** Send the modified request. The server sees the valid magic bytes, accepts the file, and saves it as `shell.php`.