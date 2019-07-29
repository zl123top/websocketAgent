#!/usr/bin/env node
const dgram = require('dgram');
const net = require('net');

// const host = process.argv[2];
// const port = parseInt(process.argv[3], 10);
// const client = dgram.createSocket('udp4');

// process.stdin.resume();

// process.stdin.on('data', data => {
//   client.send(data, 0, data.length, port, host);
// });

// client.on('message', (msg, rinfo) => {

//   console.log('客户端收到消息：',msg.toString());
// });
const server = net.createServer(soc => {
  let state = 0;
  soc.on('data', data => {
    let buf, remote, _url, _len, _buf,len;
    console.log('收到客户端数据：',data);
    if (state === 0) {
      buf = Buffer.from('\u0005\u0000');
      console.log('第一次返回给socks5客户端验证:', buf);
      soc.write(buf);
      state = 1;
    } else if (state === 1) {
      len = data[4];
      rass = data.slice(5, -2).toString();
      rport = data.slice(-2).readUInt16BE(0);
      
      buf = Buffer.alloc(10);
      buf.write("\u0005\u0000\u0000\u0001", 0, 4, "binary");
      buf.write("\u0000\u0000\u0000\u0000", 4, 4, "binary");
      buf.writeInt16BE(1080, 8);
      console.log('第二次返回给客户端正确的验证', buf);
      soc.write(buf);
      state = 4;
    } else if (state === 4){
      remote = net.connect(rport, rass, () => {
        console.log('连接百度成功');
        state = 5;
      });
      remote.on("data", function (inf) {
        console.log('百度返回tcp:', inf.toString('binary'));
        //拼接socks5头
        // soc.write(Buffer.concat([_front, data]));
        soc.write(inf);
      });
      remote.on('error', () => {
        console.log('发送给百度错误');
      })
      console.log('开始发送百度:', data.toString('binary'));
      remote.write(data);
    } else if(state === 5) {
      try {
        // buf = Buffer.from('哈哈哈');
        // console.log('要发送的buf是：');
        // soc.write(buf);
        console.log('第二次开始发送百度:', data.toString('binary'));
        remote.write(data);
      } catch (e) {
        // soc.pause();
      }
    }
    
    
  })
  soc.on('error', () => {

  })
  
});
server.listen(1080)

// console.log('start at ', host ,port)
