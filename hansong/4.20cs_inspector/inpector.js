// 该inspector模块提供了一个用于与V8检查员交互的API。
inspector.open（[port [，host [，wait]]]）

// 在主机和端口上激活检查器。等同于node --inspect=[[host:]port]，但可以在节点启动后以编程方式完成。

// 如果等待true，将阻塞，直到客户端连接到检查端口并且流量控制已传递给调试器客户端。