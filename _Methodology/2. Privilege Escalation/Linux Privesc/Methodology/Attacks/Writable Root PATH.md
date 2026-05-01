<https://www.youtube.com/watch?v=TrOf9RfFxQk>

1. What folders are located under $PATH
2. Does your current user have write privileges for any of these folders?
3. Can you modify $PATH?
4. Is there a script/application you can start that will be affected by this vulnerability?

NB: No where done with this page. 

```
echo $PATH
find / -writable 2>/dev/null | cut -d "/" -f 2,3 | grep -v proc | sort -u
export PATH=/tmp:$PATH
```

strings /usr/bin/uustat
![unnamed_610972fed7414b5e86ac9b3ec2763c35](docs/Attachments/_Methodology/2.%20Privilege%20Escalation/Linux%20Privesc/Methodology/Attacks/Writable%20Root%20PATH/{{notename}}-202605011742.png)
