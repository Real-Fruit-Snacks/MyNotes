Go to /jwks.json

`{"kty":"RSA","e":"AQAB","use":"sig","kid":"210f90e4-b2a3-493d-b3a4-48092adab621","alg":"RS256","n":"2szo0HGPkojlsWE_ueXHOmOuVVZiYv1QyG1Hp79CHfD6Y9rJKbVz49CRWTzofqc_A4LfwaeIDpIA6lTtt7P3haLxIt-ZsWQNEjjhaUi-9gS8jrsVR_hQaT-X4zdlm0n_lVplAfJjMLK43yOcXzACNw-PdIOCXC8XRWfflMkrAvZT_whV5yNSemLyR2S_U_Fr4eHKVCwgo6Vc4nFG0HN_ARFwRzlmkXkQX1tdP-PpBuq58YdYF5tcZRlXcg9aKn3R3Jw1gR7E2RR9EkCdkL5a9JDPpYijui6B1xB7vsGzGYRG1LvbcEkv34MuPGdl4H0zih4Gpu5vPAp5oX-lFgryfw"}`

1. Copy the above in that format. 
2. Make a new RSA key. Copy paste the above. Then go to PEM section, ctrl a copy.
3. Go to convert all to base64 and copy the base64 output

![unnamed_33349dd019d247d3a1f70d087420a8c7](docs/Attachments/_Methodology/1.%20Enumeration/0.%20Initial%20Recon/5.%20API/API%20Attacks/JWT%20Tokens/Algorithm%20Confusion/{{notename}}-202605011742.png)

1. New symmetric key. Generate. 
2. Change the “k” valeu to the base64 output from last step.
3. Now change the kid value to that of our current user token. save key
![unnamed_39c89f7dc6ae4d209a4d362ce34df243](docs/Attachments/_Methodology/1.%20Enumeration/0.%20Initial%20Recon/5.%20API/API%20Attacks/JWT%20Tokens/Algorithm%20Confusion/{{notename}}-202605011742-1.png)

4. Now change the alg to HS256, and the sub to administrator
5. Then sign the newly created symmetrically signed key

that's it! :)
