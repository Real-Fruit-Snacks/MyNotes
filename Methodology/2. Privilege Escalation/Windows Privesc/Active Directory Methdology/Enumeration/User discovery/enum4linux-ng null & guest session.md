<https://github.com/cddmp/enum4linux-ng>

This is the new and improved version of enum4linux. Might be useful to run both as sometimes the one might find different information than to the other. Can be used to gather tons of data on the system. It can find group policies, password policies, domain names and a lot more. It can find userlists which can be very useful for attacks like password spraying and pass the hash.

Scans rpc, smb OS info and some more. Very useful tool 
enum4linux-ng -A 10.10.253.194 | tee enum4liunux

enum4linux -a $IP