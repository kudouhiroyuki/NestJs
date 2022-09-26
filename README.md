## Admin画面
- 料金プラン（画面）<br>
http://localhost:3000/plans/reference?productId=1001<br>

- 料金区分（画面）<br>
http://localhost:3000/divisions/reference?productId=1001<br>
http://localhost:3000/divisions/1001/regist<br>
http://localhost:3000/divisions/1001/detail/1<br>

- 在庫管理<br>
http://localhost:3000/inventorys/reference<br>
http://localhost:3000/inventorys/reference?productId=1001<br>
http://localhost:3000/inventorys/null/regist<br>
http://localhost:3000/inventorys/1001/regist<br>
http://localhost:3000/inventorys/1001/detail/1<br>

- メンテナンス管理<br>
http://localhost:3000/maintenance

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

#### <----- トリガーの作成 -----><br>
■CREATE TRIGGER 文<br>
※トリガーを作成する<br>
USE nest;<br>

CREATE TRIGGER insert_trigger_a<br>
AFTER INSERT<br>
ON users FOR EACH ROW<br>
INSERT INTO log (log, dt)<br>
VALUES('InsertA', now());<br>

CREATE TRIGGER insert_trigger_b<br>
AFTER INSERT<br>
ON users FOR EACH ROW<br>
INSERT INTO log (log, dt)<br>
VALUES('InsertB', now());<br>

CREATE TRIGGER update_trigger_a<br>
AFTER UPDATE<br>
ON users FOR EACH ROW<br>
INSERT INTO log (log, dt)<br>
VALUES('UpdateA', now());<br>

CREATE TRIGGER update_trigger_b<br>
AFTER UPDATE<br>
ON users FOR EACH ROW<br>
PRECEDES update_trigger_a<br>
INSERT INTO log (log, dt)<br>
VALUES('UpdateB', now());<br>

CREATE TRIGGER delete_trigger<br>
AFTER DELETE<br>
ON users FOR EACH ROW<br>
INSERT INTO log (log, dt)<br>
VALUES('Delete', now());<br>

■1つのトリガーで複数のSQL文を実行する<br>
DELIMITER //<br>
CREATE TRIGGER insert_trigger_c AFTER INSERT ON users FOR EACH ROW<br>
BEGIN<br>
&emsp;INSERT INTO log (log, dt) VALUES('InsertC1', now());<br>
&emsp;INSERT INTO log (log, dt) VALUES('InsertC2', now());<br>
END;//<br>
DELIMITER ;<br>

■トリガーの中で追加更新するデータの値を参照する(OLD.col_name, NEW.col_name)<br>
DELIMITER //<br>
CREATE TRIGGER insert_trigger_d AFTER INSERT ON salesLists FOR EACH ROW<br>
BEGIN<br>
&emsp;SELECT stockCount INTO @stock FROM stocks WHERE name=new.name;<br>
&emsp;SET @stock = @stock - 1;<br>
&emsp;UPDATE stocks SET stockCount=@stock WHERE name=new.name;<br>
END;//<br>
DELIMITER ;<br>

■SHOW TRIGGERS 文<br>
※トリガーを一覧表示する<br>
SHOW TRIGGERS;

■DROP TRIGGER 文<br>
※トリガーを削除する<br>
DROP TRIGGER insert_trigger;

#### <----- データの追加と削除 -----><br>
■INSERT 文<br>
※データを追加する<br>
INSERT INTO nest.users (user_name, password, address, age, department_id, point, createdAt) VALUES<br>
('name1', 'password', 'address', 30, 'A0001', 100, '2010-10-01 00:00:00'),<br>
('name2', 'password', 'address', 20, 'A0001', 500, '2010-11-01 08:00:00'),<br>
('name3', 'password', 'address', 17, 'B0001', 500, '2010-11-01 20:00:00'),<br>
('name4', 'password', 'address', 58, '', 400, '2010-12-01 00:00:00'),<br>
('name5', 'password', 'address', 32, '', NULL, '2011-12-01 00:00:00');<br>

INSERT INTO nest.departments (department_id, department_name) VALUES<br>
('A0001', 'アプリケーション'),<br>
('B0001', 'デザイン');<br>

INSERT INTO nest.stocks (name, stockCount) VALUES<br>
('Mouse', 10),<br>
('Keyboard', 8);<br>

INSERT INTO nest.users (user_name, password, address, age, department_id, point)<br>
SELECT d.department_name, 'password', 'address', 30, d.department_id, 100<br>
FROM nest.departments d;<br>

INSERT INTO nest.users (user_name, password, address, age, department_id, point)<br>
(SELECT d.department_name, 'password', 'address', 30, d.department_id, 100 FROM nest.departments d);<br>

■REPLACE<br>
※一致するレコードがあればDELETE、なければINSERT<br>
REPLACE INTO nest.departments (department_id, department_name) VALUES
('B0001', 'グラフィックデザイン');

■ON DUPLICATE KEY UPDATE<br>
※一致するレコードがなければINSERT、あればUPDATE<br>
INSERT INTO nest.departments (department_id, department_name) VALUES<br>
('B0001', 'デザイン')<br>
ON DUPLICATE KEY UPDATE<br>
department_id = 'C0001',<br>
department_name = '管理';<br>

■UPDATE 文<br>
※データを更新する<br>
UPDATE nest.users SET user_name='user_name' WHERE id='1';<br>
UPDATE nest.users SET user_name='user_name', password='password' WHERE id='1';<br>
UPDATE nest.users SET user_name='user_name', password='password' WHERE id IN ('1', '2');<br>
UPDATE nest.users SET user_name='user_name', password='password' ORDER BY id DESC LIMIT 2;<br>

UPDATE nest.users<br>
SET user_name='更新',<br>
password='更新',<br>
address='更新',<br>
age=99,<br>
department_id='B0001',<br>
point=999<br>
WHERE id='1';<br>

UPDATE nest.users u, nest.departments d<br>
SET u.user_name = '更新',<br>
d.department_name = '更新'<br>
WHERE u.department_id = 'A0001'<br>
AND d.department_id = 'A0001';<br>

UPDATE nest.users AS u<br>
INNER JOIN nest.departments AS d<br>
ON u.department_id = d.department_id<br>
SET u.user_name = d.department_name<br>
WHERE u.id = 1;<br>

UPDATE nest.users AS u<br>
INNER JOIN nest.departments AS d<br>
ON u.department_id = d.department_id<br>
SET u.user_name = IF(d.department_id = 'A0001', 'true', 'false');<br>

UPDATE nest.users AS u<br>
SET u.user_name = (<br>
&emsp;SELECT department_id<br>
&emsp;FROM nest.departments<br>
&emsp;LIMIT 1<br>
);<br>

■DELETE 文<br>
※データを削除する<br>
※AUTO_INCREMENTリセットされない<br>
DELETE FROM nest.users WHERE id = '1';<br>
DELETE FROM nest.users WHERE id IN ('1', '2');<br>
DELETE FROM nest.users ORDER BY id DESC LIMIT 2;

■TRUNCATE TABLE 文<br>
※AUTO_INCREMENTリセットされる<br>
※全てのデータを削除する<br>
TRUNCATE TABLE nest.users;

■トランザクション<br>
※BEGIN(開始)<br>
※COMMIT(終了 + 変更保存)<br>
※ROLLBACK）(終了 + 変更取消し)<br>
BEGIN;<br>
UPDATE nest.users SET user_name='user1' WHERE id='1';<br>
UPDATE nest.users SET user_name='user2' WHERE id='2';<br>
ROLLBACK;<br>

BEGIN;<br>
UPDATE nest.users SET user_name='user1' WHERE id='1';<br>
UPDATE nest.users SET user_name='user2' WHERE id='2';<br>
COMMIT;<br>

■ストアドプロシージャ<br>
SHOW PROCEDURE STATUS;<br>
SHOW CREATE PROCEDURE sample1;<br>
DROP PROCEDURE sample1;

CREATE PROCEDURE sample1()<br>
SELECT * FROM nest.departments;<br>
call sample1();<br>

CREATE PROCEDURE sample2(IN x INT)<br>
SELECT * FROM nest.users WHERE id = x;<br>
call sample2(1);<br>

CREATE PROCEDURE sample3(IN x INT, OUT y INT)<br>
SELECT point INTO y FROM nest.users WHERE id = x;<br>
call sample3(1, @y);<br>
SELECT @y;<br>

DELIMITER //<br>
CREATE PROCEDURE sample4(IN u_id INT, IN d_id VARCHAR(191), OUT u_count INT, OUT d_count INT)<br>
BEGIN<br>
&emsp;DECLARE u_name VARCHAR(191);<br>
&emsp;SET u_name='name1';<br>
&emsp;SELECT COUNT(*) FROM nest.users where id = u_id AND user_name = u_name into u_count;<br>
&emsp;SELECT COUNT(*) FROM nest.departments where department_id = d_id into d_count;<br>
END//<br>
DELIMITER ;<br>
call sample4(1, 'A0001', @u_count, @d_count);<br>
SELECT @u_count, @d_count;<br>

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

■WHERE 句<br>
※データを取得する条件を設定する<br>
SELECT *<br>
FROM nest.users<br>
WHERE id = 1<br>
OR id = 2;<br>

■EXISTS 句<br>
※サブクエリを使った検索条件の設定<br>
SELECT *<br>
FROM nest.users<br>
WHERE department_id = (<br>
&emsp;SELECT department_id<br>
&emsp;FROM nest.departments<br>
&emsp;LIMIT 1<br>
);<br>
SELECT *<br>
FROM nest.users u<br>
WHERE EXISTS (<br>
&emsp;SELECT *<br>
&emsp;FROM nest.departments d<br>
&emsp;WHERE u.department_id = d.department_id<br>
);<br>
SELECT *<br>
FROM nest.users u<br>
WHERE NOT EXISTS (<br>
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

#### <----- 日付と時刻に関する関数 -----><br>
■年ごと<br>
SELECT DATE_FORMAT(createdAt, '%Y'), SUM(point), COUNT(*)<br>
FROM nest.users<br>
GROUP BY DATE_FORMAT(createdAt, '%Y');<br>

■月ごと
SELECT DATE_FORMAT(createdAt, '%Y-%m'), SUM(point), COUNT(*)<br>
FROM nest.users<br>
GROUP BY DATE_FORMAT(createdAt, '%Y-%m');<br>

■日ごと<br>
SELECT DATE_FORMAT(createdAt, '%Y-%m-%d'), SUM(point), COUNT(*)<br>
FROM nest.users<br>
GROUP BY DATE_FORMAT(createdAt, '%Y-%m-%d');<br>

■時間ごと<br>
SELECT DATE_FORMAT(createdAt, '%H'), SUM(point), COUNT(*)<br>
FROM nest.users<br>
GROUP BY DATE_FORMAT(createdAt, '%H');<br>

■曜日ごと（0=Sunday..6=Saturday）<br>
SELECT DATE_FORMAT(createdAt, '%w'), SUM(point), COUNT(*)<br>
FROM nest.users<br>
GROUP BY DATE_FORMAT(createdAt, '%w');<br>

#### <----- 集計に関する関数 -----><br>
■AVG 関数<br>
※指定カラムの平均値を取得する<br>
※DISTINCTを指定すると、重複値を除外して集計<br>
※GROUP BYを指定すると、グループ化して集計<br>
※COALESCEを指定すると、nullを置換して集計<br>
SELECT AVG(COALESCE(point, 0)) FROM nest.users;<br>
SELECT AVG(IFNULL(point, 0)) FROM nest.users;<br>
SELECT AVG(CASE WHEN point IS NULL THEN 0 ELSE point END) FROM nest.users;<br>
SELECT AVG(DISTINCT COALESCE(point, 0)) FROM nest.users;<br>
SELECT department_id, AVG(COALESCE(point, 0)) FROM nest.users GROUP BY department_id;<br>
SELECT AVG(point) FROM nest.users WHERE department_id = 'A0001';<br>

■COUNT 関数<br>
※指定カラムの行数を取得する<br>
SELECT COUNT(DISTINCT department_id) FROM nest.users;<br>

SELECT COUNT(*), COUNT(DISTINCT department_id) FROM nest.users;<br>

SELECT department_id, COUNT(*)<br>
FROM nest.users<br>
GROUP BY department_id;<br>

SELECT age, COUNT(*)<br>
FROM nest.users<br>
WHERE age = 10 OR age = 20 OR age = 30 OR age = 40 OR age = 50<br>
GROUP BY age;<br>

■SUM 関数<br>
※指定カラムの合計値を取得する<br>
SELECT department_id, SUM(point) <br>
FROM nest.users<br>
GROUP BY department_id;<br>

SELECT department_id, SUM(point)<br>
FROM nest.users<br>
GROUP BY department_id<br>
HAVING SUM(point) > 500;<br>

SELECT (SUM(id) + SUM(point)) AS total FROM nest.users;<br>

SELECT SUM(CASE WHEN point = 100 THEN 1 ELSE 0 END) FROM nest.users;<br>

SELECT SUM(IF(point = 100, 1, 0) + IF(department_id = 'A0001', 1, 0)) FROM nest.users;<br>

SELECT SUM(u.id), COUNT(d.department_id) FROM nest.users AS u<br>
INNER JOIN nest.departments AS d<br>
ON u.department_id = d.department_id;<br>

SELECT SUM(u.id) + COUNT(d.department_id) FROM nest.users AS u<br>
INNER JOIN nest.departments AS d<br>
ON u.department_id = d.department_id;<br>

#### 用語<br>
- ステートメント（構築された文全体）<br>
- sqlインジェクション
Webアプリケーションに対し不正なSQL文を注入して不正に操作する攻撃手法

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