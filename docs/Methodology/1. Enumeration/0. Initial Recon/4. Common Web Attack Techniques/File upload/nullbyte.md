Nullbyte method:

filename="exploit.php%00.jpg"
### Other defenses involve stripping or replacing dangerous extensions to prevent the file from being executed. If this transformation isn't applied recursively, you can position the prohibited string in such a way that removing it still leaves behind a valid file extension. For example, consider what happens if you strip `.php` from the following filename:
`exploit.p``.php``hp`
