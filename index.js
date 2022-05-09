const express = require('express')
const app = express()
const server = require('http').createServer(app);
const WebSocket = require('ws');

//Establishing server - waiting for client connection, can send to client and log recieved messages in server;
const wss = new WebSocket.Server({ server:server });

//In HTTP, we can only wait for particular requests
//In web sockets, we can respond whenever and also wait for particular requests
//Unlike HTTP, web sockets have continous communciation without requests from client to server
wss.on('connection', function connection(ws) {
  console.log('A new client Connected!');
  ws.send('Welcome New Client!');

  ws.on('message', function incoming(message) {
    console.log('received: %s', message);

    //Sends messages from server to all connected clients by checking if client is not the one who sent the message - send message to all other clients
    //Basically a Group Chat
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
    
  });
});

app.get('/', (req, res) => res.send('Hello World!'))

server.listen(3000, () => console.log(`Lisening on port :3000`))
