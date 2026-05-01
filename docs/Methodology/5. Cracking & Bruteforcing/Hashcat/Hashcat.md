![unnamed_b082f1b56c1f4905b98fd267c8ef5486](unnamed_b082f1b56c1f4905b98fd267c8ef5486.png)
```hashcat -m 400 hash.txt /usr/share/wordlists/rockyou.txt -O```
![unnamed_a8b98dba50e0456faa8331ecf7281056](unnamed_a8b98dba50e0456faa8331ecf7281056.png)

#### Bruteforces random , numbers, letters of 9:
```hashcat -a 3 -m 0 hash '?a?a?a?a?a?a?a?a?a' -O --force```

#### bruteforce 8 digits:
```.\hashcat.exe -m 22000 -a3 hashcat.hc22000 "?d?d?d?d?d?d?d?d" -O --force```

#### Append anything at the end of list:
```sed 's/$/123/' combined_names.txt | hashcat -m 22000 hash.hc2200```
```sed 's/$/!/' combined_names.txt | hashcat -m 22000 hash.hc2200```

Rules: <https://hashcat.net/wiki/doku.php?id=hybrid_atttack_with_rules>
<https://hashcat.net/wiki/doku.php?id=rule_based_attack>
```hashcat -m 22000 hash.hc2200 norwegian.txt -r /usr/share/hashcat/rules/best64.rule```

#### Basic rules structure:
![unnamed_53027dfd4124413aa352c7ed4a62da40](unnamed_53027dfd4124413aa352c7ed4a62da40.png)
This will capitalize first letter of every word and then end with 1!
![unnamed_1185e7d2e90a4db89b7d21d1ecb50944](unnamed_1185e7d2e90a4db89b7d21d1ecb50944.png)
same as first, then run rule again with all lowerletter with 99 at the end, and last one is just appended 99. but this will 3x the
![unnamed_384aee86194b4cbfbb5983a84c4bb4b1](unnamed_384aee86194b4cbfbb5983a84c4bb4b1.png)

```
:
l
u
c
c$!
c$1$!
l$1$2$3
```

#### grep only words with 7 or more characters:
```
grep -E '.{7,}' file.txt
```

from <https://breachdirectory.org/>
```
hashcat -m 100 -a3 '42901db5e06492e1c8fb8777fbb2fafa141984b5' 'bexe?l?l?l?l'
hashcat -m 100 -a3 42901db5e06492e1c8fb8777fbb2fafa141984b5 bexe?l?l?l?l
```

#### Huge hashes.org password list
<https://www.reddit.com/r/DataHoarder/comments/ohlcye/hashesorg_archives_of_all_cracked_hash_lists_up/>