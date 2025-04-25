How to run backend source code in local 

1/ Docker: 
- Gõ dòng sau vào terminal sau khi đã cài Docker:
docker pull mysql
docker run -d --name dinner -p 3307:3306 -e MYSQL_ROOT_PASSWORD=rootpassword -e MYSQL_USER=user -e MYSQL_PASSWORD=password mysql:latest


2/ Cài TablePlus, tạo ra connection mới: 
{
  name: db_dinner
  Host: 127.0.0.1
  Port: 3307
  user: user
  password: password
}
-> Connect

3/ create new database name: mydb

4/ import the sql file: mydb-Web.sql

4.1) Nếu lỗi "Access denied for user 'user'@'%' to database 'mydb'"
- Vào terminal của docker và nhập: 
docker exec -it dinner mysql -u root -p
- Tiếp tục paste:
GRANT ALL PRIVILEGES ON mydb.* TO 'user'@'%' ;
- Rồi paste:
FLUSH PRIVILEGES;
- Rồi:
EXIT;

- Connect lại với TablePlus và import the sql file

5/ Truy cập frontend:
cd ./dinner-guide-frontend
npm install uuid @types/uuid

6/ Truy cập backend:
cd ./dinner-guide-backend
Chạy:
npm install -g yarn
npm install nodemailer
npm install express-fileupload uuid --save
npm install multer
 
Mở backend:
yarn start
