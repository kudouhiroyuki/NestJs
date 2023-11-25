## 起動（Docker）<br>
CREATE DATABASE nest;<br>
utf8mb4：utf8mb4_unicode_ci<br>

.env<br>
DATABASE_URL="mysql://root:root@nest-db:3306/nest"<br>

cd NestJs<br>
docker compose up -d --build<br>

docker container exec -it nest-web bash<br>
npx prisma migrate dev --name init<br>
npm i<br>

■MySQL Container<br>
docker container exec -it nest-db bash<br>
mysql -u root -p<br>
SHOW DATABASES;<br>
USE nest;<br>
SHOW TABLES;<br>

■MySQL Workbench<br>
Connection Name: nestDb<br>
Hostname: 127.0.0.1<br>
Port: 3306<br>
Username: root<br>

http://localhost:3000/users/<br>
http://localhost:3000/api/<br>

## Dockerコマンド<br>
■Webサーバー（http://localhost/）<br>
docker run --name static-site -e AUTHOR="Docker" -d -p 80:80 seqvence/static-site<br>

■MySQL<br>
docker pull mysql（MySQLイメージ取得）<br>
docker run --name mysql -e MYSQL_ROOT_PASSWORD=mysql -d -p 3306:3306 mysql（コンテナ起動･作成）<br>
docker exec -it mysql bash -p（コンテナ接続）<br>
mysql -u root -p mysql（MySQL接続）<br>
■MySQL Workbench（Connections追加）<br>
Connection Name: MysqlTest<br>
Hostname: 127.0.0.1<br>
Port: 3306<br>
Username: root<br>

docker version（バージョン）<br>
docker-compose version（バージョン）<br>
docker images（イメージ一覧）<br>
docker ps（起動中コンテナ）<br>
docker ps -a（起動中/停止中コンテナ）<br>
docker start {CONTAINER ID}（コンテナ起動）<br>
docker stop {CONTAINER ID}（コンテナ停止）<br>
docker rm {CONTAINER ID}（コンテナ削除）<br>
docker rmi {IMAGE ID}（イメージ削除）

## Curlコマンド<br>
curl --version<br>
curl -v -X GET "http://localhost:3000/users"<br>
curl -X GET "http://localhost:3000/users"<br>
curl -X POST http://localhost:3000/users -d "userName=name&password=password"<br>
curl -X PUT http://localhost:3000/users/1 -d "userName=updateName&password=updatePassword"<br>
curl -X DELETE http://localhost:3000/users/1<br>

## Prismaコマンド<br>
- マイグレーションファイル（作成・更新）<br>
※テーブル内にデータがあれば更新できない<br>
npx prisma migrate dev --name init<br>

- フォーマット修正<br>
npx prisma format<br>

- 既存DBの反映<br>
npx prisma db pull<br>
