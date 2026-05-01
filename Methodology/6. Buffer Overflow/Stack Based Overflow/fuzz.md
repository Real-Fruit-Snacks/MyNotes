set mona:
```
!mona config -set workingfolder c:\mona\%p
```

Add the ip, port, prefix, and then see where it crashes/hangs (remember space)
![unnamed_68153d3a7fa8467480a74bf182819ef6](docs/Attachments/Methodology/6.%20Buffer%20Overflow/Stack%20Based%20Overflow/fuzz/{{notename}}-202605011506.png)
![unnamed_22c669f19fb140408ae4d7ebe8e111c7](docs/Attachments/Methodology/6.%20Buffer%20Overflow/Stack%20Based%20Overflow/fuzz/{{notename}}-202605011506-1.png)
Here we get a great starting point of where the application breaks due to our fuzzing, excellent ;)