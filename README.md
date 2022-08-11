## Admin画面
#### 施設管理<br>
- 施設情報管理（画面）<br>
http://localhost:3000/facility_management/notice/create<br>
src/facility_management/facility/facility.controller.ts（index）<br>
views/pages/facility_management/facility/index.ejs

- お知らせ登録（画面）<br>
http://localhost:3000/facility_management/notice/create<br>
src/facility_management/notice/notice.controller.ts（create）<br>
views/pages/facility_management/notice/create.ejs

- お知らせ照会（画面）<br>
http://localhost:3000/facility_management/notice<br>
src/facility_management/notice/notice.controller.ts（index）<br>
views/pages/facility_management/notice/index.ejs

- お知らせ詳細（画面）<br>
http://localhost:3000/facility_management/notice/{id}<br>
src/facility_management/notice/notice.controller.ts（show）<br>
views/pages/facility_management/notice/show.ejs

- 動作確認用（users）<br>
curl -X GET "http://localhost:3000/users"<br>
curl -X GET "http://localhost:3000/users?sort=ASC&limit=5&page_number=1"<br>
curl -X GET "http://localhost:3000/users?sort=DESC&limit=5&page_number=1"<br>
curl -X GET "http://localhost:3000/users?id=&sort=ASC&limit=5&page_number=1<br>
curl -X GET "http://localhost:3000/users?id=1&sort=ASC&limit=5&page_number=1<br>
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