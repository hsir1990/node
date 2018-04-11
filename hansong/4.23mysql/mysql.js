检测系统是否自带安装 mysql:
// rpm -qa | grep mysql

rpm -e mysql　　// 普通删除模式
rpm -e --nodeps mysql　　// 强力删除模式，如果使用上面命令删除时，提示有依赖的其它文件，则用该命令可以对其进行强力删除

安装 mysql：

// yum install mysql
// yum install mysql-server
// yum install mysql-devel

启动 mysql：
// service mysqld start

如果是 CentOS 7 版本，由于 MySQL数据库已从默认的程序列表中移除，可以使用 mariadb 代替：
// yum install mariadb-server mariadb 
// mariadb数据库的相关命令是：
// systemctl start mariadb  #启动MariaDB
// systemctl stop mariadb  #停止MariaDB
// systemctl restart mariadb  #重启MariaDB
// systemctl enable mariadb  #设置开机启动
验证Mysql安装
mysqladmin --version

// 展示数据库
SHOW DATABASES;

// Mysql安装成功后，默认的root用户密码为空，你可以使用以下命令来创建root用户的密码：
mysqladmin -u root password 'new_password';

// [root@host]# mysqladmin -u root password "new_password";

链接Mysql服务器
mysql -u root -p 
// Enter password:*******

首先，我们需要通过以下命令来检查MySQL服务器是否启动：
// ps -ef | grep mysqld

如果MySql已经启动，以上命令将输出mysql进程列表， 如果mysql未启动，你可以使用以下命令来启动mysql服务器:
root@host# cd /usr/bin
// ./mysqld_safe &

如果你想关闭目前运行的 MySQL 服务器, 你可以执行以下命令:
root@host# cd /usr/bin
// ./mysqladmin -u root -p shutdown
// Enter password: ******


// root@host# mysql -u root -p
Enter password:*******
// mysql> use mysql;
Database changed

// mysql> INSERT INTO user (host, user, password, 
//     select_priv, insert_priv, update_priv) VALUES ('localhost', 'guest', 
//     PASSWORD('guest123'), 'Y', 'Y', 'Y')
Query OK, 1 row affected (0.20 sec)

// mysql> FLUSH PRIVILEGES
Query OK, 1 row affected (0.01 sec)

// mysql>SELECT host, user, password  FROM user WHERE user='guest'
+-----------+---------+------------------+
| host      | user    | password         |
+-----------+---------+------------------+
| localhost | guest | 6f8c114b58f2ce9e |
+-----------+---------+------------------+
1 row in set (0.00 sec)


// 另外一种添加用户的方法为通过SQL的 GRANT(授予) 命令，以下命令会给指定数据库TUTORIALS添加用户 zara ，密码为 zara123 。

// root@host# mysql -u root -p 
Enter password:*******
// mysql> use mysql;
Database changed

mysql> GRANT SELECT,INSERT,UPDATE,DELETE,CREATE,DROP
    -> ON TUTORIALS.*
    -> TO 'zara'@'localhost'
    -> IDENTIFIED BY 'zara123';


    // USE 数据库名 :
选择要操作的Mysql数据库，使用该命令后所有Mysql命令都只针对该数据库。

// SHOW DATABASES: 
列出 MySQL 数据库管理系统的数据库列表。

    // SHOW TABLES:
显示指定数据库的所有表，使用该命令前需要使用 use 命令来选择要操作的数据库。

// SHOW COLUMNS FROM 数据表:
显示数据表的属性，属性类型，主键信息 ，是否为 NULL，默认值等其他信息。

SHOW COLUMNS FROM biao


// SHOW INDEX FROM 数据表:
显示数据表的详细索引信息，包括PRIMARY KEY（主键）。

SHOW INDEX FROM biao

// SHOW TABLE STATUS LIKE [FROM db_name] [LIKE 'pattern'] \G: 
该命令将输出Mysql数据库管理系统的性能及统计信息。
// mysql> SHOW TABLE STATUS  FROM RUNOOB;   # 显示数据库 RUNOOB 中所有表的信息

// mysql> SHOW TABLE STATUS from RUNOOB LIKE 'runoob%';     # 表名以runoob开头的表的信息
// mysql> SHOW TABLE STATUS from RUNOOB LIKE 'runoob%'\G;   # 加上 \G，查询结果按列打印

