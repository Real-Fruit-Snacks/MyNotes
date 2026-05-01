In this example, the attacker is injecting an additional "q" parameter into the URL. This could potentially allow the attacker to bypass input validation or manipulate the application's logic, depending on how the application handles the additional parameter.

```
POST /search HTTP/1.1
Host: example.com
Content-Type: application/x-www-form-urlencoded

q=test&q=test2
```