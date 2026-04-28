---
tags:
  - Web
  - MIME
  - File_Uploads
---
### How to Execute the Bypass

Because the validation relies purely on a text string inside the request, bypassing it is trivial. You just need to change the text.
1. **Intercept:** Turn on your proxy's intercept feature and upload your `shell.php` file through the web browser.
2. **Catch & Modify:** The proxy pauses the request before it leaves your machine. Locate the line that says `Content-Type: application/x-php` just below your filename.
3. **Spoof:** Delete `application/x-php` and replace it with an allowed MIME type, such as `image/png` or `image/jpeg`.
4. **Forward:** Send the modified request to the server. The server's PHP script checks the header, sees `image/png`, evaluates the security check as `true`, and happily saves `shell.php` to the server.