### Compile Linux 64 bit: 
```
gcc exploit.c -o exploit 
Compile Linux 32 bit: 
gcc exploit.c -o exploit -m32 
```
### Compile Windows 64 bit:
```
x86_64-w64-mingw32-gcc 40564.c -o 40564.exe
Compile Windows 32 bit:
i686-w64-mingw32-gcc 40564.c -o 40564.exe -lws2_32
```