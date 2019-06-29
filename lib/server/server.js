const http = require('http')
const httpServer = require('./http-server')
const wsServer = require('./ws-server')
const getOwnIps = require('../utils/get-own-ip');

const port = process.env.PORT || 8080
const server = http.createServer()
server.listen(port, () => {
  const ownIps = getOwnIps()
  const lines = ownIps
    .map(ip => `  http://${ip}:${port}/\t\tws://${ip}:${port}/`)
  const msg = `Server is available at:\n${lines.join('\n')}`
  console.log(msg)
})


server.on('upgrade', (request, socket, head) => {
  wsServer.handleUpgrade(request, socket, head, (ws) => {
    wsServer.emit('connection', ws, request)
  })
})
server.on('request', httpServer)
