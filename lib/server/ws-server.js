const WebSocket = require('ws')

const wss = new WebSocket.Server({noServer: true});

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    console.log('received: %s', message)
  })
  ws.send('something conn')
})

module.exports = wss