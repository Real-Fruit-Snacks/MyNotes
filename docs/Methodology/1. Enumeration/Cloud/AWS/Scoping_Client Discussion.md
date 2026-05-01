- Are you using multiple AWS accounts for this environment?
- How many?
- Are you interested in having them all tested, or just a portion?
- What kind of access will be provided to the environment?
- What/how many AWS services are you using?
- How many regions do your resources span across?
- How many EC2 instances/Lambda functions are in use?
- How many IAM users, roles, and groups do you have?
- How do your users access your environment? (regular IAM users, SSO |
- AssumeRole, and so on)


- Is this a red team style engagement where our activity will be actively monitored and defended against by a blue team? 
- Is this just an audit of configuration? 
- Is this a go as far as possible type of engagement without an activate defense against us?


Beyond that, is the client supplying us credentials? If so, credentials for how many users
and what information do we get about them? If not, should we be social engineering to gain
access?


Other important questions may include the following:
- Is this a test/development/production environment?
- Is there anything we should not touch in the environment?
- Are there other users who are actively using this environment?