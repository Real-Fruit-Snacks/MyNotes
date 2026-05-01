(We usually only really see this in real assessments, and not CTFs, but it can occur)

For responder to work you'd usually need to be on the LAN, the internal network. It acts as a LLMNR (LLMNR usually triggers as a second respose if DNS fails on the server). And a DNS fail can be for many reasons, so just keep listening with Responder and you're likely to get an event if you wait long enough on the internal network.

python3 /opt/Responder/Responder.py -I tun0

Here we're calling for the attacker ip inside a redis database. (I kinda think you can select any "folder" here, doesn't really matter, but regardless, responder is listening and captured an NTLMv2 hash in this case. YUM!)

![unnamed_a6e4a283eeee43f2836dcca47cbf41ad](unnamed_a6e4a283eeee43f2836dcca47cbf41ad.png)
