Perform scanning with kiterunner and fuzzer to find endpoints.
mitmweb
manual web test especially for APIs
import mitmweb file to postmaN
chain postman thoruhg burp (passive listening on burp)
run full collection with whatever u want

BAM, from here u have full targetlist on both postman and burpsuite with the benefits of the tools from each ; )

mitmweb
(capture all manual requests)
sudo mitmproxy2swagger -i ~/Downloads/flows -o spec.yaml -p '<http://crapi.apisec.ai:8888'> -f flow
sudo subl spec.yaml
(import to postman - fix login request, add token, save, setup test, and proxy through burp)


- Scan for endpoints
- fuzz for paramaters in both body and URL
- 

<https://www.ethicalcheck.dev/>

