const WebSocket = require('ws')
const { connections } = require('../connections')

const wssOptions = { noServer: true }
const wss = new WebSocket.Server(wssOptions);

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
  ws.send('pwd')
})

module.exports = wss
