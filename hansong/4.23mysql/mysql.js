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
SELECT expression1, expression2,...expression_n FROM tables [WHERE conditions] UNION [ALL | DISTINCT] SELECT expression1,expression2,...expression_n FROM tables [WHERE conditions];

// expression1, expression2, ... expression_n: 要检索的列。
// tables: 要检索的数据表。
// WHERE conditions: 可选， 检索条件。
// DISTINCT: 可选，删除结果集中重复的数据。默认情况下 UNION 操作符已经删除了重复数据，所以 DISTINCT 修饰符对结果没啥影响。
// ALL: 可选，返回所有结果集，包含重复数据。

下面的 SQL 语句从 "Websites" 和 "apps" 表中选取所有不同的country（只有不同的值）：
// SELECT country FROM Websites UNION SELECT country ORDER BY country;

下面的 SQL 语句使用 UNION ALL 从 "Websites" 和 "apps" 表中选取所有的country（也有重复的值）：
// SELECT country FROM Websites UNION ALL SELECT country FROM apps ORDER BY country;

下面的 SQL 语句使用 UNION ALL 从 "Websites" 和 "apps" 表中选取所有的中国(CN)的数据（也有重复的值）：
// SELECT country,name FROM Websites WHERE country = 'CN' UNION ALL SELECT country,app_name FROM apps WHERE country = 'CN' ORDER BY county


// 我们知道从 MySQL 表中使用 SQL SELECT 语句来读取数据。
// 如果我们需要对读取的数据进行排序，我们就可以使用 MySQL 的 ORDER BY 子句来设定你想按哪个字段哪种方式来进行排序，再返回搜索结果。
SELECT field1,field2  table_name1 table_name2 ORDER BY field1,[field2] [ASC[DESC]];
// 你可以使用任何字段来作为排序的条件，从而返回排序后的查询结果。
// 你可以设定多个字段来排序。
// 你可以使用 ASC 或 DESC 关键字来设置查询结果是按升序或降序排列。 默认情况下，它是按升序排列。
// 你可以添加 WHERE...LIKE 子句来设置条件。

SELECT * from run_tbl ORDER BY sub_date ASC

SELECT * FROM run_tbl ORDER BY sub_date DESC;

GROUP BY 语句根据一个或多个列对结果集进行分组。
在分组的列上我们可以使用 COUNT, SUM, AVG,等函数
// SELECT column_name, function(column_name) FROM table_name WHERE column_name operator calue GROUP BY column_name;

我们使用 GROUP BY 语句 将数据表按名字进行分组，并统计每个人有多少条记录

SELECT name,COUNT(*) FROM run_tcl GROUP BY name; 

INNER JOIN（内连接,或等值连接）：获取两个表中字段匹配关系的记录。
LEFT JOIN（左连接）：获取左表所有记录，即使右表没有对应匹配的记录。
RIGHT JOIN（右连接）： 与 LEFT JOIN 相反，用于获取右表所有记录，即使左表没有对应匹配的记录。
// SELECT a.run_id,a.run_author,b.run_count FROM run_tbla INNER JOIN run_tblb ON a.run_author = b.run_author;

// SELECT a.run_id, a.run_author,b.run_count FROM run_tbl1 LEFT JOIN run_tblb ON a.run_author = b.run_author;

// SELECT a.run_id, a.run_author,b.run_count FROM run_tbl1 RIGHT JOIN run_tbl2 ON a.run_author = b.run_author;


IS NULL: 当列的值是 NULL,此运算符返回 true。
IS NOT NULL: 当列的值不为 NULL, 运算符返回 true。
<=>: 比较操作符（不同于=运算符），当比较的的两个值为 NULL 时返回 true。
关于 NULL 的条件比较运算是比较特殊的。你不能使用 = NULL 或 != NULL 在列中查找 NULL 值 。


// SELECT * FROM tun_tbl WHERE run_name IS NULL
// SELECT * FROM run_tbl WHERE run_name IS NOT NULL

// MySQL 正则表达式

查找name字段中以'st'为开头的所有数据：
// SELECT * FROM run_tbl WHERE name REGEXP '^st';
查找name字段中以'ok'为结尾的所有数据：
// SELECT * FROM run_tbl WHERE name REGEXP 'ok$'；
查找name字段中包含'mar'字符串的所有数据：
// SELECT * FROM run_tbl WHERE name REGEXP 'mar';
查找name字段中以元音字符开头或以'ok'字符串结尾的所有数据：
// SELECT  * FROM run_tbl WHERE name REGEXP '^[aeiou]|ok$'

① select * from table limit 2,1;                 

//含义是跳过2条取出1条数据，limit后面是从第2条开始读，读取1条信息，即读取第3条数据

② select * from table limit 2 offset 1;      

//含义是从第1条（不包括）数据开始取出2条数据，limit后面跟的是2条数据，offset后面是从第1条开始读取，即读取第2,3条

// MySQL 事务
MySQL 事务主要用于处理操作量大，复杂度高的数据。比如说，在人员管理系统中，你删除一个人员，你即需要删除人员的基本资料，也要删除和该人员相关的信息，如信箱，文章等等，这样，这些数据库操作语句就构成一个事务！


BEGIN或START TRANSACTION；显式地开启一个事务；
COMMIT；也可以使用COMMIT WORK，不过二者是等价的。COMMIT会提交事务，并使已对数据库进行的所有修改称为永久性的；
ROLLBACK；有可以使用ROLLBACK WORK，不过二者是等价的。回滚会结束用户的事务，并撤销正在进行的所有未提交的修改；
SAVEPOINT identifier；SAVEPOINT允许在事务中创建一个保存点，一个事务中可以有多个SAVEPOINT；
RELEASE SAVEPOINT identifier；删除一个事务的保存点，当没有指定的保存点时，执行该语句会抛出一个异常；
ROLLBACK TO identifier；把事务回滚到标记点；
SET TRANSACTION；用来设置事务的隔离级别。InnoDB存储引擎提供事务的隔离级别有READ UNCOMMITTED、READ COMMITTED、REPEATABLE READ和SERIALIZABLE。




1、用 BEGIN, ROLLBACK, COMMIT来实现
BEGIN 开始一个事务
ROLLBACK 事务回滚
COMMIT 事务确认
2、直接用 SET 来改变 MySQL 的自动提交模式:
SET AUTOCOMMIT=0 禁止自动提交
SET AUTOCOMMIT=1 开启自动提交



mysql> use RUNOOB;
Database changed
mysql> CREATE TABLE runoob_transaction_test( id int(5)) engine=innodb;  # 创建数据表
Query OK, 0 rows affected (0.04 sec)
 
mysql> select * from runoob_transaction_test;
Empty set (0.01 sec)
 
mysql> begin;  # 开始事务
Query OK, 0 rows affected (0.00 sec)
 
mysql> insert into runoob_transaction_test value(5);
Query OK, 1 rows affected (0.01 sec)
 
mysql> insert into runoob_transaction_test value(6);
Query OK, 1 rows affected (0.00 sec)
 
mysql> commit; # 提交事务
Query OK, 0 rows affected (0.01 sec)
 
mysql>  select * from runoob_transaction_test;
+------+
| id   |
+------+
| 5    |
| 6    |
+------+
2 rows in set (0.01 sec)
 
mysql> begin;    # 开始事务
Query OK, 0 rows affected (0.00 sec)
 
mysql>  insert into runoob_transaction_test values(7);
Query OK, 1 rows affected (0.00 sec)
 
mysql> rollback;   # 回滚
Query OK, 0 rows affected (0.00 sec)
 
mysql>   select * from runoob_transaction_test;   # 因为回滚所以数据没有插入
+------+
| id   |
+------+
| 5    |
| 6    |
+------+
2 rows in set (0.01 sec)
 
mysql>



当我们需要修改数据表名或者修改数据表字段时，就需要使用到MySQL ALTER命令。

开始本章教程前让我们先创建一张表，表名为：testalter_tbl。

root@host# mysql -u root -p password;
Enter password:*******
mysql> use RUNOOB;
Database changed
mysql> create table testalter_tbl
    -> (
    -> i INT,
    -> c CHAR(1)
    -> );
Query OK, 0 rows affected (0.05 sec)
mysql> SHOW COLUMNS FROM testalter_tbl;
+-------+---------+------+-----+---------+-------+
| Field | Type    | Null | Key | Default | Extra |
+-------+---------+------+-----+---------+-------+
| i     | int(11) | YES  |     | NULL    |       |
| c     | char(1) | YES  |     | NULL    |       |
+-------+---------+------+-----+---------+-------+
2 rows in set (0.00 sec)

// 如下命令使用了 ALTER 命令及 DROP 子句来删除以上创建表的 i 字段：
ALTER TABLE testalter_tbl DROP i;

// MySQL 中使用 ADD 子句来向数据表中添加列，如下实例在表 testalter_tbl 中添加 i 字段，并定义数据类型:
ALTER TABLE testalter_tbl ADD i INT;


// 如果你需要指定新增字段的位置，可以使用MySQL提供的关键字 FIRST (设定位第一列)， AFTER 字段名（设定位于某个字段之后）。
// 尝试以下 ALTER TABLE 语句, 在执行成功后，使用 SHOW COLUMNS 查看表结构的变化：
删除，添加或修改表字段
ALTER TABLE test_tbl DROP i;
ALTER TABLE test_tbl ADD i INT FIRST;

ALTER TABLE test_tbl DROP i;
ALTER TABLE test_tbl ADD i INT AFTER c;
FIRST 和 AFTER 关键字只占用于 ADD 子句，所以如果你想重置数据表字段的位置就需要先使用 DROP 删除字段然后使用 ADD 来添加字段并设置位置。

修改字段类型及名称
如果需要修改字段类型及名称, 你可以在ALTER命令中使用 MODIFY 或 CHANGE 子句 。
例如，把字段 c 的类型从 CHAR(1) 改为 CHAR(10)，可以执行以下命令:

// ALTER TABLE test_tbl MODIFY c CHAR(10);

使用 CHANGE 子句, 语法有很大的不同。 在 CHANGE 关键字之后，紧跟着的是你要修改的字段名，然后指定新字段名及类型。尝试如下实例：

// ALTER TABLE test_tbl CHANGE i j BIGINT;
// ALTER TABLE test_tbl CHANGE j j INT;

ALTER TABLE 对 Null 值和默认值的影响


当你修改字段时，你可以指定是否包含只或者是否设置默认值。
以下实例，指定字段 j 为 NOT NULL 且默认值为100 。

// ALTER TABLE test_tbl MODIFY j BIGINT NOT NULL DEFAULT 1000;


修改字段默认值
你可以使用 ALTER 来修改字段的默认值，尝试以下实例：
ALTER TABLE test_tbl ALTER i SET DEFAULT 1000;
SHOW COLUMUNS FROM test_tbl;
+-------+---------+------+-----+---------+-------+
| Field | Type    | Null | Key | Default | Extra |
+-------+---------+------+-----+---------+-------+
| c     | char(1) | YES  |     | NULL    |       |
| i     | int(11) | YES  |     | 1000    |       |
+-------+---------+------+-----+---------+-------+
2 rows in set (0.00 sec)

你也可以使用 ALTER 命令及 DROP子句来删除字段的默认值，如下实例：
mysql> ALTER TABLE test_tbl ALTER i DROP DEFAULT;
mysql> SHOW COLUMNS FROM testalter_tbl;
+-------+---------+------+-----+---------+-------+
| Field | Type    | Null | Key | Default | Extra |
+-------+---------+------+-----+---------+-------+
| c     | char(1) | YES  |     | NULL    |       |
| i     | int(11) | YES  |     | NULL    |       |
+-------+---------+------+-----+---------+-------+
2 rows in set (0.00 sec)
Changing a Table Type:

修改数据表类型，可以使用 ALTER 命令及 TYPE 子句来完成。尝试以下实例，我们将表 testalter_tbl 的类型修改为 MYISAM ：
注意：查看数据表类型可以使用 SHOW TABLE STATUS 语句。
// mysql> ALTER TABLE test_tbl ENGINE=MYISAM;
// mysql>  SHOW TABLE STATUS LIKE 'testalter_tbl'\G
*************************** 1. row ****************
           Name: testalter_tbl
           Type: MyISAM
     Row_format: Fixed
           Rows: 0
 Avg_row_length: 0
    Data_length: 0
Max_data_length: 25769803775
   Index_length: 1024
      Data_free: 0
 Auto_increment: NULL
    Create_time: 2007-06-03 08:04:36
    Update_time: 2007-06-03 08:04:36
     Check_time: NULL
 Create_options:
        Comment:
1 row in set (0.00 sec)

修改表名
如果需要修改数据表的名称，可以在 ALTER TABLE 语句中使用 RENAME 子句来实现。
尝试以下实例将数据表 testalter_tbl 重命名为 alter_tbl：
ALTER TABLE test_tbl RENAME TO alert_tbl;

