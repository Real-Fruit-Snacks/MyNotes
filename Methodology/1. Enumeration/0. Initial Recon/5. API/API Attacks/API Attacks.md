Excessive Data Disclosure: 
- When the response gives you additional information which is not relevant to your request. An example of this would be to give email, account creation, privilege information etc for other users that is not relevant to this request.

BOLA: 
- When you can access resources you're not authorized to.

BFLA:
- When you can perform actions and functions you're not authorized to.
- This can apply for both lateral and escalated actions.

Improper Assets Management: 
- Testing Versioning essentially. (V1,V2,V3)
- Set variable to change versioning on all requests in postman, in both authorized and unauthorized sessions
- Examples of vulnerabilities might be lack of rate limiting, command injection, excessive data exposure, etc that would not be taking place in another version. Typically the earlier version contains more issues

Mass Assignment: 
- Adding or overwriting parameters and object properties to manipulate response. An example would be to add your own user as an administrator upon account creation by doing exactly this.
- Look for parameters involved in user account properties, critical functions, and administrative actions.
