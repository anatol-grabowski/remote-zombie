const WebSocket = require('ws')
const { connections } = require('../connections')
const { default: Connection } = require('./connection')

const wssOptions = { noServer: true }
const wss = new WebSocket.Server(wssOptions);

wss.on('connection', (ws) => {
  const connection = new Connection(ws)
  connections.push({
    ws,
    date: new Date(),
    messages: [],
  })
  ws.send('pwd')

  ws.on('message', (message) => {
    console.log('received: %s', message)
    const conn = connections.find(conn => conn.ws === ws)
    conn.messages.push({
      message,
      date: new Date(),
    })
  })
})

module.exports = wss
