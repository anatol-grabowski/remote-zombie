const WebSocket = require('ws')
const { connections } = require('../connections')

const wss = new WebSocket.Server({noServer: true});

wss.on('connection', (ws) => {
  connections.push({
    ws,
    date: new Date(),
    messages: [],
  })

  ws.on('message', (message) => {
    console.log('received: %s', message)
    const conn = connections.find(conn => conn.ws === ws)
    conn.messages.push({
      message,
      date: new Date(),
    })
  })
  ws.send('something conn')
})

module.exports.wsServer = wss