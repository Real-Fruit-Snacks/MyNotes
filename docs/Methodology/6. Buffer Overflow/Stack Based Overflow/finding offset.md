Adding about 300-400 bytes from where the application broke:

Copy this output into offset.py:
```
/usr/share/metasploit-framework/tools/exploit/pattern_create.rb -l 2400
```

Paste pattern into the offset.py script, and remember all the other values needed:
![unnamed_3397233b24db4b11aba8f59a65e9ef78](unnamed_3397233b24db4b11aba8f59a65e9ef78.png)

Restart the application in immunity debugger again, and then recrash the software running this script with new pattern

Now go into immunity debugger and copy the new EIP value and do this: 
```
/usr/share/metasploit-framework/tools/exploit/pattern_offset.rb -l 2400 -q 6F43396E
```

![unnamed_d10b0c0098c7462e844a5ea01f5e5ee1](unnamed_d10b0c0098c7462e844a5ea01f5e5ee1.png)

And we get our exact offset, excellent ;)
 
Place the offset value into badchars.py and exploit.py so you don't forget. 
