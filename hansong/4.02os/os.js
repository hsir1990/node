// os 模块提供了一些基本的系统操作函数


// hostname() 
// 返回操作系统的默认临时文件夹。
// loadavg() 
// 返回一个包含 1、5、15 分钟平均负载的数组。
// uptime() 
// 返回操作系统运行的时间，以秒为单位。
// freemem() 
// 返回操作系统空闲内存量，单位是字节
// totalmem() 
// 返回系统内存总量，单位为字节
// cpus() 
// 返回一个对象数组，包含所安装的每个 CPU/内核的信息：型号、速度（单位 MHz）、时间（一个包含 user、nice、sys、idle 和 irq 所使用 CPU/内核毫秒数的对象）。IRQ全称为Interrupt Request，即是“中断请求”的意思
// type() 
// 返回操作系统类型，例如 ‘Windows_NT’、’Linux’
// release() 
// 返回操作系统的发行版本。
// networkInterfaces(); 
// 获得网络接口列表，包括地址、掩码、协议族、mac地址、是否是内部环回地址
// homedir() 
// 返回操作系统的家目录（或称库目录）。
// userInfo() 
// 返回当前用户的信息，包括组Id、用户Id、用户名、家目录、脚本地址
// arch() 
// 返回操作系统 CPU 架构，可能的值有 “x64”、”arm” 和 “ia32”。
// platform() 
// 返回操作系统类型，例如 ‘Win32’、’linux’
// tmpdir() 
// 返回操作系统的默认临时文件夹。
// tmpDir() 
// 返回操作系统的默认临时文件夹。
// EOL 
// 返回操作系统的行结束符
// endianness() 
// 返回 CPU 的字节序，可能的是 “BE” 或 “LE”。即大端或小端


os.hostname();
 //输出 chenjia2014-PC
 os.loadavg();
 //输出 [ 0, 0, 0 ]
 os.uptime();
 //输出 7255.5505673
 os.freemem();
 //输出 3853164544
 os.totalmem();
 //输出 6407995392
 os.cpus();
 /* 
 输出
 [ { model: 'Intel(R) Pentium(R) CPU G2030 @ 3.00GHz',
     speed: 2993,
     times: { user: 1150850, nice: 0, sys: 242799, idle: 5946882, irq: 22479 } }, 
     { model: 'Intel(R) Pentium(R) CPU G2030 @ 3.00GHz',
     speed: 2993,
     times: { user: 1103909, nice: 0, sys: 198620, idle: 6037628, irq: 3057} ]
*/
os.type();
//输出 'Windows_NT'
os.release();
//输出 '6.1.7601'
os.networkInterfaces();
/*
输出
{ '本地连接':
    [ { address: '192.168.1.102',
        netmask: '255.255.255.0',
        family: 'IPv4',
        mac: 'd8:50:e6:c2:bc:47',
        internal:false} ],
  'VirtualBox Host-Only Network':
     [ { address: '169.254.62.210',
         netmask: '255.255.0.0',
         family: 'IPv4',
         mac: '0a:00:27:00:00:14
         internal: false } ],
  'Loopback Pseudo-Interface 1'
     [ { address: '::1',
         netmask: 'ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff',
         family: 'IPv6',
         mac: '00:00:00:00:00:00',
         scopeid: 0,
         internal: true },
       { address: '127.0.0.1',
         netmask: '255.0.0.0',
         family: 'IPv4',
         mac: '00:00:00:00:00:00',
         internal: true } ],
    'Teredo Tunneling Pseudo-Interface':
     [ { address: '2001:0:d362:
         netmask: 'ffff:ffff:ff
         family: 'IPv6',
         mac: '00:00:00:00:00:0
         scopeid: 0,
         internal: false },
       { address: 'fe80::189d:3
         netmask: 'ffff:ffff:ff
         family: 'IPv6',
         mac: '00:00:00:00:00:0
         scopeid: 12,
         internal: false } ] }
*/
os.homedir();
//输出 'C:\\Users\\chenjia2014'
os.userInfo();
/*
输出
{ uid: -1,
  gid: -1,
  username: 'chenjia2014',
  homedir: 'C:\\Users\\chenjia2014',
  shell: null }
*/
os.arch();
//输出 'x64'
os.platform();
//输出 'win32'
os.tmpdir();
//输出 'C:\\Users\\CHENJI~1\\AppData\\Local\\Temp'
os.tmpDir();
//输出 'C:\\Users\\CHENJI~1\\AppData\\Local\\Temp'
os.EOL;
//输出 '\r\n'
os.endianness();
//输出 'LE'
