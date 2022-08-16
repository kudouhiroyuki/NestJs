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
curl -X GET "http://localhost:3000/users"<br>
curl -X GET "http://localhost:3000/users?sort=ASC&limit=5&page_number=1"<br>
curl -X GET "http://localhost:3000/users?sort=DESC&limit=5&page_number=1"<br>
curl -X GET "http://localhost:3000/users?id=&user_name=&sort=ASC&limit=5&page_number=1"<br>
curl -X GET "http://localhost:3000/users?id=1&user_name=kudou&sort=ASC&limit=5&page_number=1"<br>
curl -X GET "http://localhost:3000/users/1"<br>
curl -X POST http://localhost:3000/users -d "user_name=name&password=password"<br>
curl -X PUT http://localhost:3000/users/1 -d "user_name=name"<br>
curl -X DELETE http://localhost:3000/users/1<br>
-v<br>

## 環境構築<br>
- npm install

- Live Sass Compiler（VSCode）

## 起動<br>
yarn start<br>
yarn start --watch

## Prismaコマンド<br>
- マイグレーションファイル作成<br>
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