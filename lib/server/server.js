const http = require('http')
const { httpServer } = require('./http-server')
const { wsServer } = require('./ws-server')

const port = process.env.PORT || 8080
const server = http.createServer()
server.listen(port, () => {
  console.log(`server listening on ${port}`)
})


server.on('upgrade', (request, socket, head) => {
  wsServer.handleUpgrade(request, socket, head, (ws) => {
    wsServer.emit('connection', ws, request)
  })
})
server.on('request', httpServer)