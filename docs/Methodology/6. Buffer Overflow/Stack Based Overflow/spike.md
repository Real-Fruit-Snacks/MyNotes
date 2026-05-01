gedit spike.spk
![unnamed_25f684aa353c4492af303f228d69a969](unnamed_25f684aa353c4492af303f228d69a969.png)

Syntax:
```
generic_send_tcp 10.90.22.41 spike.spk 0 0 
```

Next, pay attention to the EAX register in immunity debugger to find the command we wish to use to then fuzz the application and figure out what amounts of bytes it takes before it crashes.
