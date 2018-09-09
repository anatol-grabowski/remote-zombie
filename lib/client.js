const WebSocket = require('ws')

const url = process.argv[2] || 'ws://localhost:8080'
const ws = new WebSocket(url)
 
ws.on('open', function open() {
  ws.send('something')
})

ws.on('message', function incoming(data) {
  console.log(data)
})