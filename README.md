## Admin画面
#### 施設管理<br>
- 施設情報管理（画面）<br>
http://localhost:3000/tenant/details<br>
src/tenant/tenant.controller.ts（show）<br>
views/pages/tenant/details.ejs

- お知らせ登録（画面）<br>
http://localhost:3000/notification/regist<br>
src/notification/notification.controller.ts（create）<br>
views/pages/notification/regist.ejs

- お知らせ照会（画面）<br>
http://localhost:3000/notification/reference<br>
src/notification/notification.controller.ts（index）<br>
views/pages/notification/reference.ejs

- お知らせ詳細（画面）<br>
http://localhost:3000/notification/details/{id}<br>
src/notification/notification.controller.ts（show）<br>
views/pages/notification/details.ejs

- 動作確認用（users）<br>
OK curl -X GET "http://localhost:3000/users"<br>
OK curl -X GET "http://localhost:3000/users?id=&user_name=&sort="<br>
OK curl -X GET "http://localhost:3000/users?id=1&user_name=kudou"<br>
OK curl -X GET "http://localhost:3000/users?id=2&user_name=tanaka"<br>
OK curl -X GET "http://localhost:3000/users?sort=asc"<br>
OK curl -X GET "http://localhost:3000/users?sort=desc"<br>


curl -X GET "http://localhost:3000/users?sort=ASC&limit=5&page_number=1"<br>
curl -X GET "http://localhost:3000/users?sort=DESC&limit=5&page_number=1"<br>
curl -X GET "http://localhost:3000/users?id=&user_name=&sort=ASC&limit=5&page_number=1"<br>
curl -X GET "http://localhost:3000/users?id=1&user_name=kudou&sort=ASC&limit=5&page_number=1"<br>
curl -X GET "http://localhost:3000/users/1"<br>
curl -X POST http://localhost:3000/users -d "user_name=name&password=password"<br>
curl -X PUT http://localhost:3000/users/1 -d "user_name=updateName&password=updatePassword"<br>
curl -X DELETE http://localhost:3000/users/1<br>
-v<br>

## 起動（Docker無）<br>
MySQL<br>
mysql -u root -p;<br>
CREATE DATABASE nest;<br>

.env<br>
DATABASE_URL="mysql://root:@localhost:3306/nest"

cd NestJs<br>
npx prisma migrate dev --name init<br>
npm i<br>
npm run start:dev

## 起動（Docker有）<br>
cd NestJs<br>
docker compose up -d --build<br>
docker compose exec nest npm run start:dev

## Dockerコマンド<br>
docker version（バージョン）<br>
docker images（イメージ一覧）<br>
docker ps（起動中コンテナ）<br>
docker ps -a（起動中/停止中コンテナ）<br>
docker start {CONTAINER ID}（コンテナ起動）<br>
docker stop {CONTAINER ID}（コンテナ停止）<br>
docker rm {CONTAINER ID}（コンテナ削除）<br>
docker rmi {IMAGE ID}（イメージ削除）

## Prismaコマンド<br>
- マイグレーションファイル（作成・更新）<br>
※テーブル内にデータがあれば更新できない<br>
npx prisma migrate dev --name init

## Nestコマンド<br>
- モジュール・コントローラー・サービス作成<br>
nest g module users<br>
nest g controller users<br>
nest g service users

## MySQL<br>
#### MySQLコマンドラインツールの利用<br>
- 接続<br>
mysql -u root -p;

- 終了<br>
exit;

- コマンド一覧<br>
help;

#### データベースの作成<br>
- CREATE DATABASE 文<br>
※データベースを作成する<br>
CREATE DATABASE nest;

- SHOW DATABASES 文<br>
※データベースの一覧を取得する<br>
SHOW DATABASES;

#### データの追加と削除<br>
- INSERT 文<br>
※データを追加する<br>
INSERT INTO nest.users (user_name, password, department_id) VALUES('name1', 'password', 'A0001');<br>
INSERT INTO nest.users (user_name, password, department_id) VALUES('name2', 'password', 'A0001');<br>
INSERT INTO nest.users (user_name, password, department_id) VALUES('name', 'password', '');<br>
INSERT INTO nest.departments (department_id, department_name) VALUES('A0001', 'アプリケーション');<br>
INSERT INTO nest.departments (department_id, department_name) VALUES('B0001', 'デザイン');<br>

- UPDATE 文<br>
※データを更新する<br>
UPDATE nest.users SET user_name='user_name' WHERE id='1';<br>
UPDATE nest.users SET user_name='user_name', password='password' WHERE id='1';<br>
UPDATE nest.users SET user_name='user_name', password='password' WHERE id IN ('1', '2');<br>
UPDATE nest.users SET user_name='user_name', password='password' ORDER BY id DESC LIMIT 2;

- DELETE 文<br>
※データを削除する<br>
※AUTO_INCREMENTリセットされない<br>
DELETE FROM nest.users WHERE id = '1';<br>
DELETE FROM nest.users WHERE id IN ('1', '2');<br>
DELETE FROM nest.users ORDER BY id DESC LIMIT 2;

- TRUNCATE TABLE 文<br>
※AUTO_INCREMENTリセットされる<br>
※全てのデータを削除する<br>
TRUNCATE TABLE nest.users;

#### データの取得<br>
- SELECT 文<br>
※データを取得する<br>
SELECT * FROM nest.users;<br>
SELECT id, user_name, password FROM nest.users;<br>
SELECT id*1.08, user_name, password FROM nest.users;<br>

- GROUP BY 句<br>
※データをグループ化する<br>

- AS句（エイリアス）<br>
※カラムに別名を付ける<br>
SELECT * FROM nest.users AS u;<br>
SELECT * FROM nest.users u;<br>
SELECT id, user_name, password, department_id AS dept from nest.users;<br>
SELECT id, user_name, password, department_id dept from nest.users;<br>

- サブクエリ<br>
※SELECT文で取得した結果を他のSELECTやUPDATEの中で利用する<br>
SELECT *<br>
FROM nest.users<br>
WHERE department_id = (<br>
&emsp;SELECT department_id<br>
&emsp;FROM nest.departments<br>
&emsp;LIMIT 1<br>
);

SELECT *<br>
FROM nest.users u<br>
WHERE EXISTS (<br>
&emsp;SELECT *<br>
&emsp;FROM nest.departments d<br>
&emsp;WHERE u.department_id = d.department_id<br>
);

#### MySQL関数の使い方<br>
- CONCAT 関数<br>
※複数の文字列を連結した文字列を取得する<br>
SELECT CONCAT('first_name','last_name');<br>
SELECT CONCAT(id, user_name, password) FROM nest.users;<br>
SELECT CONCAT(id, user_name, password), id, user_name, password FROM nest.users;

#### テーブルとデータの結合<br>
- INNER JOIN 句（内部結合）<br>
※一致しないデータは取得しない<br>
SELECT * FROM nest.users INNER JOIN nest.departments USING(department_id);<br><br>
SELECT u.id, u.user_name, u.password, u.department_id<br>
FROM nest.users AS u<br>
INNER JOIN nest.departments AS d<br>
ON u.department_id = d.department_id<br>
WHERE u.id = 1;<br>

- LEFT JOIN 句（外部結合 左外部結合）<br>
※左側のテーブルにしかないデータも取得<br>
※正式名(LEFT OUTER JOIN)<br>
SELECT * FROM nest.users LEFT JOIN nest.departments ON users.department_id = departments.department_id;<br>

- RIGHT JOIN 句（外部結合 右外部結合）<br>
※右側のテーブルにしかないデータも取得<br>
※正式名(RIGHT OUTER JOIN)<br>
SELECT * FROM nest.users RIGHT JOIN nest.departments ON users.department_id = departments.department_id;<br>

- 自己結合<br>
※同じテーブルを結合する<br>
SELECT u1.id, u1.user_name, u1.password, u1.department_id<br>
FROM nest.users AS u1<br>
INNER JOIN nest.users AS u2<br>
ON u1.id = u2.id;<br>

#### 用語<br>
- ステートメント（構築された文全体）<br>

## CRUD<br>
|  Method  |  URL  |  アクション  |  画面の有無  |  内容  |
|  ----  | ----  |  ----  |  ----  |  ----  |
|  GET  |  users  |  @index  |  有  |  一覧画面  |
|  GET  |  users/create  |  @create  |  有  |  新規作成画面  |
|  POST  |  users  |  @store  |  無  |  追加処理(新規作成画面：登録ボタン)  |
|  GET  |  users/{id}  |  @show  |  有  |  詳細画面  |
|  GET  |  users/{id}/edit  |  @edit  |  有  |  編集画面  |
|  PUT  |  users/{id}  |  @update  |  無  |  変更処理(編集画面：更新ボタン)  |
|  DELETE  |  users/{id}  |  @destroy  |  無  |  変更処理(編集画面：削除ボタン)  |

## 参考サイト<br>
- Nestjs(公式)<br>
https://docs.nestjs.com/

- TypeORM(公式)<br>
https://typeorm.io/entities

- TypeORM / Repository使い方<br>
https://www.wakuwakubank.com/posts/732-typeorm-repository/

- TypeORM / QueryBuilder使い方<br>
https://qiita.com/taisuke-j/items/001dfaa8b61649601d73

- Prisma使い方<br>
https://zenn.dev/tossy_yukky/articles/0075f9f0054b39d4ef59