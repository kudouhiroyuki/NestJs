## Admin画面
#### 施設管理<br>
- XXXXXX
http://localhost:3000/

- お知らせ登録 /institution/notice_regist<br>
http://localhost:3000/institution/notice_regist

- お知らせ照会 /institution/notice_inquiry<br>
http://localhost:3000/institution/notice_inquiry

- 動作確認用（users）<br>
curl -X GET "http://localhost:3000/users"<br>
curl -X GET "http://localhost:3000/users/1"<br>
curl -X POST http://localhost:3000/users -d "id=3&password=password"<br>
curl -X PUT http://localhost:3000/users/1 -d "password=Test"<br>
curl -X DELETE http://localhost:3000/users/1<br>
-v<br>

## 環境構築<br>
- npm install

- Live Sass Compiler（VSCode）

## 起動<br>
yarn start<br>
yarn start --watch

## コマンド<br>
- モジュール・コントローラー・サービス作成<br>
nest g module users<br>
nest g controller users<br>
nest g service users

## SQL<br>
TRUNCATE laravel.contactChats;（全レコード削除）

- INSERT 文<br>
INSERT INTO nest.users VALUES(2, 'password');

- UPDATE 文<br>
UPDATE nest.users SET password='admin' WHERE id='1';