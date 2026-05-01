- Websites uses caching to mitigate load on the server.
- The cache server sits between the web server and the user.
- There's a cache key that's being used to validate whether an incoming request should be served directly from the cache server, or if it should redirect to web server.
- If you can find unkeyed areas of the web server, and potentially poison it (typically through unkeyed headers), it's possible to make that request get cache keyed at the cache server level and poison the cache to be served for all subsequent visitors of that particular endpoint.
- Utilize techniques like manual enumeration and param miner to identify potential vulnerable headers.
- Web Cache Poisoning can be chained with attacks such as XSS, JavaScript injection, and open redirection to name some realistic ones.  

param miner:
guess headers, extensions, output. In output section you'll see if it found any interesting headers
can also go to logger to see its requests