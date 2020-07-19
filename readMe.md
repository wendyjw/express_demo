## 数据库初始化

1 创建一个数据库

    mysql -u root -p;
    create database todo_list;

2. 初始化数据库配置信息

    npx sequelize-cli init

3. 生成模型文件
    1. migrate 文件
    2. model 文件

    npx sequelize-cli model:generate --name Todo --attributes name:string,deadline:date,content:string    


4. 生成模型对应的数据库表

    npx sequelize db:migrate