We now have control over the EIP, but we need an address that will jump to a new stack frame, and help us get to shellcode execution. 

Fortunately, this is easy with mona. Simply use this command and insert the bad characters, like so:
```
!mona jmp -r esp -cpb "\x00\x07\x2e\xa0"
```

Run, and now go to the log data window to review analyze the feedback. 

Double click on of the pointers, and copy first JMP ESP you see. 

Adress of jump point we got:
**625011AF**
