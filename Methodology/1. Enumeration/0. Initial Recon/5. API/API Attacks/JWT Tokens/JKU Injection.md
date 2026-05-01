Generate RSA key.

Then copy
![unnamed_b76b6a58d1e44c73b64b9266e91c0b3f](docs/Attachments/Methodology/1.%20Enumeration/0.%20Initial%20Recon/5.%20API/API%20Attacks/JWT%20Tokens/JKU%20Injection/{{notename}}-202605011506.png)

Set up exploit server and host file with this body:
`{`
    `"keys":  [`
`{`
    `"kty": "RSA",`
    `"e": "AQAB",`
    `"kid": "09a1fb72-62d0-4734-8314-50584ff91b44",`
    `"n": "iDveG1SIP0OyqigWSEljDa64qihOw7cwuCiiHpb68ZdFR8i2XnHqkkcJRwUzYucLyxfIbXsBtjt-V9f8gY_WS79iAbWsQ08YJmgA9Nhv1dwIkpFUWES7JhYyILgqpzhKz25wrv6iKVYYKLXlzqS9UvruUjx06ia-DvLMC66Q0yeYeZa_AkbSVDiTb-HnxLaLogQN3xheSmNz2a6jbyaMwUSjJqDXzV0skvlIoTikwK3Yhup-AgteLH7eZyjSpbzkVjdMZ4sGgjHKNbqK8mXfNbUbXlQjWCRp5g7up26h4xqHnZBgF6tK6i8h9Mwib06y-f7z4isQDDgTrELzQi4iNw"`
`}`
    `]`
`}`

Then modify sub and kid values, inject a jku paramater with the hosted file on your exploit server, and finally sign it with your create RSA key.
![unnamed_13ea078ec1404b0796ec85b11cb1f228](docs/Attachments/Methodology/1.%20Enumeration/0.%20Initial%20Recon/5.%20API/API%20Attacks/JWT%20Tokens/JKU%20Injection/{{notename}}-202605011506-1.png)



