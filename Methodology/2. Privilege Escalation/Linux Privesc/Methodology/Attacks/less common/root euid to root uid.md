perl -MEnglish -e '$UID = 0; $ENV{PATH} = "/bin:/usr/bin:/sbin:/usr/sbin"; exec "su - root"'

