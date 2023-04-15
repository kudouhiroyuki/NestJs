## SpringBoot 検証環境<br>
https://github.com/kudouhiroyuki/SpringBoot

## Vue2 + Typescript 検証環境<br>
https://github.com/kudouhiroyuki/Vue2-Typescript

## TypeScript　勉強メモ（READMEのみ）<br>
https://github.com/kudouhiroyuki/Study-TypeScript

## JavaScript　勉強メモ（READMEのみ）<br>
https://github.com/kudouhiroyuki/Study-JavaScript

## 用語　勉強メモ（READMEのみ）<br>
https://github.com/kudouhiroyuki/Study-Term

## ツール<br>
Swagger<br>
Postman<br>
Docker<br>
MySQL<br>
MySQL Workbench<br>
Homebrew<br>

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

## MySQL<br>
#### MySQLコマンドラインツールの利用<br>
- 接続<br>
mysql -u root -p;

- 終了<br>
exit;

- コマンド一覧<br>
help;

#### MySQLのデータ型<br>
■CHAR型（CHARACTER）<br>
固定長文字列<br>
0〜255<br>
※MySQLでサイズ指定は、バイト数ではなく文字数 CHAR(8)<br>
※格納時に必ず指定された長さになるように右側がスペースで埋められる<br>
※データを取得する場合や比較する場合は、末尾の空白は削除された状態で取得や比較が行われる<br>
※データの桁数が決まっているもの向け（郵便番号・電話番号）<br>

■VARCHAR型（VARIABLE CHARACTER）<br>
可変長文字列<br>
0〜65535<br>
※MySQLでサイズ指定は、バイト数ではなく文字数 VARCHAR(8)<br>
※CHAR型と異なり、格納する文字列の長さの調整はされない<br>
※末尾に空白が付いた文字列はそのまま格納される<br>
※データ桁数が変動する可能性のあるもの向け（氏名・書籍名）<br>

■TEXT型<br>
TINYTEXT（約255バイト）<br>
TEXT（約64Kバイト 65,535文字）<br>
MEDIUMTEXT（約16Mバイト 16,777,215文字）<br>
LONGTEXT（約4Gバイト 4,294,967,295文字）<br>

■ENUM型<br>
※テーブル作成時に要素として定義された以外の値が入らない<br>

■バイト数<br>
SELECT LENGTH('あいうえお');<br>
■文字数<br>
SELECT CHAR_LENGTH('あいうえお');<br>

■ASCII文字（アスキー）<br>
半角英数字や半角記号や改行コードなどの世界共通で多用される文字<br>
1バイト文字として0〜127の範囲に割り当て（符号無し10進数表記）<br>

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
INSERT INTO nest.user (user_name, password, address, age, department_id, point, created_at, update_at) VALUES<br>
('name1', 'password', 'address', '30', 'A0001', 100, '2010-10-01 00:00:00', '2010-10-01 00:00:00');<br>

INSERT INTO nest.department (department_id, department_name) VALUES<br>
('A0001', 'アプリケーション'),<br>
('B0001', 'デザイン');<br>

INSERT INTO nest.users (userName, password, address, age, departmentId, point)<br>
SELECT d.departmentName, 'password', 'address', 30, d.departmentId, 100<br>
FROM nest.departments d;<br>

INSERT INTO nest.users (userName, password, address, age, departmentId, point)<br>
(SELECT d.departmentName, 'password', 'address', 30, d.departmentId, 100 FROM nest.departments d);<br>

■REPLACE<br>
※一致するレコードがあればDELETE、なければINSERT<br>
REPLACE INTO nest.departments (departmentId, departmentName) VALUES
('B0001', 'グラフィックデザイン');

■ON DUPLICATE KEY UPDATE<br>
※一致するレコードがなければINSERT、あればUPDATE<br>
INSERT INTO nest.departments (departmentId, departmentName) VALUES<br>
('B0001', 'デザイン')<br>
ON DUPLICATE KEY UPDATE<br>
departmentId = 'C0001',<br>
departmentName = '管理';<br>

■UPDATE 文<br>
※データを更新する<br>
UPDATE nest.users SET userName='userName' WHERE id='1';<br>
UPDATE nest.users SET userName='userName', password='password' WHERE id='1';<br>
UPDATE nest.users SET userName='userName', password='password' WHERE id IN ('1', '2');<br>
UPDATE nest.users SET userName='userName', password='password' ORDER BY id DESC LIMIT 2;<br>

UPDATE nest.users<br>
SET userName='更新',<br>
password='更新',<br>
address='更新',<br>
age=99,<br>
departmentId='B0001',<br>
point=999<br>
WHERE id='1';<br>

UPDATE nest.users u, nest.departments d<br>
SET u.userName = '更新',<br>
d.departmentName = '更新'<br>
WHERE u.departmentId = 'A0001'<br>
AND d.departmentId = 'A0001';<br>

UPDATE nest.users AS u<br>
INNER JOIN nest.departments AS d<br>
ON u.departmentId = d.departmentId<br>
SET u.userName = d.departmentName<br>
WHERE u.id = 1;<br>

UPDATE nest.users AS u<br>
INNER JOIN nest.departments AS d<br>
ON u.departmentId = d.departmentId<br>
SET u.userName = IF(d.departmentId = 'A0001', 'true', 'false');<br>

UPDATE nest.users AS u<br>
SET u.userName = (<br>
&emsp;SELECT departmentId<br>
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
UPDATE nest.users SET userName='user1' WHERE id='1';<br>
UPDATE nest.users SET userName='user2' WHERE id='2';<br>
ROLLBACK;<br>

BEGIN;<br>
UPDATE nest.users SET userName='user1' WHERE id='1';<br>
UPDATE nest.users SET userName='user2' WHERE id='2';<br>
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
&emsp;SELECT COUNT(*) FROM nest.users where id = u_id AND userName = u_name into u_count;<br>
&emsp;SELECT COUNT(*) FROM nest.departments where departmentId = d_id into d_count;<br>
END//<br>
DELIMITER ;<br>
call sample4(1, 'A0001', @u_count, @d_count);<br>
SELECT @u_count, @d_count;<br>

#### データの取得<br>
- SELECT 文<br>
※データを取得する<br>
SELECT * FROM nest.users;<br>
SELECT id, userName, password FROM nest.users;<br>
SELECT id*1.08, userName, password FROM nest.users;<br>

- GROUP BY 句<br>
※データをグループ化する<br>

- AS句（エイリアス）<br>
※カラムに別名を付ける<br>
SELECT * FROM nest.users AS u;<br>
SELECT * FROM nest.users u;<br>
SELECT id, userName, password, departmentId AS dept from nest.users;<br>
SELECT id, userName, password, departmentId dept from nest.users;<br>

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
WHERE departmentId = (<br>
&emsp;SELECT departmentId<br>
&emsp;FROM nest.departments<br>
&emsp;LIMIT 1<br>
);<br>
SELECT *<br>
FROM nest.users u<br>
WHERE EXISTS (<br>
&emsp;SELECT *<br>
&emsp;FROM nest.departments d<br>
&emsp;WHERE u.departmentId = d.departmentId<br>
);<br>
SELECT *<br>
FROM nest.users u<br>
WHERE NOT EXISTS (<br>
&emsp;SELECT *<br>
&emsp;FROM nest.departments d<br>
&emsp;WHERE u.departmentId = d.departmentId<br>
);

#### MySQL関数の使い方<br>
- CONCAT 関数<br>
※複数の文字列を連結した文字列を取得する<br>
SELECT CONCAT('first_name','last_name');<br>
SELECT CONCAT(id, userName, password) FROM nest.users;<br>
SELECT CONCAT(id, userName, password), id, userName, password FROM nest.users;

#### テーブルとデータの結合<br>
- INNER JOIN 句（内部結合）<br>
※一致しないデータは取得しない<br>
SELECT * FROM nest.users INNER JOIN nest.departments USING(departmentId);<br>

SELECT *<br>
FROM nest.users AS u<br>
INNER JOIN nest.departments AS d<br>
ON u.departmentId = d.departmentId;<br>

SELECT *<br>
FROM nest.users AS u<br>
INNER JOIN nest.departments AS d<br>
ON u.departmentId = d.departmentId<br>
INNER JOIN nest.posts AS p<br>
ON u.id = p.postsId;<br>

SELECT u.id, u.userName, u.password, u.departmentId<br>
FROM nest.users AS u<br>
INNER JOIN nest.departments AS d<br>
ON u.departmentId = d.departmentId<br>
WHERE u.id = 1;<br>

- LEFT JOIN 句（外部結合 左外部結合）<br>
※左側のテーブルにしかないデータも取得<br>
※正式名(LEFT OUTER JOIN)<br>
SELECT * FROM nest.users LEFT JOIN nest.departments ON users.departmentId = departments.departmentId;<br>

- RIGHT JOIN 句（外部結合 右外部結合）<br>
※右側のテーブルにしかないデータも取得<br>
※正式名(RIGHT OUTER JOIN)<br>
SELECT * FROM nest.users RIGHT JOIN nest.departments ON users.departmentId = departments.departmentId;<br>

- 自己結合<br>
※同じテーブルを結合する<br>
SELECT u1.id, u1.userName, u1.password, u1.departmentId<br>
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
SELECT departmentId, AVG(COALESCE(point, 0)) FROM nest.users GROUP BY departmentId;<br>
SELECT AVG(point) FROM nest.users WHERE departmentId = 'A0001';<br>

■COUNT 関数<br>
※指定カラムの行数を取得する<br>
SELECT COUNT(DISTINCT departmentId) FROM nest.users;<br>

SELECT COUNT(*), COUNT(DISTINCT departmentId) FROM nest.users;<br>

SELECT departmentId, COUNT(*)<br>
FROM nest.users<br>
GROUP BY departmentId;<br>

SELECT age, COUNT(*)<br>
FROM nest.users<br>
WHERE age = 10 OR age = 20 OR age = 30 OR age = 40 OR age = 50<br>
GROUP BY age;<br>

■SUM 関数<br>
※指定カラムの合計値を取得する（NULL以外）<br>
※WHERE：GROUP BYの前に条件適応<br>
※HAVING：GROUP BYの後に条件適応<br>

SELECT SUM(point)<br>
FROM nest.users;<br>

SELECT SUM(DISTINCT point)<br>
FROM nest.users;<br>

SELECT departmentId, SUM(point)<br>
FROM nest.users<br>
GROUP BY departmentId;<br>

SELECT departmentId, SUM(point)<br>
FROM nest.users<br>
WHERE userName != "name2"<br>
GROUP BY departmentId;<br>

SELECT departmentId, SUM(point)<br>
FROM nest.users<br>
GROUP BY departmentId<br>
HAVING SUM(point) > 500;<br>

SELECT (SUM(id) + SUM(point)) AS total FROM nest.users;<br>

SELECT SUM(CASE WHEN point = 100 THEN 1 ELSE 0 END) FROM nest.users;<br>

SELECT SUM(IF(point = 100, 1, 0) + IF(departmentId = 'A0001', 1, 0)) FROM nest.users;<br>

SELECT SUM(u.id), COUNT(d.departmentId) FROM nest.users AS u<br>
INNER JOIN nest.departments AS d<br>
ON u.departmentId = d.departmentId;<br>

SELECT SUM(u.id) + COUNT(d.departmentId) FROM nest.users AS u<br>
INNER JOIN nest.departments AS d<br>
ON u.departmentId = d.departmentId;<br>
