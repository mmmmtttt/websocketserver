// app.js

// Setup basic express server
const express = require('express');
const path = require('path');
const http = require('http')
const port = process.env.PORT || 8080; // default port: 3000

const socket = require('socket.io')

const app = express();
const server = http.createServer(app) // use express to handle http server
const io = socket(server);

server.listen(port, () => {
  console.log('Server listening at port %d', port);
});

io.on("connection", (socket) => {
  username = socket.handshake.query.username
  resp = JSON.stringify({username:username,message: `${username} has joined.`})
  console.log('[connect]',resp)
  io.emit('join',resp)

  socket.on('disconnect',()=>{
    resp = JSON.stringify({username:username,message: `${username} has left.`})
    console.log('[disconnect]',resp)
    io.emit('leave',resp)
  })

  socket.on('message',(msg)=>{
    resp = JSON.stringify(msg);
    console.log(`[message]`,resp)
    io.emit('message',resp)
  })
});