Make new symmetric key. In the “k” value insert a base64 encoded nullbyte like so
![unnamed_6789ca36cb594ac0a3e54731d5c1db5c](docs/Attachments/Methodology/1.%20Enumeration/0.%20Initial%20Recon/5.%20API/API%20Attacks/JWT%20Tokens/KID%20path%20traversal/{{notename}}-202605011506.png)

Modify kid value, sub value, and finally sign it with our modified symmetric key.
![unnamed_5dc6f563c2104c25b1e89a9e3a7b78e5](docs/Attachments/Methodology/1.%20Enumeration/0.%20Initial%20Recon/5.%20API/API%20Attacks/JWT%20Tokens/KID%20path%20traversal/{{notename}}-202605011506-1.png)



