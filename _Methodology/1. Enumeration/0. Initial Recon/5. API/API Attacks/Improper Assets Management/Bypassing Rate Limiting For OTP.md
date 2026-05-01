This is one way of Bypassing Rate Limiting For OTP through Improper Assets Management.
We used someone elses email, pressed forgot password, adn we found this check-otp endpoint.

**Can we bruteforce the OTP?**

![unnamed_bec59bc845a74968983d70d0f49b7b8c](docs/Attachments/_Methodology/1.%20Enumeration/0.%20Initial%20Recon/5.%20API/API%20Attacks/Improper%20Assets%20Management/Bypassing%20Rate%20Limiting%20For%20OTP/{{notename}}-202605011742.png)

It seems after 8 requests it refuses to check anymore. Any way around this?
![unnamed_c93391abaa3f4ac5b669b4e50f2f100e](docs/Attachments/_Methodology/1.%20Enumeration/0.%20Initial%20Recon/5.%20API/API%20Attacks/Improper%20Assets%20Management/Bypassing%20Rate%20Limiting%20For%20OTP/{{notename}}-202605011742-1.png)

Through Improper Assets Management in this example we can.
![unnamed_b12e27652524462c8d9886daf3ff4ce0](docs/Attachments/_Methodology/1.%20Enumeration/0.%20Initial%20Recon/5.%20API/API%20Attacks/Improper%20Assets%20Management/Bypassing%20Rate%20Limiting%20For%20OTP/{{notename}}-202605011743.png)
The web application accepts v2 of the API at this endpoint, and it does not have proper rate limiting set up. As a result we can bruteforce without any prevention.

And since burp community is too slow, we'll be using ffuf.
```
ffuf -u '<http://crapi.apisec.ai:8888/identity/api/auth/v2/check-otp'> -d '{"email":"b@b.com","otp":"FUZZ","password":"IAMAdog1"}' -w userlist.txt -X POST -H 'Content-Type:application/json' -fw 5
```

From here, we can perform Account Takeover with our newly set password. 
![unnamed_e8a7f400c92444969ae3f2f9b07b1bd8](docs/Attachments/_Methodology/1.%20Enumeration/0.%20Initial%20Recon/5.%20API/API%20Attacks/Improper%20Assets%20Management/Bypassing%20Rate%20Limiting%20For%20OTP/{{notename}}-202605011743-1.png)