Useful ways of to quickly parse data.

gedit find and replace, then cut everything after @ for example.
Will take all text after ‘@’ and remove it.
cat ja | cut -d '@' -f1 > endpoints

Will take all text before ‘@’ and remove it.
cat ja | cut -d '@' -f1 > endpoints

Will replace a space with a newline to create a wordlist:
cat users.txt | tr ' ' '\n' > userlist.txt

This command uses sed to replace the end-of-line anchor $ with @parkersmaplebarn.com for each line in the users.txt file. The resulting output is then saved to the userlist.txt file.
sed -e 's/$/@parkersmaplebarn.com/' users.txt > userlist.txt

Very useful when text fields are split vertically and has a bunch of trailing spaces:
head hash | awk '{print $1}'
head hash | awk '{print $2}'

![unnamed_5837e8d4e0bd432584db2806880e5d8f](unnamed_5837e8d4e0bd432584db2806880e5d8f.png)