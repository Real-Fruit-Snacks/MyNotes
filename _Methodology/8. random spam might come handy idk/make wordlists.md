Copy paste all the usernames to users.txt, but because of it's formatting we must change it to be suitable for a wordlist. Let's remove the “,” and replace the with “ ”, then, lets add each word to a new line. We procceed like so:

```
gedit users.txt
```

![unnamed_3b345847c9b64d58af802e0591e14352](docs/Attachments/_Methodology/8.%20random%20spam%20might%20come%20handy%20idk/make%20wordlists/{{notename}}-202605011742.png)
![unnamed_e6708f8ae5f048b78f524ea2bc69120c](docs/Attachments/_Methodology/8.%20random%20spam%20might%20come%20handy%20idk/make%20wordlists/{{notename}}-202605011742-1.png)
![unnamed_bc9938c2aeb74effb6f5019734dc7651](docs/Attachments/_Methodology/8.%20random%20spam%20might%20come%20handy%20idk/make%20wordlists/{{notename}}-202605011742-2.png)

```
cat users.txt| tr ' ' '\n' > userlist.txt
```

![unnamed_c6441f0b1ad64ce2bf7a74a79028f327](docs/Attachments/_Methodology/8.%20random%20spam%20might%20come%20handy%20idk/make%20wordlists/{{notename}}-202605011743.png)
