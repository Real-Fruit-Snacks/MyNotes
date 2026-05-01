(Note that the _target_ variable is dynamically updates with the target list)
gedit commands.txt
whatweb _target_ >> uwu.txt

interlace -tL ./target -cL commands.txt -threads 5 -v    

The command above will run all the commands in commands.txt against all the targets in targets.txt. Everything will be multithreaded and the output will be sorted into separate text files within the ~/engagement folder.

