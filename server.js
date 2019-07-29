const dgram = require('dgram');

const server = dgram.createSocket('udp4');

server.on('message', ( msg, rinfo ) => {
  console.log('udp服务器获取到信息', msg);
  const utf8msg = msg.toString();
  const BufMsg = Buffer.from('服务器发送信息：' + utf8msg)
  server.send(BufMsg, 0, BufMsg.length, rinfo.port, rinfo.address);
});
server.on('listening', () => {
  const address = server.address();
  console.log('peer:' + address.address + ':' + address.port);
});
server.bind(4000);