Bloodhound CE
Make sure you have:
apt install docker.io
apt install docker-compose


curl -L <https://ghst.ly/getbhce> -o docker-compose.yml
docker-compose pull && docker-compose up -d
docker-compose logs bloodhound | grep -i passw

then go to <http://127.0.0.1:8080> with user admin and password u got
ingest data you get from netexec:
netexec ldap $target -u SQLService -p 'MYpassword123#' --bloodhound --collection All --dns-server $target


Reference for cypher queries:
<https://support.bloodhoundenterprise.io/hc/en-us/articles/16721164740251-Searching-with-Cypher>


docker-compose down
docker volume ls
docker volume rm test_neo4j-data test_postgres-data
