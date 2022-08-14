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
curl -X GET "http://localhost:3000/users?id=&user_name=&sort=ASC&limit=5&page_number=1"<br>
curl -X GET "http://localhost:3000/users?id=1&user_name=kudou&sort=ASC&limit=5&page_number=1"<br>
curl -X GET "http://localhost:3000/users/1"<br>
curl -X POST http://localhost:3000/users -d "id=10&user_name=name&password=password"<br>
curl -X PUT http://localhost:3000/users/10 -d "user_name=name"<br>
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
#### データの追加と削除<br>
- INSERT 文<br>
※データを追加する<br>
INSERT INTO nest.users (id, user_name, password) VALUES(1, 'name', 'password');

- UPDATE 文<br>
※データを更新する<br>
UPDATE nest.users SET user_name='kudou' WHERE id='1';

- TRUNCATE TABLE文<br>
※全てのデータを削除する<br>
TRUNCATE TABLE nest.users;

|  アクション  |  画面の有無  |  内容  |
| ---- | ---- | ---- |
|  index  |  -  |  一覧表示画面  |
|  create  |  -  |  新規入力フォーム  |
|  store  |  -  |  追加処理(createの登録ボタン)  |
|  show  |  -  |  詳細表示  |
|  edit  |  -  |  変更フォーム(既存の値が入っている状態)  |
|  update  |  -  |  変更処理(editの更新ボタン)  |
|  destroy  |  -  |  削除処理(showの削除ボタン)  |