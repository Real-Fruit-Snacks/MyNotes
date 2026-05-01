### HTML injection is a type of security vulnerability that occurs when a attacker is able to inject malicious HTML code into a web page viewed by other users. This can have a variety of impacts, including:
- Stealing sensitive information from users, such as login credentials or personal information.
- Redirecting users to malicious websites, potentially leading to further compromise or phishing attacks.
- Modifying the appearance of a website, potentially misleading users and damaging the website's reputation.
- Executing scripts on the user's computer, potentially allowing the attacker to take control of the user's device.
### It is important for web developers to validate and sanitize user input to prevent HTML injection and other types of injection attacks.

```
<iframe src=//malicious-website.com/toplevel.html></iframe>
```
```
<html><head></head><body><script>top.window.location = "<https://malicious-website.com/pwned.html>"</script></body></html>
```
Sometimes you can use this to perform SSRF. And if you're in a cloud environment where you can make meta-data requests, this can get nasty fast.


