const WebSocket = require('ws')

const url = process.argv[2] || 'ws://localhost:8080'
const ws = new WebSocket(url)
 
ws.on('open', () => {
  ws.send('something')
})

ws.on('message', (data) => {
  console.log(data)
})