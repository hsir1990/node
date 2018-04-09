// crypto 模块提供了加密功能，包含对 OpenSSL 的哈希、HMAC、加密、解密、签名、以及验证功能的一整套封装。

const crypto = require('crypto');
// 首先一如crypto模块项目中；
const secret = 'abcdf';
// 随手写一段明文字符串，保存到常量secret中。
const hash = crypto.createHmac('sha256', secret).update('I love cupcakes').digest('hex');//我们首先调用crypto模块中的createHmac()方法，通过sha256算法对明文进行哈希化。//在更新之后，我们将更新的内容的进行十六进制的消化吸收
console.log(hash);//c0fa1bc00531bd78ef38c628449c5102aeabd49b5dc3a2a516ea6ea959d6658e



// 证书

// 所谓SPKAC就是网景内核原生中的一个证明签字请求机制。如今已经正式成为HTML5的注册机元素（HTML5’s keygen element.）中的一部分。

// crypto模块使用SPKAC数据提供证书类。大多数场景下用于处理由HTML5 元素生成的输入，NodeJS在其内部安装使用OpenSSL`s SPKAC。

// 新建证书

// 我们通过使用new关键字或者调用crypto.Certificate()方法实例化一个证书类型。

const crypto = require('crypto');

const cert1 = new crypto.Certificate();

const sert2 = crypto.Certificate();

// Certificate.exportChallenge(spkac);
// spkac 数据结构包含了一个公钥和一个质询。certificate.exportChallenge()方法在nodeJS的Buffer表单中返回质询元素。spkac的参数要么是一个字符串要么就是一个Buffer.

const cert = require('crypto').Certificate();

const spkac = getSpkacSomehow();

const challenge = sert.exportChallenge(spkac);

console.log(challenge.toString('utf8'));

// Certificate.exportPublicKey(spkac)
// 正如上节所述，spkac数据结构是包含一个公钥的，那么返回公钥的方法就是 
// certificate.exportPublicKey(spkac)；

const cert = require('crypto').Certificate();

const spkac = getSpkacSomehow();

const publicKey = sert.exportPublicKey(spkac);

console.log(publicKey);
// Prints: the public key as <Buffer ...>

// Certificate.verifySpkac(spkac)
// 如果返回的被赋予的spkac数据结构是有效的，那么返回值则为true，反之false.

const cert = require('crypto').Certificate();
const spkac = getSpkacSomehow();
console.log(cert.verifySpkac(Buffer.from(spkac)));
// Prints: true or false


// Cipher加密

// cipher类实例化后会被译成数据，该类往往用于以下两种情况： 
// 1.作为一个流式文件它可读可写。一个简单的未编译的数据会被写入到可读端，并生成 
// 编译数据。 
// 2.使用cipher.update()和cipher.final()两种方法直接生成编译数据。

// crypto.createCiper()或者cryto.createCipheriv()方法用于创建Cipher实例化对象。一定要注意，使用new关键字是没办法直接创建一个Cipher对象的。

// 我们来看下面这段代码：

const crypto = require('crypto');
const cipher = crypto.createCipher('aes192', 'a password');
//使用aes192对称加密算法，将‘a password’这段明文进行加密
var encrypted = '';
cipher.on('readable', () => {
  var data = cipher.read();
  if (data)
    encrypted += data.toString('hex');
});
cipher.on('end', () => {
  console.log(encrypted);
  // Prints: ca981be48e90867604588e75d04feabb63cc007a8f8ad89b10616ed84d815504
});

cipher.write('some clear text data');
cipher.end();