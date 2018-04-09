// tls 模块是对安全传输层（TLS）及安全套接层（SSL）协议的实现，建立在OpenSSL的基础上。

// SSL(Secure Sockets Layer 安全套接层),及其继任者传输层安全（Transport Layer Security，TLS）是为网络通信提供安全及数据完整性的一种安全协议。TLS与SSL在传输层对网络连接进行加密。

// 安全传输层协议（TLS）用于在两个通信应用程序之间提供保密性和数据完整性。
// 该协议由两层组成： TLS 记录协议（TLS Record）和 TLS 握手协议（TLS Handshake）。


// 用于生成https证书用的

// TLS/SSL是public/private key infrastructure (PKI).大部分情况下，每个服务器和客户端都应该有一个私钥。

// 私钥能有多种生成方式，下面举一个例子。 用OpenSSL的命令行来生成一个2048位的RSA私钥：

// openssl genrsa -out ryans-key.pem 2048
// 通过TLS/SSL,所有的服务器（和一些客户端）必须要一个证书。 证书是相似于私钥的公钥,它由CA或者私钥拥有者数字签名，特别地，私钥拥有者所签名的被称为自签名。 获取证书的第一步是生成一个证书申请文件（CSR)

// 用OpenSSL能生成一个私钥的CSR文件：

// openssl req -new -sha256 -key ryans-key.pem -out ryans-csr.pem
// CSR文件被生成以后，它既能被CA签名也能被用户自签名。 用OpenSSL生成一个自签名证书的命令如下：

// openssl x509 -req -in ryans-csr.pem -signkey ryans-key.pem -out ryans-cert.pem
// 证书被生成以后，它又能用来生成一个.pfx或者.p12文件：

// openssl pkcs12 -export -in ryans-cert.pem -inkey ryans-key.pem \
//       -certfile ca-cert.pem -out ryans.pfx
// 命令行参数:

// in: 被签名的证书
// inkey: 有关的私钥
// certfile: 签入文件的证书串，比如： cat ca1-cert.pem ca2-cert.pem > ca-cert.pem