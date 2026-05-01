For installation: tryhackme has a nice room on it.

```
/usr/lib/jvm/java-23-openjdk-amd64/bin/java --add-opens=java.desktop/javax.swing=ALL-UNNAMED --add-opens=java.base/java.lang=ALL-UNNAMED --add-opens=java.base/jdk.internal.org.objectweb.asm=ALL-UNNAMED --add-opens=java.base/jdk.internal.org.objectweb.asm.tree=ALL-UNNAMED --add-opens=java.base/jdk.internal.org.objectweb.asm.Opcodes=ALL-UNNAMED -javaagent:burploader.jar -noverify -jar /opt/post/burp/burpsuite_pro_v2023.10.3.7.jar
```
# Intercept and redirect: (can be useful with exploit towards web apps if you want more output)

Burp setup. I used force SSL and redirected port 80 localhost traffic through the server I'm attacking. 
# If you want to use Burp Suite to intercept requests through proxychains:

![unnamed_6cb6b6146dad4f908a381b396eebf0b8](docs/Attachments/_Methodology/1.%20Enumeration/0.%20Initial%20Recon/3.%20General%20methodology/Burp%20Suite/Burp%20Suite/{{notename}}-202605011742.png)
![unnamed_cb9876e2af9548fdb54708469d911db5](docs/Attachments/_Methodology/1.%20Enumeration/0.%20Initial%20Recon/3.%20General%20methodology/Burp%20Suite/Burp%20Suite/{{notename}}-202605011742-1.png)