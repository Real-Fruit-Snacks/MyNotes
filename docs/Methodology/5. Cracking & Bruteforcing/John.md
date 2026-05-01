#### Helpful for finding hash formats:
```john --list:formats | grep krb```
#### This is how to show the files you've cracked with john:
```john kerberoast --show```
#### Remove potfile (removes history so you can crack again)
```gedit /root/.john/john.pot```
#### John syntax and krb5asrep cracking:
```john --format=krb5asrep t-skid.hash --wordlist=/usr/share/wordlists/rockyou.txt```
#### Krb5tgs hashes: (aka kerberoasted hashes)
```john --format=krb5tgs kerberoast --wordlist=/usr/share/wordlists/rockyou.txt```
#### NT hashes:
```john --wordlist=/usr/share/wordlists/rockyou.txt uniq_hashes --format=NT```
#### NetNTLMv2 hashes:
```john --format=netntlmv2 hash.hash --wordlist=/usr/share/wordlists/rockyou.txt```
#### Haiti for identifying hashtype:
```gem install haiti-hash```
#### Haiti syntax:
```haiti '741ebf5166b9ece4cca88a3868c44871e8370707cf19af3ceaa4a6fba006f224ae03f39153492853'```
#### Cracking with john the type:
```john hash --wordlist=/usr/share/wordlists/rockyou.txt --format=raw-keccak-256```