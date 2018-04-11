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

// 以下命令简单的演示了创建数据库的过程，数据名为 RUNOOB:

mysqladmin -u root -p create RUNOOB

// 删除数据库：
mysqladmin -u root -p drop RUNOOB

MySQL 数据类型

以下为创建MySQL数据表的SQL通用语法：
CREATE TABLE table_name (cloumn_nam column_type);


// 以下例子中我们将在 RUNOOB 数据库中创建数据表runoob_tbl
CREATE TABLE IF NOT EXISTS `runoob_tbl`(
    `run_id` INT UNSIGNED AUTO_INCREMENT,
    `run_title` VARCHAR(100) NOT NULL,
    `run_author` VARCHAR(40) NOT NULL,
    `sub_data` DATE,
    PRIMARY KEY (``run_id)
)ENGINE=InnoDB DEFAULT CHARSET = utf8;

// 实例解析：
// 如果你不想字段为 NULL 可以设置字段的属性为 NOT NULL， 在操作数据库时如果输入该字段的数据为NULL ，就会报错。
// AUTO_INCREMENT定义列为自增的属性，一般用于主键，数值会自动加1。
// PRIMARY KEY关键字用于定义列为主键。 您可以使用多列来定义主键，列间以逗号分隔。
// ENGINE 设置存储引擎，CHARSET 设置编码。

// 以下为删除MySQL数据表的通用语法：
DROP TABLE table_name;


// 以下为向MySQL数据表插入数据通用的 INSERT INTO SQL语法：
INSERT INTO table_name(field1, field2,..filedN) VALUES (value1, value2,..valueN)

INSERT INTO tun_bl (tun_id, run_author, run_date) VALUES ('1', 'hsir', new Date())

读取数据表：
// SELECT * from run_tbl;

// 以下为在MySQL数据库中查询数据通用的 SELECT 语法：
SELECT column_name,column_name FROM table_name [WHERE Clause] [LIMIT N][OFFSET M]
// 查询语句中你可以使用一个或者多个表，表之间使用逗号(,)分割，并使用WHERE语句来设定查询条件。
// SELECT 命令可以读取一条或者多条记录。
// 你可以使用星号（*）来代替其他字段，SELECT语句会返回表的所有字段数据
// 你可以使用 WHERE 语句来包含任何条件。
// 你可以使用 LIMIT 属性来设定返回的记录数。
// 你可以通过OFFSET指定SELECT语句开始查询的数据偏移量。默认情况下偏移量为0。



// 以下是 SQL SELECT 语句使用 WHERE 子句从数据表中读取数据的通用语法：
SELECT field1,filed2,..filedN FROM table_mame1,table_name2...table_nameN [WHERE condition1[AND[OR]] condition2]

MySQL 的 WHERE 子句的字符串比较是不区分大小写的。 你可以使用 BINARY 关键字来设定 WHERE 子句的字符串比较是区分大小写的。
// SELECT * FROM run_tbl WHERE BINARY tun_id = '12'

如果我们需要修改或更新 MySQL 中的数据，我们可以使用 SQL UPDATE 命令来操作。.
// UPDATE table_name SET feild = new-values1, filed2 = new-values2;


你可以同时更新一个或多个字段。
你可以在 WHERE 子句中指定任何条件。
你可以在一个单独表中同时更新数据。

// UPDATE run_tbl set run_title="hsir" WHERE run_id=3

你可以使用 SQL 的 DELETE FROM 命令来删除 MySQL 数据表中的记录。

DELETE FROM table_mame [WHERE clause]

// 如果没有指定 WHERE 子句，MySQL 表中的所有记录将被删除。
// 你可以在 WHERE 子句中指定任何条件
// 您可以在单个表中一次性删除记录。

DELETE FROM run_tbl WHERE run_id=3;

// 我们知道在 MySQL 中使用 SQL SELECT 命令来读取数据， 同时我们可以在 SELECT 语句中使用 WHERE 子句来获取指定的记录。
// WHERE 子句中可以使用等号 = 来设定获取数据的条件，如 "runoob_author = 'RUNOOB.COM'"。
// 但是有时候我们需要获取 runoob_author 字段含有 "COM" 字符的所有记录，这时我们就需要在 WHERE 子句中使用 SQL LIKE 子句。
// SQL LIKE 子句中使用百分号 %字符来表示任意字符，类似于UNIX或正则表达式中的星号 *。
// 如果没有使用百分号 %, LIKE 子句与等号 = 的效果是一样的。

SELECT field1, field2,..fieldN FROM table_mame WHERE field1 LIKE condition1 [AND [OR]] filed2 = 'somevalue'

// 你可以在 WHERE 子句中指定任何条件。
// 你可以在 WHERE 子句中使用LIKE子句。
// 你可以使用LIKE子句代替等号 =。
// LIKE 通常与 % 一同使用，类似于一个元字符的搜索。
// 你可以使用 AND 或者 OR 指定一个或多个条件。
// 你可以在 DELETE 或 UPDATE 命令中使用 WHERE...LIKE 子句来指定条件。

SELECT * FROM run_tbl WHERE run_author LIKE '%COM';

// MySQL UNION 操作符用于连接两个以上的 SELECT 语句的结果组合到一个结果集合中。多个 SELECT 语句会删除重复的数据。