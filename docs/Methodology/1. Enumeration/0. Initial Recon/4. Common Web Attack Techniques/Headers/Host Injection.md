Host Header Injection:
<https://youtu.be/8wT1DWxCOgc?t=1>

1. Bypass 403 response
Host: localhost

2. Redirect request to alternate site
Host: bing.com

3. Redirect request to alternate site
Insert:
X-Forwarded-Host: bing.com

Impact: It can poison the cache of the web application as well as the proxy. When authorized users tries to access the host, the user gets redirected to the alternate domain due to the poisoned cache of the initial webserver.