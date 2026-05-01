```
ORIGINAL:
/report/1

header::

}
  "alg": "HS256",
  "typ": "JWT"
}

data:

{
  "userId": 4,
  "username": "a",
  "admin": false,
  "iat": 1665008445
}

=======
Modified:

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsInVzZXJuYW1lIjoiYWRtaW4iLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNjY1MDA4NDQ1fQ.vsKHSFXtpxudbHcdfy1cIA7jAAx8Ot0ZSyAi9Rt6Sys

{
  "userId": 4,
  "username": "admin",
  "admin": true,
  "iat": 1665008445
}

They have sufficient filtering in place for this

```