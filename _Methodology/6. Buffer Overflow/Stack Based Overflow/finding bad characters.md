![unnamed_e470652c1f4741fcb2222eef5839d946](docs/Attachments/_Methodology/6.%20Buffer%20Overflow/Stack%20Based%20Overflow/finding%20bad%20characters/{{notename}}-202605011742.png)
So we now our offset is 1978

Set monas bytearray to something we know is bad char:
```
!mona bytearray -b "\x00"
```

Then create initial list of bad chars. Start off like this in create.py:
![unnamed_a9c2fe4634f04d9bac041e91eed687f5](docs/Attachments/_Methodology/6.%20Buffer%20Overflow/Stack%20Based%20Overflow/finding%20bad%20characters/{{notename}}-202605011742-1.png)

Run create.py, and take output into the badchars.py

Then send badchars.py and the program will crash again.

Then compare the badchars.py request and the monas bytearrow and look for bad chars:
!mona compare -f C:\mona\oscp\bytearray.bin -a esp
![unnamed_3ca45cac4f604910a70545a53b2cf275](docs/Attachments/_Methodology/6.%20Buffer%20Overflow/Stack%20Based%20Overflow/finding%20bad%20characters/{{notename}}-202605011742-2.png)

Likely badchars from this output is: **00 07 2e a0**
(Little trick: Usually the first and second ones are actually bad characters. Then next one gets corrupted. So 2e is likely a bad charaters, whilst 2f got corrupted. a0 is likely bad characters, whilst a1 got corrupted etc..)

Next, update create.py with our newly found bad characters, like so:

![unnamed_37873bae51064b5cbf7858cb0ffddd86](docs/Attachments/_Methodology/6.%20Buffer%20Overflow/Stack%20Based%20Overflow/finding%20bad%20characters/{{notename}}-202605011743.png)

Then we take the new bytearray which doesn't contain the bad characters we don't want. 

Take this output into badchars.py and save.

Run this command to mona to share this newly found information as well, like so: 
```
!mona bytearray -b "\x00\x07\x2e\xa0"
```

It's preferred to go one step at a time. So do: 
```
!mona bytearray -b “\x00\x07” 
```
instead, and repeat one badchar at a time until mona tells its unmodified

After this, we restart program and rerun our updated badchars.py

Compare the two again, like so:
```
!mona compare -f C:\mona\oscp\bytearray.bin -a esp
```

Mona now returns with “Unmodified”, excellent! ;) We have now solved the bad character issue

![unnamed_5e724eee90344a639935336ecd859d0b](docs/Attachments/_Methodology/6.%20Buffer%20Overflow/Stack%20Based%20Overflow/finding%20bad%20characters/{{notename}}-202605011743-1.png)
