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
// ALTER TABLE test_tbl RENAME TO alert_tbl;

索引分单列索引和组合索引。单列索引，即一个索引只包含单个列，一个表可以有多个单列索引，但这不是组合索引。组合索引，即一个索引包含多个列。

创建索引时，你需要确保该索引是应用在	SQL 查询语句的条件(一般作为 WHERE 子句的条件)。
实际上，索引也是一张表，该表保存了主键与索引字段，并指向实体表的记录。
上面都在说使用索引的好处，但过多的使用索引将会造成滥用。因此索引也会有它的缺点：虽然索引大大提高了查询速度，同时却会降低更新表的速度，如对表进行INSERT、UPDATE和DELETE。因为更新表时，MySQL不仅要保存数据，还要保存一下索引文件。
建立索引会占用磁盘空间的索引文件。


普通索引
创建索引
// CREATE INDEX indexName ON mytable(username(length));
如果是CHAR，VARCHAR类型，length可以小于字段实际长度；如果是BLOB和TEXT类型，必须指定 length。

修改表结构(添加索引)
// ALTER table tablename ADD INDEX indexname(cloumnName);

创建表的时候直接指定
// CREATE TABLE mytable(
//     ID INT NOT NULL,
//     usernaem VARCHAR(16) NOT NULL,
//     INDEX [indexName] (username(length))
// )

删除索引的语法
DROP INDEX [indexName] ON mytable;

唯一索引
它与前面的普通索引类似，不同的就是：索引列的值必须唯一，但允许有空值。如果是组合索引，则列值的组合必须唯一。它有以下几种创建方式：

// 创建索引
CREATE UNIQUE INDEX indexName ON mytable(username(length));

// 修改表结构
ALTER table mytable ADD UNIQUE [indexName] (username(length));

创建表的时候直接指定
CREATE TABLE mytable(
    ID INT NOT NULL,
    username VARCHAR(16) NOT NULL,
    UNIQUE [indexName] (username(length)) 
);

// 使用ALTER 命令添加和删除索引

有四种方式来添加数据表的索引：
ALTER TABLE tbl_name ADD PRIMARY KEY (column_list): 该语句添加一个主键，这意味着索引值必须是唯一的，且不能为NULL。
ALTER TABLE tbl_name ADD UNIQUE index_name (column_list): 这条语句创建索引的值必须是唯一的（除了NULL外，NULL可能会出现多次）。
ALTER TABLE tbl_name ADD INDEX index_name (column_list): 添加普通索引，索引值可出现多次。
ALTER TABLE tbl_name ADD FULLTEXT index_name (column_list):该语句指定了索引为 FULLTEXT ，用于全文索引。
以下实例为在表中添加索引。
ALTER TABLE test_tbl ADD INDEX (c);
你还可以在 ALTER 命令中使用 DROP 子句来删除索引。尝试以下实例删除索引:
ALTER TABLE test_tbl DROP INDEX c;

使用 ALTER 命令添加和删除主键
ALTER TABLE test_tbl MODIFY i INT NOT NUll;
ALTER TABLE test_tbl ADD PRIMARY KEY(i);


你也可以使用 ALTER 命令删除主键：

// ALTER TABLE test_tbl DROP PRIMARY KEY;

删除主键时只需指定PRIMARYaidu KEY，但在删除索引时，你必须知道索引名。

显示索引信息
你可以使用 SHOW INDEX 命令来列出表中的相关的索引信息。可以通过添加 \G 来格式化输出信息。
SHOW INDEX FROM table_name; \G


MySQL 临时表
MySQL 临时表在我们需要保存一些临时数据时是非常有用的。临时表只在当前连接可见，当关闭连接时，Mysql会自动删除表并释放所有空间。
CREATE TEMPORARY TABLE SalesSummary (
    product_name VARCHAR(50) NOT NULL,
    total_sales DECIMAL(12,2) NOT NULL DEFAULT 0.00,
    avg_unit_price DECIMAL(7,2) NOT NULL DEFAULT 0.00,
    total_units INT UNSIGNED NOT NULL DEFAULT 0
)
当你使用 SHOW TABLES命令显示数据表列表时，你将无法看到 SalesSummary表。
如果你退出当前MySQL会话，再使用 SELECT命令来读取原先创建的临时表数据，那你会发现数据库中没有该表的存在，因为在你退出时该临时表已经被销毁了。

删除MySQL 临时表
默认情况下，当你断开与数据库的连接后，临时表就会自动被销毁。当然你也可以在当前MySQL会话使用 DROP TABLE 命令来手动删除临时表。
以下是手动删除临时表的实例：

DROP TABLE SalesSummary;

MySQL 复制表
步骤一：
获取数据表的完整结构。
mysql> SHOW CREATE TABLE runoob_tbl \G;
*************************** 1. row ***************************
       Table: runoob_tbl
Create Table: CREATE TABLE `runoob_tbl` (
  `runoob_id` int(11) NOT NULL auto_increment,
  `runoob_title` varchar(100) NOT NULL default '',
  `runoob_author` varchar(40) NOT NULL default '',
  `submission_date` date default NULL,
  PRIMARY KEY  (`runoob_id`),
  UNIQUE KEY `AUTHOR_INDEX` (`runoob_author`)
) ENGINE=InnoDB 
1 row in set (0.00 sec)

ERROR:
No query specified
步骤二：
修改SQL语句的数据表名，并执行SQL语句。
mysql> CREATE TABLE `clone_tbl` (
  -> `runoob_id` int(11) NOT NULL auto_increment,
  -> `runoob_title` varchar(100) NOT NULL default '',
  -> `runoob_author` varchar(40) NOT NULL default '',
  -> `submission_date` date default NULL,
  -> PRIMARY KEY  (`runoob_id`),
  -> UNIQUE KEY `AUTHOR_INDEX` (`runoob_author`)
-> ) ENGINE=InnoDB;
Query OK, 0 rows affected (1.80 sec)
步骤三：
执行完第二步骤后，你将在数据库中创建新的克隆表 clone_tbl。 如果你想拷贝数据表的数据你可以使用 INSERT INTO... SELECT 语句来实现。
INSERT INTO clone_tbl(runoob_id,runoob_title,runoob_author,submission_date) SELECT runoob_id,runoob_title, runoob_author,submission_date FROM runoob_tbl;


MySQL 元数据
你可能想知道MySQL以下三种信息：
查询结果信息： SELECT, UPDATE 或 DELETE语句影响的记录数。
数据库和数据表的信息： 包含了数据库及数据表的结构信息。
MySQL服务器信息： 包含了数据库服务器的当前状态，版本号等。
在MySQL的命令提示符中，我们可以很容易的获取以上服务器信息。 但如果使用Perl或PHP等脚本语言，你就需要调用特定的接口函数来获取。 接下来我们会详细介绍。
获取查询语句影响的记录数
PERL 实例
在 DBI 脚本中， 语句影响的记录数通过函数 do( ) 或 execute( )返回：
# 方法 1
# 使用do( ) 执行  $query 
my $count = $dbh->do ($query);
# 如果发生错误会输出 0
printf "%d 条数据被影响\n", (defined ($count) ? $count : 0);

# 方法 2
# 使用prepare( ) 及 execute( ) 执行  $query 
my $sth = $dbh->prepare ($query);
my $count = $sth->execute ( );
printf "%d 条数据被影响\n", (defined ($count) ? $count : 0);


MySQL 序列使用
MySQL序列是一组整数：1, 2, 3, ...，由于一张数据表只能有一个字段自增主键， 如果你想实现其他字段也实现自动增加，就可以使用MySQL序列来实现。
mysql> CREATE TABLE insect
    -> (
    -> id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    -> PRIMARY KEY (id),
    -> name VARCHAR(30) NOT NULL, # type of insect
    -> date DATE NOT NULL, # date collected
    -> origin VARCHAR(30) NOT NULL # where collected
);
Query OK, 0 rows affected (0.02 sec)
mysql> INSERT INTO insect (id,name,date,origin) VALUES
    -> (NULL,'housefly','2001-09-10','kitchen'),
    -> (NULL,'millipede','2001-09-10','driveway'),
    -> (NULL,'grasshopper','2001-09-10','front yard');
Query OK, 3 rows affected (0.02 sec)
Records: 3  Duplicates: 0  Warnings: 0
mysql> SELECT * FROM insect ORDER BY id;
+----+-------------+------------+------------+
| id | name        | date       | origin     |
+----+-------------+------------+------------+
|  1 | housefly    | 2001-09-10 | kitchen    |
|  2 | millipede   | 2001-09-10 | driveway   |
|  3 | grasshopper | 2001-09-10 | front yard |
+----+-------------+------------+------------+
3 rows in set (0.00 sec)

重置序列
mysql> ALTER TABLE insect DROP id;
mysql> ALTER TABLE insect
    -> ADD id INT UNSIGNED NOT NULL AUTO_INCREMENT FIRST,
    -> ADD PRIMARY KEY (id);


    设置序列的开始值
一般情况下序列的开始值为1，但如果你需要指定一个开始值100，那我们可以通过以下语句来实现：
mysql> CREATE TABLE insect
    -> (
    -> id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    -> PRIMARY KEY (id),
    -> name VARCHAR(30) NOT NULL, 
    -> date DATE NOT NULL,
    -> origin VARCHAR(30) NOT NULL
)engine=innodb auto_increment=100 charset=utf8;
或者你也可以在表创建成功后，通过以下语句来实现：
mysql> ALTER TABLE t AUTO_INCREMENT = 100;

防止表中出现重复数据
你可以在MySQL数据表中设置指定的字段为 PRIMARY KEY（主键） 或者 UNIQUE（唯一） 索引来保证数据的唯一性。


MySQL 处理重复数据
有些 MySQL 数据表中可能存在重复的记录，有些情况我们允许重复数据的存在，但有时候我们也需要删除这些重复的数据。
本章节我们将为大家介绍如何防止数据表出现重复数据及如何删除数据表中的重复数据。
防止表中出现重复数据
你可以在MySQL数据表中设置指定的字段为 PRIMARY KEY（主键） 或者 UNIQUE（唯一） 索引来保证数据的唯一性。
让我们尝试一个实例：下表中无索引及主键，所以该表允许出现多条重复记录。
CREATE TABLE person_tbl
(
    first_name CHAR(20),
    last_name CHAR(20),
    sex CHAR(10)
);
如果你想设置表中字段first_name，last_name数据不能重复，你可以设置双主键模式来设置数据的唯一性， 如果你设置了双主键，那么那个键的默认值不能为NULL，可设置为NOT NULL。如下所示：
CREATE TABLE person_tbl
(
   first_name CHAR(20) NOT NULL,
   last_name CHAR(20) NOT NULL,
   sex CHAR(10),
   PRIMARY KEY (last_name, first_name)
);
如果我们设置了唯一索引，那么在插入重复数据时，SQL语句将无法执行成功,并抛出错。
INSERT IGNORE INTO与INSERT INTO的区别就是INSERT IGNORE会忽略数据库中已经存在的数据，如果数据库没有数据，就插入新的数据，如果有数据的话就跳过这条数据。这样就可以保留数据库中已经存在数据，达到在间隙中插入数据的目的。
以下实例使用了INSERT IGNORE INTO，执行后不会出错，也不会向数据表中插入重复数据：
mysql> INSERT IGNORE INTO person_tbl (last_name, first_name)
    -> VALUES( 'Jay', 'Thomas');
Query OK, 1 row affected (0.00 sec)
mysql> INSERT IGNORE INTO person_tbl (last_name, first_name)
    -> VALUES( 'Jay', 'Thomas');
Query OK, 0 rows affected (0.00 sec)
INSERT IGNORE INTO当插入数据时，在设置了记录的唯一性后，如果插入重复数据，将不返回错误，只以警告形式返回。 而REPLACE INTO into如果存在primary 或 unique相同的记录，则先删除掉。再插入新记录。
另一种设置数据的唯一性方法是添加一个UNIQUE索引，如下所示：
CREATE TABLE person_tbl
(
   first_name CHAR(20) NOT NULL,
   last_name CHAR(20) NOT NULL,
   sex CHAR(10)
   UNIQUE (last_name, first_name)
);
统计重复数据
以下我们将统计表中 first_name 和 last_name的重复记录数：
mysql> SELECT COUNT(*) as repetitions, last_name, first_name
    -> FROM person_tbl
    -> GROUP BY last_name, first_name
    -> HAVING repetitions > 1;
以上查询语句将返回 person_tbl 表中重复的记录数。 一般情况下，查询重复的值，请执行以下操作：
确定哪一列包含的值可能会重复。
在列选择列表使用COUNT(*)列出的那些列。
在GROUP BY子句中列出的列。
HAVING子句设置重复数大于1。
过滤重复数据
如果你需要读取不重复的数据可以在 SELECT 语句中使用 DISTINCT 关键字来过滤重复数据。
mysql> SELECT DISTINCT last_name, first_name
    -> FROM person_tbl;
你也可以使用 GROUP BY 来读取数据表中不重复的数据：
mysql> SELECT last_name, first_name
    -> FROM person_tbl
    -> GROUP BY (last_name, first_name);
删除重复数据
如果你想删除数据表中的重复数据，你可以使用以下的SQL语句：
mysql> CREATE TABLE tmp SELECT last_name, first_name, sex FROM person_tbl  GROUP BY (last_name, first_name, sex);
mysql> DROP TABLE person_tbl;
mysql> ALTER TABLE tmp RENAME TO person_tbl;
当然你也可以在数据表中添加 INDEX（索引） 和 PRIMAY KEY（主键）这种简单的方法来删除表中的重复记录。方法如下：
mysql> ALTER IGNORE TABLE person_tbl
    -> ADD PRIMARY KEY (last_name, first_name);



    MySQL 及 SQL 注入

    MySQL 及 SQL 注入
如果您通过网页获取用户输入的数据并将其插入一个MySQL数据库，那么就有可能发生SQL注入安全的问题。
本章节将为大家介绍如何防止SQL注入，并通过脚本来过滤SQL中注入的字符。
所谓SQL注入，就是通过把SQL命令插入到Web表单递交或输入域名或页面请求的查询字符串，最终达到欺骗服务器执行恶意的SQL命令。
我们永远不要信任用户的输入，我们必须认定用户输入的数据都是不安全的，我们都需要对用户输入的数据进行过滤处理。
以下实例中，输入的用户名必须为字母、数字及下划线的组合，且用户名长度为 8 到 20 个字符之间：
if (preg_match("/^\w{8,20}$/", $_GET['username'], $matches))
{
   $result = mysqli_query($conn, "SELECT * FROM users 
                          WHERE username=$matches[0]");
}
 else 
{
   echo "username 输入异常";
}
让我们看下在没有过滤特殊字符时，出现的SQL情况：
// 设定$name 中插入了我们不需要的SQL语句
$name = "Qadir'; DELETE FROM users;";
 mysqli_query($conn, "SELECT * FROM users WHERE name='{$name}'");
以上的注入语句中，我们没有对 $name 的变量进行过滤，$name 中插入了我们不需要的SQL语句，将删除 users 表中的所有数据。
在PHP中的 mysqli_query() 是不允许执行多个 SQL 语句的，但是在 SQLite 和 PostgreSQL 是可以同时执行多条SQL语句的，所以我们对这些用户的数据需要进行严格的验证。
防止SQL注入，我们需要注意以下几个要点：
1.永远不要信任用户的输入。对用户的输入进行校验，可以通过正则表达式，或限制长度；对单引号和 双"-"进行转换等。
2.永远不要使用动态拼装sql，可以使用参数化的sql或者直接使用存储过程进行数据查询存取。
3.永远不要使用管理员权限的数据库连接，为每个应用使用单独的权限有限的数据库连接。
4.不要把机密信息直接存放，加密或者hash掉密码和敏感的信息。
5.应用的异常信息应该给出尽可能少的提示，最好使用自定义的错误信息对原始错误信息进行包装
6.sql注入的检测方法一般采取辅助软件或网站平台来检测，软件一般采用sql注入检测工具jsky，网站平台就有亿思网站安全平台检测工具。MDCSOFT SCAN等。采用MDCSOFT-IPS可以有效的防御SQL注入，XSS攻击等。
防止SQL注入
在脚本语言，如Perl和PHP你可以对用户输入的数据进行转义从而来防止SQL注入。
PHP的MySQL扩展提供了mysqli_real_escape_string()函数来转义特殊的输入字符。
if (get_magic_quotes_gpc()) 
{
  $name = stripslashes($name);
}
$name = mysqli_real_escape_string($conn, $name);
 mysqli_query($conn, "SELECT * FROM users WHERE name='{$name}'");
Like语句中的注入
like查询时，如果用户输入的值有"_"和"%"，则会出现这种情况：用户本来只是想查询"abcd_"，查询结果中却有"abcd_"、"abcde"、"abcdf"等等；用户要查询"30%"（注：百分之三十）时也会出现问题。
在PHP脚本中我们可以使用addcslashes()函数来处理以上情况，如下实例：
$sub = addcslashes(mysqli_real_escape_string($conn, "%something_"), "%_");
// $sub == \%something\_
 mysqli_query($conn, "SELECT * FROM messages WHERE subject LIKE '{$sub}%'");
addcslashes() 函数在指定的字符前添加反斜杠。
语法格式:
addcslashes(string,characters)
参数	描述
string	必需。规定要检查的字符串。
characters	可选。规定受 addcslashes() 影响的字符或字符范围。



MySQL 导出数据
MySQL中你可以使用SELECT...INTO OUTFILE语句来简单的导出数据到文本文件上。
使用 SELECT ... INTO OUTFILE 语句导出数据
以下实例中我们将数据表 runoob_tbl 数据导出到 /tmp/tutorials.txt 文件中:
mysql> SELECT * FROM runoob_tbl 
    -> INTO OUTFILE '/tmp/tutorials.txt';
你可以通过命令选项来设置数据输出的指定格式，以下实例为导出 CSV 格式：
mysql> SELECT * FROM passwd INTO OUTFILE '/tmp/tutorials.txt'
    -> FIELDS TERMINATED BY ',' ENCLOSED BY '"'
    -> LINES TERMINATED BY '\r\n';
在下面的例子中，生成一个文件，各值用逗号隔开。这种格式可以被许多程序使用。
SELECT a,b,a+b INTO OUTFILE '/tmp/result.text'
FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\n'
FROM test_table;
SELECT ... INTO OUTFILE 语句有以下属性:
LOAD DATA INFILE是SELECT ... INTO OUTFILE的逆操作，SELECT句法。为了将一个数据库的数据写入一个文件，使用SELECT ... INTO OUTFILE，为了将文件读回数据库，使用LOAD DATA INFILE。
SELECT...INTO OUTFILE 'file_name'形式的SELECT可以把被选择的行写入一个文件中。该文件被创建到服务器主机上，因此您必须拥有FILE权限，才能使用此语法。
输出不能是一个已存在的文件。防止文件数据被篡改。
你需要有一个登陆服务器的账号来检索文件。否则 SELECT ... INTO OUTFILE 不会起任何作用。
在UNIX中，该文件被创建后是可读的，权限由MySQL服务器所拥有。这意味着，虽然你就可以读取该文件，但可能无法将其删除。
导出表作为原始数据
mysqldump是mysql用于转存储数据库的实用程序。它主要产生一个SQL脚本，其中包含从头重新创建数据库所必需的命令CREATE TABLE INSERT等。
使用mysqldump导出数据需要使用 --tab 选项来指定导出文件指定的目录，该目标必须是可写的。
以下实例将数据表 runoob_tbl 导出到 /tmp 目录中：
$ mysqldump -u root -p --no-create-info \
            --tab=/tmp RUNOOB runoob_tbl
password ******
导出SQL格式的数据
导出SQL格式的数据到指定文件，如下所示：
$ mysqldump -u root -p RUNOOB runoob_tbl > dump.txt
password ******
以上命令创建的文件内容如下：
-- MySQL dump 8.23
--
-- Host: localhost    Database: RUNOOB
---------------------------------------------------------
-- Server version       3.23.58

--
-- Table structure for table `runoob_tbl`
--

CREATE TABLE runoob_tbl (
  runoob_id int(11) NOT NULL auto_increment,
  runoob_title varchar(100) NOT NULL default '',
  runoob_author varchar(40) NOT NULL default '',
  submission_date date default NULL,
  PRIMARY KEY  (runoob_id),
  UNIQUE KEY AUTHOR_INDEX (runoob_author)
) TYPE=MyISAM;

--
-- Dumping data for table `runoob_tbl`
--

INSERT INTO runoob_tbl 
       VALUES (1,'Learn PHP','John Poul','2007-05-24');
INSERT INTO runoob_tbl 
       VALUES (2,'Learn MySQL','Abdul S','2007-05-24');
INSERT INTO runoob_tbl 
       VALUES (3,'JAVA Tutorial','Sanjay','2007-05-06');
如果你需要导出整个数据库的数据，可以使用以下命令：
$ mysqldump -u root -p RUNOOB > database_dump.txt
password ******
如果需要备份所有数据库，可以使用以下命令：
$ mysqldump -u root -p --all-databases > database_dump.txt
password ******
--all-databases 选项在 MySQL 3.23.12 及以后版本加入。
该方法可用于实现数据库的备份策略。
将数据表及数据库拷贝至其他主机
如果你需要将数据拷贝至其他的 MySQL 服务器上, 你可以在 mysqldump 命令中指定数据库名及数据表。
在源主机上执行以下命令，将数据备份至 dump.txt 文件中:
$ mysqldump -u root -p database_name table_name > dump.txt
password *****
如果完整备份数据库，则无需使用特定的表名称。
如果你需要将备份的数据库导入到MySQL服务器中，可以使用以下命令，使用以下命令你需要确认数据库已经创建：
$ mysql -u root -p database_name < dump.txt
password *****
你也可以使用以下命令将导出的数据直接导入到远程的服务器上，但请确保两台服务器是相通的，是可以相互访问的：</p>
$ mysqldump -u root -p database_name \
       | mysql -h other-host.com database_name



       MySQL 导入数据
       MySQL中可以使用两种简单的方式来导入MySQL导出的数据。
       使用 LOAD DATA 导入数据
       MySQL 中提供了LOAD DATA INFILE语句来插入数据。 以下实例中将从当前目录中读取文件 dump.txt ，将该文件中的数据插入到当前数据库的 mytbl 表中。
       mysql> LOAD DATA LOCAL INFILE 'dump.txt' INTO TABLE mytbl;
       　如果指定LOCAL关键词，则表明从客户主机上按路径读取文件。如果没有指定，则文件在服务器上按路径读取文件。
       你能明确地在LOAD DATA语句中指出列值的分隔符和行尾标记，但是默认标记是定位符和换行符。
       两个命令的 FIELDS 和 LINES 子句的语法是一样的。两个子句都是可选的，但是如果两个同时被指定，FIELDS 子句必须出现在 LINES 子句之前。
       如果用户指定一个 FIELDS 子句，它的子句 （TERMINATED BY、[OPTIONALLY] ENCLOSED BY 和 ESCAPED BY) 也是可选的，不过，用户必须至少指定它们中的一个。
       mysql> LOAD DATA LOCAL INFILE 'dump.txt' INTO TABLE mytbl
         -> FIELDS TERMINATED BY ':'
         -> LINES TERMINATED BY '\r\n';
       LOAD DATA 默认情况下是按照数据文件中列的顺序插入数据的，如果数据文件中的列与插入表中的列不一致，则需要指定列的顺序。
       如，在数据文件中的列顺序是 a,b,c，但在插入表的列顺序为b,c,a，则数据导入语法如下：
       mysql> LOAD DATA LOCAL INFILE 'dump.txt' 
           -> INTO TABLE mytbl (b, c, a);
       使用 mysqlimport 导入数据
       mysqlimport客户端提供了LOAD DATA INFILEQL语句的一个命令行接口。mysqlimport的大多数选项直接对应LOAD DATA INFILE子句。
       从文件 dump.txt 中将数据导入到 mytbl 数据表中, 可以使用以下命令：
       $ mysqlimport -u root -p --local database_name dump.txt
       password *****
       mysqlimport命令可以指定选项来设置指定格式,命令语句格式如下：
       $ mysqlimport -u root -p --local --fields-terminated-by=":" \
          --lines-terminated-by="\r\n"  database_name dump.txt
       password *****
       mysqlimport 语句中使用 --columns 选项来设置列的顺序：
       $ mysqlimport -u root -p --local --columns=b,c,a \
           database_name dump.txt
       password *****
       mysqlimport的常用选项介绍
       选项	功能
       -d or --delete	新数据导入数据表中之前删除数据数据表中的所有信息
       -f or --force	不管是否遇到错误，mysqlimport将强制继续插入数据
       -i or --ignore	mysqlimport跳过或者忽略那些有相同唯一 关键字的行， 导入文件中的数据将被忽略。
       -l or -lock-tables	数据被插入之前锁住表，这样就防止了， 你在更新数据库时，用户的查询和更新受到影响。
       -r or -replace	这个选项与－i选项的作用相反；此选项将替代 表中有相同唯一关键字的记录。
       --fields-enclosed- by= char	指定文本文件中数据的记录时以什么括起的， 很多情况下 数据以双引号括起。 默认的情况下数据是没有被字符括起的。
       --fields-terminated- by=char	指定各个数据的值之间的分隔符，在句号分隔的文件中， 分隔符是句号。您可以用此选项指定数据之间的分隔符。 默认的分隔符是跳格符（Tab）
       --lines-terminated- by=str	此选项指定文本文件中行与行之间数据的分隔字符串 或者字符。 默认的情况下mysqlimport以newline为行分隔符。 您可以选择用一个字符串来替代一个单个的字符： 一个新行或者一个回车。
       mysqlimport命令常用的选项还有-v 显示版本（version）， -p 提示输入密码（password）等。